using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INMA.HR.Services
{
    public class EmployeeRequestData
    {

        public int Id { get; set; }
        public int LeaveTypeId { get; set; }
        public int StatusId { get; set; }
        public int CreatedBy { get; set; }
        public int LoggedInUserId { get; set; }
        public int LoggedInUserRoleId { get; set; }
        public int LoggedInUserDepartementId { get; set; }
        public string Language { get; set; }
    }
    public class EmployeeRequestLetterData
    {

        public int Id { get; set; }
        public int LetterTypeId { get; set; }
        public int StatusId { get; set; }
        public int CreatedBy { get; set; }
        public int LoggedInUserId { get; set; }
        public int LoggedInUserRoleId { get; set; }
        public int LoggedInUserDepartementId { get; set; }
        public string Language { get; set; }
    }
}
