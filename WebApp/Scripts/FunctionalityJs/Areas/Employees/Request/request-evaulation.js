var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));

var $RequestEvaluations = "RequestEvaluations";
var _btnValue = 'Pending';

$(function () {
    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    loadRequestEvaluations('Pending');


});
function loadRequestEvaluations(btnStatus) {
     
    if (btnStatus == 'Pending') {
        ajaxRequest({
            commandName: 'Employees_Request_Evaluation_Get',
            values: {
                Id: $('#Id').val(),
                LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
                LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
                LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,
                LoggedInUserRoleName: JSON.parse(localStorage.getItem('User')).roleName,
                LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId,
                Language: _currentLanguage,
                StatusWise: btnStatus
            }, CallBack: loadRequestEvaluationsCallBack
        });

    } else {
        ajaxRequest({
            commandName: 'Employees_Request_Evaluation_History_Get',
            values: {
                LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
                LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
                LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,
                LoggedInUserRoleName: JSON.parse(localStorage.getItem('User')).roleName,
                LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId,
                LoggedInUserDepartement_Parent_Id: JSON.parse(localStorage.getItem('User')).employee_Department_ParentId,
                Language: _currentLanguage,
            }, CallBack: loadRequestEvaluationsCallBack
        });

    }


}
var loadRequestEvaluationsCallBack = function (inputDataJSON) {
    bindRequestEvaluations(JSON.parse(inputDataJSON.Value));
}
var bindRequestEvaluations = function (inputDataJSON) {
    var record = 0;
     
      
    if (_btnValue == 'Pending') {
    var gridColumns = [

        { field: "request_Evaluation_Id", title: "Request_Evaluation_Id", hidden: true },
        { field: "request_Evaluation_History_Id", title: "request_Evaluation_History_Id", hidden: true },
        { field: "employee_DepartmentId", title: "employee_DepartmentId", hidden: true },
        { field: "lineManagerId", title: "lineManagerId", hidden: true },
        { field: "hR_Employee_Id", title: "hR_Employee_Id", hidden: true },

        { title: "#", template: "<b>#= ++record #</b>", width: 5 },
        {
            field: "hR_Employee_Number", title: empNumber, width: 30, filterable: false,
            template: "<a style='cursor:pointer;text-decoration:underline;'  class='viewbutton' onClick= redirectToEmployeeDetailView(this)>#=hR_Employee_Number#</a> ",

        },

        { field: "createrName", title: lblFrom, filterable: false, hidden: false, width: 50 },
        { field: "issueDate", title: requestDate, filterable: false, hidden: false, width: 20 },
        { field: "employeeName", title: lblname, filterable: false, hidden: false, width: 50 },
        { field: "departmentName", title: lblSection, filterable: false, hidden: false, width: 50 },

        ];
        setTimeout(function () {

        bindKendoGrid($RequestEvaluations, 50, gridColumns, inputDataJSON, true);
        }, 100);

        $('#RequestEvaluations_Approved').hide();
        $('#RequestEvaluations').show(); 
    } else {
        $('#RequestEvaluations').hide(); 
        $('#RequestEvaluations_Approved').show();
       
        var gridColumns_approved = [
             
            { field: "employeeId", title: "EmployeeId", hidden: true },
            { field: "request_Evaluation_History_Id", title: "Request_Evaluation_History_Id", hidden: true },
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
        
        bindKendoGrid("RequestEvaluations_Approved", 500, gridColumns_approved, inputDataJSON, true);
       

    }




};

//--------------------- FUNCTION AREA ----------------
function fnLoadGridByStatus(btnValue) {
    loadRequestEvaluations(btnValue);
    _btnValue = btnValue;


}
function redirectToEmployeeDetailView(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $RequestEvaluations).data("kendoGrid");
    var dataItem = grid.dataItem(row);
     
    
   // window.location.href = '/Request/Evaluation/Index?EvaluationId=' + dataItem.request_Evaluation_Id + '?' + 'EmployeeNumber=' + dataItem.hR_Employee_Number + '';

    window.location.href = '/Request/Evaluation/Index?EvaluationId=' + dataItem.request_Evaluation_Id + '?' + 'EmployeeNumber=' + dataItem.hR_Employee_Number + '?' + 'Evaluation_History_Id=' + dataItem.request_Evaluation_History_Id + '';



}
function redirectTo_Approved_Request(e) {
     
    var row = $(e).closest("tr");
    var grid = $("#RequestEvaluations_Approved").data("kendoGrid");
    var dataItems = grid.dataItem(row);
      
     
    window.location.href = '/Request/Evaluation/Index?EvaluationId=' + dataItems.request_Evaluation_Id + '?' + 'EmployeeNumber=' + dataItems.employeeNumber + '?' + 'Evaluation_History_Id=' + dataItems.request_Evaluation_History_Id + '';



}