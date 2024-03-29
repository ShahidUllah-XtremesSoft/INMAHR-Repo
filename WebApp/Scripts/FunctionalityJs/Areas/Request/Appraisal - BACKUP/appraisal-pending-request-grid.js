﻿var AppraisalPendingGrid = "appraisal-pending-request-grid";

$('#PendingAppraisalTabLi').click(function () {
    loadAppraisalPendingGrid();

});
function loadAppraisalPendingGrid() {
    ajaxRequest({
        commandName: 'Request_Appraisal_Pending',
        values: {
            Employee_Id: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: _currentLanguage
        }, CallBack: load_AppraisalPendingGridCallBack
    });
}
var load_AppraisalPendingGridCallBack = function (inputDataJSON) {

    bindAppraisalPendingGrid(JSON.parse(inputDataJSON.Value));
}
var bindAppraisalPendingGrid = function (inputDataJSON) {


    var gridColumns = [

        { title: "#", template: "<b>#= ++record #</b>", width: 10, },

        { field: "appraisalId", title: "AppraisalId", hidden: true },
        { field: "appraisalPerformanceId", title: "AppraisalPerformanceId", hidden: true },
        { field: "employee_Number", title: "Employee_Number", hidden: true },
        { field: "employeeId", title: "EmployeeId", hidden: true },
        { field: "managerId", title: "ManagerId", hidden: true },
        { field: "departmentId", title: "DepartmentId", hidden: true },
        { field: "employeeName", title: lblFrom, width: 100, filterable: false },
        { field: "manager_Name", title: lblTo, width: 100, filterable: false },
        { field: "departmentName", title: lblSection, width: 100, filterable: false },

        { field: "year", title: lblYear, width: 30, hidden: false, filterable: false },
        // { field: "status", title: lblStatus, width: 30, hidden: false, filterable: false },
        {
            title: lblStatus,
            field: 'status',
            width: 30, filterable: false,
            template: "#if (status == 'Declined') { # <span class='badge badge-danger'>" + lblDecline + "</span> # } else if(status == 'Pending') {# <span class='badge badge-primary'>" + lblPending +"</span> # } else if(status == 'Send') {# <span class='badge badge-success'>"+lblSend+"</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
            //template: `<span class='badge badge-success'>` + lblDecline + `</span>`

        },
        //Below is action column
        {
            field: "", width: 40,
            title: ' ',
            filterable: false,
            //  template: "#if(isRecordExist == 0){ #<a style='font-size:20px;cursor:pointer;' onClick= delete_AppraisalPendingGridById(this)  title='Delete '><span class='fa fa-trash'></span></a>#}" +
            //      "else{ #<a style='font-size:20px;cursor:pointer;' onClick= see_AppraisalDetailsById(this)  title='See Detail '><span class='fa fa-eye'></span></a>#}#"
            template: `#if(status == 'Pending' || status == 'Declined')
{
#
<button type="button" onclick="send_AppraisalPendingGridById(this);"   class="btn-sm btn btn-info    waves-effect" style="font-size: smaller;margin-top: -5px;">` + lblSend + `</button>
<a style='font-size:20px;cursor:pointer;' onClick=edit_AppraisalPendingGridById(this)  title"` + lblEdit + ` "><span class='fa fa-edit'></span></a>
<a style='font-size:20px;cursor:pointer;' onClick= see_AppraisalDetailsById(this)  title='See Detail '><span class='fa fa-eye'></span></a>
 <a style='font-size:20px;cursor:pointer;' onClick=delete_AppraisalPendingGridById(this)  title"` + lblDelete + `"><span class='fa fa-trash'></span></a>

#
}else if(  status != 'Declined'){
#
<a style='font-size:20px;cursor:pointer;' onClick= see_AppraisalDetailsById(this)  title='See Detail '><span class='fa fa-eye'></span></a>
#
}#`

        }
    ];

    bindKendoGrid(AppraisalPendingGrid, 50, gridColumns, inputDataJSON);
};


function send_AppraisalPendingGridById(event) {

    var grid = $("#" + AppraisalPendingGrid).data("kendoGrid");
    var send_dataItem = grid.dataItem($(event).closest("tr"));
    Swal.fire({

        /* title: areYouSureTitle,*/
        text: doYouReallyWantToSendToMAnager,

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
            ajaxRequest({ commandName: 'Request_Appraisal_Status_Update', values: { Id: send_dataItem.appraisalId, Language: _currentLanguage }, CallBack: status_AppraisalPendingGridByIdCallBack });
        }
    });
    var status_AppraisalPendingGridByIdCallBack = function (response) {
        swal(response.Value);
        loadAppraisalPendingGrid();
    }
}

function edit_AppraisalPendingGridById(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + AppraisalPendingGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Request/Appraisal/Self?AppraisalId=' + dataItem.appraisalId + '?' + 'EmployeeId=' + dataItem.employeeId + '?' + 'DepartmentId=' + dataItem.departmentId + '?' + 'Year=' + dataItem.year + '?' + 'ManagerId=' + dataItem.managerId + '';


}

function see_AppraisalDetailsById(event) {

    //  var row = $(event).closest("tr");
    var grid = $("#" + AppraisalPendingGrid).data("kendoGrid");
    var see_dataItem = grid.dataItem($(event).closest("tr"));


    window.location.href = '/Request/Appraisal/Index?AppraisalId=' + see_dataItem.appraisalId + '?' + 'EmployeeId=' + see_dataItem.employeeId + '?' + 'DepartmentId=' + see_dataItem.departmentId + '?' + 'Year=' + see_dataItem.year + '?' + 'ManagerId=' + see_dataItem.managerId + '?' + 'EmployeeNumber=' + see_dataItem.employee_Number + '?' + 'AppraisalPerformanceId=' + see_dataItem.appraisalPerformanceId + '';

}
function delete_AppraisalPendingGridById(event) {

    // var row = $(event).closest("tr");
    var delete_grid = $("#" + AppraisalPendingGrid).data("kendoGrid");
    var delete_dataItem = delete_grid.dataItem($(event).closest("tr"));

    Swal.fire({

        title: areYouSureTitle,
        text: doYouReallyWantToDeletThisRecord,

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
            ajaxRequest({ commandName: 'Appraisal_Request_Delete', values: { Id: delete_dataItem.appraisalId, Language: _currentLanguage }, CallBack: delete_AppraisalPendingGridByIdCallBack });
        }
    });
    var delete_AppraisalPendingGridByIdCallBack = function (response) {
        /*location.reload();*/
        loadAppraisalPendingGrid();
    }

}