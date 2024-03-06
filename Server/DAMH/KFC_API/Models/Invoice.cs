using KFC_API.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace DoAnMonHoc.Models
{
    public class Invoice
    {
        public int Id { get; set; }
       
        public int Code { get; set; }
        public string UserId { get; set; }

        public User User { get; set; }


        public DateTime IssuedDate { get; set; }
        public string ShippingAddress { get; set; }
        public string ShippingPhone { get; set; }
        public decimal Total {  get; set; }
       
        public int InvoiceStatusId { get; set; }
        public InvoiceStatus InvoiceStatus { get; set; }

        public List<InvoiceDetail> InvoiceDetails { get; set;}
    }
}
