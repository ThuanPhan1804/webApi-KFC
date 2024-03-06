using KFC_API.Data;
using KFC_API.Models;
using KFC_API.Services.EmailService;
using KFC_API.Services.EmailService.EmailSetting;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MimeKit.Text;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Drawing.Text;
using static Org.BouncyCastle.Math.EC.ECCurve;

namespace KFC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : Controller
    {

        private readonly IEmailService _emailService;
        private KFC_APIContext _context;
        public EmailController(IEmailService emailService, KFC_APIContext context)
        {

            _emailService = emailService;
            _context = context;
        }

       



        [HttpPost("SendEmail")]
        public async Task<IActionResult> SendEmail(string UserId)
        {
            var  user = await _context.Users.FirstOrDefaultAsync(u=>u.Id == UserId);
            if (user == null)
            {
                return NotFound();
            }
            try
            {
                MailRequest emailrequest = new MailRequest();
                emailrequest.To = user.Email;
                emailrequest.Subject = "Xin chao " + user.FullName ;
                emailrequest.Body = GetHtmlcontent();
                await _emailService.SendEmail(emailrequest);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }

        private string GetHtmlcontent()
        {
            string Response = "<h1>Welcome KFC</h1>";
            Response = "<h2>This is your verify code</h2>";
            return Response;
        }

    }
}
