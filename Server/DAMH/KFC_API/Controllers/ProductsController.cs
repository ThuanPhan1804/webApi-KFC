using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DoAnMonHoc.Models;
using KFC_API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Hosting;
using Microsoft.CodeAnalysis;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Drawing;
using Microsoft.Win32;

namespace KFC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private  KFC_APIContext _context;
        private IWebHostEnvironment _environment;
       
        public ProductsController(KFC_APIContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/Products/OfCategory
        // Tim san pham theo danh muc(category)
        [HttpGet("OfCategory")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductby(int categoryId)
        {
          if (_context.Products == null)
          {
              return NotFound();
          }
            return await _context.Products.Where(p => p.CategoryId == categoryId).ToListAsync();
        }
        // GET: api/Products/lowerprice 
        // Loc san pham theo gia tien(thap hon)
        [HttpGet("searchByprice")]
        public async Task<ActionResult<IEnumerable<Product>>> TakeProductbyPrice(int min,int max)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            return await _context.Products.Where(p => p.Price >= min && p.Price <= max).ToListAsync();
        }

     
        // GET: api/Products/page=?
        [HttpGet("page")]

        public async Task<ActionResult<IEnumerable<Product>>> GetProductPage(int page)
        {
            const int pageSize = 10;
            if (_context.Products == null)
            {
                return NotFound();
            }




            return await _context.Products
                                 .Include(p=>p.Category)
                                 .OrderByDescending(p => p.Id)
                                 .Skip((page - 1) * pageSize)
                                 .Take(pageSize)                                 
                                 .ToListAsync();
        }
       
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Product>>> SearchProduct(string search)
        {
            return await _context.Products.Where(p => p.Name.ToLower()
                                                            .Contains(search.ToString()))
                                          .ToListAsync();

        }

        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<Product>>> GetProduct()
        {
           if (_context.Products == null)
            {
                return NotFound();
            }

            return await _context.Products.Include(p => p.Category).ToListAsync();
        }

        //[HttpGet("Code")]
        //public async Task<ActionResult<IEnumerable<Product>>> GetProductbyInvoiceCode(int code)
        //{
        //    var invoice = await _context.Invoices.FirstOrDefaultAsync( i => i.Code == code );  

        //    var invoiceDetail = await _context.InvoiceDetails.Where( i => i.InvoiceId == invoice.Id ).ToListAsync();

           

        //    foreach ( var item in invoiceDetail )
        //    {
        //        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == item.ProductId);

        //        var productDetail = new InvoiceDetail()
        //        {
        //            ProductId = product.Id,
        //            Product = product,
        //            Quantity = item.Quantity,
        //        };
        //        return Ok(productDetail);
               
        //    }
           

        //    return await _context.Products.Where(p => p.Id == invoiceDetail.)
        //    {
                
        //    });
           




       // }



        // GET: api/Products/5
        // Tim san pham bang id
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
          if (_context.Products == null)
          {
              return NotFound();
          }
            var product = await _context.Products.Include(p => p.Category)
                                                 .FirstOrDefaultAsync(p => p.Id == id);
                                                 
            

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }


       // PUT: api/Products/5
       //  To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutProduct(int id, string Name, string Description, IFormFile ImageFile, int Price, bool Status, int CategoryId)
        {

            var product = await _context.Products.FindAsync(id);

            var category = await _context.Categories.FindAsync(CategoryId);

            if (category == null)
            {
                return BadRequest("Category invalid");
            }

            if (product == null)
            {
                return BadRequest();
            }           

            if (ImageFile != null)
            {
                var extension = Path.GetExtension(ImageFile.FileName);
                string[] allow = { ".jpg", ".png", ".gif" };
                if (!allow.Contains(extension))
                {
                    return BadRequest();
                }


                
                var uploadFolder = Path.Combine(_environment.WebRootPath, "images", "product");
                var uploadPath = Path.Combine(uploadFolder, ImageFile.FileName);
                //var uploadPath = Path.Combine(Path.Combine(_environment.WebRootPath, "images", "product")
                //   ,product.Id.ToString() + Path.GetExtension(product.ImageFile.FileName)
                //  );
                using (FileStream fs = System.IO.File.Create(uploadPath))
                {
                    ImageFile.CopyTo(fs);
                    fs.Flush();
                }
                product.Image = ImageFile.FileName;


               
                //product.Image = product.Id.ToString() + Path.GetExtension(product.ImageFile.FileName);
                //Kiem tra du lieu

                if (!ImageFile.ContentType.StartsWith("image"))
                {

                    return NoContent();
                }
                if (ImageFile.Length > 5 * 1024 * 1024)
                {
                    return NoContent();
                }
               // _context.Products.Update(product);
               // await _context.SaveChangesAsync();
            }


            product.Name = Name;
            product.Description = Description;
            product.Price = Price;
            product.Status = Status;
            product.CategoryId = CategoryId;
            product.Category = category;


            _context.Entry(product).State = EntityState.Modified;

            try
            {
                _context.Products.Update(product);
                await _context.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            //return NoContent();
            return Ok();
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutProduct(int id, int categoryId)
        //{
        //    var product = _context.Products.FirstOrDefault(p => p.Id == id);
        //    if (id != product.Id)
        //    {
        //        return BadRequest();
        //    }
        //    product.CategoryId = categoryId;
        //    _context.Entry(product).State = EntityState.Modified;

        //    try
        //    {
        //        _context.Products.Update(product);
        //        await _context.SaveChangesAsync();

        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ProductExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //    return AcceptedAtAction("GetProduct", new { id = product.Id }, product);
        //}

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]

        public async Task<ActionResult<Product>> PostProduct(string Name, string Description, IFormFile ImageFile, int Price, bool Status, int CategoryId)
        {

            if (_context.Products == null)
            {
                return Problem("Entity set 'KFC_APIContext.Product'  is null.");
            }
            var category = await _context.Categories.FindAsync(CategoryId);

            var product = new Product() 
            {
                Name = Name,
                Description = Description,
                Price = Price,
                Status = Status,
                CategoryId = category.Id,
                Rate = 5,
                Category = category,
                
            
            };
             _context.Products.Add(product);
            
            if (ImageFile != null)
            {
                var extension = Path.GetExtension(ImageFile.FileName);
                string[] allow = { ".jpg", ".png", ".gif" };
                if (!allow.Contains(extension))
                {
                    return BadRequest();
                }


                
                var uploadFolder = Path.Combine(_environment.WebRootPath, "images", "product");
                var uploadPath = Path.Combine(uploadFolder, ImageFile.FileName);
                //var uploadPath = Path.Combine(Path.Combine(_environment.WebRootPath, "images", "product")
                //   ,product.Id.ToString() + Path.GetExtension(product.ImageFile.FileName)
                //  );
                using (FileStream fs = System.IO.File.Create(uploadPath))
                {
                    ImageFile.CopyTo(fs);
                    fs.Flush();
                }
                product.Image = ImageFile.FileName;
                //product.Image = product.Id.ToString() + Path.GetExtension(product.ImageFile.FileName);
                //Kiem tra du lieu

                if (!ImageFile.ContentType.StartsWith("image"))
                {
                    
                    return NoContent();
                }
                if (ImageFile.Length > 5 * 1024 * 1024)
                {
                    return NoContent();
                }
               
            }
            //_context.Update(product);
            await _context.SaveChangesAsync();

            return Ok();
            //return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        [HttpPost("Rate")]

        public async Task<ActionResult<Product>> RateProduct(string UserId, int Point,int IvoiceCode, string review)
        {
            var user = await _context.Users.FindAsync(UserId);

            var invoice = await _context.Invoices.FirstOrDefaultAsync(i => i.UserId == UserId && i.InvoiceStatusId == 5 && i.Code == IvoiceCode);

            var invoiceDetail = await _context.InvoiceDetails.Where(i => i.InvoiceId == invoice.Id).ToListAsync();

            if(invoice != null)
            {
                foreach (var item in invoiceDetail)
                {
                    var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == item.ProductId);
                    product.Rate = (int) (product.Rate + Point) / 2;
                    _context.Products.Update(product);
                    Rate rate = new Rate()
                    {
                        Product = product,
                        UserId = UserId,
                        ProductId = item.ProductId,
                        Point = Point,
                        Review = review,
                    };
                    _context.Rates.Add(rate);
                }
                await _context.SaveChangesAsync();
                return Ok();
            }
            return NotFound();


        }



        // DELETE: api/Products/5

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return (_context.Products?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
