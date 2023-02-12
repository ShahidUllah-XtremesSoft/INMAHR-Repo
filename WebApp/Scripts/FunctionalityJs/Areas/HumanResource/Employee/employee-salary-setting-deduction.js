var $SalarySettingDeductionGrid = "grid-salary-setting-deduction";
 
$('#DeductionTabLi').click(function () {
    fnLoadEmployee_Deduction_DDL();
    fnLoadSalarySettingDeductionGrid();
});
function fnLoadSalarySettingDeductionGrid() {

    //values - are key value pair json object
    ajaxRequest({ commandName: 'HR_Employee_RecursiveDeduction_Get', values: { EmployeeId: $('#EmployeeID_Deduction').val() == '' ? '-1' : $('#EmployeeID_Deduction').val(), Language: _currentLanguage }, CallBack: fnLoadSalarySettingDeductionGridCallBack });

}
var fnLoadSalarySettingDeductionGridCallBack = function (inputDataJSON) {
    bindfnLoadSalarySettingDeductionGrid(JSON.parse(inputDataJSON.Value));
}
var bindfnLoadSalarySettingDeductionGrid = function (inputDataJSON) {
  
    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 10, },
        { field: "recursiveID", title: "RecursiveID", hidden: true },
        { field: "employeeID", title: "employeeId", hidden: true },
        { field: "employeeName", title: lblEmployeeName, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "recursiveType", title: lblType, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "amount", title: lblAmount, width: 50, filterable: false },
        { field: "name", title: lblName, width: 50, filterable: false},
        { field: "recursiveDate", title: lblDate, width: 50, filterable:false },
        //Below is action column
        
    ];

    bindKendoGrid($SalarySettingDeductionGrid, 500, gridColumns, inputDataJSON);
}; 

//---------------------------------  DDL's

function fnLoadEmployee_Deduction_DDL() {
     
    ajaxRequest({ commandName: 'DDL_HR_Employee_Get', values: { Language: _currentLanguage }, CallBack: fnLoadEmployee_Deduction_DDLCallBack });
}
var fnLoadEmployee_Deduction_DDLCallBack = function (response) {
  
    $("#EmployeeID_Deduction").kendoDropDownList({
        dataTextField: "value",
        dataValueField: "id",
        filter: "contains",
       // value: -1,
        dataSource: JSON.parse(response.Value),
      // change: function (e) {
      //     debugger
      //     var selected_Id = this.value();
      //
      //     $('#EmployeeID_Deduction').val(selected_Id);
      //     fnLoadSalarySettingDeductionGrid();
      //
      // },
    });

}
 
 

$('#btn_Deduction_Search').click(function () {
    var selected_Deduction_Id = $("#EmployeeID_Deduction").val();
    $('#EmployeeID_Deduction').val(selected_Deduction_Id);
    fnLoadSalarySettingDeductionGrid();
});
$('#btnShowAll_Deduction').click(function () {

    fnLoadEmployee_Deduction_DDL(); 
    $('#EmployeeID_Deduction').val(0);
    fnLoadSalarySettingDeductionGrid();

     
});