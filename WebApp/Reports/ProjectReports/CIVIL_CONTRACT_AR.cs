using System;
using System.ComponentModel;
using System.Drawing;
using System.Web;
using System.Windows.Forms;
using Telerik.Reporting;
using Telerik.Reporting.Drawing;

namespace WebApp.Reports.ProjectReports
{
    /// <summary>
    /// Summary description for CIVIL_CONTRACT_AR.
    /// </summary>
    public partial class CIVIL_CONTRACT_AR : Telerik.Reporting.Report
    {
        public CIVIL_CONTRACT_AR(string customerName, string projectNo, string arzNo, string muntaqa, string employeeName)
        {

            InitializeComponent();

            string companyName = Resources.Global.lblInma;
            try
            {
              //  string img = HttpContext.Current.Server.MapPath("~/Content/Images/logo.png");
                string img = HttpContext.Current.Server.MapPath("~/Content/Images/shjcBlue_logo.png");
                Image myImg = Image.FromFile(img);
                pg_1_logo_pictureBox.Value = myImg;
           

                #region Page 1


                pg_1_txt_companyName.Value = companyName;
                pg_1_last_txt_companyName.Value = companyName;

                pg_1_txt_customer_name.Value = customerName;
                pg_1_txt_raqam_al_mashroo.Value = projectNo;
                pg_1_txt_employee_name.Value = employeeName;


                pg_1_txt_date.Value = DateTime.Now.ToString("dd-MMM-yyyy", System.Globalization.CultureInfo.InvariantCulture);

                #endregion
            
               

            }
            catch (System.Exception)
            {

                throw;
            }
        }
    }
}