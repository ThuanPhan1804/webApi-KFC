using System.ComponentModel.DataAnnotations.Schema;

namespace KFC_API.Models
{
    public class Slideshow
    {
        public int Id { get; set; }

        public string FileName { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }
    }
}
