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
    public class CommentsController : ControllerBase
    {
        private readonly KFC_APIContext _context;

        public CommentsController(KFC_APIContext context)
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


        // GET: api/Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            return await _context.Comments.Include(u=>u.User).ToListAsync();
        }

        // GET: api/Comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        // PUT: api/Comments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
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

        // POST: api/Comments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(string userId, int productId, string Content)
        {
           // var comments = await _context.Comments.FindAsync(userId, productId);
            var user = await _context.Users.FindAsync(userId);
            var comments = new Comment()
            {
                User = user,
                UserId = userId,
                Content = Content,
                ProductId = productId,
                CreateDate = DateTime.Now,
                CommentId = RandomNumberGenerator.GenerateSixDigitRandomNumber(),
                };
            _context.Comments.Add(comments);
            await _context.SaveChangesAsync();

            return Ok(comments);
        }

        [HttpPost("Answer")]
        public async Task<ActionResult<Comment>> ReComment(string userId, int productId, string Content, int commentId)
        {
           // var comments = await _context.Comments.FindAsync(userId, productId);
            var user = await _context.Users.FindAsync(userId);
           var comments = new Comment()
            {
                User = user,
                UserId = userId,
                Content = Content,
                ProductId = productId,
                CreateDate = DateTime.Now,
                CommentId = commentId,
            };
            _context.Comments.Add(comments);
            await _context.SaveChangesAsync();

            return Ok(comments);
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }
    }
}
