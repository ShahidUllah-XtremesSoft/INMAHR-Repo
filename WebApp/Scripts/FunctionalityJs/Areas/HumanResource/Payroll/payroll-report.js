var $PayrollReportYearlyGrid = "grid-payroll-report-yearly";



$('#YearWiseReportTabLi').click(function () {
  

    //--- Load Grid
  //  fnLoadPayrollReportYearlyGrid();
    $('#CreatedByPayrollReportYearly').val(JSON.parse(localStorage.getItem('User')).id);
    $('#PayrollReportYearlyLanguage').val(_currentLanguage)
});


 

function fnLoadPayrollReportYearlyGrid() {

    //values - are key value pair json object
    //Payroll_employeeMonthWiseReport
    ajaxRequest({ commandName: 'Setup_PayrollReportYearly_Get', values: { Language: _currentLanguage }, CallBack: fnLoadPayrollReportYearlyGridCallBack });
}
var fnLoadPayrollReportYearlyGridCallBack = function (inputDataJSON) {
    bindfnLoadPayrollReportYearlyGrid(JSON.parse(inputDataJSON.Value));
}
var bindfnLoadPayrollReportYearlyGrid = function (inputDataJSONs) {
    /*
    
        {
            field: "", width: 20,
            title: "",
            template: "<a style='font-size:20px;cursor:pointer;' onClick=editPayrollReportYearly(this) title='Edit' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick=deletePayrollReportYearly(this)  title='Delete'><span class='fa fa-trash'></span></a>  "

        }
    ];
    */

    var gridColumns = [


        { title: "#", template: "<b>#= ++record #</b>", width: 8, },
        {
            field: "nameofEmployee", title: "Employee", width: 150, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
            template: "<a  class='viewbutton' href='/Employee/EmployeeDetails?employeeID=#=employeeID#'  title='Show Details'>#=nameofEmployee#</a> "
        },


        {field: "january", title: lblJanuary, width: 100, filterable: false},
        { field: "february", title: lblFebruary, width: 100, filterable: false, },
        { field: "march", title: lblMarch, width: 100, filterable: false },
        { field: "april", title: lblApril, width: 100, filterable: false },
        { field: "may", title: lblMay, width: 100, filterable: false },
        { field: "june", title: lblJuly, width: 100, filterable: false },
        { field: "july", title: lblJuly, width: 100, filterable: false },
        { field: "august", title: lblAugust, width: 100, filterable: false },
        { field: "september", title: lblSeptember, width: 100, filterable: false },
        { field: "october", title: lblOctober, width: 100, filterable: false },
        { field: "november", title: lblNovember, width: 100, filterable: false },
        { field: "december", title: lblDecember, width: 100, filterable: false }
    ];
    bindKendoGrid($PayrollReportYearlyGrid, 50, gridColumns, inputDataJSONs);
};
   
 
