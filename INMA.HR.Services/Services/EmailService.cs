using System; 
using System.Net;
using System.Net.Mail; 

namespace INMA.HR.Services
{
    public class EmailService
    {

        public void SendEmail(object senderName, object senderSubject, object senderEmail, object senderMessage)
        {
            try
            {
               // Thread.Sleep(10000);
                var body = "<p><b>Email<b>: {0} ({1})</p><p></p><p>{2}</p>";
                var message = new MailMessage();
                message.To.Add(new MailAddress("xtremessoft@gmail.com", "XPM Client".ToString()));  // replace with valid value 
                message.From = new MailAddress(senderEmail.ToString());                          // replace with valid value
                message.Subject = senderSubject.ToString();
                message.Body = string.Format(body, senderName, senderEmail, senderMessage);
                message.IsBodyHtml = true;
                using (var smtp = new SmtpClient())
                {
                    var credential = new NetworkCredential
                    {
                        UserName = "xtremessoft@gmail.com",  // replace with valid value
                        Password = "Xtreme12345"             // replace with valid value
                    };
                    smtp.Credentials = credential;
                    //  smtp.Host = "smtp-mail.outlook.com";
                    smtp.Host = "smtp.gmail.com";
                    smtp.Port = 587;
                     
                    smtp.EnableSsl = true;
                    smtp.Send(message);
                   
                }

            }
            catch (Exception ex)
            {

                 ex.ToString();
            }
        }

    }
}

