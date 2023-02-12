var $SalarySettingAdditionGrid = "grid-salary-setting-addition";

$('#AdditionTabLi').click(function () {
    fnLoadEmployee_Addition_DDL();
    fnLoadSalarySettingAdditionGrid();
});
function fnLoadSalarySettingAdditionGrid() {

    //values - are key value pair json object
    ajaxRequest({ commandName: 'HR_Employee_RecursiveAddition_Get', values: { EmployeeId: $('#EmployeeID_Addition').val() == '' ? 0 : $('#EmployeeID_Addition').val(), Language: _currentLanguage }, CallBack: fnLoadSalarySettingAdditionGridCallBack });

}
var fnLoadSalarySettingAdditionGridCallBack = function (inputDataJSON) {
    bindfnLoadSalarySettingAdditionGrid(JSON.parse(inputDataJSON.Value));
}
var bindfnLoadSalarySettingAdditionGrid = function (inputDataJSON) {

    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 10, },
        { field: "recursiveID", title: "RecursiveID", hidden: true },
        { field: "employeeID", title: "employeeId", hidden: true },
        { field: "employeeName", title: lblEmployeeName, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "recursiveType", title: lblType, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "amount", title: lblAmount, width: 50, filterable: false },
        { field: "name", title: lblName, width: 50, filterable: false },
        { field: "recursiveDate", title: lblDate, width: 50, filterable: false },
        //Below is action column

    ];

    bindKendoGrid($SalarySettingAdditionGrid, 500, gridColumns, inputDataJSON);
};

//---------------------------------  DDL's

function fnLoadEmployee_Addition_DDL() {

    ajaxRequest({ commandName: 'DDL_HR_Employee_Get', values: { Language: _currentLanguage }, CallBack: fnLoadEmployee_Addition_DDLCallBack });
}
var fnLoadEmployee_Addition_DDLCallBack = function (response) {

    $("#EmployeeID_Addition").kendoDropDownList({
        dataTextField: "value",
        dataValueField: "id",
        filter: "contains",
        //   value: -1,
        dataSource: JSON.parse(response.Value),
        //  change: function (e) {
        //      var selected_Id = this.value();
        //
        //      $('#EmployeeID_Addition').val(selected_Id);
        //      fnLoadSalarySettingAdditionGrid();
        //
        //  },
    });

}
 
$('#btn_Addition_Search').click(function () {
    var selected_Addition_Id = $("#EmployeeID_Addition").val();
    $('#EmployeeID_Addition').val(selected_Addition_Id);
    fnLoadSalarySettingAdditionGrid();
});
$('#btnShowAll_Addition').click(function () {
    
    fnLoadEmployee_Addition_DDL();
    $('#EmployeeID_Addition').val(0);
    fnLoadSalarySettingAdditionGrid();
});