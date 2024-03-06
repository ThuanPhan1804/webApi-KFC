using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DoAnMonHoc.Models;
using KFC_API.Data;
using KFC_API.Models;
using NuGet.Protocol;

namespace KFC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly KFC_APIContext _context;

        public InvoicesController(KFC_APIContext context)
        {
            _context = context;
        }

        // GET: api/Invoices

        [HttpGet("page")]

        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoicePage(int page)
        {
            const int pageSize = 10;
            if (_context.Users == null)
            {
                return NotFound();
            }


            return await _context.Invoices
                                          .Include(i => i.InvoiceStatus)
                                          .Skip((page - 1) * pageSize)
                                          .Take(pageSize)
                                          .ToListAsync();
        }
        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(int code)
        {
            var invoice = await _context.Invoices.Include(i => i.InvoiceStatus).Where(i => i.Code == code).ToListAsync();

            if (invoice == null)
            {
                return NotFound();
            }

            return Ok(invoice);
        }


        [HttpGet("InvoiceDetail")]
        public async Task<ActionResult<IEnumerable<Product>>> GetInvoiceDetail(int code)
        {
            var invoice = await _context.Invoices.FirstOrDefaultAsync(i => i.Code == code);

            var invoiceDetail =   _context.InvoiceDetails.Include(i => i.Product)
                                                        .Where(i => i.InvoiceId == invoice.Id)
                                                        .ToList();


            return  Ok(invoiceDetail);

        }




        // PUT: api/Invoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // sua trang thai giao hang
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(int id, int statusId)
        {
            var invoice = _context.Invoices.FirstOrDefault(i => i.Id == id);
            if (id != invoice.Id)
            {
                return BadRequest();
            }
            invoice.InvoiceStatusId = statusId;
            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
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

       
             

    
        
         





        private bool InvoiceExists(int id)
        {
            return _context.Invoices.Any(e => e.Id == id);
        }
    }
}
