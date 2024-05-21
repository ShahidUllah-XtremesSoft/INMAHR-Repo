using System;
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;
using Telerik.Reporting;
using Telerik.Reporting.Drawing;

namespace WebApp.Reports.ProjectReports
{
    /// <summary>
    /// Summary description for SEWA_CIVIL.
    /// </summary>
    public partial class SEWA_CIVIL_AR : Report
    {
        public SEWA_CIVIL_AR(string customerName, string arzNo, string muntaqa)
        {
            InitializeComponent();



            #region Page 1

            pg_1_txt_customer_name.Value = customerName;
            pg_1_txt_arz_raqam.Value = arzNo;
            pg_1_txt_muntaqa.Value = muntaqa;
            pg_1_txt_date.Value = DateTime.Now.ToString("dd-MMM-yyyy", System.Globalization.CultureInfo.InvariantCulture);


            #endregion


            #region Page 2
            pg_2_txt_customer_name.Value = customerName;
            pg_2_txt_date.Value = DateTime.Now.ToString("dd-MMM-yyyy", System.Globalization.CultureInfo.InvariantCulture);
            #endregion
            #region Page 3
            pg_3_txt_customer_name.Value = customerName;
            pg_3_txt_arz_raqam.Value = arzNo;
            pg_3_txt_muntaqa.Value = muntaqa;
            pg_3_txt_date.Value = DateTime.Now.ToString("dd-MMM-yyyy", System.Globalization.CultureInfo.InvariantCulture);
            #endregion


        }
    }
}