using Telerik.Reporting;
using Telerik.Reporting.Processing;

namespace WebApp.Reports.HR_Reports
{
    /// <summary>
    /// Summary description for TestReport.
    /// </summary>
    public partial class TestReport : Telerik.Reporting.Report
    {
        public TestReport(object departmentList)
        {
            //
            // Required for telerik Reporting designer support
            //
            InitializeComponent();

            //
            // TODO: Add any constructor code after InitializeComponent call
            //
            departmentList = HR_Department_GetAll.DataSource;
           

        //    InstanceReportSource instanceReportSource = new InstanceReportSource();
        //    instanceReportSource.ReportDocument = new TestReport(departmentList);

          //  instanceReportSource.Parameters.Add("Language", "en-US");   // Assign Command parameters 
          //  instanceReportSource.Parameters.Add(new Telerik.Reporting.Parameter("Type", "123"));

            /*
            ReportProcessor reportProcessor = new ReportProcessor();
            //RenderingResult result = reportProcessor.RenderReport("PDF", (ReportSource)DepartmentList, null);
              RenderingResult result = reportProcessor.RenderReport("PDF", new TestReport(departmentList), null);
          //  RenderingResult result = reportProcessor.RenderReport("PDF", instanceReportSource, null);

            
            var reportName = result.DocumentName + "." + result.Extension; ;
            // var reportName = "Telerik.Reporting.Report.WebApp.Reports.HR-Reports";
            //     var reportName = "Telerik.Reporting.Configuration.ReportingConfigurationSection, Telerik.Reporting";

            // Obtain the settings of the default printer
            System.Drawing.Printing.PrinterSettings printerSettings
                = new System.Drawing.Printing.PrinterSettings();

            // The standard print controller comes with no UI
            System.Drawing.Printing.PrintController standardPrintController =
                new System.Drawing.Printing.StandardPrintController();

            //// Print the report using the custom print controller
            //Telerik.Reporting.Processing.ReportProcessor reportProcessor
            //    = new Telerik.Reporting.Processing.ReportProcessor();

            reportProcessor.PrintController = standardPrintController;

            Telerik.Reporting.TypeReportSource typeReportSource =
                new Telerik.Reporting.TypeReportSource();

            // reportName is the Assembly Qualified Name of the report
            typeReportSource.TypeName = reportName;

            reportProcessor.PrintReport(typeReportSource, printerSettings);

            */
        }
    }
}