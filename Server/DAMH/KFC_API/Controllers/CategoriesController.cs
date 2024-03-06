using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KFC_API.Data;
using KFC_API.Models;
using DoAnMonHoc.Models;
using Microsoft.Extensions.Hosting;

namespace KFC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly KFC_APIContext _context;
        private IWebHostEnvironment _environment;

        public CategoriesController(KFC_APIContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }
        // GET: api/Category/page=?
        [HttpGet("page")]

        public async Task<ActionResult<IEnumerable<Category>>> GetCategoryPage(int page)
        {
            const int pageSize = 6;
            if (_context.Categories == null)
            {
                return NotFound();
            }


            return await _context.Categories
                                 .Skip((page - 1) * pageSize)
                                 .Take(pageSize)
                                 .ToListAsync();
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutCategory(int id, string Name, IFormFile ImageFile)
           
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return BadRequest("Category invalid");
            }


            if (ImageFile != null)
            {
                var extension = Path.GetExtension(ImageFile.FileName);
                string[] allow = { ".jpg", ".png", ".gif" };
                if (!allow.Contains(extension))
                {
                    return BadRequest();
                }



                var uploadFolder = Path.Combine(_environment.WebRootPath, "images", "category");
                var uploadPath = Path.Combine(uploadFolder, ImageFile.FileName);
                //var uploadPath = Path.Combine(Path.Combine(_environment.WebRootPath, "images", "product")
                //   ,product.Id.ToString() + Path.GetExtension(product.ImageFile.FileName)
                //  );
                using (FileStream fs = System.IO.File.Create(uploadPath))
                {
                    ImageFile.CopyTo(fs);
                    fs.Flush();
                }
                category.Image = ImageFile.FileName;



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


            category.Name = Name;
           

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                _context.Categories.Update(category);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // return NoContent();
            return AcceptedAtAction("GetCategory", new { id = category.Id }, category);
        }

        

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory([FromForm] Category category)
        {
            if (category.ImageFile != null)
            {
                var extension = Path.GetExtension(category.ImageFile.FileName);
                string[] allow = { ".jpg", ".png", ".gif" };
                if (!allow.Contains(extension))
                {
                    return BadRequest();
                }


                var fileName = category.Id.ToString() + Path.GetExtension(category.ImageFile.FileName);
                var uploadFolder = Path.Combine(_environment.WebRootPath, "images", "category");
                var uploadPath = Path.Combine(uploadFolder, fileName);
                //var uploadPath = Path.Combine(Path.Combine(_environment.WebRootPath, "images", "category")
                //   ,category.Id.ToString() + Path.GetExtension(category.ImageFile.FileName)
                //  );
                using (FileStream fs = System.IO.File.Create(uploadPath))
                {
                    category.ImageFile.CopyTo(fs);
                    fs.Flush();
                }
                category.Image = fileName;
                //category.Image = category.Id.ToString() + Path.GetExtension(category.ImageFile.FileName);
                //Kiem tra du lieu

                if (!category.ImageFile.ContentType.StartsWith("image"))
                {

                    return NoContent();
                }
                if (category.ImageFile.Length > 5 * 1024 * 1024)
                {
                    return BadRequest("Dung luong qua lon");
                }
                       
            }
            _context.Update(category);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCategory", new { id = category.Id }, category);
        }

            // DELETE: api/Categories/5
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteCategory(int id)
            {
                var category = await _context.Categories.FindAsync(id);
                if (category == null)
                {
                    return NotFound();
                }

                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            private bool CategoryExists(int id)
            {
                return _context.Categories.Any(e => e.Id == id);
            }
        }
    }


