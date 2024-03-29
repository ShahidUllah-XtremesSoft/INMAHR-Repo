﻿
var $LeaveGrid = "LeaveGrid";
var createdBy = 0, roleId = 0, departmentId = 0, isIgnoreLeaveAvailableBalanceForHR = false;

$(function () {
    setTimeout(function () {

        /*  $('.tox-tinymce').css('height', '387px');*/
        $('.tox-notification--warning').css('display', 'none');
    }, 1000);
    employeeIdQueryString = (new URL(location.href)).searchParams.get('employeeId');
    userIdQueryString = (new URL(location.href)).searchParams.get('userId');
    departmentIdQueryString = (new URL(location.href)).searchParams.get('departmentId');
    roleIdQueryString = (new URL(location.href)).searchParams.get('roleId');

    if (employeeIdQueryString == null) {
        createdBy = JSON.parse(localStorage.getItem('User')).id;;
        roleId = JSON.parse(localStorage.getItem('User')).roleId;
        departmentId = JSON.parse(localStorage.getItem('User')).departmentId;
        isIgnoreLeaveAvailableBalanceForHR = false;

    }
    else {
        createdBy = userIdQueryString;
        roleId = roleIdQueryString;
        departmentId = departmentIdQueryString;
        isIgnoreLeaveAvailableBalanceForHR = true;
    }

    $('#CreatedBy').val(createdBy);
    loadLeaveTypeDropdownList(true);
    //$("#StartDate").kendoDatePicker({
    //    format: "yyyy-MM-dd",
    //    // specifies that DateInput is used for masking the input element
    //    dateInput: true
    //    });
    //$("#EndDate").kendoDatePicker({
    //    format: "yyyy-MM-dd"
    //});
    renderKendoDatePicker('StartDate');
    renderKendoDatePicker('EndDate');

    $('#Language').val(_currentLanguage);
    $("#OtherDiv").css('display', 'none');


    loadLeaveGrid();

    //| Below are events

    //var startDateDatePicker = $("#StartDate").data("kendoDatePicker");
    //var previousDate = new Date(startDateDatePicker.value());
    //previousDate.setDate(previousDate.getDate() - 1);
    //datePicker.value(previousDate);
    //$("#StartDate").data("kendoDatePicker").trigger("startDateChangeEvent");
    var startDateDatePicker = $("#StartDate").data("kendoDatePicker");
    startDateDatePicker.bind("change", function () {
        //var value = this.value();
        ///* The result can be observed in the DevTools(F12) console of the browser. */
        //console.log(value); //value is the selected date in the datepicker
        //var dateobj = kendo.parseDate(value);
        //console.log(kendo.toString(dateobj, "MM-dd-yyyy")); //value is the selected date in the datepicker
        //compareStartEndDate($("#StartDate").data("kendoDatePicker").value(), $("#EndDate").data("kendoDatePicker").value());
        calculateDaysFromStartEndDate();
    });


    $('#btnSave').on('click', function (e) {
        if (compareStartEndDate($("#StartDate").val(), $("#EndDate").val())) {
            if (requestedDaysShouldBeLessOrEqualToAvailable()) {

                saveLeaveRequest();
            }

        }
    });
    var endDateDatePicker = $("#EndDate").data("kendoDatePicker");
    endDateDatePicker.bind("change", function () {
        //var value = this.value();
        //var dateobj = kendo.parseDate(value);
        //console.log(kendo.toString(dateobj, "MM-dd-yyyy")); //value is the selected date in the datepicker
        //alert($("#StartDate").data("kendoDatePicker").value());
        //if ($("#StartDate").data("kendoDatePicker").value() > $("#EndDate").data("kendoDatePicker").value()) {
        //    alert('no');
        //}
        //compareStartEndDate($("#StartDate").data("kendoDatePicker").value(), $("#EndDate").data("kendoDatePicker").value());
        calculateDaysFromStartEndDate();

    });
})
function compareStartEndDate(startDate, endDate) {
    if (startDate > endDate) {
        //   swalMessage('info', 'start date can not be less than end date', 2000);
        swalMessage('info', startdatecannotbegreaterthanenddate, 2000);
        //$("#EndDate").data("kendoDatePicker").value('');
        return false;
    }
    return true;
}
function calculateDaysFromStartEndDate() {

    if ($("#StartDate").data("kendoDatePicker").value() != null && $("#EndDate").data("kendoDatePicker").value() != null) {
        var dateDifference = (kendo.parseDate($("#EndDate").data("kendoDatePicker").value()) - kendo.parseDate($("#StartDate").data("kendoDatePicker").value()));

        var days = ((dateDifference / 1000 / 60 / 60 / 24) + 1);

        $('#TotalDays').val(Math.trunc(days));
    }
    else {
        $('#TotalDays').val(0);
    }
}
function requestedDaysShouldBeLessOrEqualToAvailable() {
    if ($('#Id').val() == '0') {
        if (parseInt($("#TotalDays").val()) > parseInt($('#AvailableLeave').val())) {
            //  swalMessage('info', 'Requested day(s) should be less than or equal to available balance', 2500);

            //If logged in user is HR and want to add leave for absent employees should be allowed
            if (!isIgnoreLeaveAvailableBalanceForHR) {
                swalMessage('info', requesteddaysshouldbelessthanorequaltoavailablebalance, 2500);
                return false;
            }
        }
    }
    else {
        if ($('#AvailableLeave').val() == '0' && $('#TotalDays').val() > $('#EditLeavDays').val()) {
            //If logged in user is HR and want to add leave for absent employees should be allowed
            if (!isIgnoreLeaveAvailableBalanceForHR) {
                swalMessage('info', requesteddaysshouldbelessthanorequaltoavailablebalance, 2500);
                return false;
            }
        }
    }
    return true;
}
function loadLeaveTypeDropdownList(isBindChangeEvent = false) {

    loadKendoDropdownByTypeName('LeaveTypeId', 'LeaveType');

    setTimeout(function () {
        if (isBindChangeEvent) {
            $("#LeaveTypeId").data("kendoDropDownList").bind("change", leaveTypeDropdownListOnChange);
        }
    }, 1500);
}
function leaveTypeDropdownListOnChange(e) {
    var dataItem = e.sender.dataItem();


    //if (dataItem.text == 'Annual Leave') {
    //    $('#AvailableLeave').val(annualLeaveTotalAvailableDays);
    //}
    //if (dataItem.text == 'Administrative Leave') {
    //    $('#AvailableLeave').val(administrativeLeaveTotalAvailableDays);
    //}
    //if (dataItem.text == 'Hajj Leave') {
    //    $('#AvailableLeave').val(hajjLeaveTotalAvailableDays);
    //}
    //if (dataItem.text == 'Satisfying Leave') {
    //    $('#AvailableLeave').val(satisfyingLeaveTotalAvailableDays);
    //}
    //console.log(JSON.parse(localStorage.getItem('User')));


    loadAvailableLeaveBalance(dataItem.value);

    if (dataItem.value == 9) // 9 value = "Sick Leave" || value = "أجازة مرضية"
    {
        $("#Attachment").prop('required', 'required');
        $('#asteric_span').show();
    } else {

        $("#Attachment").prop('required', false);
        $(".div-attachment").find('span')[1] != undefined ? $(".div-attachment").find('span')[1].innerHTML = '' : '';
        $('#asteric_span').hide();
    }
}
function loadAvailableLeaveBalance(setupTypeDetailId = 0) {
    ajaxRequest({ commandName: 'Request_Leave_GetEmployeeAvailableBalance', values: { CreatedBy: createdBy, SetupTypeDetailId: setupTypeDetailId, Language: _currentLanguage }, CallBack: loadAvailableLeaveBalanceCallBack });

}
function loadAvailableLeaveBalanceCallBack(response) {
    //debugger;
    //console.log(response);

    $('#AvailableLeave').val(JSON.parse(response.Value).remainingBalance);
}
function loadLeaveGrid() {

    //ajaxRequest({ commandName: 'Request_Leave_Get', values: { Id: $('#Id').val(), CreatedBy: $('#CreatedBy').val(), LoggedInUserId: 0, Language: _currentLanguage }, CallBack: loadLeaveGridCallBack });
    ajaxRequest({ commandName: 'Request_Leave_Get', values: { Id: $('#Id').val(), CreatedBy: $('#CreatedBy').val(), LoggedInUserId: createdBy, LoggedInUserRoleId: roleId, LoggedInUserDepartementId: departmentId, Language: _currentLanguage }, CallBack: loadLeaveGridCallBack });

}
var loadLeaveGridCallBack = function (inputDataJSON) {
    bindLeaveGrid(JSON.parse(inputDataJSON.Value));
}
var bindLeaveGrid = function (inputDataJSON) {
    //   console.log(inputDataJSON);
    var record = 0;
    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },
        { field: "id", title: "id", hidden: true },
        { field: "leaveType", title: leaveType, hidden: false, width: 30, filterable: false },
        { field: "startDate", title: startDate, hidden: false, width: 30, filterable: false },
        { field: "endDate", title: endDate, hidden: false, width: 30, filterable: false },
        { field: "totalDays", title: numberOfDays, hidden: false, width: 30, filterable: false },
        { field: "leaveTypeId", title: "leaveTypeId", hidden: true, width: 30 },
        { field: "statusId", title: "StatusId", hidden: true, width: 30 },
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
        {
            field: "currentFileName",
            title: " ",
            hidden: false,
            width: 20,
            filterable: false,
            template: " #  if (currentFileName == null )" +
                " { # <label class='pcoded-badge label label-danger'> </label># }" +
                "else if(currentFileName.split('.')[1]=='pdf')" +
                " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/pdf.png'        style='width:30%;cursor: pointer;'/> </a># }else if(currentFileName.split('.')[1]=='xlsx')" +
                " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/xls.png'        style='width:30%;cursor: pointer;'/> </a># }else if(currentFileName.split('.')[1]=='docs' || currentFileName.split('.')[1]=='docx'|| currentFileName.split('.')[1]=='doc')" +
                " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/docx.png'       style='width:30%;cursor: pointer;'/> </a># } else" +
                " { # <a  target='_blank' href='/UploadFile/#=currentFileName #'>  <img class='' src='/Content/Images/attachment-icon.png' style='width:30%';cursor: pointer; /></a> #} #"


        }, {
            field: "leave_Remarks", title: lblRemarks, hidden: false, width: 10, filterable: false,
            template: " <a style='font-size:20px;cursor:pointer;' onClick=show_Leave_Remarks(this)  ><span class='fa fa-eye'></span></a> "



        },

        //Below is action column
        {
            field: ""
            , width: 10,
            title: action,
            filterable: false,
            template: "# if (statusForCondition == 'Pending') { # " +
                //"<a style='font-size:20px;cursor:pointer;' onClick= editLeave(this) title='Edit Leave' ><span class='fa fa-edit'></span></a> " +
                " <a style='font-size:20px;cursor:pointer;' onClick= deleteLeaveById(this)  title='Delete Leave'><span class='fa fa-trash'></span></a> # } else {}   #"
            //template: "<a style='font-size:20px;cursor:pointer;' onClick= editLeave(this) title='Edit Leave' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteLeaveById(this)  title='Delete Leave'><span class='fa fa-trash'></span></a>  "

        }


    ];

    bindKendoGrid($LeaveGrid, 50, gridColumns, inputDataJSON, true);

};
function editLeave(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $LeaveGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    loadAvailableLeaveBalance(dataItem.leaveTypeId);
    $('#Id').val(dataItem.id);
    $('#Note').val(dataItem.note);
    $('#Other').val(dataItem.other);
    $('#EditLeavDays').val(dataItem.totalDays);

    var dropdownlist = $("#LeaveTypeId").data("kendoDropDownList");
    dropdownlist.value(dataItem.leaveTypeId);
    $("#StartDate").data("kendoDatePicker").value(dataItem.startDate);
    $("#EndDate").data("kendoDatePicker").value(dataItem.endDate);

    $("#Leave_Remarks").val(tinymce.get("Leave_Remarks").setContent(dataItem.leave_Remarks));

    dropdownlist.trigger("change")
    calculateDaysFromStartEndDate();
    //setTimeout(function () {
    //    if ($('#AvailableLeave').val() == '0' || $('#AvailableLeave').val() == '') {
    //        $('#AvailableLeave').val(dataItem.totalDays);
    //    }
    //}, 1000);
}
function saveLeaveRequest() {
    $("#Leave_Remarks").val(tinymce.get("Leave_Remarks").getContent({ format: "html" }));
    if (customValidateForm('frmLeaveDetail')) {
        $("#frmLeaveDetail").ajaxForm();
        buttonAddPleaseWait('btnSave');
        var options = {
            success: function (response, statusText, jqXHR) {
                buttonRemovePleaseWait('btnSave', lblSend, 'send');
                swal(response);
                $('#Id').val(0);
                loadLeaveGrid();
                //loadAvailableLeaveBalance();
                clearFields();

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
        $("#frmLeaveDetail").ajaxSubmit(options);
    }
    else {

        buttonRemovePleaseWait('btnSave', lblSend, 'send');

    }

}
function clearFields() {
    $('#frmLeaveDetail')[0].reset();
    $('#Id').val(0);
    //renderKendoDatePicker('StartDate');
    //renderKendoDatePicker('EndDate');
    //var startDateDatePicker = $("#StartDate").data("kendoDatePicker");
    //if (startDateDatePicker != undefined) {

    //    startDateDatePicker.destroy();
    //    $("#StartDate").kendoDatePicker({
    //        format: "yyyy-MM-dd"
    //    });
    //}
    //var startDateDatePicker = $("#EndDate").data("kendoDatePicker");
    //if (startDateDatePicker != undefined) {

    //    startDateDatePicker.destroy();
    //    $("#EndDate").kendoDatePicker({
    //        format: "yyyy-MM-dd"
    //    });
    //}
    //$("#StartDate").data("kendoDatePicker").value('');
    //$("#EndDate").data("kendoDatePicker").value('');
    //$('#TotalDays').val('0');
    //$('#AvailableLeave').val('');
    //var dropdownlist = $("#LeaveTypeId").data("kendoDropDownList");
    //dropdownlist.value(-1);
}
function deleteLeaveById(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $LeaveGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
        title: areYouSureTitle,
        text: doYouReallyWantToDeletThisRecord,
        //input: 'text',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
        cancelButtonText: btnNoText,
        confirmButtonText: btnYesText,
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
            ajaxRequest({ commandName: 'Request_Leave_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteLeaveByIdCallBack });
        }
    });
    var deleteLeaveByIdCallBack = function (response) {
        $('#Id').val(0);
        swal(response.Value);
        loadLeaveGrid();
        location.reload();
        // loadLeaveTypeDropdownList(true);
        //loadAvailableLeaveBalance();
    }
}
function show_Leave_Remarks(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $LeaveGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
      

    Swal.fire({
        title: lblRemarks,
        html: dataItem.leave_Remarks,
    });
}


