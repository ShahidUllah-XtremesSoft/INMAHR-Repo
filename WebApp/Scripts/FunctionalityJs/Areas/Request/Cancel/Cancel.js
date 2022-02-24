
var CancelGrid = "CancelGrid";
$(function () {
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    LoadRequestLeaveDropdown();
    loadCancelLeaveGrid();

});

function LoadRequestLeaveDropdown() {
    ajaxRequest({
        commandName: 'Request_Leave_GetDropdown', values: { CreatedBy: $('#CreatedBy').val(), Language: _currentLanguage }, controlId: 'LeaveRequestId', CallBack: loadjQueryDropdownListCallBack
    });
}

function loadCancelLeaveGrid() {

    //ajaxRequest({ commandName: 'Request_LeaveCancel_Get', values: { Language: _currentLanguage }, CallBack: fnloadCancelLeaveGrid });
    ajaxRequest({ commandName: 'Request_LeaveCancel_Get', values: { Id: $('#Id').val(), CreatedBy: $('#CreatedBy').val(), LoggedInUserId: JSON.parse(localStorage.getItem('User')).id, LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId, LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId, Language: _currentLanguage }, CallBack: loadCancelLeaveGridCallBack });
}
var loadCancelLeaveGridCallBack = function (inputDataJSON) {
    bindLeaveCancelGrid(JSON.parse(inputDataJSON.Value));
}
var bindLeaveCancelGrid = function (inputDataJSON) {
    var record = 0;
    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },
        { field: "id", title: "id", hidden: true },
        { field: "requestLeaveId", title: "requestLeaveId", hidden: true },
        { field: "leave", title: leaveName, hidden: false, width: 30, filterable: false },
        { field: "startDate", title: startDate, hidden: false, width: 30, filterable: false },
        { field: "endDate", title: endDate, hidden: false, width: 30, filterable: false },
        { field: "commentEng", title: commentEng, hidden: false, width: 30, filterable: false },
        { field: "commentArb", title: commentArb, hidden: false, width: 30, filterable: false },
        { field: "comment", title: comment, hidden: false, width: 30, filterable: false },
        //        { field: "status", title: "Status", hidden: false, width: 30 },
        {
            title: status,
            field: 'status',
            width: 30,
            hidden: false,
            filterable: false,
            //template: 1 == 1 ? "<span class='badge badge-success'>#:status#</span>" : "<span class='badge badge-danger'>#:status#</span>"
            template: "#if (statusForCondition.substring(0,7) == 'Decline') { # <span class='badge badge-danger'>#:status#</span> # } else if(statusForCondition == 'Pending') {# <span class='badge badge-primary'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
        },

        //Below is action column
        {
            field: "", width: 10,
            title: ' ',
            filterable: false,
            template: "# if(statusForCondition == 'Pending') { #<a style='font-size:20px;cursor:pointer;' onClick= editLeaveCancel(this) title='Edit Leave' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteLeaveById(this)  title='Delete Leave'><span class='fa fa-trash'></span></a>#}else{}#  "

        }


    ];

    bindKendoGrid(CancelGrid, 50, gridColumns, inputDataJSON, true);

};

$('#btnSave').on('click', function (e) {

    if (customValidateForm('frmLeaveCancel')) {
        $("#frmLeaveCancel").ajaxForm();
        buttonAddPleaseWait('btnSave');
        var options = {
            success: function (response, statusText, jqXHR) {
                buttonRemovePleaseWait('btnSave', lblSend, 'send');
                swal(response);
                $('#Id').val(0);
                loadCancelLeaveGrid();
                clearFields();
                LoadRequestLeaveDropdown();

            },
            error: function (xhr, status, error) {
                buttonRemovePleaseWait('btnSave', lblSend, 'send');
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
            , complete: function () {
                buttonRemovePleaseWait('btnSave', lblSend, 'send');
            }
        };
        $("#frmLeaveCancel").ajaxSubmit(options);
    }
    else {

        buttonRemovePleaseWait('btnSave', lblSend, 'send');
    }

});


function clearFields() {

    $('#CommentArb').val('');
    $('#CommentEng').val('');
    var dropdownlist = $("#LeaveRequestId").data("kendoDropDownList");
    dropdownlist.value(-1);
}

function deleteLeaveById(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + CancelGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
        //title: 'Are you sure?',
        //text: "Do you really want to delete selected record",
        ////input: 'text',
        //icon: 'question',
        //showCancelButton: true,
        //confirmButtonColor: '#5cb85c',
        //cancelButtonColor: '#d9534f',
        //buttons: {
        //    cancel: {
        //        text: "No",
        //        value: null,
        //        visible: true,
        //        className: "btn btn-danger",
        //        closeModal: true
        //    },
        //    confirm: {
        //        text: "Yes",
        //        value: true,
        //        visible: true,
        //        className: "btn btn-warning",
        //        closeModal: true
        //    }
        //}
        title: areYouSureTitle,
        text: doYouReallyWantToDeletThisRecord,
        //input: 'text',
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
            ajaxRequest({ commandName: 'Request_LeaveCancel_Delete', values: { Id: dataItem.id, Language: _currentLanguage, UserID: 0 }, CallBack: deleteLeaveCancelByIdCallBack });
        }
    });

}
var deleteLeaveCancelByIdCallBack = function (response) {

    swal(response.Value);
    location.reload();
    loadCancelLeaveGrid();
}

function editLeaveCancel(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + CancelGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#Id').val(dataItem.id);
    $('#CommentEng').val(dataItem.commentEng);
    $('#CommentArb').val(dataItem.commentArb);
    var dropdownlist = $("#LeaveRequestId").data("kendoDropDownList");
    dropdownlist.value(dataItem.requestLeaveId);
    dropdownlist.trigger("change");


}