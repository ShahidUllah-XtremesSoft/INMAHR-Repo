
using iText.Forms;
using iText.Forms.Fields;
using iText.Kernel.Pdf;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Resources;
using System.Text.Json;
using System.Threading;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

using Telerik.Reporting;
using Telerik.Reporting.Processing;
using WebApp.Reports;
using WebApp.Reports.Models;
using WebApp.Reports.Payroll;
using WebApp.Reports.ProjectReports;

namespace WebApp.Controllers
{
    public class ReportController : Controller
    {

        XtremeController xtremeController = new XtremeController();
        CastleWindsor.Factory.Core.Request request = new CastleWindsor.Factory.Core.Request();
        ReportProcessor reportProcessor = new ReportProcessor();

        // Report available extensions =PDF,XLS,CSV,RTF,XPS,DOCS,DOCX,XLSX,PPTX,MHTML,IMAGE,IMAGEInteractive,HTML5,XAML,
        InstanceReportSource instanceReportSource = new InstanceReportSource();



        public ActionResult SalaryReceipt(string type, string value, string reportExtension = "PDF")
        {

            request.Type = type;
            request.Value = value;

            var db_response = xtremeController.Process(request);
            dynamic _db_response = JsonConvert.DeserializeObject(db_response.Value.ToString());


            // using System.Text.Json;

            RPT_Header _salarySlipHeader = new RPT_Header();
            List<RPT_Additions> _salarySlip_Additions = new List<RPT_Additions>();
            List<RPT_Deductions> _salarySlip_Deductions = new List<RPT_Deductions>();


            var db_data = System.Text.Json.JsonSerializer.Deserialize<JsonElement[]>(_db_response.ToString());
            var totalRecord = ((JsonElement[])db_data).Count();
            for (int i = 0; i < totalRecord; i++)
            {
                JArray newObject = JArray.Parse(Convert.ToString(db_data[i]));

                foreach (JObject item in newObject.Children<JObject>())
                {
                    if (item["employeeID"] != null)
                    {

                        _salarySlipHeader.EmployeeID = Convert.ToInt32(item["employeeID"]);
                        _salarySlipHeader.EmployeeNumber = item["employeeNumber"].ToString();
                        _salarySlipHeader.EmployeeName = item["employeeName"].ToString();
                        _salarySlipHeader.BasicSalary = Convert.ToDecimal(item["basicSalary"]);
                        _salarySlipHeader.Profession = item["profession"].ToString();
                        _salarySlipHeader.Department = item["department"].ToString();
                        _salarySlipHeader.PayrollMonth = item["payrollMonth"].ToString();
                        _salarySlipHeader.PayrollYear = item["payrollYear"].ToString();

                    }

                    else if (item["status"].ToString() == "PayrollAddition" || item["status"].ToString() == "RecusiveAddition")
                    {

                        RPT_Additions _additionList = new RPT_Additions();


                        _additionList.AllowanceType = item["allowanceType"].ToString();
                        _additionList.Amount = Convert.ToDecimal(item["amount"]);
                        _additionList.BasicSalary = Convert.ToDecimal(item["basicSalary"].ToString());
                        _additionList.TableOrder = Convert.ToInt32(item["tableOrder"]);
                        _salarySlip_Additions.Add(_additionList);

                    }
                    else if (item["status"].ToString() == "PayrollDeduction" || item["status"].ToString() == "RecusiveDeduction")
                    {
                        RPT_Deductions _deductionList = new RPT_Deductions();


                        _deductionList.DeductionType = item["deductionType"].ToString();
                        _deductionList.DeductionAmount = Convert.ToDecimal(item["deductionAmount"]);
                        _deductionList.BasicSalary = Convert.ToDecimal(item["basicSalary"].ToString());
                        _deductionList.TableOrder = Convert.ToInt32(item["tableOrder"]);
                        _salarySlip_Deductions.Add(_deductionList);

                    }
                }
            }





            //instanceReportSource.Parameters.Add("Language", "en-US");   // Assign Command parameters 
            //instanceReportSource.Parameters.Add(new Telerik.Reporting.Parameter("Id", "123"));

            instanceReportSource.ReportDocument = new Report_SalarySlip(_salarySlipHeader, _salarySlip_Additions, _salarySlip_Deductions);


            // specify the output format of the produced image.
            var deviceInfo = new Hashtable();
            deviceInfo["OutputFormat"] = reportExtension;

            RenderingResult result = reportProcessor.RenderReport(reportExtension, instanceReportSource, deviceInfo);
            string fileName = result.DocumentName + "." + reportExtension;


            Response.Clear();
            Response.ContentType = result.MimeType;
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Expires = -1;
            Response.Buffer = true;

            Response.AddHeader("Content-Disposition", string.Format("{0};FileName=\"{1}\"", "attachment", fileName));
            Response.BinaryWrite(result.DocumentBytes);
            Response.End();

            var reportUrl = string.Format("/api/reports/{0}", result.DocumentName);
            var testObject = File(result.DocumentBytes, "application/pdf", fileName);
            //  return View(0);// File(result.DocumentBytes, "application/pdf", fileName);
            return Redirect(reportUrl);
        }



        public ActionResult Company_Quotation(string type, string value, string reportExtension = "PDF")
        {
            request.Type = type;
            request.Value = value;

            var db_response = xtremeController.Process(request);
            dynamic _db_response = JsonConvert.DeserializeObject(db_response.Value.ToString());


            // using System.Text.Json;

            RPT_Company_Model _company = new RPT_Company_Model();
            RPT_Project_Model _project = new RPT_Project_Model();

            List<RPT_Quotation_Model> _quotationList = new List<RPT_Quotation_Model>();

            var db_data = System.Text.Json.JsonSerializer.Deserialize<JsonElement[]>(_db_response.ToString());
            var totalRecord = ((JsonElement[])db_data).Count();
            for (int i = 0; i < totalRecord; i++)
            {
                JArray newObject = JArray.Parse(Convert.ToString(db_data[i]));

                foreach (JObject item in newObject.Children<JObject>())
                {
                    if (item["projectName"] != null)
                    {

                        _project.projectName = item["projectName"].ToString();
                        _project.nameEngQ = item["nameEngQ"].ToString();
                        _project.owner = item["owner"].ToString();
                        _project.area = item["area"].ToString();
                        _project.plotNo = item["plotNo"].ToString();
                        _project.timePeriod = item["timePeriod"].ToString();

                    }
                    else if (item["isCompany"] != null)
                    {
                        _company.id = (int)item["id"];
                        _company.name = item["name"].ToString();
                        _company.description = item["description"].ToString();
                        _company.duration = item["duration"].ToString();
                        _company.email = item["email"].ToString();
                        _company.phoneNo = item["phoneNo"].ToString();
                        _company.mobileNo = item["mobileNo"].ToString();
                        _company.location = item["location"].ToString();
                        _company.currentFileName = item["currentFileName"].ToString();
                        _company.createdDate = item["createdDate"].ToString();

                    }
                    else
                    {
                        RPT_Quotation_Model list = new RPT_Quotation_Model();
                        //_quotationList.QUT_Quotation_Id = (int)item["id"];
                        list.OrignalPrice = (decimal?)item["orignalPrice"];
                        list.OrignalQuantity = (string)item["orignalQuantity"];
                        list.CalculatedPrice = (decimal?)item["calculatedPrice"];
                        list.CompanySubmittedPrice = (decimal?)item["companySubmittedPrice"];
                        list.CompanySubmittedQuantity = (string)item["companySubmittedQuantity"];
                        list.Unit = (string)item["unit"];
                        list.CategoryID = (int)item["categoryID"];
                        list.CategoryName = (string)item["categoryName"];
                        list.CategoryNameArb = (string)item["categoryNameArb"];
                        list.CategoryAndTypeName = (string)item["categoryAndTypeName"];
                        //   list.SETUP_CategoryType_Id = (int)item["setup_CategoryType_Id"];
                        list.CategoryTypeName = (string)item["categoryTypeName"];
                        list.CategoryTypeNameArb = (string)item["categoryTypeNameArb"];
                        list.OrignalStatus = (string)item["orignalStatus"];
                        //   list.CMPY_Company_Id                =   (string)item["CMPY_Company_Id"];
                        list.CompanyStatus = (string)item["companyStatus"];
                        list.Remarks = (string)item["remarks"];
                        list.TotalQuantityDifference = (decimal?)item["totalQuantityDifference"];
                        list.className = (string)item["className"];
                        list.AppliedPercentage = (string)item["appliedPercentage"];
                        list.AppliedPercentageTotalSum = (string)item["appliedPercentageTotalSum"];
                        list.isCalculated = (bool)item["isCalculated"];
                        //    list.appendField = (string)item["appendField"];
                        list.Name = (string)item["name"];

                        _quotationList.Add(list);

                    }
                }
            }






            // Report available extensions =PDF,XLS,CSV,RTF,XPS,DOCS,DOCX,XLSX,PPTX,MHTML,IMAGE,IMAGEInteractive,HTML5,XAML,
            InstanceReportSource instanceReportSource = new InstanceReportSource();
            //  instanceReportSource.ReportDocument = new Quotation(_company,_project,_quotationList);

            //instanceReportSource.Parameters.Add("Language", "en-US");   // Assign Command parameters 
            //instanceReportSource.Parameters.Add(new Telerik.Reporting.Parameter("Id", "123"));


            ReportProcessor reportProcessor = new ReportProcessor();

            // specify the output format of the produced image.
            var deviceInfo = new Hashtable();
            deviceInfo["OutputFormat"] = reportExtension;

            RenderingResult result = reportProcessor.RenderReport(reportExtension, instanceReportSource, deviceInfo);
            string fileName = result.DocumentName + "." + reportExtension;


            Response.Clear();
            Response.ContentType = result.MimeType;
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Expires = -1;
            Response.Buffer = true;

            Response.AddHeader("Content-Disposition", string.Format("{0};FileName=\"{1}\"", "attachment", fileName));




            Response.BinaryWrite(result.DocumentBytes);
            Response.End();
            var reportUrl = string.Format("/api/reports/{0}", result.DocumentName);
            var testObject = File(result.DocumentBytes, "application/pdf", fileName);
            //  return View(0);// File(result.DocumentBytes, "application/pdf", fileName);
            return Redirect(reportUrl);





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






        #region PROJECT REPORTS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        /*
        public ActionResult Generate_Initial_Files(string customerName, string arzNo, string muntaqa, string Language, string reportExtension = "PDF")
        {


            arzNo = arzNo.Replace("\"", "");
            muntaqa = muntaqa.Replace("\"", "");
            Language = Language.Replace("\"", "");

            instanceReportSource.ReportDocument = new Report_AppointmentLetter_AR(customerName, arzNo, muntaqa);


            // specify the output format of the produced image.
            var deviceInfo = new Hashtable();
            deviceInfo["OutputFormat"] = reportExtension;
            RenderingResult result = reportProcessor.RenderReport(reportExtension, instanceReportSource, deviceInfo);
            //  string fileName = result.DocumentName + "." + reportExtension;
            string fileName = "Appointment Letter رسالة تكليف" + "." + reportExtension;


            Response.Clear();
            Response.ContentType = result.MimeType;
            Response.Cache.SetCacheability(HttpCacheability.Private);
            //  Response.Expires = -1;
            // Response.Buffer = true;

            Response.AddHeader("Content-Disposition", string.Format("{0};FileName=\"{1}\"", "attachment", fileName));
            Response.BinaryWrite(result.DocumentBytes);
            Response.End();

            var reportUrl = string.Format("/api/reports/{0}", result.DocumentName);
            // var testObject = File(result.DocumentBytes, "application/pdf", fileName);
            //   return File(reportUrl);
            return RedirectToAction("SEWA_CIVIL_PDF", new { customerName = customerName, arzNo = arzNo, muntaqa = muntaqa, Language = Language });
        }


       



        public ActionResult SEWA_CIVIL_PDF(object reportUrl, string customerName, string arzNo, string muntaqa, string Language, string reportExtension = "PDF")
        {


            arzNo = arzNo.Replace("\"", "");
            muntaqa = muntaqa.Replace("\"", "");
            Language = Language.Replace("\"", "");

            instanceReportSource.ReportDocument = new SEWA_CIVIL_AR(customerName, arzNo, muntaqa);



            var deviceInfo = new Hashtable();
            deviceInfo["OutputFormat"] = reportExtension;
            RenderingResult result = reportProcessor.RenderReport(reportExtension, instanceReportSource, deviceInfo);
            //  string fileName = result.DocumentName + "." + reportExtension;
            string fileName = "SEWA-CIVIL وثائق سيوا + الدفاع المدني" + "." + reportExtension;


            Response.Clear();
            Response.ContentType = result.MimeType;
            Response.Cache.SetCacheability(HttpCacheability.Private);
            Response.Expires = -1;
            Response.Buffer = true;

            Response.AddHeader("Content-Disposition", string.Format("{0};FileName=\"{1}\"", "attachment", fileName));
            Response.BinaryWrite(result.DocumentBytes);
            Response.End();

            var reportUrll = string.Format("/api/reports/{0}", result.DocumentName);
            return Redirect(reportUrll);
            //  return File(result.DocumentBytes, result.MimeType, fileName);
        }

        */

        //------------------------------------------------------




        public ActionResult Generate_Initial_Files(string customerName, string arzNo, string muntaqa, string Language, string projectNo, string employeeName, string reportExtension = "PDF")
        {


            arzNo = arzNo.Replace("\"", "");
            muntaqa = muntaqa.Replace("\"", "");
            Language = Language.Replace("\"", "");

            var file_fullname = string.Concat(customerName, "_", arzNo, "_", muntaqa, "_", DateTime.Now.ToString("dd-MMM-yyyy", System.Globalization.CultureInfo.InvariantCulture));
            var deviceInfo = new Hashtable();
            deviceInfo["OutputFormat"] = reportExtension;


            //------------ APPOINTMENT LETTER REPORT
            instanceReportSource.ReportDocument = new Report_AppointmentLetter_AR(customerName, arzNo, muntaqa);
            RenderingResult result_appointmentLetter = reportProcessor.RenderReport(reportExtension, instanceReportSource, deviceInfo);
            string fileName_appointmentLetter = "Appointment Letter رسالة تكليف" + "." + reportExtension;
            MemoryStream appointmentLetter = new MemoryStream(result_appointmentLetter.DocumentBytes);
            //---------------- END



            //------------ SEWA-CIVIL  REPORT
            instanceReportSource.ReportDocument = new SEWA_CIVIL_AR(customerName, arzNo, muntaqa);
            RenderingResult result_SEWA_CIVIL = reportProcessor.RenderReport(reportExtension, instanceReportSource, deviceInfo);
            string fileName_SEWA_CIVIL = "SEWA-CIVIL وثائق سيوا + الدفاع المدني" + "." + reportExtension;
            MemoryStream SEWA_CIVIL = new MemoryStream(result_SEWA_CIVIL.DocumentBytes);
            //---------------- END

            //------------ CIVIL-CONTRACT  REPORT

            instanceReportSource.ReportDocument = new CIVIL_CONTRACT_AR(customerName, projectNo, arzNo, muntaqa, employeeName);
            RenderingResult result_CIVIL_CONTRACT = reportProcessor.RenderReport("xlsx", instanceReportSource, deviceInfo);
            string fileName_CIVIL_CONTRACT = "CIVIL_CONTRACT عقد الدفاع المدني " + ".xlsx";
            MemoryStream CIVIL_CONTRACT = new MemoryStream(result_CIVIL_CONTRACT.DocumentBytes);
            //---------------- END

            //------------ CLIENT INFORMATION FORM  REPORT

            instanceReportSource.ReportDocument = new CLIENT_INFO_FORM(customerName);
            RenderingResult result_CLIENT_INFO = reportProcessor.RenderReport("xlsx", instanceReportSource, deviceInfo);
            string fileName_CLIENT_INFO = "CLIENT INFORMATION عقد الدفاع المدني " + ".xlsx";
            MemoryStream CLIENT_INFO = new MemoryStream(result_CLIENT_INFO.DocumentBytes);
            //---------------- END


            //------------ CLIENT STATIC FORM FILE 
            string staticPdfFilePath = Server.MapPath("~/Temp/form.pdf");
            string outputPdfFilePath = Server.MapPath("~/Temp/form_output.pdf");

            MemoryStream staticPdfStream = null;
            if (System.IO.File.Exists(staticPdfFilePath))
            {



                using (PdfReader reader = new PdfReader(staticPdfFilePath))
                {
                    using (PdfWriter writer = new PdfWriter(outputPdfFilePath))
                    {
                        using (PdfDocument pdf = new PdfDocument(reader, writer))
                        {
                            try
                            {

                                PdfAcroForm form = PdfAcroForm.GetAcroForm(pdf, true);

                                // Get all field names in the form
                                IList<string> fieldNames = form.GetFormFields().Keys.ToList();
                                string customerNameFieldName = fieldNames[27];
                                PdfFormField customerNameField = form.GetField(customerNameFieldName);


                                string fieldValue = customerNameField.GetValueAsString();
                                // string fieldValue = customerNameField.SetValue("محمد بوفارس").ToString();

                                string fieldValuee = customerNameField.SetValue(customerName).ToString();
                                form.FlattenFields();
                            }
                            catch (Exception ex)
                            {

                                Console.WriteLine(ex);
                            }
                        }
                    }
                }

                byte[] fileBytes = System.IO.File.ReadAllBytes(outputPdfFilePath);
                staticPdfStream = new MemoryStream(fileBytes);

            }




            //---------------- END











            MemoryStream zipMemoryStream = new MemoryStream();
            using (ZipArchive archive = new ZipArchive(zipMemoryStream, ZipArchiveMode.Create, true))
            {

                var firstEntry = archive.CreateEntry(fileName_appointmentLetter);
                using (var entryStream = firstEntry.Open())
                {
                    appointmentLetter.Seek(0, SeekOrigin.Begin);
                    appointmentLetter.CopyTo(entryStream);
                }


                var secondEntry = archive.CreateEntry(fileName_SEWA_CIVIL);
                using (var entryStream = secondEntry.Open())
                {
                    SEWA_CIVIL.Seek(0, SeekOrigin.Begin);
                    SEWA_CIVIL.CopyTo(entryStream);
                }

                var thirdEntry = archive.CreateEntry(fileName_CIVIL_CONTRACT);
                using (var entryStream = thirdEntry.Open())
                {
                    CIVIL_CONTRACT.Seek(0, SeekOrigin.Begin);
                    CIVIL_CONTRACT.CopyTo(entryStream);
                }

                var fourthEntry = archive.CreateEntry(fileName_CLIENT_INFO);
                using (var entryStream = fourthEntry.Open())
                {
                    CLIENT_INFO.Seek(0, SeekOrigin.Begin);
                    CLIENT_INFO.CopyTo(entryStream);
                }
                var staticFormPDF_Entry = archive.CreateEntry("Form.Pdf");
                using (var entryStream = staticFormPDF_Entry.Open())
                {
                    staticPdfStream.Seek(0, SeekOrigin.Begin);
                    staticPdfStream.CopyTo(entryStream);
                }

            }

            // Reset memory streams' positions
            appointmentLetter.Seek(0, SeekOrigin.Begin);
            SEWA_CIVIL.Seek(0, SeekOrigin.Begin);
            CIVIL_CONTRACT.Seek(0, SeekOrigin.Begin);
            CLIENT_INFO.Seek(0, SeekOrigin.Begin);
            staticPdfStream.Seek(0, SeekOrigin.Begin);

            // Set response headers for downloading the zip file
            Response.Clear();
            Response.ContentType = "application/zip";
            Response.AddHeader("Content-Disposition", "attachment; filename=" + file_fullname + ".zip");

            // Write the zip file to the response
            zipMemoryStream.Seek(0, SeekOrigin.Begin);
            zipMemoryStream.CopyTo(Response.OutputStream);
            Response.End();

            // Clean up resources
            appointmentLetter.Dispose();
            SEWA_CIVIL.Dispose();
            CIVIL_CONTRACT.Dispose();
            zipMemoryStream.Dispose();

            var reportUrll = string.Format("/api/reports/{0}", "");
            return Redirect(reportUrll);
        }
        #endregion


        /*
        public ActionResult GetFillablePDF()
        {




            var filePath = Server.MapPath("~/Temp/form.pdf");
            var outputPath = Server.MapPath("~/Temp/updated_form.pdf");

            try
            {
                using (PdfReader reader = new PdfReader(filePath))
                {
                    using (PdfWriter writer = new PdfWriter(outputPath))
                    {
                        using (PdfDocument pdf = new PdfDocument(reader, writer))
                        {
                            PdfAcroForm form = PdfAcroForm.GetAcroForm(pdf, true);

                            // Get all field names in the form
                            IList<string> fieldNames = form.GetFormFields().Keys.ToList(); 
                            string customerNameFieldName = fieldNames[27];  
                            PdfFormField customerNameField = form.GetField(customerNameFieldName);


                            string fieldValue = customerNameField.GetValueAsString();
                            // string fieldValue = customerNameField.SetValue("محمد بوفارس").ToString();
                            string fieldValuee = customerNameField.SetValue("Mati uuu").ToString();



                            //foreach (var field in form.GetFormFields().Values)
                            //{
                            //    field.GetWidgets()[0].SetModified();
                            //}
                            form.FlattenFields();
                        }
                    }
                }

                byte[] fileBytes = System.IO.File.ReadAllBytes(outputPath);
                return File(fileBytes, "application/pdf", "UpdatedReport.pdf");
            }
            catch (Exception ex)
            {
                // Log the exception for troubleshooting
                Console.WriteLine("Error: " + ex.Message);
                // Optionally handle the error or return an error response
                return Redirect("An error occurred while processing the PDF.");
            }
        }
        */


    }
}