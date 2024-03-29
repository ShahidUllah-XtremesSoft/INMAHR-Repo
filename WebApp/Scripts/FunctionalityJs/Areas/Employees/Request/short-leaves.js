﻿var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));

var $ShortLeaveGrid = "ShortLeaveGrid";
var _btnValue = 'Pending';

$(function () {



    $('#Language').val(_currentLanguage);
    $('#AvailableShortLeave').val(totalShortLeave);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    loadShortLeaveGrid('Pending');
    localStorage.setItem('Active_GridArea', 'Pending'); //This is for Request Details Js to see it's pending grid   or approved grid data ...... written by /\/\ati


})
function loadShortLeaveGrid(btnStatus) {

    ajaxRequest({
        //  commandName: 'Request_All_Employee_ShortLeave_GetBySuperiorRole',
        commandName: 'Employees_Request_Permission_Leave_Get',
        values: {
            Id: $('#Id').val(),
            //  CreatedBy: $('#CreatedBy').val(),
            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId,
            Language: _currentLanguage,
            StatusWise: btnStatus
        }, CallBack: loadShortLeaveGridCallBack
    });

}
var loadShortLeaveGridCallBack = function (inputDataJSON) {
    bindShortLeaveGrid(JSON.parse(inputDataJSON.Value));
}
var bindShortLeaveGrid = function (inputDataJSON) {
    var record = 0;
    console.log(inputDataJSON)
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
            width: 8
        },
        { field: "requested_EmployeeId", title: "Requested_EmployeeId", hidden: true },

        { title: "#", template: "<b>#= ++record #</b>", width: 5 },
        { field: "isUpperLevel", title: "isUpperLevel", hidden: true },
        { field: "id", title: "id", hidden: true },
        {
            field: "email", title: empNumber, width: 20, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
            template: "<a style='cursor:pointer;text-decoration:underline;'  class='viewbutton' onClick= redirectToEmployeeDetailView(this)>#=email#</a> ",

        },
        { field: "name", title: lblname, hidden: false, width: 50 },
        { field: "requestDate", title: requestDate, hidden: false, width: 20 },
        { field: "startTime", title: startTime, hidden: false, width: 20 },
        { field: "endTime", title: returnTime, hidden: false, width: 20  },
        { field: "leaveType", title: leaveType, hidden: true, width: 20 },
        { field: "leaveTypeId", title: "leaveTypeId", hidden: true, width: 20 },
        { field: "numberOfHours", title: numberOfHourse, hidden: false, width: 20  },
        {
            field: "totalRemainingDays", title: lblStatus, hidden: false, width: 15, filterable: false,
            template: "#if (totalRemainingDays >=0 && _btnValue=='Pending' )" +
                " { # <span class='badge badge-warning'>" + lblRequestWaiting + "</span> # } else if (totalRemainingDays >=0  && startingDays >0   && _btnValue !='Pending' )" +
                " { # <span class='badge badge-warning'>" + lblRequestWaiting + "</span> # } else if (  startingDays <0   && _btnValue !='Pending'  )" +
                " { # <span class='badge badge-danger'>" + lblRequestExpired + "</span> # } else if (  totalRemainingDays < 0 && _btnValue !='Pending'  )" +
                " { # <span class='badge badge-danger'>" + lblRequestExpired + "</span> # } else if (  startingDays <0   && _btnValue =='Pending'  )" +
                " {# <span class='badge badge-danger'>" + lblRequestExpired + "</span> # } else" +
                " {# <span class='badge badge-success'> " + lblRequestRunning + "</span> # }#"

            //template: "#if (totalRemainingDays >=0 && _btnValue=='Pending' )" +
            //    " { # <span class='badge badge-warning'>" + lblRequestWaiting + "</span> # } else if (totalRemainingDays < 0   )" +
            //    " {# <span class='badge badge-danger'>" + lblRequestExpired + "</span> # } else" +
            //    " {# <span class='badge badge-success'> " + lblRequestRunning + "</span> # }#"

        },
        {
            field: "leaveType", title: " ", filterable: false, width: 20, filterable: false,
         //   template: "<span class='badge badge-info'>#:leaveType#</span>",
            template: "#if (leaveType =='Short Leave' )" +
                " { # <span class=' '>Personal Leave</span> # } else {# <span class=' '> #:leaveType#</span> # }#"
        },
        
        { field: "comment", title: comment, hidden: true, width: 40, filterable: false,  },
        { field: "statusId", title: "StatusId", hidden: true, width: 30 , filterable: false },
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
        //    template: "#if(statusForCondition == 'Pending') { #<a style='font-size:20px;cursor:pointer;' onClick= editShortLeave(this) title='Edit ShortLeave' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteShortLeaveById(this)  title='Delete ShortLeave'><span class='fa fa-trash'></span></a>#}else{}#"

        //}


    ];

    bindKendoGrid($ShortLeaveGrid, 50, gridColumns, inputDataJSON, true);

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
                    commandName: 'Employees_Request_Permission_Leave_ApproveOrDecline',
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

    loadShortLeaveGrid('Pending');
    swal(response.Value);

}

function getIdsFromGrid(btnValue, btnId, btnIcon) {

    var grid = $("#" + $ShortLeaveGrid).data("kendoGrid");
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

        $("#ShortLeaveGrid tbody input:checkbox").attr("checked", true);
    } else {
        $("#ShortLeaveGrid tbody input:checkbox").attr("checked", false);
        //   $("#$ShortLeaveGrid tbody input:checkbox").attr("unchecked", false);

    }
});

//--------------------- FUNCTION AREA ----------------
function fnLoadGridByStatus(btnValue) {
    loadShortLeaveGrid(btnValue);
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
    var grid = $("#" + $ShortLeaveGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
 //   console.log(dataItem)
     
    if (dataItem.isUpperLevel == 0) {
        localStorage.setItem('RequestDetails', JSON.stringify(dataItem));

        window.location.href = '/Employees/Request/Detail/';

    } else {

        localStorage.setItem('EmployeeNumber', dataItem.email);
        localStorage.setItem('LoggedInEmployeeId', dataItem.requested_EmployeeId);
        localStorage.setItem('EmployeeIdToLoadLeaveBalance', dataItem.requested_EmployeeId);
        localStorage.setItem('Employees_Request_Area', window.location.href.split('/').pop());
        window.location.href = '/HumanResource/Employee/Detail/';



    }

}