using System.ComponentModel.DataAnnotations.Schema;
namespace DoAnMonHoc.Models
{
    public class WishList
    {
        public int Id { get; set; }

        public User User { get; set; }
        public string UserId { get; set; }

        public Product Product { get; set; }
        public int ProductId { get; set; }

        
        
    }
}
