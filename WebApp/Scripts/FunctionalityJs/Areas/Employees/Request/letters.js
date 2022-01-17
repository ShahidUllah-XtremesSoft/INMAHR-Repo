var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));

var $LetterGrid = "LetterGrid";
$(function () {

    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
     
    loadLetterGrid();
    
})

function loadLetterGrid() {

    ajaxRequest({
        commandName: 'Request_AllEmployee_Letter_Get',
        values: {
            Id: $('#Id').val(),
            CreatedBy: $('#CreatedBy').val(),
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
        { field: "letterType", title: letterType, hidden: false, width: 20 },
        { field: "leaveType", title: letterType, hidden: false, width: 20 },
        { field: "comment", title: comment, hidden: false, width: 20, template: "<span class='badge badge-info'>#:comment#</span>" },
        { field: "note", title: note, hidden: false, width: 20, template: "<span class='badge badge-info'>#:note#</span>" },
        { field: "other", title: Other, hidden: false, width: 15, template: "<span class='badge badge-dark'>#:other#</span>" },
        { field: "LetterTypeId", title: "LetterTypeId", hidden: true, width: 30 },
        { field: "statusId", title: "StatusId", hidden: true, width: 30 },
        {
            title: Status, field: 'statusForCondition', width: 15, hidden: false,
            template: "#if (statusForCondition.substring(0,7) == 'Decline') { # <span class='badge badge-danger'>#:status#</span> # } else if(statusForCondition == 'Pending') {# <span class='badge badge-primary'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
        }


    ];

    bindKendoGrid($LetterGrid, 50, gridColumns, inputDataJSON, true);

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
    debugger
    var grid = $("#" + $LetterGrid).data("kendoGrid");
    var gridRecord = grid.dataSource._data;

    var postingArray = [];
    for (var i = 0; i < gridRecord.length; i++) {
        var isAssigned = grid.tbody.find("tr:eq(" + i + ")").find('.row-checkbox').is(':checked');

        var gridRow = gridRecord[i];

        if (isAssigned == true) {
            postingArray.push(
                {
                    Id: parseInt(gridRow.id),
                    LetterTypeId: parseInt(gridRow.letterTypeId),
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
        alert('');
        //ajaxRequest({ commandName: 'Request_Employee_AllLetter_Save', values: { EmployeeRequestLetterData: postingArray }, CallBack: EmployeeRequestLetterDataCallBack });

    }
    else {

        buttonRemovePleaseWait('btnSave', btnAccept, 'check');
        
        swalMessage('info', lblFristSelectRecordFromGrid, 1500);
    }

}
function EmployeeRequestLetterDataCallBack(response) {
    loadLeave$LetterGrid();
    swal(response.Value);

    buttonRemovePleaseWait('btnSave', btnAccept, 'check');
    

}


$(document).on("click", "#checkAll", function () {

    if (this.checked) {

        $("#$LetterGrid tbody input:checkbox").attr("checked", true);
    } else {
        $("#$LetterGrid tbody input:checkbox").attr("checked", false);

    }
});