using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
using System.Threading;
using System.Web;
using System.Web.Mvc;

using Telerik.Reporting;
using Telerik.Reporting.Processing;
using WebApp.Reports.HR_Reports;
using WebApp.Reports.Models;

namespace WebApp.Controllers
{
    public class ReportController : Controller
    {
        public ActionResult Test()
        {
            return View();
        }

        /*
     public void ExportToPDFF()
     { 
         ReportProcessor reportProcessor = new ReportProcessor();
         InstanceReportSource instanceReportSource = new InstanceReportSource();

         instanceReportSource.ReportDocument = new Report1();          // Assign Report
         instanceReportSource.Parameters.Add("Type", "Test");         // Assign Command parameters
         instanceReportSource.Parameters.Add("Language", "en-US");   // Assign Command parameters 

         //instanceReportSource.Parameters.Add(new Telerik.Reporting.Parameter("Id", "123"));
         //instanceReportSource.Parameters.Add(new Telerik.Reporting.Parameter("name", "test report"));

         RenderingResult result = reportProcessor.RenderReport("PDF", instanceReportSource, null);

         string fileName = result.DocumentName + "." + result.Extension;
         //return File(result.DocumentBytes, "application/pdf", fileName);

     }
     */

        public void ExportToPDF(string reportExtension = "PDF")
        {

            // Report available extensions =PDF,XLS,CSV,RTF,XPS,DOCS,DOCX,XLSX,PPTX,MHTML,IMAGE,IMAGEInteractive,HTML5,XAML,
            InstanceReportSource instanceReportSource = new InstanceReportSource();
            instanceReportSource.ReportDocument = new Report1();

            //instanceReportSource.Parameters.Add("Language", "en-US");   // Assign Command parameters 
            //instanceReportSource.Parameters.Add(new Telerik.Reporting.Parameter("Id", "123"));


            ReportProcessor reportProcessor = new ReportProcessor();
            RenderingResult result = reportProcessor.RenderReport(reportExtension, instanceReportSource, null);
            string fileName = result.DocumentName + "." + result.Extension;


            Response.Clear();
            Response.ContentType = result.MimeType;
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Expires = -1;
            Response.Buffer = true;

            Response.AddHeader("Content-Disposition", string.Format("{0};FileName=\"{1}\"", "attachment", fileName));

            Response.BinaryWrite(result.DocumentBytes);
            Response.End();
            //return File(result.DocumentBytes, "application/pdf", fileName);
        }
        public void DepartmentReport(string reportExtension = "PDF")
        {


            // Report available extensions =PDF,XLS,CSV,RTF,XPS,DOCS,DOCX,XLSX,PPTX,MHTML,IMAGE,IMAGEInteractive,HTML5,XAML,
            InstanceReportSource instanceReportSource = new InstanceReportSource();
            instanceReportSource.ReportDocument = new TestReport(null);


            //instanceReportSource.Parameters.Add("Language", "en-US");   // Assign Command parameters 
            //instanceReportSource.Parameters.Add(new Telerik.Reporting.Parameter("Id", "123"));


            ReportProcessor reportProcessor = new ReportProcessor();
            RenderingResult result = reportProcessor.RenderReport(reportExtension, instanceReportSource, null);
            string fileName = result.DocumentName + "." + result.Extension;


            Response.Clear();
            Response.ContentType = result.MimeType;
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Expires = -1;
            Response.Buffer = true;

            Response.AddHeader("Content-Disposition", string.Format("{0};FileName=\"{1}\"", "attachment", fileName));

            Response.BinaryWrite(result.DocumentBytes);
            Response.End();
            //return File(result.DocumentBytes, "application/pdf", fileName);

        }
        public void DepartmentReportNew(string reportExtension, string startDate)
        {

            // Report available extensions =PDF,XLS,CSV,RTF,XPS,DOCS,DOCX,XLSX,PPTX,MHTML,IMAGE,IMAGEInteractive,HTML5,XAML,
 
           
            //AddOrUpdateResource("startDate", startDate);

            ReportProcessor reportProcessor = new ReportProcessor();
            RenderingResult result = reportProcessor.RenderReport(reportExtension, new Reports.HR_Reports.HR_Department(), null);
            string fileName = result.DocumentName + "." + result.Extension;


            Response.Clear();
            Response.ContentType = result.MimeType;
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Expires = -1;
            Response.Buffer = true;

            //   Response.AddHeader("Content-Disposition", string.Format("{0};FileName=\"{1}\"", "attachment", fileName));

            Response.BinaryWrite(result.DocumentBytes);
            Response.End();
            //return File(result.DocumentBytes, "application/pdf", fileName);

            
        }
        public static void AddOrUpdateResource(string key, string value)
        {

            string resourceFilePaths = AppDomain.CurrentDomain.BaseDirectory;
            string[] resourceFileNames = System.IO.Directory.GetFiles(resourceFilePaths, "*.resx");

            var resourceFilepath = new ResXResourceReader(@"F:\DOTNET-PROJECTS\Development\GITHUB-\INMAHR-Repo\WebApp\Reports\HR-Reports\HR_Department.resx");//same fileName
            var ResxPathEn = new ResXResourceWriter(@"F:\DOTNET-PROJECTS\Development\GITHUB-\INMAHR-Repo\WebApp\Reports\HR-Reports\HR_Department.resx");//same fileName(not new)

            var resx = new List<DictionaryEntry>();
            using (var reader = resourceFilepath)
            {
                resx = reader.Cast<DictionaryEntry>().ToList();
                var existingResource = resx.Where(r => r.Key.ToString() == key).FirstOrDefault();
                if (existingResource.Key == null && existingResource.Value == null) // NEW!
                {
                    resx.Add(new DictionaryEntry() { Key = key, Value = value });
                }
                else // MODIFIED RESOURCE!
                {
                    var modifiedResx = new DictionaryEntry()
                    { Key = existingResource.Key, Value = value };
                    resx.Remove(existingResource);  // REMOVING RESOURCE!
                    resx.Add(modifiedResx);  // AND THEN ADDING RESOURCE!
                }
            }
            using (var writer = ResxPathEn)
            {
                resx.ForEach(r =>
                {
                    // Again Adding all resource to generate with final items
                    writer.AddResource(r.Key.ToString(), r.Value.ToString());
                });
                writer.Generate();
            }
        }

    }
}