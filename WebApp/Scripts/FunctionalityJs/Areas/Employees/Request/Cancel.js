var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));

var CancelGrid = "CancelGrid";
$(function () {
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    loadCancelLeaveGrid('Pending');

});
 
function loadCancelLeaveGrid(btnStatus) {

    ajaxRequest({
        commandName: 'Employees_Request_Leave_Cancellation_Get', values: {
            Id: $('#Id').val(),
            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId,
            Language: _currentLanguage,
            StatusWise: btnStatus

        }, CallBack: loadCancelLeaveGridCallBack
    });
}
var loadCancelLeaveGridCallBack = function (inputDataJSON) {
    bindLeaveCancelGrid(JSON.parse(inputDataJSON.Value));
}
var bindLeaveCancelGrid = function (inputDataJSON) {
    var record = 0;

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
        { field: "id", title: "id", hidden: true },
        { field: "requestLeaveId", title: "requestLeaveId", hidden: true },
        { field: "email", title: empNumber, hidden: false, width: 20 },
        { field: "name", title: lblName, hidden: false, width: 50 },

        { field: "leave", title: leaveName, hidden: true, width: 30 },
        { field: "startDate", title: startDate, hidden: false, width: 20  },
        //{ field: "endDate", title: endDate, hidden: false, width: 20, template: "<span class='badge badge-danger'>#:endDate#</span>" },
        //{ field: "commentEng", title: commentEng, hidden: false, width: 30 },
        /*{ field: "commentArb", title: commentArb, hidden: false, width: 30 },*/
        { field: "comment", title: comment, hidden: true, width: 30 },
        //        { field: "status", title: "Status", hidden: false, width: 30 },
        {
            title: status,
            field: 'status',
            width: 30,
            hidden: true,
            //template: 1 == 1 ? "<span class='badge badge-success'>#:status#</span>" : "<span class='badge badge-danger'>#:status#</span>"
            template: "#if (statusForCondition.substring(0,7) == 'Decline') { # <span class='badge badge-danger'>#:status#</span> # } else if(statusForCondition == 'Pending') {# <span class='badge badge-primary'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
        },

        //Below is action column
        //{
        //    field: "", width: 10,
        //    title: ' ',
        //    template: "# if(statusForCondition == 'Pending') { #<a style='font-size:20px;cursor:pointer;' onClick= editLeaveCancel(this) title='Edit Leave' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteLeaveById(this)  title='Delete Leave'><span class='fa fa-trash'></span></a>#}else{}#  "
        //
        //}


    ];

    bindKendoGrid(CancelGrid, 50, gridColumns, inputDataJSON, true);

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
                    commandName: 'Employees_Request_Leave_Cancellation_ApproveOrDecline',
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

    loadCancelLeaveGrid('Pending');

    swal(response.Value);

}

function getIdsFromGrid(btnValue, btnId, btnIcon) {

    var grid = $("#" + CancelGrid).data("kendoGrid");
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

        $("#CancelGrid tbody input:checkbox").attr("checked", true);
    } else {
        $("#CancelGrid tbody input:checkbox").attr("checked", false);
        //   $("#CancelGrid tbody input:checkbox").attr("unchecked", false);

    }
});

//--------------------- FUNCTION AREA ----------------
function fnLoadGridByStatus(btnValue) {
    loadCancelLeaveGrid(btnValue);

    if (btnValue == 'Pending') {

        setTimeout(function () {
            $('#btnAreaShowHideOnConditionBase').show();
            //$(".k-checkbox").show();
            $('.header-checkbox').show();
            $('.k-checkbox.row-checkbox').show();
        }, 50);
    } else {
        setTimeout(function () {
            $('#btnAreaShowHideOnConditionBase').hide();
            $('.header-checkbox').hide();
            $('.k-checkbox.row-checkbox').hide();
        }, 50);
    }
}