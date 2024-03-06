﻿using KFC_API.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace DoAnMonHoc.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        public int Price { get; set; }
        public bool Status { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public int Rate { get; set; }   

    }
       
}
