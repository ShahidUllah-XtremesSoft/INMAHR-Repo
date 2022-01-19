﻿var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));

var $LetterGrid = "LetterGrid";
$(function () {

    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    loadLetterGrid();

})

function loadLetterGrid() {

    ajaxRequest({
        // commandName: 'Request_AllEmployee_Letter_Get', old sp
        commandName: 'Employees_Request_Letter_Get',
        values: {
            Id: $('#Id').val(),
            //     CreatedBy: $('#CreatedBy').val(),
            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId,
            Language: _currentLanguage
        }, CallBack: loadLetterGridCallBack
    });
}
var loadLetterGridCallBack = function (inputDataJSON) { bindLetterGrid(JSON.parse(inputDataJSON.Value)); }
var bindLetterGrid = function (inputDataJSON) {
    var gridColumns = [
        {
            title: '',

            headerTemplate: "<input type='checkbox' id='checkAll'  class='k-checkbox header-checkbox'>",
            template: function (dataItem) {
                if (dataItem.isAssigned == 1) { return "<div><input type='checkbox' class='k-checkbox row-checkbox' id='target' checked ></div>"; }
                else { return "<div><input type='checkbox' class='k-checkbox row-checkbox' id='target' unchecked='true'></div>"; }
            },
            width: 5
        },
        { field: "id", title: "id", hidden: true },
        { field: "name", title: name, hidden: false, width: 20 },
        { field: "leaveType", title: letterType, hidden: false, width: 20 },
        { field: "startDate", title: startDate, hidden: false, width: 20, template: "<span class='badge badge-success'>#:startDate#</span>" },
        { field: "comment", title: comment, hidden: false, width: 20, template: "<span class='badge badge-info'>#:comment#</span>" },
        //{ field: "other", title: Other, hidden: false, width: 15, template: "<span class='badge badge-dark'>#:other#</span>" },
        { field: "letterTypeId", title: "LetterTypeId", hidden: true, width: 30 },
        { field: "statusId", title: "StatusId", hidden: true, width: 30 },
        {
            title: Status, field: 'statusForCondition', width: 15, hidden: false,
            template: "#if (statusForCondition.substring(0,7) == 'Decline') { # <span class='badge badge-danger'>#:status#</span> # } else if(statusForCondition == 'Pending') {# <span class='badge badge-primary'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
        }


    ];

    bindKendoGrid($LetterGrid, 50, gridColumns, inputDataJSON, true);

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
                    commandName: 'Employees_Request_Letter_ApproveOrDecline',
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

    loadLetterGrid();
    swal(response.Value);

}

function getIdsFromGrid(btnValue, btnId, btnIcon) {

    var grid = $("#" + $LetterGrid).data("kendoGrid");
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
        $("#LetterGrid tbody input:checkbox").attr("checked", true);
    } else {
        $("#LetterGrid tbody input:checkbox").attr("checked", false);

    }
});