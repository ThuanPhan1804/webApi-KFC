using Humanizer;
using Microsoft.AspNetCore.Identity;

namespace DoAnMonHoc.Models
{
    public class User:IdentityUser
    {
       
        public string FullName { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }    
        
        public string? VerificationToken { get; set; }


       
        
    }
}
