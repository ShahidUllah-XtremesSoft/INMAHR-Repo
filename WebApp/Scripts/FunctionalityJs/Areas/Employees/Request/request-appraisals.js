var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));

var $RequestAppraisal = "RequestAppraisal";
var _btnValue = 'Pending';

$(function () {
    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    fnLoadRequestAppraisal('Pending');


});
function fnLoadRequestAppraisal(btnStatus) {
     
    btnStatus == "Pending" ? (btnStatus='Send') : btnStatus;

    ajaxRequest({
        commandName: 'Employees_Request_Appraisal_Get',
        values: {
            Id: $('#Id').val(),
            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInUserRoleName: JSON.parse(localStorage.getItem('User')).roleName,
            LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId,
            Language: _currentLanguage,
            StatusWise: btnStatus
        }, CallBack: fnLoadRequestAppraisalCallBack
    });




}
var fnLoadRequestAppraisalCallBack = function (inputDataJSON) {
    bindRequestAppraisal(JSON.parse(inputDataJSON.Value));
}
var bindRequestAppraisal = function (inputDataJSON) {
    var record = 0;
     

    if (_btnValue == 'Pending') {
        var gridColumns = [

            { title: "#", template: "<b>#= ++record #</b>", width: 10 },
            { field: "appraisalId", title: "AppraisalId", hidden: true },
            { field: "appraisalPerformanceId", title: "AppraisalPerformanceId", hidden: true },
            { field: "employee_Number", title: "Employee_Number", hidden: true },
            { field: "employeeId", title: "EmployeeId", hidden: true },
            { field: "managerId", title: "ManagerId", hidden: true },
            { field: "departmentId", title: "DepartmentId", hidden: true },
            {
                field: "employeeName", title: lblFrom, width: 100, filterable: false,
                template: "<a style='cursor:pointer;text-decoration:underline;'  class='viewbutton' onClick= redirectToEmployeeDetailView(this)>#=employeeName#</a> ",
            },
            { field: "manager_Name", title: lblTo, width: 100, filterable: false },
            { field: "departmentName", title: lblSection, width: 100, filterable: false },
            { field: "year", title: lblYear, width: 30, hidden: false, filterable: false },
            { field: "status", title: lblStatus, width: 30, hidden: false, filterable: false }

        ];
            bindKendoGrid($RequestAppraisal, 50, gridColumns, inputDataJSON, true);

        /*
        setTimeout(function () {

        }, 100);

        $('#RequestAppraisal_Approved').hide();
        $('#RequestAppraisal').show();
    } else {
        $('#RequestAppraisal').hide();
        $('#RequestAppraisal_Approved').show();

        var gridColumns_approved = [

            { field: "employeeId", title: "EmployeeId", hidden: true },
            { field: "request_Appraisal_History_Id", title: "Request_Appraisal_History_Id", hidden: true },
            { field: "employee_DepartmentId", title: "employee_DepartmentId", hidden: true },
            { field: "lineManagerId", title: "lineManagerId", hidden: true },
            { field: "hR_Employee_Id", title: "hR_Employee_Id", hidden: true },

            { title: "#", template: "<b>#= ++record #</b>", width: 5 },
            {
                field: "employeeNumber", title: empNumber, width: 30, filterable: false,
                template: "<a style='cursor:pointer;text-decoration:underline;'  class='viewbutton' onClick= redirectTo_Approved_Request(this)>#=employeeNumber#</a> ",

            },

            { field: "createrName", title: lblFrom, filterable: false, hidden: true, width: 50 },
            { field: "issueDate", title: requestDate, filterable: false, hidden: false, width: 20 },
            { field: "employeeName", title: lblname, filterable: false, hidden: false, width: 50 },
            { field: "employee_Department", title: lblSection, filterable: false, hidden: false, width: 50 },

        ];

        bindKendoGrid("RequestAppraisal_Approved", 500, gridColumns_approved, inputDataJSON, true);

        */
    }




};

//--------------------- FUNCTION AREA ----------------
function fnLoadGridByStatus(btnValue) {
    fnLoadRequestAppraisal(btnValue);
    _btnValue = btnValue;


}
function redirectToEmployeeDetailView(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $RequestAppraisal).data("kendoGrid");
    var dataItem = grid.dataItem(row);



    window.location.href = '/Request/Appraisal/Index?AppraisalId=' + dataItem.appraisalId + '?' + 'EmployeeId=' + dataItem.employeeId + '?' + 'DepartmentId=' + dataItem.departmentId + '?' + 'Year=' + dataItem.year + '?' + 'ManagerId=' + dataItem.managerId + '?' + 'EmployeeNumber=' + dataItem.employee_Number + '?' + 'AppraisalPerformanceId=' + dataItem.appraisalPerformanceId + '';



}
function redirectTo_Approved_Request(e) {

    var row = $(e).closest("tr");
    var grid = $("#RequestAppraisal_Approved").data("kendoGrid");
    var dataItems = grid.dataItem(row);


    /*window.location.href = '/Request/Appraisal/Index?AppraisalId=' + dataItems.request_Appraisal_Id + '?' + 'EmployeeNumber=' + dataItems.employeeNumber + '?' + 'Appraisal_History_Id=' + dataItems.request_Appraisal_History_Id + '';*/

    window.location.href = '/Request/Appraisal/Index?AppraisalId=' + dataItem.appraisalId + '?' + 'EmployeeId=' + dataItem.employeeId + '?' + 'DepartmentId=' + dataItem.departmentId + '?' + 'Year=' + dataItem.year + '?' + 'ManagerId=' + dataItem.managerId + '?' + 'EmployeeNumber=' + dataItem.employee_Number + '';


}