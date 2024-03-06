using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Composition.Convention;

namespace DoAnMonHoc.Models
{
    public class Comment
    {
        
        public int Id { get; set; }

        [ForeignKey("commentid")]
        public int CommentId { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string Content {  get; set; }
        
       

        
        public DateTime CreateDate { get; set; }
    }
}
