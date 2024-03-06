using DoAnMonHoc.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace KFC_API.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image {  get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

    }
}
