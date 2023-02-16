var $PayrollReportYearlyGrid = "grid-payroll-report-yearly";

$(function () {

    fnLoadPayrollReportYearlyGrid();
});
$('#YearWiseReportTabLi').click(function () {


    //--- Load Grid
    fnLoadPayrollReportYearlyGrid();
    $('#CreatedByPayrollReportYearly').val(JSON.parse(localStorage.getItem('User')).id);
    $('#PayrollReportYearlyLanguage').val(_currentLanguage)
});




function fnLoadPayrollReportYearlyGrid() {

    //values - are key value pair json object
    //Payroll_employeeMonthWiseReport
    ajaxRequest({ commandName: 'Payroll_employeeMonthWiseReport', values: { PayrollYear: $('#PayrollYear :selected').val(), Language: _currentLanguage }, CallBack: fnLoadPayrollReportYearlyGridCallBack });

}
var fnLoadPayrollReportYearlyGridCallBack = function (inputDataJSON) {
    bindfnLoadPayrollReportYearlyGrid(JSON.parse(inputDataJSON.Value));
}
var bindfnLoadPayrollReportYearlyGrid = function (inputDataJSONs) {
    
 
    var gridColumns = [


        { title: "#", template: "<b>#= ++record #</b>", width: 40, },
        {
            field: "nameofEmployee", title: "Employee", width: 400, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
            // template: "<a  class='viewbutton' href='/Employee/EmployeeDetails?employeeID=#=employeeID#'  title='Show Details'>#=nameofEmployee#</a> "
        },


        { field: "january", title: lblJanuary, width: 80, filterable: false },
        { field: "february", title: lblFebruary, width: 80, filterable: false, },
        { field: "march", title: lblMarch, width: 80, filterable: false },
        { field: "april", title: lblApril, width: 80, filterable: false },
        { field: "may", title: lblMay, width: 80, filterable: false },
        { field: "june", title: lblJuly, width: 80, filterable: false },
        { field: "july", title: lblJuly, width: 80, filterable: false },
        { field: "august", title: lblAugust, width: 80, filterable: false },
        { field: "september", title: lblSeptember, width: 80, filterable: false },
        { field: "october", title: lblOctober, width: 80, filterable: false },
        { field: "november", title: lblNovember, width: 80, filterable: false },
        { field: "december", title: lblDecember, width: 80, filterable: false }
    ];
    bindKendoGrid($PayrollReportYearlyGrid, 500, gridColumns, inputDataJSONs,true,650);
};


function PayrollemployeeYearhWiseReport() {
    fnLoadPayrollReportYearlyGrid();
}