
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
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

    }
}