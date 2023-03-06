using System;
using System.Collections.Generic;

namespace WebApp.Reports.Models

{
    public class RPT_SalarySlip_Model
    {

        public virtual RPT_Header rpt_Header { get; set; }
        public IEnumerable<RPT_Additions> rpt_Additions { get; set; }
        public IEnumerable<RPT_Deductions> rpt_Deductions { get; set; }
    }
    public class RPT_Header
    {

        public int EmployeeID { get; set; }
        public string EmployeeNumber { get; set; }
        public string EmployeeName { get; set; }
        public decimal? BasicSalary { get; set; }
        public string Profession { get; set; }
        public string Department { get; set; }
        public string PayrollMonth { get; set; }
        public string PayrollYear { get; set; }
    }
    public class RPT_Additions
    {
        public string AllowanceType { get; set; }
        public decimal? Amount { get; set; }
        public int TableOrder { get; set; }
        public decimal? BasicSalary { get; set; }
    }
    public class RPT_Deductions
    {
        public string DeductionType { get; set; }
        public decimal? DeductionAmount { get; set; }
        public int TableOrder { get; set; }
        public decimal? BasicSalary { get; set; }
    }

}
