using System;
using System.Collections.Generic;
using System.Drawing;
using System.Web;
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
            var salaryMonth = string.Empty;
            decimal totalAdditionSum = 0, totalDeductionSum = 0, total_salary = 0;

            if (_salarySlipHeader != null)
            {
                txt_employee_number.Value = _salarySlipHeader.EmployeeNumber;
                txt_employeeName.Value = _salarySlipHeader.EmployeeName;
                txt_department.Value = _salarySlipHeader.Department;
                txt_employee_professionss.Value = _salarySlipHeader.Profession;
                salaryMonth = _salarySlipHeader.PayrollMonth;
                txt_month.Value = _salarySlipHeader.PayrollMonth;
                txt_salary_month.Value = salaryMonth;
                txt_year.Value = _salarySlipHeader.PayrollYear;
                txt_salary_slip_year.Value = _salarySlipHeader.PayrollYear;
                txt_slipDate.Value = DateTime.Now.ToShortDateString();
                txt_BasicSalary.Value = _salarySlipHeader.BasicSalary.ToString();

                total_salary = (decimal)_salarySlipHeader.BasicSalary;

                object_header.DataSource = _salarySlipHeader;

                string img = HttpContext.Current.Server.MapPath("~/Content/Images/logo.png");
                Image myImg = Image.FromFile(img);
                logo.Value = myImg;
                 //logo.Value = "~/Content/Images/logo.png";

            }
            if (_salarySlip_Additions != null)
            {
                object_additions.DataSource = _salarySlip_Additions;
                foreach (var item in _salarySlip_Additions)
                {
                    totalAdditionSum = totalAdditionSum + (decimal)item.Amount;
                }
                  
              //  decimal totalAdditionSumup = (total_salary + totalAdditionSum);
                txt_totalAddition_sum.Value = (total_salary + totalAdditionSum).ToString();

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