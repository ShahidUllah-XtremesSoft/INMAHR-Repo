var CashInLeaveGrid = "CashInLeaveGrid";
$(function () {
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);


    //functions calling
    loadAvailableCashInLeaveBalance();
    loadCashInLeaveGrid();
    //functions calling Ends
    //Events are below
    $('#btnSave').on('click', function (e) {
        if (parseInt($('#Days').val()) > parseInt($('#AvailableBalance').val())) {
            swalMessage('warning', 'Requested days should be less than or equal to available balance');
        }
        else {
            if (customValidateForm('frmCashInLeave')) {
                $("#frmCashInLeave").ajaxForm();
                buttonAddPleaseWait('btnSave');
                var options = {
                    success: function (response, statusText, jqXHR) {
                        buttonRemovePleaseWait('btnSave', 'Save', 'save');
                        swal(response);                        
                        clearFields();
                        loadCashInLeaveGrid();
                        loadAvailableCashInLeaveBalance();
                        

                    },
                    error: function (xhr, status, error) {
                        buttonRemovePleaseWait('btnSave', 'Save', 'save');
                        var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                        alert(errmsg);
                    }
                    , complete: function () {
                        buttonRemovePleaseWait('btnSave', 'Save', 'save');
                    }
                };
                $("#frmCashInLeave").ajaxSubmit(options);
            }
            else {

                buttonRemovePleaseWait('btnSave', 'Save', 'save');

            }
        }
    });

   
});
function clearFields() {
    $('#Id').val(0);    
    $('#Days').val('0');
    $('#AvailableBalance').val('');    
}
function loadAvailableCashInLeaveBalance() {
    ajaxRequest({ commandName: 'Request_CashInLeave_GetEmployeeAvailableBalance', values: { CreatedBy: JSON.parse(localStorage.getItem('User')).id, Language: _currentLanguage }, CallBack: loadAvailableCashInLeaveBalanceCallBack });

}
function loadAvailableCashInLeaveBalanceCallBack(response) {    
    $('#AvailableBalance').val(JSON.parse(response.Value).remainingBalance);
}
function loadCashInLeaveGrid() {

    ajaxRequest({ commandName: 'Request_CashInLeave_Get', values: { Id: $('#Id').val(), CreatedBy: $('#CreatedBy').val(), LoggedInUserId: JSON.parse(localStorage.getItem('User')).id, LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId, LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId, Language: _currentLanguage }, CallBack: loadCashInLeaveGridCallBack });

}
var loadCashInLeaveGridCallBack = function (inputDataJSON) {
    bindCashInLeaveGrid(JSON.parse(inputDataJSON.Value));
}
var bindCashInLeaveGrid = function (inputDataJSON) {
    var gridColumns = [
        { field: "id", title: "id", hidden: true },
        { field: "days", title: days, hidden: false, width: 30 },
        { field: "date", title: requestDate, hidden: false, width: 30 },
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
        {
            field: "", width: 10,
            title: ' ',
            template: "#if(statusForCondition == 'Pending') { #<a style='font-size:20px;cursor:pointer;' onClick= editCashInLeave(this) title='Edit CashInLeave' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteCashInLeaveById(this)  title='Delete CashInLeave'><span class='fa fa-trash'></span></a>#}else{}#"

        }


    ];

    bindKendoGrid(CashInLeaveGrid, 50, gridColumns, inputDataJSON, true);

};
function editCashInLeave(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + CashInLeaveGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#Id').val(dataItem.id);
    $('#Days').val(dataItem.days);
    //$("#RequestDate").data("kendoDatePicker").value(dataItem.requestDate);
    //$("#StartTime").data("kendoTimePicker").value(dataItem.startTime);
    //$("#EndTime").data("kendoTimePicker").value(dataItem.endTime);
    //
    //calculateDaysFromStartEndDate();

}
function deleteCashInLeaveById(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + CashInLeaveGrid).data("kendoGrid");
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
        text: areYouSureText,
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
            ajaxRequest({ commandName: 'Request_CashInLeave_Delete', values: { Id: dataItem.id, CreatedBy: $('#CreatedBy').val(), Language: $('#Language').val() }, CallBack: deleteCashInLeaveByIdCallBack });
        }
    });
    var deleteCashInLeaveByIdCallBack = function (response) {
        $('#Id').val(0);
        swal(response.Value);
        loadCashInLeaveGrid();
        loadAvailableCashInLeaveBalance();
    }
}
