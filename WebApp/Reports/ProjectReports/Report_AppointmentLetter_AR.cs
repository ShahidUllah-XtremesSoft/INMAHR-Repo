using System;
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;
using Telerik.Reporting;
using Telerik.Reporting.Drawing;

namespace WebApp.Reports.ProjectReports
{
    
    public partial class Report_AppointmentLetter_AR : Report
    {
        public Report_AppointmentLetter_AR(string customerName, string arzNo, string muntaqa)
        {
            InitializeComponent();

            #region Page 1

            pg_1_txt_customer_name.Value = customerName;
            pg_1_footer_txt_customer_name.Value = customerName;
            pg_1_txt_arz_raqam.Value = arzNo;
            pg_1_txt_muntaqa.Value = muntaqa;

            #endregion
            
            #region Page 2

            pg_2_txt_customer_name.Value = customerName;
            pg_2_footer_txt_customer_name.Value = customerName;
            pg_2_txt_arz_raqam.Value = arzNo;
            pg_2_txt_muntaqa.Value = muntaqa;

            #endregion
            #region Page 3

            pg_3_txt_customer_name.Value = customerName;
            pg_footer_3_txt_customer_name.Value = customerName;
            pg_3_txt_arz_raqam.Value = arzNo;
            pg_3_txt_muntaqa.Value = muntaqa;

            #endregion
        }
    }
}