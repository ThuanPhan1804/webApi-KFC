using KFC_API.Models;
using MailKit.Security;
using MimeKit;
using System.Management;
using System.Net.Mail;
using MimeKit.Text;
using TextFormat = MimeKit.Text.TextFormat;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;
using static Org.BouncyCastle.Math.EC.ECCurve;
using Microsoft.CodeAnalysis.Options;
using Microsoft.Extensions.Options;
using KFC_API.Services.EmailService.EmailSetting;

namespace KFC_API.Services.EmailService
{
    public class EmailService : IEmailService
    {

        private readonly GmailSettings gmailSetting;

        public EmailService(IOptions<GmailSettings> options) 
        {
           this.gmailSetting = options.Value;
        }
        public async Task SendEmail(MailRequest emailrequest)
        {
            var email = new MimeMessage();
            //email.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUsername").Value));
            email.Sender = MailboxAddress.Parse("kfcapicdth21webcn12@gmail.com");
            email.To.Add(MailboxAddress.Parse(emailrequest.To));
            email.Subject = emailrequest.Subject;
           var builder = new BodyBuilder();
            builder.HtmlBody = emailrequest.Body;

            using var smtp = new SmtpClient();

            email.Body = builder.ToMessageBody();
            smtp.Connect("smtp.gmail.com", 587 , SecureSocketOptions.StartTls);
            smtp.Authenticate("kfcapicdth21webcn12@gmail.com", "iobenzvadqsnqekm");
           await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

        //Dang nhap gmail da xac thuc 2 yeu to vao link duoi roi => Chon App Password sau do Add AppPassword  
        //https://accounts.google.com/v3/signin/challenge/pwd?TL=AHNYTISiD3y4pII6koFFQX2mGGILyqvMHdwPTqEi0N2w6Q-BkFh3xmTCBAv2sPBU&cid=2&continue=https%3A%2F%2Fmyaccount.google.com%2Fapppasswords&flowName=GlifWebSignIn&ifkv=ASKXGp20otkNJMWSbEgYBzTd7xzCI5GgtjdjMGl7HP5J3e_UkQCTRQ97MLGRs-GbUxDBgYKogZOXWg&rart=ANgoxcfvk88zDu4sY4rMa7Ko5eLbGcIAkWeO6iag1T2NmV8xz-YV42wgYtHQXJsZ--WxAcWw-kkHXi6BgO2WL8ASsbgi5-Zl5VOePFeL32k6clmL68AoTE0&rpbg=1&sarp=1&scc=1&service=accountsettings&theme=glif


    }
}
