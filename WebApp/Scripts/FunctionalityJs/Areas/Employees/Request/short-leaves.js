var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));

var $ShortLeaveGrid = "ShortLeaveGrid";

$(function () {



    $('#Language').val(_currentLanguage);
    $('#AvailableShortLeave').val(totalShortLeave);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    loadShortLeaveGrid();


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
     


})
 function loadShortLeaveGrid() {

     ajaxRequest({
       //  commandName: 'Request_All_Employee_ShortLeave_GetBySuperiorRole',
         commandName: 'Request_All_Employee_ShortLeave_GetBySuperiorRole',
         values: {
             Id: $('#Id').val(),
             CreatedBy: $('#CreatedBy').val(),
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
        { field: "requestDate", title: requestDate, hidden: false, width: 30 },
        { field: "name", title: lblname, hidden: false, width: 50 },
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

 
//function saveShortLeaveRequest() {
//    if (customValidateForm('frmShortLeaveDetail')) {
//        $("#frmShortLeaveDetail").ajaxForm();
//        buttonAddPleaseWait('btnSave');
//        var options = {
//            success: function (response, statusText, jqXHR) {
//                buttonRemovePleaseWait('btnSave', 'Save', 'save');
//                swal(response);
//                $('#Id').val(0);
//                loadShortLeaveGrid();
//                loadAvailableShortLeaveBalance();
//                clearFields();

//            },
//            error: function (xhr, status, error) {
//                buttonRemovePleaseWait('btnSave', 'Save', 'save');
//                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;

//                swalMessage('error', errmsg, 2000);
//            }
//            , complete: function () {
//                buttonRemovePleaseWait('btnSave', 'Save', 'save');
//            }
//        };
//        $("#frmShortLeaveDetail").ajaxSubmit(options);
//    }
//    else {

//        buttonRemovePleaseWait('btnSave', 'Save', 'save');

//    }

//}

function loopThroughGrid(e) {

    var grid = $("#" + $ShortLeaveGrid).data("kendoGrid");
    var gridRecord = grid.dataSource._data;

    var postingArray = [];
    for (var i = 0; i < gridRecord.length; i++) {
        var isAssigned = grid.tbody.find("tr:eq(" + i + ")").find('.row-checkbox').is(':checked');

        var gridRow = gridRecord[i];

    
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
        
     ajaxRequest({ commandName: 'Request_Employee_Short_Leaves_Save', values: { EmployeeRequestData: postingArray }, CallBack: EmployeeRequestDataCallBack });

       
        


    }
    else {
        buttonRemovePleaseWait('btnSave', btnAccept, 'check');
        swalMessage('info', lblFristSelectRecordFromGrid, 1500);
    }

}
function EmployeeRequestDataCallBack(response) {
    loadShortLeaveGrid();
    swal(response.Value);
    buttonRemovePleaseWait('btnSave', btnAccept, 'check');

}


$(document).on("click", "#checkAll", function () {
   
    if (this.checked) {

        $("#ShortLeaveGrid tbody input:checkbox").attr("checked", true);
    } else {
        $("#ShortLeaveGrid tbody input:checkbox").attr("checked", false);
        //   $("#$ShortLeaveGrid tbody input:checkbox").attr("unchecked", false);

    }
});