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
    public class EmployeesShortLeaveData
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
    public class EmployeesCancelLeaveData
    {

        public int Id { get; set; }
        public int RequestId { get; set; }
        public int RequestLeaveId { get; set; }
        public int StatusId { get; set; }
        public int CreatedBy { get; set; }
        public int LoggedInUserId { get; set; }
        public int LoggedInUserRoleId { get; set; }
        public int LoggedInUserDepartementId { get; set; }
        public string Language { get; set; }
        public string Status { get; set; }
        public string Comment { get; set; }
    }
    public class EmployeesCashInLeaveData
    {

        public int Id { get; set; }
        public int Days { get; set; }
        public int RequestLeaveId { get; set; }
        public string Date{ get; set; }
        public int StatusId { get; set; }
        public int CreatedBy { get; set; }
        public int LoggedInUserId { get; set; }
        public int LoggedInUserRoleId { get; set; }
        public int LoggedInUserDepartementId { get; set; }
        public string Language { get; set; }
        public string Status { get; set; }
        public string Comment { get; set; }
    }
}
