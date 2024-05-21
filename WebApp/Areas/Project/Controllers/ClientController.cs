using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Areas.Project.Controllers
{
    public class ClientController : Controller
    {
        #region ============ CLIENT ==================


        public ActionResult List()
        {
/*
using Telerik.Windows.Documents.Fixed;
using Telerik.Windows.Documents.Fixed.FormatProviders.Pdf;
using Telerik.Windows.Documents.Fixed.Model;
using Telerik.Windows.Documents.Fixed.Model.Fonts;
            */
/*
            string inputFilePath = "path_to_existing_pdf.pdf";
            string outputFilePath = "path_to_output_pdf.pdf";

            using (Stream inputPdfStream = File.OpenRead(inputFilePath))
            using (PdfFormatProvider provider = new PdfFormatProvider(inputPdfStream))
            {
                RadFixedDocument document = provider.Import();

                // Modify the document as needed
                RadFixedPage page = document.Pages[0];
                TextFragment textFragment = new TextFragment("Hello, World!");
                textFragment.Position = new Telerik.Windows.Documents.Fixed.Model.Point(100, 100);
                textFragment.Font = FontsRepository.HelveticaBold;
                textFragment.FontSize = 12;
                page.Content.Add(textFragment);

                // Save the modified document
                using (Stream outputPdfStream = File.Create(outputFilePath))
                {
                    PdfFormatProvider pdfExporter = new PdfFormatProvider();
                    pdfExporter.Export(document, outputPdfStream);
                }
            }
            */

            return View();
        }
        public ActionResult Save()
        {
            return View();
        }
        public ActionResult Details()
        {
            return View();
        }
        #endregion


    }
}