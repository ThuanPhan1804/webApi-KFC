using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace DoAnMonHoc.Models
{
    public class Cart
    {
        public int Id { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; }
        

        public Product Product { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }

        public User User { get; set; }

        public int Quantity { get; set; }
        
    }
}
