var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));

var $RequestEvaluations = "RequestEvaluations";
var _btnValue = 'Pending';

$(function () {



    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    loadRequestEvaluations('Pending');
    localStorage.setItem('Active_GridArea', 'Pending'); //This is for Request Details Js to see it's pending grid   or approved grid data ...... written by /\/\ati

});
function loadRequestEvaluations(btnStatus) {
     
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

}
var loadRequestEvaluationsCallBack = function (inputDataJSON) {
    bindRequestEvaluations(JSON.parse(inputDataJSON.Value));
}
var bindRequestEvaluations = function (inputDataJSON) {

    var record = 0;

    var gridColumns = [

        { field: "request_Evaluation_Id", title: "Request_Evaluation_Id", hidden: true },
        { field: "request_Evaluation_Id", title: "Request_Evaluation_Id", hidden: true },
        { field: "employee_DepartmentId", title: "employee_DepartmentId", hidden: true },
        { field: "lineManagerId", title: "lineManagerId", hidden: true },
        { field: "hR_Employee_Id", title: "hR_Employee_Id", hidden: true },

        { title: "#", template: "<b>#= ++record #</b>", width: 5 },

        { field: "createrName", title: lblFrom, filterable: false, hidden: false, width: 50 },
        { field: "issueDate", title: requestDate, filterable: false, hidden: false, width: 20 },
        {
            field: "hR_Employee_Number", title: empNumber, width: 30, filterable: false,
            template: "<a style='cursor:pointer;text-decoration:underline;'  class='viewbutton' onClick= redirectToEmployeeDetailView(this)>#=hR_Employee_Number#</a> ",

        },
        { field: "employeeName", title: lblname, filterable: false, hidden: false, width: 50 },
        { field: "departmentName", title: 'lblSection', filterable: false, hidden: false, width: 50 },

    ];

    bindKendoGrid($RequestEvaluations, 50, gridColumns, inputDataJSON, true);

};









//--------------------- FUNCTION AREA ----------------
function fnLoadGridByStatus(btnValue) {
    loadRequestEvaluations(btnValue);
    _btnValue = btnValue;

    if (btnValue == 'Pending') {

        setTimeout(function () {
            localStorage.setItem('Active_GridArea', 'Pending'); //This is for Request Details Js to see it's pending grid   or approved grid data ...... written by /\/\ati

            $('#btnAreaShowHideOnConditionBase').show();
            $('.header-checkbox').show();
            $('.k-checkbox.row-checkbox').show();
        }, 50);
    } else {
        setTimeout(function () {
            localStorage.setItem('Active_GridArea', 'Approved');//This is for Request Details Js to see it's pending grid   or approved grid data ...... written by /\/\ati

            $('#btnAreaShowHideOnConditionBase').hide();
            $('.header-checkbox').hide();
            $('.k-checkbox.row-checkbox').hide();
        }, 50);
    }
}
function redirectToEmployeeDetailView(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $RequestEvaluations).data("kendoGrid");
    var dataItem = grid.dataItem(row);
     


    localStorage.setItem('Request_Evaluation_Id', dataItem.request_Evaluation_Id);
    localStorage.setItem('hR_Employee_Id', dataItem.hR_Employee_Id);
    localStorage.setItem('Employees_Request_Area', window.location.href.split('/').pop());
    window.location.href = '/Request/Evaluation/Index?EvaluationId=' + dataItem.request_Evaluation_Id + '?' + 'EmployeeNumber=' + dataItem.hR_Employee_Number+'';



}