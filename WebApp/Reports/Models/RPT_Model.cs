using System;
using System.Collections.Generic;

namespace WebApp.Reports.Models

{
    public class RPT_Model
    {

        public virtual RPT_Project_Model rpt_project_model { get; set; }
        public IEnumerable<RPT_Quotation_Model> rpt_quotation_model { get; set; }
        public virtual RPT_Company_Model rpt_company_model { get; set; }
    }
    public class RPT_Project_Model
    {

        // PROJECT TABLE FIELD
        //public int? projectId { get; set; }
        //public string projectNameEng { get; set; }
        //public string projectNameArb { get; set; }
        public string projectName { get; set; }
        public string nameEngQ { get; set; }
        public string owner { get; set; }
        public string area { get; set; }
        public string plotNo { get; set; }
        //public string projectNo { get; set; }
        public string timePeriod { get; set; }
    }

    public class RPT_Quotation_Model
    {

        // QUOTATION TABLE FIELD
        public int QUT_Quotation_Id { get; set; }
        public decimal? OrignalPrice { get; set; }
        public string OrignalQuantity { get; set; }
        public decimal? CalculatedPrice { get; set; }
        public decimal? CompanySubmittedPrice { get; set; }
        public string CompanySubmittedQuantity { get; set; }
        public string Unit { get; set; }
        public int? CategoryID { get; set; }
        public string CategoryName { get; set; }
        public string CategoryNameArb { get; set; }
        public string CategoryAndTypeName { get; set; }
        public int SETUP_CategoryType_Id { get; set; }
        public string CategoryTypeName { get; set; }
        public string CategoryTypeNameArb { get; set; }
        public string OrignalStatus { get; set; }
        //public int? CMPY_Company_Id { get; set; }
        public string CompanyStatus { get; set; }
        public string Remarks { get; set; }
        public decimal? TotalQuantityDifference { get; set; }
        public string className { get; set; }
        public string AppliedPercentage { get; set; }
        public string AppliedPercentageTotalSum { get; set; }
        public bool? isCalculated { get; set; }
        public string appendField { get; set; }
        public string Name { get; set; }

    }
    public class RPT_Company_Model
    {



        public int? id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string duration { get; set; }
        public string email { get; set; }
        public string phoneNo { get; set; }
        public string mobileNo { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
        public string location { get; set; }
        public string timeAgo { get; set; }
        public string currentFileName { get; set; }
        public string createdDate { get; set; }



    }
}
