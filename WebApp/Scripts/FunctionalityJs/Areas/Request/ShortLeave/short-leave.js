
var $ShortLeaveGrid = "ShortLeaveGrid";

$(function () {
    


    $('#Language').val(_currentLanguage);
    $('#AvailableShortLeave').val(totalShortLeave);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
   
    renderKendoDatePicker('RequestDate');
    renderKendoTimePicker('StartTime');
    renderKendoTimePicker('EndTime');
    /*
    $("#RequestDate").kendoDatePicker({
        format: "yyyy-MM-dd"
    });
    $("#StartTime").kendoTimePicker({
        timeFormat: "HH:mm",
        min: '09:00 AM',
        max:'06:00 PM',
        animation: {
            close: {
                effects: "fadeOut zoom:out",
                duration: 300
            },
            open: {
                effects: "fadeIn zoom:in",
                duration: 300
            }
        }
    });
    $("#EndTime").kendoTimePicker({
        timeFormat: "HH:mm",
        min: '09:00 AM',
        max: '06:00 PM',
        animation: {
            close: {
                effects: "fadeOut zoom:out",
                duration: 300
            },
            open: {
                effects: "fadeIn zoom:in",
                duration: 300
            }
        }
    });
   */
    loadShortLeaveGrid();
    $('#btnSave').on('click', function (e) {
        if ($('#NumberOfHours').val() == "0") {
            swalMessage('info', 'Number of hours cannot be zero', 2000);
            return;
        }
        
        if ($('#AvailableShortLeave').val() == '0' && $('#NumberOfHours').val() > $('#EditLeaveHours').val()) {
            swalMessage('info', 'Can not apply with available balance 0',2000);
        }
        else {
            if (compareStartEndTime($("#StartTime").val(), $("#EndTime").val())) {
                if (requestedHoursShouldBeLessOrEqualToAvailable()) {
                    saveShortLeaveRequest();
                }
            }
        }
       
    });


    var startDateDatePicker = $("#StartTime").data("kendoTimePicker");
    startDateDatePicker.bind("change", function () {       
        calculateHourFromStartEndTime();
    });


    var endDateDatePicker = $("#EndTime").data("kendoTimePicker");
    endDateDatePicker.bind("change", function () {        
        calculateHourFromStartEndTime();
    
    });
    loadAvailableShortLeaveBalance();
})


 
 


function compareStartEndTime(startTime, endTime) {
    debugger;
    startTime = convertTime12to24(startTime);
    endTime = convertTime12to24(endTime);
    var startTimeSeconds = convertHHMMToSeconds(startTime);
    var endTimeSeconds = convertHHMMToSeconds(endTime);
                
        if (startTimeSeconds > endTimeSeconds) {
            swalMessage('info', 'start time can not be less than end time', 2000);
            //$("#RequestDate").data("kendoDatePicker").value('');
            return false;
        }
        
    return true;
}
function calculateHourFromStartEndTime() {
    if ($("#StartTime").data("kendoTimePicker").value() != null && $("#EndTime").data("kendoTimePicker").value() != null) {
        var dateDifference = ($("#StartTime").data("kendoTimePicker").value() - $("#EndTime").data("kendoTimePicker").value());
        dateDifference = (-1) * dateDifference;        
        //var days = ((dateDifference / 1000 / 60 / 60 / 24) + 1);
        var days = (dateDifference / (60 * 60 * 1000));
        $('#NumberOfHours').val(days);        
    }
    else {
        $('#NumberOfHours').val(0);
    }
}
function requestedHoursShouldBeLessOrEqualToAvailable() {
    debugger;
    if ($('#Id').val() == '0') {
        if (parseFloat($("#NumberOfHours").val()) > parseFloat($('#AvailableShortLeave').val())) {
            swalMessage('info', 'Requested hour(s) should be less than or equal to available balance', 2500);
            return false;
        }
    }
    else {
        
        if ($('#AvailableShortLeave').val() == '0' && $('#NumberOfHours').val() > $('#EditLeaveHours').val()) {
            swalMessage('info', 'start time can not be less than end time', 2000);
            return false;
        }
    }
    return true;
}
function loadShortLeaveGrid() {

    ajaxRequest({ commandName: 'Request_ShortLeave_Get', values: { Id: $('#Id').val(), CreatedBy: $('#CreatedBy').val(), LoggedInUserId: JSON.parse(localStorage.getItem('User')).id, LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId, LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId, Language: _currentLanguage }, CallBack: loadShortLeaveGridCallBack });   

}
var loadShortLeaveGridCallBack = function (inputDataJSON) {
    bindShortLeaveGrid(JSON.parse(inputDataJSON.Value));
}
var bindShortLeaveGrid = function (inputDataJSON) {
    var gridColumns = [
        { field: "id", title: "id", hidden: true },
        { field: "requestDate", title: requestDate, hidden: false, width: 30 },
        { field: "startTime", title: startTime, hidden: false, width: 30 },
        { field: "endTime", title: returnTime, hidden: false, width: 30 },
        { field: "numberOfHours", title: numberOfHourse, hidden: false, width: 30 },
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
            template: "#if(statusForCondition == 'Pending') { #<a style='font-size:20px;cursor:pointer;' onClick= editShortLeave(this) title='Edit ShortLeave' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteShortLeaveById(this)  title='Delete ShortLeave'><span class='fa fa-trash'></span></a>#}else{}#"

        }


    ];

    bindKendoGrid($ShortLeaveGrid, 50, gridColumns, inputDataJSON, true);

};
function editShortLeave(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $ShortLeaveGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#Id').val(dataItem.id);    
    $('#EditLeaveHours').val(dataItem.numberOfHours);
    $("#RequestDate").data("kendoDatePicker").value(dataItem.requestDate);
    $("#StartTime").data("kendoTimePicker").value(dataItem.startTime);
    $("#EndTime").data("kendoTimePicker").value(dataItem.endTime);
    
    calculateHourFromStartEndTime();

}
function saveShortLeaveRequest() {
    if (customValidateForm('frmShortLeaveDetail')) {
        $("#frmShortLeaveDetail").ajaxForm();
        buttonAddPleaseWait('btnSave');
        var options = {
            success: function (response, statusText, jqXHR) {
                buttonRemovePleaseWait('btnSave', save, 'save');
                swal(response);
                $('#Id').val(0);
                loadShortLeaveGrid();
                loadAvailableShortLeaveBalance();
                clearFields();

            },
            error: function (xhr, status, error) {
                buttonRemovePleaseWait('btnSave', save, 'save');
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                
                swalMessage('error', errmsg, 2000);
            }
            , complete: function () {
                buttonRemovePleaseWait('btnSave', save, 'save');
            }
        };
        $("#frmShortLeaveDetail").ajaxSubmit(options);
    }
    else {

        buttonRemovePleaseWait('btnSave', save, 'save');

    }

}
function clearFields() {
    $('#frmShortLeaveDetail')[0].reset();
    $('#Id').val(0);    
    $('#NumberOfHours').val('0');
    //renderKendoDatePicker('RequestDate');
    //renderKendoTimePicker('StartTime');
    //renderKendoTimePicker('EndTime');
    
    
   
}
function deleteShortLeaveById(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $ShortLeaveGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
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
            ajaxRequest({ commandName: 'Request_ShortLeave_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteShortLeaveByIdCallBack });
        }
    });
    var deleteShortLeaveByIdCallBack = function (response) {
        $('#Id').val(0);
        swal(response.Value);
        loadShortLeaveGrid();
        loadAvailableShortLeaveBalance();
    }
}
function loadAvailableShortLeaveBalance() {
    ajaxRequest({ commandName: 'Request_ShortLeave_GetEmployeeAvailableBalance', values: { CreatedBy: JSON.parse(localStorage.getItem('User')).id, Language: _currentLanguage }, CallBack: get_EmployeeShortLeavesAvailableBalanceCallBack });

}
function get_EmployeeShortLeavesAvailableBalanceCallBack(response) {
     
    //console.log(response);
    $('#AvailableShortLeave').val(JSON.parse(response.Value).remainingBalance);
}




function fnTest() {
    alert('check test by M');
    alert('added this by Shahid khan');
}