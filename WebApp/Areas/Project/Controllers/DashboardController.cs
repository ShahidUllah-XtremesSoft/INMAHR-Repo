using iText.Forms;
using iText.Forms.Fields;
using iText.IO.Font;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas;
using iText.Kernel.Pdf.Xobject;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Text;
using System.Web.Mvc;

namespace WebApp.Areas.Project.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Project/Dashboard
        public ActionResult Index()
        {
            return View();
        }


        // Dashboard 1 is created as per company owner demand
        [ActionName("One")]
        public ActionResult dashboard_one()
        {

            return View("~/Areas/Project/Views/Dashboard/dashboard_one.cshtml");
        }
        [ActionName("Two")]
        public ActionResult dashboard_two()
        {

            return View("~/Areas/Project/Views/Dashboard/dashboard_two.cshtml");
        }
        [ActionName("Employee")]
        public ActionResult EmployeeDashboard()
        {

            return View("~/Areas/Project/Views/Dashboard/EmployeeDashboard.cshtml");
        }
        public ActionResult LoadProjectSubSectionRecordBySection()
        {
            return PartialView("~/Areas/Project/Views/Shared/PartialViews/Dashboard/_ProjectSubSectionRecordBySection.cshtml");
        }


        /*
        public ActionResult pdf_download()
        {


            string EnglishNameKey = "اسم المالك";

            //string filePath = @"\\Temp\\AppointmentLetter.pdf";
            //filePath = Server.MapPath("~" + filePath);
            string filePath = Server.MapPath("~/Temp/AppointmentLetter.pdf");

            if (System.IO.File.Exists(filePath))
            {
                var sourceFileStream = System.IO.File.OpenRead(filePath);
                var outputStream = new MemoryStream();


                var pdf = new PdfDocument(new PdfReader(sourceFileStream), new PdfWriter(outputStream));
                PdfAcroForm form = PdfAcroForm.GetAcroForm(pdf, true);
                form.SetDefaultAppearance("/Helv 0 Tf 0 g");  // Use a Unicode-compatible font
                                    


                if (form != null)
                {
                    IDictionary<String, PdfFormField> fields = form.GetFormFields();



                    if (fields.TryGetValue(EnglishNameKey, out PdfFormField toSet))
                    {
                        string arabicText = "السلام عليكم"; // Your Arabic text



                        string arabic_Language_file = Server.MapPath("~/Content/Themes/CoreUI/fonts/LateefRegOT.ttf");
                        PdfFont arabicFont = PdfFontFactory.CreateFont(arabic_Language_file, PdfEncodings.IDENTITY_H);


                        toSet.SetFont(arabicFont).SetValue(arabicText, true).SetFontSize(18);
                        //     toSet.SetValue(arabicText, true).SetFontSize(18);
                        //   toSet.SetValue(arabicText);//.SetFontSize(18).SetFont(arabicFont);


                        // Set the text direction to right-to-left using the flag
                        toSet.SetFieldFlag(PdfFormField.VISIBLE, true);

                        // Set the text rendering mode for right-to-left direction
                        toSet.SetJustification(PdfFormField.ALIGN_RIGHT);


                        toSet.SetVisibility(PdfFormField.VISIBLE); // Ensure visibility is set to VISIBLE  
                        pdf.Close();
                        byte[] bytes = outputStream.ToArray();

                        //  return File(bytes, "application/pdf", "Edited.pdf");
                        return File(bytes, System.Net.Mime.MediaTypeNames.Application.Octet, "Edited.pdf");
                    }
                }

            }

            return View("", (object)"Source file not found");
        }
        */
        /*
        // Function to reverse the string
        public string ReverseString(string text)
        {
            char[] charArray = text.ToCharArray();
            Array.Reverse(charArray);
            return new string(charArray);
        }

        */

        //public ActionResult UpdatePdf()
        //{

        //    string filePath = Server.MapPath("~/Content/your_pdf_file.pdf");
        //    string outputPath = Server.MapPath("~/Content/modified_pdf_file.pdf");

        //    using (var existingFileStream = new FileStream(filePath, FileMode.Open))
        //    using (var newFileStream = new FileStream(outputPath, FileMode.Create))
        //    {
        //        var pdfReader = new PdfReader(existingFileStream);
        //        var pdfStamper = new PdfStamper(pdfReader, newFileStream);
        //        var formFields = pdfStamper.AcroFields;

        //        // Update form fields with dynamic data
        //        formFields.SetField("fieldName", "Dynamic Data Here");

        //        pdfStamper.FormFlattening = true;
        //        pdfStamper.Close();
        //        pdfReader.Close();
        //    }

        //    return RedirectToAction("Index");
        //}


        /*
        public ActionResult pdf_download1()
        {
            string EnglishNameKey = "topmostSubform[0].Page1[0].EnglishName[0]";
            string filePath = @"\\Temp\\AppointmentLetter.pdf";
            filePath = Server.MapPath("~" + filePath);

            if (System.IO.File.Exists(filePath))
            {
                using (var sourceFileStream = System.IO.File.OpenRead(filePath))
                {
                    var outputStream = new MemoryStream();
                    var pdf = new PdfDocument(new PdfReader(sourceFileStream), new PdfWriter(outputStream));
                    PdfAcroForm form = PdfAcroForm.GetAcroForm(pdf, false);

                    if (form != null)
                    {
                        IDictionary<String, PdfFormField> fields = form.GetFormFields();

                        if (fields.TryGetValue(EnglishNameKey, out PdfFormField toSet))
                        {
                            toSet.SetValue("Orak");
                            pdf.Close();
                            outputStream.Seek(0, SeekOrigin.Begin);
                            byte[] bytes = outputStream.ToArray();
                            outputStream.Dispose(); // Dispose the memory stream
                            return File(bytes, "application/pdf", "Edited.pdf");
                        }
                    }
                    pdf.Close(); // Close the PDF document if field not found
                }
            }

            return View("", (object)"Source file not found");
        }


        */
    }
}