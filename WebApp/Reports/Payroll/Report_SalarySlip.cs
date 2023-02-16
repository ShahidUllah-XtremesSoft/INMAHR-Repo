using System.Collections.Generic;
using Telerik.Reporting;
using WebApp.Reports.Models;

namespace WebApp.Reports.Payroll
{
    /// <summary>
    /// Summary description for Report_SalarySlip.
    /// </summary>
    public partial class Report_SalarySlip : Report
    {
        public Report_SalarySlip(RPT_Header _salarySlipHeader, List<RPT_Additions> _salarySlip_Additions, List<RPT_Deductions> _salarySlip_Deductions)
        {
            //
            // Required for telerik Reporting designer support
            //
            InitializeComponent();

            decimal totalAdditionSum = 0, totalDeductionSum = 0, total_salary = 0;

            if (_salarySlipHeader != null)
            {
                txt_employeeName.Value = _salarySlipHeader.EmployeeName;
                txt_employee_professionss.Value = _salarySlipHeader.Profession;
                txt_month.Value = _salarySlipHeader.PayrollMonth;
                txt_year.Value = _salarySlipHeader.PayrollYear;
                txt_BasicSalary.Value = _salarySlipHeader.BasicSalary.ToString();
                total_salary = (decimal)_salarySlipHeader.BasicSalary;

                object_header.DataSource = _salarySlipHeader;

                //logo.Value = "~/UploadFile/" + _company.currentFileName;
                //  string img = HttpContext.Current.Server.MapPath("~/UploadFile/" + _company.currentFileName);
                //  Image myImg = Image.FromFile(img);
                //  logo.Value = myImg;

            }
            if (_salarySlip_Additions != null)
            {
                object_additions.DataSource = _salarySlip_Additions;
                foreach (var item in _salarySlip_Additions)
                {
                    totalAdditionSum = totalAdditionSum + (decimal)item.Amount;
                }
                txt_totalAddition_sum.Value = totalAdditionSum.ToString();

            }
            if (_salarySlip_Deductions != null)
            {
                object_deductions.DataSource = _salarySlip_Deductions;
                foreach (var item in _salarySlip_Deductions)
                {
                    totalDeductionSum = totalDeductionSum + (decimal)item.DeductionAmount;
                }
                txt_totalDeductions_sum.Value = totalDeductionSum.ToString();

            }

            txt_gross_salary.Value = (totalAdditionSum + total_salary - totalDeductionSum).ToString();
        }
    }
}