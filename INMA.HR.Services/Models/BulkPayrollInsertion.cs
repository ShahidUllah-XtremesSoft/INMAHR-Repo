using System;

namespace INMA.HR.Services
{

    public class BulkPayrollInsertion
    {

        public int? PayrollID { get; set; }
        public int? EmployeeID { get; set; }
        public string PayrollMonth { get; set; }
        public string PayrollYear { get; set; }
        public decimal? BasicSalary { get; set; }
        public decimal? Grosssalary { get; set; }
        public decimal? Totaladdation { get; set; }
        public decimal? TotalDeduction { get; set; }
        public int? Totalpresent { get; set; }
        public int? TotalAbsent { get; set; }
        public int? Totalleave { get; set; }
        

    }
}
