using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DoAnMonHoc.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using KFC_API.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace KFC_API.Data
{
    public class KFC_APIContext : IdentityDbContext<User>
    {
        public KFC_APIContext (DbContextOptions<KFC_APIContext> options)
            : base(options)
        {
        }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DbSet<Cart> Carts { get; set; }
     
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceDetail> InvoiceDetails { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<PromotionProduct> PromotionProducts { get; set; }
        public DbSet<Rate> Rates { get; set; }
        public DbSet<WishList> WishLists { get; set; }
        public DbSet<Category> Categories { get; set; }

        public DbSet<InvoiceProduct> InvoicesProduct { get; set; }

        public DbSet<InvoiceStatus> InvoiceStatuses { get; set; }

        internal Task RemoveAsync(User user)
        {
            throw new NotImplementedException();
        }

        public DbSet<Slideshow> Slideshow { get; set; }
    }
}
