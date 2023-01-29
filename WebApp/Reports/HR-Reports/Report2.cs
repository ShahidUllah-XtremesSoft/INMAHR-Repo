using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;
using Telerik.Reporting;
using Telerik.Reporting.Drawing;
using WebApp.Reports.Models;

namespace WebApp.Reports.HR_Reports
{
    /// <summary>
    /// Summary description for Report2.
    /// </summary>
    public partial class Report2 : Telerik.Reporting.Report
    {
        public Report2(object list)
        {
            //
            // Required for telerik Reporting designer support
            //
            InitializeComponent();

           
              //
              // TODO: Add any constructor code after InitializeComponent call
              //
              
            
        
      //  var result = this.objectDataSource1.DataSource = list;
    }
}
}