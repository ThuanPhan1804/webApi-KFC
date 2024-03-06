using DoAnMonHoc.Models;

namespace KFC_API.Models
{
    public class InvoiceStatus
    {
        public int Id { get; set; }

        public string Name { get; set; }


        List<Invoice> Invoices { get; set; }
    }
}
