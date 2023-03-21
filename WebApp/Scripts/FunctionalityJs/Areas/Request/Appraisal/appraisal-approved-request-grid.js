var AppraisalApprovedGrid = "appraisal-approved-request-grid";

$('#ApprovedAppraisalTabLi').click(function () {
    loadAppraisalApprovedGrid();

});
function loadAppraisalApprovedGrid() {
    ajaxRequest({
        commandName: 'Request_Appraisal_Approved',
        values: {
            Employee_Id: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: _currentLanguage
        }, CallBack: load_AppraisalApprovedGridCallBack
    });
}
var load_AppraisalApprovedGridCallBack = function (inputDataJSON) {

    bindAppraisalApprovedGrid(JSON.parse(inputDataJSON.Value));
}
var bindAppraisalApprovedGrid = function (inputDataJSON) {


    var gridColumns = [

        { title: "#", template: "<b>#= ++record #</b>", width: 10, },

        { field: "appraisalId", title: "AppraisalId", hidden: true },
        { field: "appraisalPerformanceId", title: "AppraisalPerformanceId", hidden: true },
        { field: "isHRApproved", title: "isHRApproved", hidden: true },
        { field: "isManagerApproved", title: "isManagerApproved", hidden: true },
        { field: "isUpperManagmentApproved", title: "isUpperManagmentApproved", hidden: true },
        { field: "employee_Number", title: "Employee_Number", hidden: true },
        { field: "employeeId", title: "EmployeeId", hidden: true },
        { field: "managerId", title: "ManagerId", hidden: true },
        { field: "departmentId", title: "DepartmentId", hidden: true },
        { field: "employeeName", title: lblFrom, width: 100, filterable: false },
        { field: "manager_Name", title: lblTo, width: 100, filterable: false },
        { field: "departmentName", title: lblSection, width: 100, filterable: false },

        { field: "year", title: lblYear, width: 30, hidden: false, filterable: false },
        { field: "statusForCondition", title: lblYear, width: 20, hidden: true, filterable: false },
        {
            title: lblStatus,
            field: 'status',
            width: 50, filterable: false,
            template: " <span class='badge badge-success'>#:status#</span>"
            //template: `<span class='badge badge-success'>` + lblDecline + `</span>`

        },

        //Below is action column
        {
            field: "", width: 15,
            title: ' ',
            filterable: false,
            template: `<a style='font-size:20px;cursor:pointer;' onClick= seee_AppraisalDetailsById(this)  title='See Detail '><span class='fa fa-eye'></span></a>`

        }
    ];

    bindKendoGrid(AppraisalApprovedGrid, 50, gridColumns, inputDataJSON);
};

function seee_AppraisalDetailsById(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + AppraisalApprovedGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);


    window.location.href = '/Request/Appraisal/Index?AppraisalId=' + dataItem.appraisalId + '?' + 'EmployeeId=' + dataItem.employeeId + '?' + 'DepartmentId=' + dataItem.departmentId + '?' + 'Year=' + dataItem.year + '?' + 'ManagerId=' + dataItem.managerId + '?' + 'EmployeeNumber=' + dataItem.employee_Number + '?' + 'AppraisalPerformanceId=' + dataItem.appraisalPerformanceId + '';

}
