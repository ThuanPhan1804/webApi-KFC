using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DoAnMonHoc.Models;
using KFC_API.Data;

namespace KFC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListsController : ControllerBase
    {
        private readonly KFC_APIContext _context;

        public WishListsController(KFC_APIContext context)
        {
            _context = context;
        }

        // GET: api/WishLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishList>>> GetWishLists()
        {
            return await _context.WishLists.Include(u=>u.User).Include(p=>p.Product)
                                           .ToListAsync();
        }

        // GET: api/WishLists/5
        [HttpGet("UserWishLists")]
        public async Task<ActionResult<IEnumerable<WishList>>> GetUserWishlist(string userId)
        {
            var wishList = await _context.WishLists.Include(w=>w.Product)
                                                   .FirstOrDefaultAsync(w=>w.UserId==userId);

            if (wishList == null)
            {
                return NotFound();
            }

            return  Ok(wishList);
        }

        // PUT: api/WishLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWishList(int id, WishList wishList)
        {
            if (id != wishList.Id)
            {
                return BadRequest();
            }

            _context.Entry(wishList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WishListExists(id))
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

        // POST: api/WishLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WishList>> PostWishList(string UserId, int productid)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            var product = await _context.Products.FirstOrDefaultAsync(p=>p.Id == productid);
            var wishlist =  _context.WishLists.FirstOrDefault(w=>w.UserId == UserId && w.ProductId == productid);

            wishlist = new WishList()
            {
                ProductId= product.Id,
                Product = product,
                UserId = user.Id,
                User = user,
             
            };
            _context.WishLists.Add(wishlist);
            await _context.SaveChangesAsync();

            return Ok(wishlist);
        }

        // DELETE: api/WishLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishList(int productId, string userId)
        {
            var wishList = await _context.WishLists.FirstOrDefaultAsync(w => w.ProductId == productId && w.UserId==userId);
            if (wishList == null)
            {
                return NotFound();
            }

            _context.WishLists.Remove(wishList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WishListExists(int id)
        {
            return _context.WishLists.Any(e => e.Id == id);
        }
    }
}
