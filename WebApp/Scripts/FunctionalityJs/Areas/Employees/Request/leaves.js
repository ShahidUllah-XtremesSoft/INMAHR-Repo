var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
var RequestGrid = "RequestGrid";
$(function () {
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $('#Language').val(_currentLanguage);

    loadLeaveRequestGrid();
});

//|Load Leave Request Grid Starts
function loadLeaveRequestGrid() {

    loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
    ajaxRequest({
        commandName: 'Employees_Request_Leave_Get',
        values: {
            Id: $('#Id').val(),
         //   CreatedBy: $('#CreatedBy').val(),
            LoggedInUserId: loggedInUserDetail.id,
            LoggedInUserRoleId: loggedInUserDetail.roleId,
            LoggedInUserDepartmentId: loggedInUserDetail.departmentId,
            Language: _currentLanguage
        }, CallBack: loadLeaveRequestGridCallBack
    });

}
var loadLeaveRequestGridCallBack = function (inputDataJSON) {
    bindLeaveRequestGrid(JSON.parse(inputDataJSON.Value));
}
var bindLeaveRequestGrid = function (inputDataJSON) {

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
        { field: "id", title: "id", hidden: true },
        { field: "name", title: name, hidden: false, width: 20 },
        { field: "leaveType", title: leaveType, hidden: false, width: 20 },
        { field: "startDate", title: startDate, hidden: false, width: 20, template: "<span class='badge badge-info'>#:startDate#</span>" },
        { field: "endDate", title: endDate, hidden: false, width: 20, template: "<span class='badge badge-danger'>#:endDate#</span>" },
        { field: "totalDays", title: numberOfDays, hidden: false, width: 15, template: "<span class='badge badge-dark'>#:totalDays#</span>" },
        { field: "leaveTypeId", title: "leaveTypeId", hidden: true, width: 30 },
        { field: "statusId", title: "StatusId", hidden: true, width: 30 },
        {
            title: status,
            field: 'Status',
            width: 20,
            hidden: false,
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
 
//function declineLeave(event) {

//    var row = $(event).closest("tr");
//    var grid = $("#" + RequestGrid).data("kendoGrid");
//    var dataItem = grid.dataItem(row);
//    Swal.fire({
//        title: declineTitle,
//        text: declineText + " " + dataItem.leaveType,
//        //input: 'text',
//        icon: 'question',
//        showCancelButton: true,
//        confirmButtonColor: '#5cb85c',
//        cancelButtonColor: '#d9534f',
//        confirmButtonText: btnYesText,
//        cancelButtonText: btnNoText,
//        buttons: {
//            cancel: {
//                text: "No",
//                value: null,
//                visible: true,
//                className: "btn btn-danger",
//                closeModal: true
//            },
//            confirm: {
//                text: "Yes",
//                value: true,
//                visible: true,
//                className: "btn btn-warning",
//                closeModal: true
//            }
//        }
//    }).then(function (restult) {
//        if (restult.value) {


//            $('#ModalDenyRequestType').val('LeaveRequest');
//            $('#ModalDenyRequestId').val(dataItem.id);
//            $('#ModalDenyRequest').modal('show');

//        }
//    });
//}
var declineLeaveCallBack = function (response) {
    loadLeaveRequestGrid();
    swal(response.Value);

}
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


$('#btnSave').click(function () {
    buttonAddPleaseWait('btnSave');

    loopThroughGrid();
    buttonRemovePleaseWait('btnSave', btnAccept, 'check');

    /*
    setTimeout(function () {
        $('#header-chb').change(function (ev) {

            var checked = ev.target.checked;
            $('.row-checkbox').each(function (idx, item) {
                if (checked) {
                    if (!($(item).closest('tr').is('.k-state-selected'))) {
                        $(item).click();
                    }
                } else {
                    if ($(item).closest('tr').is('.k-state-selected')) {
                        $(item).click();
                    }
                }
            });
        });
        //bind click event to the checkbox
        grid = $("#" + RequestGrid).data("kendoGrid");
        grid.table.on("click", ".row-checkbox", selectRow);

        $('.kendo-direction').removeClass('k-rtl');
        if (_currentLanguage == 'ar-AE') {
            $('.kendo-direction').addClass('k-rtl');
        }
    }, 5000);
    */
});
$('#btnCancel').click(function () {
    buttonAddPleaseWait('btnCancel');
    loopThroughGrid();
    buttonRemovePleaseWait('btnCancel', btnDecline, 'ban');
});

function loopThroughGrid(e) {

    var grid = $("#" + RequestGrid).data("kendoGrid");
    var gridRecord = grid.dataSource._data;

    var postingArray = [];
    for (var i = 0; i < gridRecord.length; i++) {
        var isAssigned = grid.tbody.find("tr:eq(" + i + ")").find('.row-checkbox').is(':checked');

        var gridRow = gridRecord[i];

        //   if (isAssigned == true || gridRow.id > 0) {
        if (isAssigned == true) {
            postingArray.push(
                {
                    Id: parseInt(gridRow.id),
                    LeaveTypeId: parseInt(gridRow.leaveTypeId),
                    StatusId: parseInt(gridRow.statusId),
                    CreatedBy: parseInt($('#CreatedBy').val()),
                    LoggedInUserId: loggedInUserDetail.id,
                    LoggedInUserRoleId: loggedInUserDetail.roleId,
                    LoggedInUserDepartementId: loggedInUserDetail.departmentId,
                    Language: _currentLanguage
                });
        }

    }
    if (postingArray.length > 0) {
        ajaxRequest({ commandName: 'Request_Employee_AllLeaves_Save', values: { EmployeeRequestData: postingArray }, CallBack: EmployeeRequestDataCallBack });
    }
    else {
        buttonRemovePleaseWait('btnSave', btnAccept, 'check');
        swalMessage('info', lblFristSelectRecordFromGrid, 1500);
    }

}
function EmployeeRequestDataCallBack(response) {
    loadLeaveRequestGrid();
    swal(response.Value);
    buttonRemovePleaseWait('btnSave', btnAccept, 'check');

}


$(document).on("click", "#checkAll", function () {
     if (this.checked) {

        $("#RequestGrid tbody input:checkbox").attr("checked", true);
    } else {
        $("#RequestGrid tbody input:checkbox").attr("checked", false);
        //   $("#RequestGrid tbody input:checkbox").attr("unchecked", false);

    }
});