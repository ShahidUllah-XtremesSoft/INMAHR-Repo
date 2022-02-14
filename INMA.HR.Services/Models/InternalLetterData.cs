using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services
{

    public class InternalLetterData
    {

        public int LetterId { get; set; }
        public int C_Employee_InternalLetterMultiple_Id { get; set; }
        public string LetterNumber { get; set; }
        public DateTime LetterDate { get; set; }

        public int EmployeeId { get; set; }
        public int DepartmentId { get; set; }
        public int EmployeeInternalLetterRoleId { get; set; }
        public int CreatedBy { get; set; }
        public string Language { get; set; }
        public int SignedBy { get; set; }
        public int IsRead { get; set; }     
        public int IsImportant { get; set; }
        public string LetterStatus { get; set; }

    }
}
