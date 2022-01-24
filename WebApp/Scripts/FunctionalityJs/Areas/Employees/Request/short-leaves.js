﻿var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));

var $ShortLeaveGrid = "ShortLeaveGrid";

$(function () {



    $('#Language').val(_currentLanguage);
    $('#AvailableShortLeave').val(totalShortLeave);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    loadShortLeaveGrid();
     

})
 function loadShortLeaveGrid() {

     ajaxRequest({
       //  commandName: 'Request_All_Employee_ShortLeave_GetBySuperiorRole',
         commandName: 'Employees_Request_Permission_Leave_Get',
         values: {
             Id: $('#Id').val(),
           //  CreatedBy: $('#CreatedBy').val(),
             LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
             LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,
             LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId,
             Language: _currentLanguage
         }, CallBack: loadShortLeaveGridCallBack
     });

}
var loadShortLeaveGridCallBack = function (inputDataJSON) {
    bindShortLeaveGrid(JSON.parse(inputDataJSON.Value));
}
var bindShortLeaveGrid = function (inputDataJSON) {
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
        { field: "id", title: "id", hidden: true },
        { field: "name", title: lblname, hidden: false, width: 50 },
        { field: "requestDate", title: requestDate, hidden: false, width: 30, template: "<span class='badge badge-info'>#:requestDate#</span>" },
        { field: "startTime", title: startTime, hidden: false, width: 30, template: "<span class='badge badge-info'>#:startTime#</span>" },
        { field: "endTime", title: returnTime, hidden: false, width: 30, template: "<span class='badge badge-danger'>#:endTime#</span>" },
        { field: "leaveType", title: leaveType, hidden: true, width: 30 },
        { field: "leaveTypeId", title: "leaveTypeId", hidden: true, width: 30 },
        { field: "numberOfHours", title: numberOfHourse, hidden: false, width: 30, template: "<span class='badge badge-dark'>#:numberOfHours#</span>"},
        { field: "comment", title: comment, hidden: false, width: 40 },
        { field: "statusId", title: "StatusId", hidden: true, width: 30 },
        {
            title: status,
            field: 'status',
            width: 30,
            hidden: false,
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
        text: areYouSureText,
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

                buttonRemovePleaseWait(btnId, btnValue, btnIcon);
            }


        } else {
            buttonRemovePleaseWait(btnId, btnValue, btnIcon);
        }
    });

}
var responseCallBack = function (response) {

    loadShortLeaveGrid();
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