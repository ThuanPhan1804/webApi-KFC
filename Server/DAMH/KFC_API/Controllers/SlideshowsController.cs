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
    public class SlideshowsController : ControllerBase
    {
        private readonly KFC_APIContext _context;
        private IWebHostEnvironment _environment;
        public SlideshowsController(KFC_APIContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }



        // GET: api/Slideshows
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Slideshow>>> GetSlideshow()
        {
            return await _context.Slideshow.ToListAsync();
        }

        // GET: api/Slideshows/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Slideshow>> GetSlideshow(int id)
        {
            var slideshow = await _context.Slideshow.FindAsync(id);

            if (slideshow == null)
            {
                return NotFound();
            }

            return slideshow;
        }

        // PUT: api/Slideshows/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSlideshow(int id,IFormFile file)
        {
            var slideshow = _context.Slideshow.FirstOrDefault(s=>s.Id == id);
            if (id != slideshow.Id)
            {
                return BadRequest();
            }
            if (slideshow != null)
            {
                var extension = Path.GetExtension(file.FileName);
                string[] allow = { ".jpg", ".png", ".gif" };
                if (!allow.Contains(extension))
                {
                    return BadRequest();
                }


               // var fileName = Path.GetExtension(item.FileName);
                var uploadFolder = Path.Combine(_environment.WebRootPath, "images", "slideshow");
                var uploadPath = Path.Combine(uploadFolder, file.FileName);
                //var uploadPath = Path.Combine(Path.Combine(_environment.WebRootPath, "images", "product")
                //   ,product.Id.ToString() + Path.GetExtension(product.ImageFile.FileName)
                //  );
                                       
                
                using (FileStream fs = System.IO.File.Create(uploadPath))
                {
                    file.CopyTo(fs);
                    fs.Flush();
                }
                slideshow.FileName = file.FileName;


                //product.Image = product.Id.ToString() + Path.GetExtension(product.ImageFile.FileName);
                //Kiem tra du lieu

                if (!file.ContentType.StartsWith("image"))
                {

                    return NoContent();
                }
                if (file.Length > 5 * 1024 * 1024)
                {

                }

                // _context.Products.Update(product);
                // await _context.SaveChangesAsync();

            }

        
        _context.Entry(slideshow).State = EntityState.Modified;

            try
            {
                 _context.Slideshow.Update(slideshow);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SlideshowExists(id))
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

        // POST: api/Slideshows
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Slideshow>> PostSlideshow(List<IFormFile> Files)
        {
           // var slideshow = await _context.Slideshow.FirstOrDefaultAsync();
            
                foreach (var item in Files)
                {
                    if (_context.Slideshow != null)
                    {
                        var extension = Path.GetExtension(item.FileName);
                        string[] allow = { ".jpg", ".png", ".gif" };
                        if (!allow.Contains(extension))
                        {
                            return BadRequest();
                        }


                        var fileName = item.FileName; // Path.GetExtension(item.FileName);
                        var uploadFolder = Path.Combine(_environment.WebRootPath, "images", "slideshow");
                        var uploadPath = Path.Combine(uploadFolder, fileName);
                    //var uploadPath = Path.Combine(Path.Combine(_environment.WebRootPath, "images", "product")
                    //   ,product.Id.ToString() + Path.GetExtension(product.ImageFile.FileName)
                    //  );

                        Slideshow slideswow = new Slideshow()
                        {
                            
                            FileName = item.FileName,
                        };
                    _context.Add(slideswow);
                    
                     _context.SaveChanges();
                    using (FileStream fs = System.IO.File.Create(uploadPath))
                        {
                            item.CopyTo(fs);
                            fs.Flush();
                        }
                        
                        
                        //product.Image = product.Id.ToString() + Path.GetExtension(product.ImageFile.FileName);
                        //Kiem tra du lieu

                        if (!item.ContentType.StartsWith("image"))
                        {

                            return NoContent();
                        }
                        if (item.Length > 5 * 1024 * 1024)
                        {

                        }

                    // _context.Products.Update(product);
                    // await _context.SaveChangesAsync();
                    
                    }
                    
                }
                await _context.SaveChangesAsync();
            
            return Ok("Thanh cong");
        }

        // DELETE: api/Slideshows/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSlideshow(string id)
        {
            var slideshow = await _context.Slideshow.FindAsync(id);
            if (slideshow == null)
            {
                return NotFound();
            }

            _context.Slideshow.Remove(slideshow);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SlideshowExists(int id)
        {
            return _context.Slideshow.Any(e => e.Id == id);
        }
    }
}
