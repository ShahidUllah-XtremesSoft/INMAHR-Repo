using System;

namespace INMA.HR.Services
{

    public class RosterAssociationModel
    {

        public int? Id { get; set; }
        public string Sunday { get; set; }
        public string Monday { get; set; }
        public string Tuesday { get; set; }
        public string Wednesday { get; set; }
        public string Thursday { get; set; }
        public string Friday { get; set; }
        public string Saturday { get; set; }
        public string DefaultTime { get; set; }
        public int HR_Employee_Id { get; set; }
        public int HR_Department_Id { get; set; }


    }
}
