
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Web;
using WebApp.Reports.Models;

namespace WebApp.Reports.QuotationReports
{
    /// <summary>
    /// Summary description for TestReport.
    /// </summary>
    public partial class Quotation : Telerik.Reporting.Report
    {
        public Quotation(RPT_Company_Model _company, RPT_Project_Model _project, List<RPT_Quotation_Model> _quotationList)
        {
            //
            // Required for telerik Reporting designer support
            //
            InitializeComponent();

            if (_company != null)
            {
                txt_companyName.Value = _company.name;
                txt_company_email.Value = _company.email;
                txt_company_phoneno.Value = _company.phoneNo;
                //logo.Value = "~/UploadFile/" + _company.currentFileName;
                string img = HttpContext.Current.Server.MapPath("~/UploadFile/" + _company.currentFileName);
                Image myImg = Image.FromFile(img);
                logo.Value = myImg;

            }
            if (_project != null)
            {
                txt_NameEngQ.Value = _project.nameEngQ;
                txt_project.Value = _project.projectName;
                txt_areaa.Value = _project.area;
                txt_project_owner.Value = _project.owner;
                txt_plot.Value = _project.plotNo;
                txt_time_period.Value = _project.timePeriod;


            }
            if (_quotationList != null)
            {
                objectDataSource1.DataSource = _quotationList;
                
            }

        }
    }
}