﻿ 

namespace INMA.HR.Services
{

    public class AppraisalModel
    {

        public int? Id { get; set; }
        public string QuestionId { get; set; }
        public string Answer { get; set; }
        public int Employee_Id { get; set; }
        public int HR_Department_Manager_Id { get; set; }
        public int HR_Department_Id { get; set; }
        public string Year { get; set; }
      


    }
}
