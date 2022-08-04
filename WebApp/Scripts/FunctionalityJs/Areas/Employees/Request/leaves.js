var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
var RequestGrid = "RequestGrid";
var _btnValue = 'Pending';
$(function () {
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $('#Language').val(_currentLanguage);

    loadLeaveRequestGrid('Pending');
    localStorage.setItem('Active_GridArea', 'Pending'); //This is for Request Details Js to see it's pending grid   or approved grid data ...... written by /\/\ati
});

//|Load Leave Request Grid Starts
function loadLeaveRequestGrid(btnStatus) {

    loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
    ajaxRequest({
        commandName: 'Employees_Request_Leave_Get',
        values: {
            Id: $('#Id').val(),
            //   CreatedBy: $('#CreatedBy').val(),
            LoggedInUserId: loggedInUserDetail.id,
            LoggedInUserRoleId: loggedInUserDetail.roleId,
            LoggedInUserDepartmentId: loggedInUserDetail.departmentId,
            Language: _currentLanguage,
            StatusWise: btnStatus
        }, CallBack: loadLeaveRequestGridCallBack
    });

}
var loadLeaveRequestGridCallBack = function (inputDataJSON) {
    bindLeaveRequestGrid(JSON.parse(inputDataJSON.Value));
}
var bindLeaveRequestGrid = function (inputDataJSON) {
    var record = 0;

    var isHidden = inputDataJSON.length > 0 ? !inputDataJSON[0].isApproverExist : 0;
    var gridColumns = [
        {
            title: '',

            headerTemplate: "<input type='checkbox' id='checkAll'  class='k-checkbox header-checkbox'>",
            template: function (dataItem) {
                if (dataItem.isAssigned == 1) {
                    return "<div><input type='checkbox' class='k-checkbox row-checkbox' id='target' checked ></div>";
                }
                else {
                    return "<div><input type='checkbox' class='k-checkbox row-checkbox' id='target' unchecked='true'></div>";
                }
            },
            width: 5
        },
        { title: "#", template: "<b>#= ++record #</b>", width: 4 },
        { field: "requested_EmployeeId", title: "Requested_EmployeeId", hidden: true },
        { field: "id", title: "id", hidden: true },

        {
            field: "email", title: empNumber, width: 20, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
            template: "<a style='cursor:pointer;text-decoration:underline;'  class='viewbutton' onClick= redirectToEmployeeDetailView(this)>#=email#</a> ",

        },
        { field: "name", title: name, hidden: false, width: 20 },
        { field: "isUpperLevel", title: "isUpperLevel", hidden: true },
        { field: "leaveType", title: leaveType, hidden: false, width: 20 },
        { field: "startDate", title: startDate, hidden: false, width: 20 },
        { field: "endDate", title: endDate, hidden: false, width: 20  },
        { field: "totalDays", title: numberOfDays, hidden: false, width: 15 },
        { field: "request_Attachment", title: "", hidden: true, width: 15 },
        {
            field: "totalRemainingDays", title: lblStatus, hidden: false, width: 15,
            // template: "<span class='badge badge-da'>#:totalRemainingDays#</span>"
            template: "#if (totalRemainingDays >0 && _btnValue=='Pending' )" +
                " { # <span class='badge badge-warning'>" + lblRequestWaiting + "</span> # } else if (totalRemainingDays >0  && startingDays > 0   && _btnValue !='Pending' )" +
                " { # <span class='badge badge-warning'>" + lblRequestWaiting + "</span> # } else if (totalRemainingDays <=0   )" +
                " {# <span class='badge badge-danger'>" + lblRequestExpired + "</span> # } else" +
                " {# <span class='badge badge-success'> " + lblRequestRunning + "</span> # }#"

        },
        { field: "leaveTypeId", title: "leaveTypeId", hidden: true, width: 30 },
        { field: "statusId", title: "StatusId", hidden: true, width: 30 },
        {
            title: status,
            field: 'Status',
            width: 20,
            hidden: true,
            template: "#if (statusForCondition.substring(0,7) == 'Decline') { # <span class='badge badge-danger'>#:status#</span> # } else if(statusForCondition == 'Pending') {# <span class='badge badge-primary'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
        },
        //{
        //    'title': 'Action',
        //    'field': 'isApproverExist',
        //    'width': 20,
        //    filterable: false,
        //    //'hidden': false,//'#if(1 == 1) {# false # }  else {# false #}#',
        //    hidden: true,
        //    'template': '<button class="btn btn-success btn-sm" value="Accept" onClick= approveLeave(this);><i class="fa fa-check"></i>Accept</button><button class="btn btn-danger btn-sm" value="Reject" onClick= declineLeave(this);><i class="fa fa-ban"></i>Decline</button>'
        //},

    ];
    $('#RequestGrid').html('');
    bindKendoGrid(RequestGrid, 50, gridColumns, inputDataJSON, true, 500);
    //setTimeout(function () {
    //    debugger
    //    var grid = $("#" + RequestGrid).data("kendoGrid");
    //    grid.table.on("click", ".checkbox", selectRow);
    //}, 2000);
};


//|Load Leave Request Grid Ends
//| Request Deny Modal Comment, Save Button Click
//$('#btnModalDenyRequestSave').click(function () {


//    if ($('#RequestDenyComment').val() != '') {




//        var requestId = $('#ModalDenyRequestId').val();
//        var comment = $('#RequestDenyComment').val();
//        var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));

//        if ($('#ModalDenyRequestType').val() == 'LeaveRequest') {

//            // ajaxRequest({
//            //     commandName: 'Request_Leave_ApproveOrDecline',
//            //     values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: requestId, CreatedBy: $('#CreatedBy').val(), Comment: comment, Status: 'Decline', Language: _currentLanguage }, CallBack: declineLeaveCallBack
//            // });
//        }

//        $('#RequestDenyComment').val('');
//        $('#ModalDenyRequestId').val('0');
//        $('#ModalDenyRequest').modal('toggle');
//        $('#RequestDenyComment').css('border', '1px solid rgba(0, 0, 0, 0.15)');
//    } else {
//        $('#RequestDenyComment').css('border-color', 'red');
//    }
//});
//| Request Deny Modal Comment, Save Button Click Ends

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
                    commandName: 'Employees_Request_Leave_ApproveOrDecline',
                    values: {
                        LoggedInUser: loggedInUserDetail.id,
                        LoggedInUserDepartmentId: loggedInUserDetail.departmentId,
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

    loadLeaveRequestGrid('Pending');
    swal(response.Value);

}

function getIdsFromGrid(btnValue, btnId, btnIcon) {

    var grid = $("#" + RequestGrid).data("kendoGrid");
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




$(document).on("click", "#checkAll", function () {
    if (this.checked) {

        $("#RequestGrid tbody input:checkbox").attr("checked", true);
    } else {
        $("#RequestGrid tbody input:checkbox").attr("checked", false);


    }
});



//--------------------- FUNCTION AREA ----------------
function fnLoadGridByStatus(btnValue) {

    loadLeaveRequestGrid(btnValue);
    _btnValue = btnValue;
    if (btnValue == 'Pending') {

        setTimeout(function () {

            localStorage.setItem('Active_GridArea', 'Pending'); //This is for Request Details Js to see it's pending grid   or approved grid data ...... written by /\/\ati


            $('#btnAreaShowHideOnConditionBase').show();
            //$(".k-checkbox").show();
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
    var grid = $("#RequestGrid").data("kendoGrid");
    var dataItem = grid.dataItem(row);

     

    var dataItem = grid.dataItem(row);
    if (dataItem.isUpperLevel == 0) {
        localStorage.setItem('RequestDetails', JSON.stringify(dataItem));
        
        window.location.href = '/Employees/Request/Details/';
        
    } else {

        localStorage.setItem('EmployeeNumber', dataItem.email);
        localStorage.setItem('LoggedInEmployeeId', dataItem.requested_EmployeeId);
        localStorage.setItem('EmployeeIdToLoadLeaveBalance', dataItem.requested_EmployeeId);
        localStorage.setItem('Employees_Request_Area', window.location.href.split('/').pop());
        window.location.href = '/HumanResource/Employee/Detail/';



    }

    //  localStorage.setItem('RequestDetails', JSON.stringify(dataItem));
    // window.open('/Employees/Request/Details', '_blank');


}