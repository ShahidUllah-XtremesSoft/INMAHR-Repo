var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));

var CashInLeaveGrid = "CashInLeaveGrid";
$(function () {
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    //functions calling 
    loadCashInLeaveGrid();
    //functions calling Ends
    //Events are below
});
function loadCashInLeaveGrid() {

    ajaxRequest({
      //  commandName: 'Request_Employees_All_CashInLeave_Get', old sp
        commandName: 'Employees_Request_CashInLeave_Get',
        values: {
            Id: $('#Id').val(),
         //   CreatedBy: $('#CreatedBy').val(),
            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId,
            Language: _currentLanguage
        }, CallBack: loadCashInLeaveGridCallBack
    });

}
var loadCashInLeaveGridCallBack = function (inputDataJSON) {
    bindCashInLeaveGrid(JSON.parse(inputDataJSON.Value));
}
var bindCashInLeaveGrid = function (inputDataJSON) {
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
        { field: "days", title: days, hidden: false, width: 30, template: "<span class='badge badge-dark'>#:days#</span>" },
        { field: "createdDate", title: requestDate, hidden: false, width: 30, template: "<span class='badge badge-info'>#:date#</span>" },
        { field: "comment", title: comment, hidden: false, width: 30 },
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
        //  {
        //      field: "", width: 10,
        //      title: ' ',
        //      template: "#if(statusForCondition == 'Pending') { #<a style='font-size:20px;cursor:pointer;' onClick= editCashInLeave(this) title='Edit CashInLeave' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteCashInLeaveById(this)  title='Delete CashInLeave'><span class='fa fa-trash'></span></a>#}else{}#"
        //
        //  }


    ];

    bindKendoGrid(CashInLeaveGrid, 50, gridColumns, inputDataJSON, true);

};

$('#btnSave').click(function () {
    buttonAddPleaseWait('btnSave');

    loopThroughGrid();
    buttonRemovePleaseWait('btnSave', btnAccept, 'check');

});
$('#btnCancel').click(function () {
    buttonAddPleaseWait('btnCancel');
    loopThroughGrid();
    buttonRemovePleaseWait('btnCancel', btnDecline, 'ban');
});

function loopThroughGrid(e) {

    var grid = $("#" + CashInLeaveGrid).data("kendoGrid");
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
                    Days: parseInt(gridRow.days),
                    RequestLeaveId: gridRow.requestLeaveId == null ? 0 : parseInt(gridRow.requestLeaveId),
                    Date: gridRow.date,
                    StatusId: parseInt(gridRow.statusId),
                    CreatedBy: parseInt($('#CreatedBy').val()),
                    LoggedInUserId: loggedInUserDetail.id,
                    LoggedInUserRoleId: loggedInUserDetail.roleId,
                    LoggedInUserDepartementId: loggedInUserDetail.departmentId,
                    Language: _currentLanguage,
                    Status: gridRow.status,
                    Comment: '',
                });
        }

    }
    if (postingArray.length > 0) {
        ajaxRequest({
            commandName: 'Request_Employee_CashInLeave_ApprovedORDeclined',
            values: { EmployeeRequestData: postingArray }, CallBack: EmployeeRequestDataCallBack
        });
    }
    else {
        buttonRemovePleaseWait('btnSave', btnAccept, 'check');
        swalMessage('info', lblFristSelectRecordFromGrid, 1500);
    }

}
function EmployeeRequestDataCallBack(response) {
    loadLeaveCashInLeaveGrid();
    swal(response.Value);
    buttonRemovePleaseWait('btnSave', btnAccept, 'check');

}


$(document).on("click", "#checkAll", function () {
    if (this.checked) {

        $("#CashInLeaveGrid tbody input:checkbox").attr("checked", true);
    } else {
        $("#CashInLeaveGrid tbody input:checkbox").attr("checked", false);
        //   $("#CashInLeaveGrid tbody input:checkbox").attr("unchecked", false);

    }
});