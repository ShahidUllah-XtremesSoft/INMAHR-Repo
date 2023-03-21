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
     
     
   // if (_btnValue == 'Pending') {
        var gridColumns = [
         /*   {
            headerTemplate: "<input type='checkbox' id='checkAll'  class='k-checkbox header-checkbox'>",
            template: function (dataItem) {
                if (dataItem.isAssigned == 1) {
                    return "<div><input type='checkbox' class='k-checkbox row-checkbox' id='target' checked ></div>";
                }
                else {
                    return "<div><input type='checkbox' class='k-checkbox row-checkbox' id='target' unchecked='true'></div>";
                }
            },
            width: 10
            },
            */
            { title: "#", template: "<b>#= ++record #</b>", width: 10 },
            { field: "appraisalId", title: "AppraisalId", hidden: true },
            { field: "appraisalPerformanceId", title: "AppraisalPerformanceId", hidden: true },
            { field: "employee_Number", title: "Employee_Number", hidden: true },
            { field: "employeeId", title: "EmployeeId", hidden: true },
            { field: "managerId", title: "ManagerId", hidden: true },
            { field: "departmentId", title: "DepartmentId", hidden: true },
            {
                field: "employee_Number", title: empNumber, width: 40, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
                template: "<a style='cursor:pointer;text-decoration:underline;'  class='viewbutton' onClick= redirectToEmployeeDetailView(this)>#=employee_Number#</a> ",

            },
            {
                field: "employeeName", title: lblFrom, width: 100, filterable: false,
            },
            { field: "manager_Name", title: lblTo, width: 100, filterable: false },
            { field: "departmentName", title: lblSection, width: 100, filterable: false },
            { field: "year", title: lblYear, width: 30, hidden: false, filterable: false },
            {
                title: lblStatus,
                field: 'status',
                width: 60, filterable: false,
                template: "#if (statusForCondition == 'Declined') { # <span class='badge badge-danger'>" + lblDecline + "</span> # } else if(statusForCondition == 'Pending') {# <span class='badge badge-primary'>" + lblPending + "</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
                //template: `<span class='badge badge-success'>` + lblDecline + `</span>`

            },
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
   // }




};
$('#btnSave').click(function (e) {
    buttonAddPleaseWait('btnSave');
    fnApprovedOrDeclined(this.value, 'btnSave', 'check');
});
$('#btnCancel').click(function (e) {
    buttonAddPleaseWait('btnCancel');
    fnApprovedOrDeclined(this.value, 'btnCancel', 'ban');

});

function fnApprovedOrDeclined(btnValue, btnId, btnIcon) {


    Swal.fire({

        title: areYouSureTitle,
        text: btnValue == 'Decline' ? declineMultipleText : approveMultipleText,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
        confirmButtonText: btnYesText,
        cancelButtonText: btnNoText,
        buttons: {
            cancel: {
                text: "No",
                value: null,
                visible: true,
                className: "btn btn-danger",
                closeModal: true
            },
            confirm: {
                text: "Yes",
                value: true,
                visible: true,
                className: "btn btn-warning",
                closeModal: true
            }
        }
    }).then(function (restult) {
        if (restult.value) {

            var getgridIDs = getIdsFromGrid(btnValue, btnId, btnIcon);

            if (getgridIDs.length > 0) {

                ajaxRequest({
                    commandName: 'Appraisal_Request_and_Answer_and_Performance_ApproveOrDecline',
                    values: {
                        LoggedInUser: loggedInUserDetail.id,
                        LoggedInUserDepartmentId: loggedInUserDetail.departmentId,
                        LoggedInUserRoleId: loggedInUserDetail.roleId,
                        RequestIds: getgridIDs,
                        Status: btnValue,
                        Comment: '',
                        Language: _currentLanguage
                    }, CallBack: responseCallBack
                });
                if (btnValue == "Approved") { btnValue = _currentLanguage == "en-US" ? "Approve" : approveTitle; } else { btnValue = _currentLanguage == "en-US" ? "Decline" : lblDecline; }

                buttonRemovePleaseWait(btnId, btnValue, btnIcon);
            }


        } else {
            if (btnValue == "Approved") { btnValue = _currentLanguage == "en-US" ? "Approve" : approveTitle; } else { btnValue = _currentLanguage == "en-US" ? "Decline" : lblDecline; }

            buttonRemovePleaseWait(btnId, btnValue, btnIcon);
        }
    });

}
var responseCallBack = function (response) {

    fnLoadRequestAppraisal('Pending');
    swal(response.Value);

}
function getIdsFromGrid(btnValue, btnId, btnIcon) {

    var grid = $("#" + $RequestAppraisal).data("kendoGrid");
    var gridDataSource = grid.dataSource._data;
    var ids = '';
    for (var i = 0; i < gridDataSource.length; i++) {
        var isAssigned = grid.tbody.find("tr:eq(" + i + ")").find('.row-checkbox').is(':checked');
        if (isAssigned == true) {
            var gridRow = gridDataSource[i];
            ids += ids == '' ? gridRow.id : ',' + gridRow.id;
        }
    }
    if (ids.length > 0) { return ids; } else {
        if (btnValue == "Approved") { btnValue = _currentLanguage == "en-US" ? "Approve" : approveTitle; } else { btnValue = _currentLanguage == "en-US" ? "Decline" : lblDecline; }

        buttonRemovePleaseWait(btnId, btnValue, btnIcon);
        swalMessage('info', lblFristSelectRecordFromGrid, 1500);
        return 0;
    }


}



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