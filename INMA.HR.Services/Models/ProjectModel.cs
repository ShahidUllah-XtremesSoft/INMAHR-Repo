using System;

namespace INMA.HR.Services
{

    public class ProjectModel
    {

        public int Id { get; set; }
        public int Project_Id { get; set; }
        public int HR_Employee_Id { get; set; }
        public int Section_Entity_Id { get; set; }
        public int Sub_Section_Entity_Id { get; set; }
        public int CreatedBy { get; set; }
        public int LoggedIn_EmployeeId { get; set; }
        public string Language { get; set; }


    }
}
