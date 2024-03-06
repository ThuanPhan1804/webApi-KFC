using System.ComponentModel.DataAnnotations.Schema;

namespace DoAnMonHoc.Models
{
    public class Rate
    {
        public int Id { get; set; }
        public string UserId {  get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Point {  get; set; }

        public string Review {  get; set; }

        public DateTime DayRate { get; set; }
        
    }
}
