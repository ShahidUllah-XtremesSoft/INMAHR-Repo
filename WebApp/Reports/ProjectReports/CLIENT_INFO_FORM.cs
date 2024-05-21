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
    /// Summary description for CLIENT_INFO_FORM.
    /// </summary>
    public partial class CLIENT_INFO_FORM : Telerik.Reporting.Report
    {
        public CLIENT_INFO_FORM(string customerName)
        {
            //
            // Required for telerik Reporting designer support
            //
            InitializeComponent();

            string companyName = Resources.Global.lblInma;
            try
            {
                string img = HttpContext.Current.Server.MapPath("~/Content/Images/shjcBlue_logo.png");
                Image myImg = Image.FromFile(img);
                
 

                #region Page 2
                pg_2_logo_pictureBox.Value = myImg;
                pg_1_txt_customer_name.Value = customerName;
                #endregion

            }
            catch (System.Exception)
            {

                throw;
            }
        }
    }
}