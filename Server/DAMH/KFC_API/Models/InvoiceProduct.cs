using DoAnMonHoc.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace KFC_API.Models
{
    public class InvoiceProduct
    {
        public int Id { get; set; }
    
        public Product Product { get; set; }
        
        public int Quantity { get; set; }
        
        public int UnitPrice { get; set; }
    }
}
