using KFC_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using KFC_API.Data;
using DoAnMonHoc.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using KFC_API.Services.EmailService;
using KFC_API.Services.EmailService.EmailSetting;
using MimeKit.Text;
using NuGet.Common;

namespace KFC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
       // private readonly SignInManager<IdentityUser> _signInManager;
        private KFC_APIContext _context;

        public UsersController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, KFC_APIContext context, IEmailService emailService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
            _emailService = emailService;
          //  _signInManager = signInManager;
        }
        public static class RandomNumberGenerator
        {
            private static readonly Random random = new Random();

            public static int GenerateRandomNumber(int min, int max)
            {
                return random.Next(min, max);
            }

            public static int GenerateSixDigitRandomNumber()
            {
                int min = 100000; // Minimum 6-digit number
                int max = 999999; // Maximum 6-digit number
                return GenerateRandomNumber(min, max);
            }

           
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            
            return Ok(user);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(string Username, string Password)
        {
            var user = await _userManager.FindByNameAsync(Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, Password))
            {
                if (user.LockoutEnabled == true) 
                {
                    return BadRequest("You have been banned");
                }
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.NameIdentifier,user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
     
                    ) ;

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    
                });
            }
            return Unauthorized();
        }
        [HttpPost]
        
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword(string id,string oldpassword,string newpassword)
        {
            
            var user = await _userManager.FindByIdAsync(id);
            
            if (user != null && await _userManager.CheckPasswordAsync(user, oldpassword))
            {
               // await _userManager.ResetPasswordAsync(user,token,newpassword);
                await _userManager.RemovePasswordAsync(user);
                await _userManager.AddPasswordAsync(user, newpassword);
                
            }
            else
            {
                return BadRequest("Failed to reset password");
            }
            _context.Update(user);
                return Ok("Password reset successful.");
        }




        static string GenerateRandomString(int length)
        {
            const string chars = "JKLHuioat!@#987";
            Random random = new Random();
            string randomString = new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
            return randomString;
        }



        [HttpPost]
        [Route("ResetPassword")]

        public async Task<IActionResult> ResetPassword(string email)
        {

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email); //&& u.EmailConfirmed == true);

           
            if (user != null )
            {
                string Token = GenerateRandomString(10); //DateTime.Now.ToString("");

                await _userManager.RemovePasswordAsync(user);
                await _userManager.AddPasswordAsync(user, Token);

                _context.Update(user);
                await _context.SaveChangesAsync();

                MailRequest emailrequest = new MailRequest();
                emailrequest.To = email;
                emailrequest.Subject = "Xin chao " + user.UserName;
                emailrequest.Body = GetHtmlcontent(Token);

                await _emailService.SendEmail(emailrequest);

                return Ok("Mat khau moi da duoc gui vao email cua ban!");
                             
            }
            else
            {
                return BadRequest("Email Invalid Or Not Verified yet");
            }
            
            
        }

        [HttpPost("SendToken")]

        public async Task<IActionResult> SendToken (string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            MailRequest emailrequest = new MailRequest();
            emailrequest.To = user.Email;
            emailrequest.Subject = "Xin chao " + user.UserName;
            emailrequest.Body = "<h1>Verification Token: </h1>" + user.VerificationToken  ;
            await _emailService.SendEmail(emailrequest);
            return Ok();
        }


        [HttpPost("Verify")]

        public async Task<IActionResult> Verify(string token)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.VerificationToken == token);
            if (user != null)
            {
                user.EmailConfirmed = true;
                await _context.SaveChangesAsync();
                return Ok("User verified");
            }
            return BadRequest("Token Invalid");
        }

      


        // [HttpPost]
        //  [Authorize]
        // public async Task<IActionResult> Logout()
        // {
        //     await _signInManager.SignOutAsync();
        //     return Ok();
        //  }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(string Username, string Password, string FullName, string Address, string Email)
        {
            var userExists = await _userManager.FindByNameAsync(Username);
            if (userExists != null)
            {
                return BadRequest("Username exists");

            }
            var emailExits = await _userManager.FindByEmailAsync(Email);
            if (emailExits != null)
            {
                return BadRequest("Email exists");
            }


            User user = new User()
            {
                Email = Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = Username,
                Address = Address,
                FullName = FullName,
                
                VerificationToken = GenerateRandomString(32),

            };
           
           
            var result = await _userManager.CreateAsync(user, Password);

            await _userManager.SetLockoutEnabledAsync(user, false);

            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError);
            
            _context.Update(user);
            await _context.SaveChangesAsync();  
            return Ok("Welcome to KFC!");
        }

        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin(string Username, string Password, string FullName, string Address, string Email)
        {
            var userExists = await _userManager.FindByNameAsync(Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError);

            User user = new User()
            {
                Email = Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = Username,
                Address = Address,
                FullName = FullName,
                VerificationToken = GenerateRandomString(32),

            };
           
            var result = await _userManager.CreateAsync(user, Password);

            await _userManager.SetLockoutEnabledAsync(user, false);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError);

            if (!await _roleManager.RoleExistsAsync("Admin"))
                await _roleManager.CreateAsync(new IdentityRole("Admin"));
            if (!await _roleManager.RoleExistsAsync("User"))
                await _roleManager.CreateAsync(new IdentityRole("User"));

            if (await _roleManager.RoleExistsAsync("Admin"))
            {
                await _userManager.AddToRoleAsync(user, "Admin");
            }
            _context.Update(user);
            
            return Ok();
        }
        [HttpPost]
        [Authorize(Roles="Admin")]
        [Route("register-manager")]
        public async Task<IActionResult> RegisterManager(string Username, string Password, string FullName, string Address, string Email)
        {
            var userExists = await _userManager.FindByNameAsync(Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError);

            User user = new User()
            {
                Email = Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = Username,
                Address = Address,
                FullName = FullName,
                VerificationToken = GenerateRandomString(32),


            };
           
            var result = await _userManager.CreateAsync(user, Password);
            await _userManager.SetLockoutEnabledAsync(user, false);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError);

            if (!await _roleManager.RoleExistsAsync("Manager"))
                await _roleManager.CreateAsync(new IdentityRole("Manager"));
            if (!await _roleManager.RoleExistsAsync("User"))
                await _roleManager.CreateAsync(new IdentityRole("User"));

            if (await _roleManager.RoleExistsAsync("Manager"))
            {
                await _userManager.AddToRoleAsync(user, "Manager");
            }
            _context.Update(user);

            return Ok("Welcome to KFC, Manager!");
        }
        [HttpGet("page")]

        public async Task<ActionResult<IEnumerable<User>>> GetUserPage(int page)
        {
            const int pageSize = 6;
            if (_context.Users == null)
            {
                return NotFound();
            }


            return await  _context.Users
                                 .Skip((page - 1) * pageSize)
                                 .Take(pageSize)
                                 .ToListAsync();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(String id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) 
            {
                return NotFound();
            }

            await _userManager.SetLockoutEnabledAsync(user,true);
            await _context.SaveChangesAsync();

            return Ok("Deleted");
        }
        [HttpPut("Unlock")]
        public async Task<IActionResult> UnlockUser(String id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _userManager.SetLockoutEnabledAsync(user, false);
            _context.Update(user);
            await _context.SaveChangesAsync();

            return Ok("Unlock Success!");
        }




        private string GetHtmlcontent(string password)
        {
            string Response = "<h1>Welcome back to KFC</h1>";
            Response += "<h2>This is your new password </h2>";
            Response += "<i>" +  password  + "</i>" ;
            Response += "<h3>Please change your password after this</h3>";
            return Response;
        }

    }
 }

