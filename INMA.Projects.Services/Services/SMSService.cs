using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace AppointmentManagmentSystem
{
    public class SMSService
    {



        public void SendSMSThroughAPI(string message,string Number)
        {

            // using System.Net;
            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            // Use SecurityProtocolType.Ssl3 if needed for compatibility reasons
            string html = string.Empty;
            //string url = @"hgttps://sendpk.com/api/sms.php?username=923339645407&password=xtreme@1&sender=Masking%20&mobile=" + Number + "&format=json&message=" + message;
         //   string url = @"httsp://sms.estsol.com/api_sms/api.php?key=5526a61a22d2d19bfd2f9da5bd1b7018&receiver=" + Number + "&sender=BestProduct&msgdata=" + message;
            string url = @"http://api.m4sms.com/api/sendsms?id=xtremessoft&pass=123456789&mobile=" + Number + "&brandname=XtremesSoft&msg=" + message+ "&language=English";
        //httpss://api.m4sms.com/api/sendsms?id=xtremessoft&pass=123456789&mobile=&brandname=XtremesSoft&msg=hifrom%20API&language=English;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.AutomaticDecompression = DecompressionMethods.GZip;

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                html = reader.ReadToEnd();
            }

        }

        //public static string SendSMSThroughAPI(string msgtext, string receiver, string "")//English
        //{
        //    string url = "htttp://www.outreach.pk/api/sendsms.php/sendsms/url";
        //    var result = "";
        //    var maskname = "XTREME SOFT";
        //    var id = "test";
        //    var password = "test";


        //    string message = HttpUtility.UrlEncode(msgtext);
        //    var strPost = "id=" + id + "&pass=" + password + "&msg=" + message +
        //    "&to=" + receiver + "&mask=" + maskname + "&type=xml&lang=" + lang + "";
        //    StreamWriter myWriter = null;
        //    HttpWebRequest objRequest = (HttpWebRequest)WebRequest.Create(url);
        //    objRequest.Method = "POST";
        //    objRequest.ContentLength = Encoding.UTF8.GetByteCount(strPost);
        //    objRequest.ContentType = "application/x-www-form-urlencoded";
        //    try
        //    {
        //        myWriter = new StreamWriter(objRequest.GetRequestStream());
        //        myWriter.Write(strPost);
        //    }
        //    catch (Exception e)
        //    {
        //        return e.Message;
        //    }
        //    finally
        //    {
        //        myWriter.Close();
        //    }
        //    HttpWebResponse objResponse = (HttpWebResponse)objRequest.GetResponse();
        //    using (StreamReader sr = new StreamReader(objResponse.GetResponseStream()))
        //    {
        //        result = sr.ReadToEnd();
        //        // Close and clean up the StreamReader
        //        sr.Close();
        //    }
        //    return result;
        //}


    }
}

