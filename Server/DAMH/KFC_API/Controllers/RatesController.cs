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
    public class RatesController : ControllerBase
    {
        private readonly KFC_APIContext _context;

        public RatesController(KFC_APIContext context)
        {
            _context = context;
        }

        // GET: api/Rates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rate>>> GetRates()
        {
            return await _context.Rates.ToListAsync();
        }

        // GET: api/Rates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rate>> GetRate(int id)
        {
            var rate = await _context.Rates.FindAsync(id);

            if (rate == null)
            {
                return NotFound();
            }

            return rate;
        }

        
        

        
        // DELETE: api/Rates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRate(int id)
        {
            var rate = await _context.Rates.FindAsync(id);
            if (rate == null)
            {
                return NotFound();
            }

            _context.Rates.Remove(rate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RateExists(int id)
        {
            return _context.Rates.Any(e => e.Id == id);
        }
    }
}
