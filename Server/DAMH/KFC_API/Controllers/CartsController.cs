using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DoAnMonHoc.Models;
using KFC_API.Data;
using NuGet.Protocol.Plugins;

namespace KFC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly KFC_APIContext _context;
        

        public CartsController(KFC_APIContext context)
        {
            _context = context;
        }
        public static class RandomNumberGenerator
        {
            private static readonly Random random = new Random();

            public static int GenerateRandomNumber(int min, int max)
            {
                return random.Next(min, max);
            }

            public static int GenerateSixDigitRandomNumber()
            {
                int min = 0; // Minimum 6-digit number
                int max = 999999; // Maximum 6-digit number
                return GenerateRandomNumber(min, max);
            }
        }

        // GET: api/Carts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            
            var carts = await _context.Carts.Include(c=>c.Product)
                                            .Include(c=>c.User)
                                            .ToListAsync();
            
            

            if (carts != null)
            {
                
                return Ok(carts);
            }                             
            return NotFound();
        }

        [HttpGet("userId")]
        public async Task<ActionResult<IEnumerable<Cart>>> GetUserCard(string UserId)
        {

            var carts = await _context.Carts.Include(c => c.Product)
                                            .Include(c => c.User)
                                            .Where(c => c.UserId == UserId) 
                                            .ToListAsync();



            if (carts != null)
            {

                return Ok(carts);
            }
            return NotFound();
        }




        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (id != cart.Id)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cart>> AddCart(string userId, int id, int quantity = 1)
        {
            
            var user = await _context.Users.FindAsync(userId);
                if (user != null)
                {

                    var cart =  _context.Carts.FirstOrDefault(c => c.UserId == userId && c.ProductId == id);

                    var product =  _context.Products.FirstOrDefault(p => p.Id == id);
                   // cart.Product = _context.Add(product);
                    if (cart != null)
                    {
                        var quantitycheck = cart.Quantity + quantity;

                        if(quantitycheck == 0)
                    {
                        _context.Carts.Remove(cart);
                        _context.SaveChanges();
                        return Ok("Xoa Thanh cong");
                    }
                            cart.Quantity += quantity;

                        _context.Carts.Update(cart);
                        await _context.SaveChangesAsync();

                        return Ok(cart);
                    }
                    
                    else
                    {
                    cart = new Cart()
                    {
                            
                            UserId = (string)user.Id,
                            User = user,
                            Product = product,
                            ProductId = id,
                            Quantity = quantity
                           
                    };
                    
                        _context.Carts.Add(cart);
                       
                    await _context.SaveChangesAsync();
                    return Ok(cart);
                    }
                    


                }
            
            return BadRequest(); 
        }

        [HttpPost("Pay")]
        public async Task<ActionResult<Cart>> Pay(string ShippingAddress, string ShippingPhone, string userId, string promotion)
        {
            var carts = await _context.Carts.Include(c => c.Product)
                                            .Where(c => c.UserId == userId)
                                            .ToListAsync();

            if (carts == null)
            {
                return BadRequest("Chua co mon trong gio hang");
            }
            var prom = _context.Promotions.FirstOrDefault(p => p.Name == promotion);



            decimal discount = 0;

            if (prom != null)
            {
                discount = carts.Sum(c => c.Product.Price * c.Quantity) * prom.Percent;

            }
            else
            {
                if (promotion != null)
                {
                    return BadRequest(promotion + "Khong dung hoac da het han");
                }
            }


            var invoice = new Invoice()
                {

                    UserId = (string)userId,
                    IssuedDate = DateTime.Now,
                    Code = RandomNumberGenerator.GenerateSixDigitRandomNumber(),
                    ShippingAddress = ShippingAddress,
                    ShippingPhone = ShippingPhone,
                    Total = carts.Sum(c => c.Product.Price * c.Quantity) - discount,
                    InvoiceStatusId = 1,
                    

                };
                _context.Invoices.Add(invoice);
             await   _context.SaveChangesAsync();

                foreach (var item in carts)
                {
                    InvoiceDetail detail = new InvoiceDetail()
                    {
                        InvoiceId = invoice.Id,
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        UnitPrice = item.Product.Price,
                        Product = item.Product,
                    };

                    _context.InvoiceDetails.Add(detail);

                    _context.Carts.Remove(item);
                }
            //var invoiceId = await _context.Invoices.FirstOrDefaultAsync(u => u.UserId == userId);
           // var invoicedetail = await _context.InvoiceDetails.Where(i => i.InvoiceId == invoiceId.Id).ToListAsync();
           //     invoice.InvoiceDetails = invoicedetail;
           // _context.Update(invoice);


          await  _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.Id == id);
        }
    }
}
