using System;
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;
using Telerik.Reporting;
using Telerik.Reporting.Drawing;
using Telerik.Reporting.Processing;

namespace WebApp.Reports.HR_Reports
{
    /// <summary>
    /// Summary description for Report1.
    /// </summary>
    public partial class Report1 : Telerik.Reporting.Report
    {
        public Report1()
        {
            //
            // Required for telerik Reporting designer support
            //
            InitializeComponent();

            //
            // TODO: Add any constructor code after InitializeComponent call
            //

            //departmentList = HR_Department_GetAll;
            //  ReportProcessor reportProcessor = new ReportProcessor();
            //RenderingResult result = reportProcessor.RenderReport("PDF", (ReportSource)DepartmentList, null);
            //RenderingResult result = reportProcessor.RenderReport("PDF",null, null);
            /*
            Response.Clear();
            Response.ContentType = result.MimeType;
            */

        }
    }
}