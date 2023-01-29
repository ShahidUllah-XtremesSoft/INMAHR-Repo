using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Reports.Models
{
    public class HR_Department
    {

        public int? Id { get; set; }
        public string NameEng { get; set; }
        public string NameArb { get; set; }
        public int? ParentId { get; set; }
        public bool? IsHR { get; set; }
        public int? OrderBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public bool? IsCompany { get; set; }
        public int? DepartmentType { get; set; }


    }

}