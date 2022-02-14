//var LeaveRequestGrid = 'LeaveRequestGrid';
//var ShortLeaveRequestGrid = "ShortLeaveRequestGrid";
var RequestGrid = 'RequestGrid';
var LoginUserID = '';
var CreatedBy = '';
$(function () {
    $('#Language').val(_currentLanguage);

    //Hide leave balance area if other than HR is logged in    
 
    if (JSON.parse(localStorage.getItem('User')).isHR) {
        $('#internalDivPersonalDocument').css('height', '353');
        $('#divLeaveBalance').css('display', 'block');
    }
    else {
        $('#divLeaveBalance').css('display', 'block');
       // $('#divPersonalDocument').removeClass('col-md-6').addClass('col-md-12')
        $('#internalDivPersonalDocument').css('height', '353');
        //height: 496px; max-height: 496px;

    }

    //Hide leave balance area if other than HR is logged in
    //var $document_grid = "document-grid";
    $('#LoggedInUserId').val(JSON.parse(localStorage.getItem('User')).id);

    //var LeaveRequestGrid = "LeaveRequestGrid";
    loadEmployeeProfile();

    //| Buttons Click Events
    var gridColumns = [];
    $('#btnLeaveRequestTab').click(function () {
        $(this).removeClass('btn-dark').addClass('btn-primary');
        $('#btnLetterRequestTab').removeClass('btn-primary').addClass('btn-dark');
        $('#btnShortLeaveRequestTab').removeClass('btn-primary').addClass('btn-dark');
        $('#btnLeaveCancelRequestTab').removeClass('btn-primary').addClass('btn-dark');
        $('#btnCashInLeaveTab').removeClass('btn-primary').addClass('btn-dark');


        loadLeaveRequestGrid();
    });
    $('#btnShortLeaveRequestTab').click(function () {
        $(this).removeClass('btn-dark').addClass('btn-primary');
        $('#btnLeaveRequestTab').removeClass('btn-primary').addClass('btn-dark');
        $('#btnLetterRequestTab').removeClass('btn-primary').addClass('btn-dark');
        $('#btnLeaveCancelRequestTab').removeClass('btn-primary').addClass('btn-dark');
        $('#btnCashInLeaveTab').removeClass('btn-primary').addClass('btn-dark');
        loadShortLeaveGrid();
    });
    $('#btnLetterRequestTab').click(function () {
        $(this).removeClass('btn-dark').addClass('btn-primary');
        $('#btnLeaveRequestTab').removeClass('btn-primary').addClass('btn-dark');
        $('#btnShortLeaveRequestTab').removeClass('btn-primary').addClass('btn-dark');
        $('#btnLeaveCancelRequestTab').removeClass('btn-primary').addClass('btn-dark');
        $('#btnCashInLeaveTab').removeClass('btn-primary').addClass('btn-dark');
        loadLetterRequestGrid();
    });
    $('#btnLeaveCancelRequestTab').click(function () {
        $(this).removeClass('btn-dark').addClass('btn-primary');
        $('#btnLeaveRequestTab').removeClass('btn-primary').addClass('btn-dark');
        $('#btnLetterRequestTab').removeClass('btn-primary').addClass('btn-dark');
        $('#btnShortLeaveRequestTab').removeClass('btn-primary').addClass('btn-dark');
        $('#btnCashInLeaveTab').removeClass('btn-primary').addClass('btn-dark');
        loadCancelLeaveRequestGrid();
    });
    $('#btnCashInLeaveTab').click(function () {
        $(this).removeClass('btn-dark').addClass('btn-primary');
        $('#btnLeaveRequestTab').removeClass('btn-primary').addClass('btn-dark');
        $('#btnLetterRequestTab').removeClass('btn-primary').addClass('btn-dark');
        $('#btnShortLeaveRequestTab').removeClass('btn-primary').addClass('btn-dark');
        $('#btnLeaveCancelRequestTab').removeClass('btn-primary').addClass('btn-dark');
        loadCashInLeaveRequestGrid();
    });
    //| Request Deny Modal Comment, Save Button Click
    $('#btnModalDenyRequestSave').click(function () {


        if ($('#RequestDenyComment').val() == '') {

        }


        var requestId = $('#ModalDenyRequestId').val();
        var comment = $('#RequestDenyComment').val();
        var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
        if ($('#ModalDenyRequestType').val() == 'LeaveRequest') {

            ajaxRequest({ commandName: 'Request_Leave_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: requestId, CreatedBy: $('#CreatedBy').val(), Comment: comment, Status: 'Decline', Language: _currentLanguage }, CallBack: declineLeaveCallBack });
        }
        else if ($('#ModalDenyRequestType').val() == 'ShortLeaveRequest') {
            ajaxRequest({ commandName: 'Request_ShortLeave_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: requestId, CreatedBy: $('#CreatedBy').val(), Comment: comment, Status: 'Decline', Language: _currentLanguage }, CallBack: declineShortLeaveCallBack });
        }
        else if ($('#ModalDenyRequestType').val() == 'LetterRequest') {
            ajaxRequest({ commandName: 'Request_LetterRequest_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: requestId, CreatedBy: $('#CreatedBy').val(), Comment: comment, Status: 'Decline', Language: _currentLanguage }, CallBack: declineShortLeaveCallBack });

        }
        else if ($('#ModalDenyRequestType').val() == 'LeaveCancelRequest') {
            ajaxRequest({ commandName: 'Request_LeaveCancel_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: requestId, CreatedBy: $('#CreatedBy').val(), Comment: comment, Status: 'Decline', Language: _currentLanguage }, CallBack: declineLeaveCancelRequestCallBack });
        }
        else if ($('#ModalDenyRequestType').val() == 'CashInLeaveRequest') {
            ajaxRequest({ commandName: 'Request_CashInLeave_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, Comment: comment, RoleId: loggedInUserDetail.roleId, RequestId: requestId, CreatedBy: $('#CreatedBy').val(), Status: 'Decline', Language: _currentLanguage }, CallBack: declineCashInLeaveRequestCallBack });
        }
        $('#RequestDenyComment').val('');
        $('#ModalDenyRequestId').val('0');
        $('#ModalDenyRequest').modal('toggle');
    });
    //| Request Deny Modal Comment, Save Button Click Ends

});
//|Load Employee Profile Starts
function loadEmployeeProfile() {
    var employeeNumber = localStorage.getItem('EmployeeNumber');
    ajaxRequest({ commandName: 'HR_Employee_GetByNumber', values: { Language: _currentLanguage, EmployeeNumber: employeeNumber }, CallBack: loadEmployeeProfileCallBack });
}
function loadEmployeeProfileCallBack(response) {
    $('#CreatedBy').val(JSON.parse(response.Value).id);
    $('#EmployeeId').val(JSON.parse(response.Value).employeeId);
    $.each(JSON.parse(response.Value), function (key, value) {
        $('#' + capitalizeFirstLetter(key)).text(value);
    });
    if (JSON.parse(response.Value).currentFileName != null) {
        var profileImage = '/UploadFile/' + JSON.parse(response.Value).currentFileName;
        $('#ProfileImage').attr('src', profileImage);
    }

    loadLeaveRequestGrid();
    //loadPersonalDocumentsGrid();
    //loadEducationalDocumentsGrid();
    //loadEmployeeAnnualLeaveBalanceDeductionGrid();
    //loadEmployeeVacationLeaveBalanceGrid();
    //loadShortLeaveGrid();
}

//|Load Employee Profile Ends

//|Load Leave Request Grid Starts
function loadLeaveRequestGrid() {

    var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
    //ajaxRequest({ commandName: 'Request_Leave_Get', values: { Id: $('#Id').val(), CreatedBy: $('#CreatedBy').val(), LoggedInUserId: loggedInUserDetail.id, LoggedInUserRoleId: loggedInUserDetail.roleId, LoggedInUserDepartementId: loggedInUserDetail.departmentId, Language: _currentLanguage }, CallBack: loadLeaveRequestGridCallBack });
    ajaxRequest({ commandName: 'Request_Leave_GetBySuperiorRole', values: { Id: $('#Id').val(), CreatedBy: $('#CreatedBy').val(), LoggedInUserId: loggedInUserDetail.id, LoggedInUserRoleId: loggedInUserDetail.roleId, LoggedInUserDepartementId: loggedInUserDetail.departmentId, Language: _currentLanguage }, CallBack: loadLeaveRequestGridCallBack });

}
var loadLeaveRequestGridCallBack = function (inputDataJSON) {
    bindLeaveRequestGrid(JSON.parse(inputDataJSON.Value));
}
var bindLeaveRequestGrid = function (inputDataJSON) {

    var isHidden = inputDataJSON.length > 0 ? !inputDataJSON[0].isApproverExist : 0;
    var gridColumns = [
        { field: "id", title: "id", hidden: true },
        { field: "leaveType", title: leaveType, hidden: false, width: 20 },
        { field: "startDate", title: startDate, hidden: false, width: 20 },
        { field: "endDate", title: endDate, hidden: false, width: 20 },
        { field: "totalDays", title: days, hidden: false, width: 15 },
        { field: "leaveTypeId", title: "leaveTypeId", hidden: true, width: 30 },
        { field: "statusId", title: "StatusId", hidden: true, width: 30 },
        {
            title: status,
            field: 'status',
            width: 35,
            hidden: false,
            //template: 1 == 1 ? "<span class='badge badge-success'>#:status#</span>" : "<span class='badge badge-danger'>#:status#</span>"
            template: "#if (statusForCondition.substring(0,7) == 'Decline') { # <span class='badge badge-danger'>#:status#</span> # } else if(statusForCondition == 'Pending') {# <span class='badge badge-primary'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
        },
        {
            'title': ' ',
            'field': 'isApproverExist',
            'width': 35,
            //'hidden': false,//'#if(1 == 1) {# false # }  else {# false #}#',
            hidden: isHidden,
            'template': '<button class="btn btn-success btn-sm" value="Accept" onClick= approveLeave(this);><i class="fa fa-check"></i>' + btnApproveText + '</button><button class="btn btn-danger btn-sm" value="Reject" onClick= declineLeave(this);><i class="fa fa-ban"></i>' + btnDeclineText + '</button>'
        },

    ];
    $('#RequestGrid').html('');
    bindKendoGrid(RequestGrid, 50, gridColumns, inputDataJSON, true, 300);
    //bindKendoGrid('LeaveRequestGrid', 50, gridColumns, inputDataJSON, true,300);    
};
function approveLeave(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + RequestGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
        title: approveTitleQuestion,
        text: approveText,
        //input: 'text',
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

            var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
            ajaxRequest({ commandName: 'Request_Leave_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, Comment: '', CreatedBy: $('#CreatedBy').val(), Status: 'Approved', Language: _currentLanguage }, CallBack: approveLeaveCallBack });
            //Aprove leave logic here
            //alert(JSON.stringify(dataItem));
            //alert(JSON.stringify( JSON.parse(localStorage.getItem('User'))));
        }
    });
    var approveLeaveCallBack = function (response) {
        loadLeaveRequestGrid();
        swal(response.Value);

    }

}
function declineLeave(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + RequestGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
        title: declineTitleQuestion,
        text: declineText,
        //input: 'text',
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
            //ajaxRequest({ commandName: 'HR_Employee_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteEmployeeByIdCallBack });
            //Aprove leave logic here
            //alert(JSON.stringify(dataItem));

            $('#ModalDenyRequestType').val('LeaveRequest');
            $('#ModalDenyRequestId').val(dataItem.id);
            $('#ModalDenyRequest').modal('show');
            //var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
            //ajaxRequest({ commandName: 'Request_Leave_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, CreatedBy: $('#CreatedBy').val(), Status: 'Decline', Language: _currentLanguage }, CallBack: declineLeaveCallBack });

        }
    });
}
var declineLeaveCallBack = function (response) {
    loadLeaveRequestGrid();
    swal(response.Value);

}
//|Load Leave Request Grid Ends

//|Load Short Leave Request Grid Starts
function loadShortLeaveGrid() {

    ajaxRequest({ commandName: 'Request_ShortLeave_GetBySuperiorRole', values: { Id: $('#Id').val(), CreatedBy: $('#CreatedBy').val(), LoggedInUserId: JSON.parse(localStorage.getItem('User')).id, LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId, LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId, Language: _currentLanguage }, CallBack: loadShortLeaveGridCallBack });

}
var loadShortLeaveGridCallBack = function (inputDataJSON) {
    bindShortLeaveGrid(JSON.parse(inputDataJSON.Value));
}
var bindShortLeaveGrid = function (inputDataJSON) {
    var isHidden = inputDataJSON.length > 0 ? !inputDataJSON[0].isApproverExist : 0;
    var gridColumns = [
        { field: "id", title: "id", hidden: true },
        { field: "requestDate", title: requestDate, hidden: false, width: 20 },
        { field: "startTime", title: startTime, hidden: false, width: 20 },
        { field: "endTime", title: endTime, hidden: false, width: 20 },
        { field: "numberOfHours", title: hours, hidden: false, width: 15 },
        { field: "statusId", title: "StatusId", hidden: true, width: 30 },
        {
            title: status,
            field: 'status',
            width: 35,
            hidden: false,
            template: "#if (statusForCondition.substring(0,7) == 'Decline') { # <span class='badge badge-danger'>#:status#</span> # } else if(statusForCondition == 'Pending') {# <span class='badge badge-primary'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
        },
        //Below is action column
        {
            'title': ' ',
            'field': 'isApproverExist',
            'width': 35,
            //'hidden': false,//'#if(1 == 1) {# false # }  else {# false #}#',
            hidden: isHidden,
            'template': '<button class="btn btn-success btn-sm" value="Accept" onClick= approveShortLeave(this);><i class="fa fa-check"></i>' + btnApproveText + '</button><button class="btn btn-danger btn-sm" value="Reject" onClick= declineShortLeave(this);><i class="fa fa-ban"></i>' + btnDeclineText + '</button>'
        },


    ];
    $('#RequestGrid').html('');
    bindKendoGrid('RequestGrid', 50, gridColumns, inputDataJSON, true, 300);
    //bindKendoGrid(ShortLeaveRequestGrid, 50, gridColumns, inputDataJSON, true,300);

};
function approveShortLeave(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + RequestGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
        title: approveTitleQuestion,
        text: approveText,
        //input: 'text',
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

            var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
            ajaxRequest({ commandName: 'Request_ShortLeave_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, Comment: '', RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, CreatedBy: $('#CreatedBy').val(), Status: 'Approved', Language: _currentLanguage }, CallBack: approveShortLeaveCallBack });
            //Aprove leave logic here
            //alert(JSON.stringify(dataItem));
            //alert(JSON.stringify( JSON.parse(localStorage.getItem('User'))));
        }
    });
    var approveShortLeaveCallBack = function (response) {
        loadShortLeaveGrid();
        swal(response.Value);

    }

}
function declineShortLeave(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + RequestGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
        title: declineTitleQuestion,
        text: declineText,
        //input: 'text',
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

            $('#ModalDenyRequestId').val(dataItem.id);
            $('#ModalDenyRequestType').val('ShortLeaveRequest');
            $('#ModalDenyRequest').modal('show');
            //var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
            //ajaxRequest({ commandName: 'Request_ShortLeave_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, CreatedBy: $('#CreatedBy').val(), Status: 'Decline', Language: _currentLanguage }, CallBack: declineShortLeaveCallBack });

        }
    });

}
var declineShortLeaveCallBack = function (response) {
    //console.log(response);
    loadShortLeaveGrid();
    swal(response.Value);

}


//|Load Short Leave Request Grid Ends

//|Load Short Leave Request Grid Starts
function loadLetterRequestGrid() {

    ajaxRequest({ commandName: 'Request_Letter_GetBySuperiorRole', values: { Id: $('#Id').val(), CreatedBy: $('#CreatedBy').val(), LoggedInUserId: JSON.parse(localStorage.getItem('User')).id, LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId, LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId, Language: _currentLanguage }, CallBack: loadLetterRequestGridCallBack });

}
var loadLetterRequestGridCallBack = function (inputDataJSON) {
    bindLetterRequestGridCallBack(JSON.parse(inputDataJSON.Value));
}
var bindLetterRequestGridCallBack = function (inputDataJSON) {
    var isHidden = inputDataJSON.length > 0 ? !inputDataJSON[0].isApproverExist : 0;
    var gridColumns = [
        { field: "id", title: "id", hidden: true },
        { field: "LetterTypeId", title: leaveType, hidden: true },
        { field: "letterType", title: letterType, hidden: false, width: 30 },
        { field: "note", title: note, hidden: false, width: 60 },
        { field: "other", title: comment, hidden: false, width: 30 },
        { field: "statusId", title: "StatusId", hidden: true, width: 30 },
        //{ field: "status", title: "Status", hidden: false, width: 30 }
        {
            title: status,
            field: 'status',
            width: 35,
            hidden: false,
            template: "#if (statusForCondition.substring(0,7) == 'Decline') { # <span class='badge badge-danger'>#:status#</span> # } else if(statusForCondition == 'Pending') {# <span class='badge badge-primary'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
        },
        //Below is action column
        {
            'title': ' ',
            'field': 'isApproverExist',
            'width': 35,
            //'hidden': false,//'#if(1 == 1) {# false # }  else {# false #}#',
            hidden: isHidden,
            'template': '<button class="btn btn-success btn-sm" value="Accept" onClick= approveLetterRequest(this);><i class="fa fa-check"></i>' + btnApproveText + '</button><button class="btn btn-danger btn-sm" value="Reject" onClick= declineLetterRequest(this);><i class="fa fa-ban"></i>' + btnDeclineText + '</button>'
        }

    ];
    $('#RequestGrid').html('');
    bindKendoGrid(RequestGrid, 50, gridColumns, inputDataJSON, true, 300);
    //bindKendoGrid(ShortLeaveRequestGrid, 50, gridColumns, inputDataJSON, true,300);

};
function approveLetterRequest(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + RequestGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
        title: approveTitleQuestion,
        text: approveText,
        //input: 'text',
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

            var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
            ajaxRequest({ commandName: 'Request_LetterRequest_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, Comment: '', RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, CreatedBy: $('#CreatedBy').val(), Status: 'Approved', Language: _currentLanguage }, CallBack: approveLetterRequestCallBack });
            //Aprove leave logic here
            //alert(JSON.stringify(dataItem));
            //alert(JSON.stringify( JSON.parse(localStorage.getItem('User'))));
        }
    });
    var approveLetterRequestCallBack = function (response) {
        loadLetterRequestGrid();
        swal(response.Value);

    }

}
function declineLetterRequest(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + RequestGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
        title: declineTitleQuestion,
        text: declineText,
        //input: 'text',
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

            $('#ModalDenyRequestId').val(dataItem.id);
            $('#ModalDenyRequestType').val('LetterRequest');
            $('#ModalDenyRequest').modal('show');
            //var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
            //ajaxRequest({ commandName: 'Request_LetterRequest_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, CreatedBy: $('#CreatedBy').val(), Status: 'Decline', Language: _currentLanguage }, CallBack: declineShortLeaveCallBack });

        }
    });


}
var declineShortLeaveCallBack = function (response) {
    loadShortLeaveGrid();
    swal(response.Value);

}
//|Load Short Leave Request Grid Ends

//|Load Cancel Leave Request Grid Starts
function loadCancelLeaveRequestGrid() {

    ajaxRequest({ commandName: 'Request_LeaveCancel_GetBySuperiorRole', values: { Id: $('#Id').val(), CreatedBy: $('#CreatedBy').val(), LoggedInUserId: JSON.parse(localStorage.getItem('User')).id, LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId, LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId, Language: _currentLanguage }, CallBack: loadCancelLeaveRequestGridCallBack });

}
var loadCancelLeaveRequestGridCallBack = function (inputDataJSON) {
    bindCancelLeaveRequestGridCallBack(JSON.parse(inputDataJSON.Value));
}
var bindCancelLeaveRequestGridCallBack = function (inputDataJSON) {
    var isHidden = inputDataJSON.length > 0 ? !inputDataJSON[0].isApproverExist : 0;
    var gridColumns = [
        { field: "id", title: "id", hidden: true },
        { field: "requestLeaveId", title: "requestLeaveId", hidden: true },
        { field: "leave", title: leaveName, hidden: false, width: 30 },
        { field: "startDate", title: startDate, hidden: false, width: 30 },
        { field: "endDate", title: endDate, hidden: false, width: 30 },
        { field: "commentEng", title: commentEng, hidden: false, width: 30 },
        { field: "commentArb", title: commentArb, hidden: false, width: 30 },
        //        { field: "status", title: "Status", hidden: false, width: 30 },
        {
            title: status,
            field: 'status',
            width: 30,
            hidden: false,
            //template: 1 == 1 ? "<span class='badge badge-success'>#:status#</span>" : "<span class='badge badge-danger'>#:status#</span>"
            template: "#if (statusForCondition.substring(0,7) == 'Decline') { # <span class='badge badge-danger'>#:status#</span> # } else if(statusForCondition == 'Pending') {# <span class='badge badge-primary'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
        },

        //Below is action column
        {
            'title': ' ',
            'field': 'isApproverExist',
            'width': 35,
            //'hidden': false,//'#if(1 == 1) {# false # }  else {# false #}#',
            hidden: isHidden,
            'template': '<button class="btn btn-success btn-sm" value="Accept" onClick= approveLeaveCancelRequest(this);><i class="fa fa-check"></i>' + btnApproveText + '</button><button class="btn btn-danger btn-sm" value="Reject" onClick= declineLeaveCancelRequest(this);><i class="fa fa-ban"></i>' + btnDeclineText + '</button>'
        }


    ];

    $('#RequestGrid').html('');
    bindKendoGrid(RequestGrid, 50, gridColumns, inputDataJSON, true, 300);
    //bindKendoGrid(ShortLeaveRequestGrid, 50, gridColumns, inputDataJSON, true,300);

};
function approveLeaveCancelRequest(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + RequestGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
        title: approveTitleQuestion,
        text: approveText,
        //input: 'text',
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

            var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
            ajaxRequest({ commandName: 'Request_LeaveCancel_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, Comment: '', RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, CreatedBy: $('#CreatedBy').val(), Status: 'Approved', Language: _currentLanguage }, CallBack: approveLeaveCancelRequestCallBack });
            //Aprove leave logic here
            //alert(JSON.stringify(dataItem));
            //alert(JSON.stringify( JSON.parse(localStorage.getItem('User'))));
        }
    });
    var approveLeaveCancelRequestCallBack = function (response) {
        loadCancelLeaveRequestGrid();
        swal(response.Value);

    }

}
function declineLeaveCancelRequest(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + RequestGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
        title: declineTitleQuestion,
        text: declineText,
        //input: 'text',
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

            $('#ModalDenyRequestId').val(dataItem.id);
            $('#ModalDenyRequestType').val('LeaveCancelRequest');
            $('#ModalDenyRequest').modal('show');

            //var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
            //ajaxRequest({ commandName: 'Request_LeaveCancel_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, CreatedBy: $('#CreatedBy').val(), Status: 'Decline', Language: _currentLanguage }, CallBack: declineLeaveCancelRequestCallBack });

        }
    });


}
var declineLeaveCancelRequestCallBack = function (response) {
    loadCancelLeaveRequestGrid();
    swal(response.Value);

}
//|Load Cancel Leave Request Grid Ends
//|Load Cash In Leave Request Grid Starts
function loadCashInLeaveRequestGrid() {

    ajaxRequest({ commandName: 'Request_CashInLeave_GetBySuperiorRole', values: { Id: $('#Id').val(), CreatedBy: $('#CreatedBy').val(), LoggedInUserId: JSON.parse(localStorage.getItem('User')).id, LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId, LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId, Language: _currentLanguage }, CallBack: loadCashInLeaveRequestGridCallBack });

}
var loadCashInLeaveRequestGridCallBack = function (inputDataJSON) {
    bindCashInLeaveRequestGridCallBack(JSON.parse(inputDataJSON.Value));
}
var bindCashInLeaveRequestGridCallBack = function (inputDataJSON) {
    var isHidden = inputDataJSON.length > 0 ? !inputDataJSON[0].isApproverExist : 0;
    var gridColumns = [
        { field: "id", title: "id", hidden: true },
        { field: "days", title: days, hidden: false, width: 30 },
        { field: "date", title: requestDate, hidden: false, width: 30 },
        { field: "statusId", title: "StatusId", hidden: true, width: 30 },
        //{ field: "status", title: "Status", hidden: false, width: 30 },
        {
            title: status,
            field: 'status',
            width: 30,
            hidden: false,
            //template: 1 == 1 ? "<span class='badge badge-success'>#:status#</span>" : "<span class='badge badge-danger'>#:status#</span>"
            template: "#if (statusForCondition.substring(0,7) == 'Decline') { # <span class='badge badge-danger'>#:status#</span> # } else if(statusForCondition == 'Pending') {# <span class='badge badge-primary'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
        },

        //Below is action column
        {
            'title': ' ',
            'field': 'isApproverExist',
            'width': 35,
            //'hidden': false,//'#if(1 == 1) {# false # }  else {# false #}#',
            hidden: isHidden,
            'template': '<button class="btn btn-success btn-sm" value="Accept" onClick= approveCashInLeaveRequest(this);><i class="fa fa-check"></i>' + btnApproveText + '</button><button class="btn btn-danger btn-sm" value="Reject" onClick= declineCashInLeaveRequest(this);><i class="fa fa-ban"></i>' + btnDeclineText + '</button>'
        }


    ];

    $('#RequestGrid').html('');
    bindKendoGrid(RequestGrid, 50, gridColumns, inputDataJSON, true, 300);
    //bindKendoGrid(ShortLeaveRequestGrid, 50, gridColumns, inputDataJSON, true,300);

};
function approveCashInLeaveRequest(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + RequestGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
        title: approveTitleQuestion,
        text: approveText,
        //input: 'text',
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

            var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
            ajaxRequest({ commandName: 'Request_CashInLeave_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, Comment: '', RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, CreatedBy: $('#CreatedBy').val(), Status: 'Approved', Language: _currentLanguage }, CallBack: approveCashInLeaveRequestCallBack });
            //Aprove leave logic here
            //alert(JSON.stringify(dataItem));
            //alert(JSON.stringify( JSON.parse(localStorage.getItem('User'))));
        }
    });
    var approveCashInLeaveRequestCallBack = function (response) {
        loadCashInLeaveRequestGrid();
        swal(response.Value);

    }

}
function declineCashInLeaveRequest(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + RequestGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
        title: declineTitleQuestion,
        text: declineText,
        //input: 'text',
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

            $('#ModalDenyRequestId').val(dataItem.id);
            $('#ModalDenyRequestType').val('CashInLeaveRequest');
            $('#ModalDenyRequest').modal('show');

            //var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
            //ajaxRequest({ commandName: 'Request_LeaveCancel_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, CreatedBy: $('#CreatedBy').val(), Status: 'Decline', Language: _currentLanguage }, CallBack: declineLeaveCancelRequestCallBack });

        }
    });


}
var declineCashInLeaveRequestCallBack = function (response) {
    loadCashInLeaveRequestGrid();
    swal(response.Value);

}
//|Load Cash In Leave Request Grid Ends


