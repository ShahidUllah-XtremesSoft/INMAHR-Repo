var attendanceGrid = "AttendanceGrid";
var isLoggedInUserHR = JSON.parse(localStorage.getItem('User')).isHR;
$(function () {

    if (!isLoggedInUserHR) {
        $('.divSearchControls').css('display', 'none');
    }
    else {
        $('#btnProcess').css('margin-top', '33px');
    }

    if (JSON.parse(localStorage.getItem('User')).roleName == "Chairman") {
        $('.divSearchControls').css('display', 'block');
    }
    else {

        $('#btnProcess').css('margin-top', '33px');
    }





    // Encrypt
    //var employeeIdQueryString = (new URL(location.href)).searchParams.get('employeeId');
    //var userIdQueryString = (new URL(location.href)).searchParams.get('userId');
    //var departmentIdQueryString = (new URL(location.href)).searchParams.get('departmentId');
    //var roleIdQueryString = (new URL(location.href)).searchParams.get('roleId');
    //alert(employeeIdQueryString);

    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    $("#CheckinDate").kendoDatePicker({
        format: "yyyy-MM-dd"
    });
    loadDepartmentTreeDropdownList();
    loadAttendance_LeaveDropdownList();
    //loadDepartmentTreeDropdownListWithCheckbox();
    loadAttendanceGrid('Employee_Attendance_TodayAttendance_Get', { CreatedBy: JSON.parse(localStorage.getItem('User')).id, LoggedInUserDepartmentId: JSON.parse(localStorage.getItem('User')).departmentId, SearchByDepartmentId: 0, RoleId: JSON.parse(localStorage.getItem('User')).roleId, Language: _currentLanguage });
    setTimeout(function () {
        $("#DepartmentId").data("kendoDropDownTree").bind("change", departmentTreeViewCheck);
        //var treeview = $("#DepartmentId").data("kendoDropDownTree");
        //treeview.bind("check", tree_check);
    }, 1000);

    $('#btnSearch').click(function () {
        var Department = $('#DepartmentId').val();
        if (Department == '' || Department == null) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                //   title: 'Please select department',
                title: select + ' ' + section,
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }
        //searchAttendanceByDepartment();
        loadAttendanceGrid('Employee_Attendance_TodayAttendance_Get', { CreatedBy: JSON.parse(localStorage.getItem('User')).id, LoggedInUserDepartmentId: JSON.parse(localStorage.getItem('User')).departmentId, SearchByDepartmentId: $('#DepartmentId').val(), RoleId: JSON.parse(localStorage.getItem('User')).roleId, Language: _currentLanguage });
    });
    $('#btnProcess').click(function () {
        Swal.fire({
            //title: 'Are you sure?',
            //text: "Do you really want to process today's attendance?",
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
                //Write code here if yes                
                var attendanceIds = getAttendanceIdsFromGrid();
                ajaxRequest({ commandName: 'Employee_Attendance_UpdateTodayAttendanceAsProcessed', values: { CreatedBy: JSON.parse(localStorage.getItem('User')).id, DepartmentId: JSON.parse(localStorage.getItem('User')).departmentId, AttendanceIds: attendanceIds, Language: _currentLanguage }, CallBack: updateTodayAttendanceAsProcessedCallBack });
            }
        });
    });
    $('#btnShowAll').click(function () {
        $("#DepartmentId").data("kendoDropDownTree").value('');
        loadAttendanceGrid('Employee_Attendance_TodayAttendance_Get', { CreatedBy: JSON.parse(localStorage.getItem('User')).id, LoggedInUserDepartmentId: JSON.parse(localStorage.getItem('User')).departmentId, SearchByDepartmentId: 0, RoleId: JSON.parse(localStorage.getItem('User')).roleId, Language: _currentLanguage });

    });
});
var updateTodayAttendanceAsProcessedCallBack = function (response) {



    loadAttendanceGrid('Employee_Attendance_TodayAttendance_Get', { CreatedBy: JSON.parse(localStorage.getItem('User')).id, LoggedInUserDepartmentId: JSON.parse(localStorage.getItem('User')).departmentId, SearchByDepartmentId: $('#DepartmentId').val(), RoleId: JSON.parse(localStorage.getItem('User')).roleId, Language: _currentLanguage });
    swal(response.Value);

}
//UPDATE Employee_Attendance SET IsProcessed = 1 WHERE CONVERT(DATE,CheckInDate) = CONVERT(DATE,GETDATE()) AND IsProcessed = 0
//function loadAttendanceGrid() {

//    var checkInDate = $("#CheckinDate").data("kendoDatePicker").value() == null ? '' : $("#CheckinDate").val();
//    var loggedInEmployeeId = JSON.parse(localStorage.getItem('User')).employeeId;
//    ajaxRequest({ commandName: 'Employee_Attendance_SaveForToday', values: { CreatedBy: JSON.parse(localStorage.getItem('User')).id, Language: _currentLanguage }, CallBack: loadAttendanceGridCallBack });
//}
//var loadAttendanceGridCallBack = function (inputDataJSON) {

//    bindAttendanceGrid(JSON.parse(inputDataJSON.Value));
//}
//var bindAttendanceGrid = function (inputDataJSON) {
//    if (inputDataJSON.length > 0) {

//        if (inputDataJSON[0].isProcessed) {
//            $('#btnProcess').removeClass('btn-success').addClass('btn-primary');
//            $('#btnProcess').text("Today's attendance already processed");
//            $('#btnProcess').css('pointer-events', 'none');
//        }
//    }
//    var gridColumns = [

//        { field: "id", title: "id", hidden: true },
//        { field: "employeeId", title: 'EmployeeId', width: 100, filterable: true, hidden: true },
//        { field: "employeeName", title: employeeName, width: 100, filterable: true },
//        { field: "departmentId", title: 'DepartmentId', width: 100, filterable: true, hidden: true },
//        { field: "departmentName", title: department, width: 100, filterable: true },
//        { field: "checkInDate", title: checkinDate, width: 100, filterable: true },
//        { field: "checkInTime", title: checkinTime, width: 100, filterable: true },
//        { field: "checkOutTime", title: checkoutTime, width: 100, filterable: true, hidden: false },
//        //{ field: "status", title: status, width: 100, filterable: true }
//        {
//            title: status,
//            field: 'status',
//            width: 100,
//            hidden: false,

//            //template: "#if (status != 'Present') { # <span class='badge badge-danger'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
//        },
//    ];

//    bindKendoGrid(attendanceGrid, 50, gridColumns, inputDataJSON, true, 750);
//};

function searchAttendanceByDepartment() {

    var checkInDate = $("#CheckinDate").data("kendoDatePicker").value() == null ? '' : $("#CheckinDate").val();
    var loggedInEmployeeId = JSON.parse(localStorage.getItem('User')).employeeId;
    ajaxRequest({ commandName: 'Employee_Attendance_Today_GetByDepartment', values: { DepartmentId: $('#DepartmentId').val(), Language: _currentLanguage }, CallBack: searchAttendanceByDepartmentCallBack });
}
var searchAttendanceByDepartmentCallBack = function (inputDataJSON) {

    bindAttendanceGrid(JSON.parse(inputDataJSON.Value));
}

function departmentTreeViewCheck(e) {

    //console.log("Checking", e.sender._values);
    $('#DepartmentIds').val('');
    var selectedDepartments = e.sender._values;
    var concatenatedDepartments = '';
    selectedDepartments.forEach(function (item) {
        concatenatedDepartments += concatenatedDepartments == '' ? item : ',' + item;
    });
    //alert(concatenatedDepartments);
    $('#DepartmentIds').val(concatenatedDepartments);
    //alert($('#DepartmentIds').val());
}
function loadAttendanceGrid(command, inputJSON) {

    //var checkInDate = $("#CheckinDate").data("kendoDatePicker").value() == null ? '' : $("#CheckinDate").val();
    //var loggedInEmployeeId = JSON.parse(localStorage.getItem('User')).employeeId;
    ajaxRequest({ commandName: command, values: inputJSON, CallBack: loadAttendanceGridCallBack });
}
var loadAttendanceGridCallBack = function (inputDataJSON) {

    bindAttendanceGrid(JSON.parse(inputDataJSON.Value));
}
var bindAttendanceGrid = function (inputDataJSON) {

    if (inputDataJSON.length > 0) {

        processButtonToggling(inputDataJSON);
        var isHR = !inputDataJSON[0].isHR;
    }
    inputDataJSON.sort(function (a, b) {

        // return a.departmentId - b.departmentId;
        //  return a.parentId - b.parentId;
        if (a.companyName < b.companyName) {
            return -1;
        }
    });
    var record = 0;
    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 55, },
        { field: "id", title: "id", hidden: true },
        {
            field: "employeeNumber", title: empNum, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
            template: "<a style='cursor:pointer;text-decoration:underline;'  class='viewbutton' onClick= redirectToEmployeeDetailView(this)  title='Employee Number'>#=employeeNumber#</a> ",

        },
        { field: "employeeId", title: 'EmployeeId', width: 10, filterable: true, hidden: true },
        { field: "employeeName", title: employeeName, width: 300, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "departmentId", title: 'DepartmentId', width: 300, filterable: true, hidden: true },
        { field: "departmentName", title: department, width: 190, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "checkInDate", title: checkinDate, width: 100, filterable: false },
        {
            title: status,
            field: 'status',
            width: 100,
            hidden: false,
            filterable: false,
            template: "#if (status =='Late')" +
                " { # <span class=''>" + lblLate + "</span> # }" +
                "else if (status == 'Present')" +
                " { # <span class=''>" + lblPresent + "</span> # }" +
                " else if(status == 'Absent')" +
                " {  # <span class=''>" + lblAbsent + "</span> # }  " +
                " else if(status == 'Site')" +
                " {  # <span class=''>" + lblSite + "</span> # }  " +
                "else {# <span class='badge badge-primary'>#:status#</span> #}#"
            //   , footerTemplate: "<span class=''>" + lblPresent + ":<span   class='footerPresentPlaceholder'  >0</span></span> | <span class=''>" + lblAbsent + ":<span   class='footerAbsentPlaceholder' style='color:red;'>0</span></span>"

        },
        {
            title: lblMorning + " / " + lblEvening, headerAttributes: { style: "text-align: center;" },
            columns: [
                //  { field: "checkInTime", title: checkinTime, width: 100, filterable: false },
                { field: "checkInTime", title: lblIn, width: 100, filterable: false, headerAttributes: { style: "text-align: center;" }, template: "#if (lateInTime =='' && remarks =='') { # <span style='color:green;'>#:checkInTime#</span> #}else {# <span style='color:red;'>#:checkInTime#</span> #}#" },
                { field: "checkOutTime", title: lblOut, width: 100, filterable: false, hidden: false, headerAttributes: { style: "text-align: center;" }, template: "#if (earlyOutTime =='' && remarks =='') { # <span style='color:green;'>#:checkOutTime#</span> #}else {# <span style='color:red;'>#:checkOutTime#</span> #}#" },


            ]
        }, {
            title: lblBreak, headerAttributes: { style: "text-align: center;" },
            columns: [
                { field: "breakIn", title: lblOut, width: 70, filterable: false, hidden: false, headerAttributes: { style: "text-align: center;" } },
                { field: "breakOut", title: lblIn, width: 80, filterable: false, hidden: false, headerAttributes: { style: "text-align: center;" } },
            ]
        }, {

            field: "totalDelayTime", title: lblDelay, width: 80, filterable: false, hidden: false, headerAttributes: { style: "text-align: center;" }//, attributes: { "class": "lateforAttedance " }
            , template: "#if (totalDelayTime !='') { # <span class=' ' style='color:red;'>#:totalDelayTime#</span> #}#"
        },

        /*
        {
            title: "", headerAttributes: { style: "text-align: center;" },
            columns: [
                //   { field: "checkOutTime", title: checkoutTime, width: 100, filterable: false, hidden: false },
                //{ field: "checkOutTime", title: lblOut, width: 70, filterable: false, hidden: false, headerAttributes: { style: "text-align: center;" } },
                {
                    //    field: "lateInTime", title: lateTimeIn, width: 100, filterable: false, hidden: false//, attributes: { "class": "badge  badge-dark" }
                    field: "totalDelayTime", title: lblDelay, width: 80, filterable: false, hidden: false, headerAttributes: { style: "text-align: center;" }//, attributes: { "class": "lateforAttedance " }
                    , template: "#if (totalDelayTime !='') { # <span class=' ' style='color:red;'>#:totalDelayTime#</span> #}#"
                    //  , footerTemplate: "<span class=''> <span   class='footerLateTimeInPlaceholder' style='color:red;'>0</span></span>"
                },
                {
                    field: "earlyOutTime", title: lblEarly, width: 100, filterable: false, hidden: false, headerAttributes: { style: "text-align: center;" }//, attributes: { "class": "lateforAttedance " }
                    , template: "#if (earlyOutTime !='') { # <span class='lateforAttedance'>#:earlyOutTime#</span> #}#"
                    , format: "{0:HH:mm}"
                    , footerTemplate: "<span class=''><span   class='footerLateTimeOutPlaceholder' style='color:red;'>0</span></span>"
                },
            ]
        },
        */
        //   { field: "breakIn", title: lblBreakIn, width: 100, filterable: false, hidden: false },
        //   { field: "breakOut", title: lblBreakOut, width: 100, filterable: false, hidden: false },

        { field: "remarks", title: lblRemarks, width: 300, filterable: false, hidden: false },
        {
            field: "", width: 115,
            title: '',
            hidden: isHR,
            ////template: "#if(isLoginAssigned === 0) {#<div><button class='btn btn-primary btn-sm'  onClick= createLogin(this)><span class='fa fa-user'></span> " + btnGridCreateLogin + "</button>#}if(isLoginAssigned == 1) {#<div class='btn btn-success btn-sm'><i class='fa fa-check' aria-hidden='true'></i> " + btnGridAlreadyCreated + "</div>#}#",
            //template: "#if(isLoginAssigned === 0) {#<div><button class='btn btn-primary btn-sm'  onClick= createLogin(this)><span class='fa fa-user'></span> " + btnGridCreateLogin + "</button>#} " +
            //    " if(isLoginAssigned == 1) { #<div class= 'btn btn-success btn-sm' onClick= UpdateLogin(this) > <i class='fa fa-check' aria-hidden='true'></i> " + btnGridAlreadyCreated + "</div> #}#",

            template: "#if (status == 'Absent')" +
                " { # <div><button class='btn btn-success btn-sm'  onClick= redirecToLeaveRequest(this) style='font-weight: normal;'><span class='fa fa-plus'></span> " + 'Add Leave' + "</button</div> # } else {#  #} #"


        },
    ];

    bindAttendanceKendoGridOnly(attendanceGrid, 50, gridColumns, inputDataJSON, true, 750);
    fnGridColors();
    calculateFooterData();
    /*
    setTimeout(function () {
        var grid = $("#" + attendanceGrid).data("kendoGrid");
        var gridData = grid.dataSource.view();
        var totalPresent = 0, totalAbsent = 0, totallateInTime = 0, totalLate = 0;

        var t1 = "00:00:00";
        var lateTimeInSeconds = 0, lateTimeInMinutes = 0, lateTimeInHours = 0, earlyTimeOutSeconds = 0, earlyTimeOutMinutes = 0, earlyTimeOutHours = 0;

        for (var i = 0; i < gridData.length; i++) {

            //if (gridData[i].changeColor == 'Yes') {
            //    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("highlighted-row");
            //}
            if (gridData[i].status == 'Absent') {

                if (gridData[i].departmentId == 11) { // 11 is super vision department id ,this color will be orange as per Company Manager Engr.Muhammad Demand.
                    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("badge-warning");


                } else {

                    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("badge-danger");
                }
                totalAbsent++;

            }
            else if (gridData[i].status == 'Present' || gridData[i].status == 'Late') {
                totalPresent++;
                grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("badge-success");
                if (gridData[i].status == 'Late') {
                    totalLate++;
                }
            }

            if (gridData[i].lateInTime != "" && gridData[i].lateInTime != null) {

                totallateInTime++;
                // grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("badge-success");
            }

            //else {

            //    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("badge-primary");
            //}
            if (gridData[i].lateInTime != '') {
                var t2 = gridData[i].lateInTime.split(':');
                lateTimeInSeconds = lateTimeInSeconds + parseInt(Number(t2[2]));
                lateTimeInMinutes = lateTimeInMinutes + parseInt(Number(t2[1]));
                lateTimeInHours = lateTimeInHours + parseInt(Number(t2[0]));

            }
            if (gridData[i].earlyOutTime != '') {
                var earlyOutTime = gridData[i].earlyOutTime.split(':');
                earlyTimeOutSeconds = earlyTimeOutSeconds + parseInt(Number(earlyOutTime[2]));
                earlyTimeOutMinutes = earlyTimeOutMinutes + parseInt(Number(earlyOutTime[1]));
                earlyTimeOutHours = earlyTimeOutHours + parseInt(Number(earlyOutTime[0]));

            }
        }
        lateTimeInSeconds = lateTimeInSeconds + (lateTimeInMinutes * 60) + (lateTimeInHours * 3600);
        var grandTotalLateInTime = ('0' + (parseInt(lateTimeInSeconds / (60 * 60)))).slice(-2) + ":" +
            ('0' + (parseInt(lateTimeInSeconds / 60 % 60))).slice(-2) + ":" +
            ('0' + (lateTimeInSeconds % 60)).slice(-2);

        earlyTimeOutSeconds = earlyTimeOutSeconds + (earlyTimeOutMinutes * 60) + (earlyTimeOutHours * 3600);
        var grandTotalEarlyTimeOut = ('0' + (parseInt(earlyTimeOutSeconds / (60 * 60)))).slice(-2) + ":" +
            ('0' + (parseInt(earlyTimeOutSeconds / 60 % 60))).slice(-2) + ":" +
            ('0' + (earlyTimeOutSeconds % 60)).slice(-2);

        //$(".footerLateTimeInPlaceholder").text(totallateInTime);
        $(".footerLateTimeInPlaceholder").text(grandTotalLateInTime);
        $(".footerLateTimeOutPlaceholder").text(grandTotalEarlyTimeOut);
        $(".footerPresentPlaceholder").text(totalPresent);
        $(".footerAbsentPlaceholder").text(totalAbsent);
        $(".footerLatePlaceholder").text(totalLate);
 

    }, 100);
    */


};
function redirectToEmployeeDetailView(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + attendanceGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);


    localStorage.setItem('EmployeeNumber', dataItem.employeeNumber);
    localStorage.setItem('LoggedInEmployeeId', dataItem.employeeId);
    localStorage.setItem('EmployeeIdToLoadLeaveBalance', dataItem.employeeId);


    localStorage.setItem('EmployeeIdForAttendance', dataItem.employeeId);
    localStorage.setItem('EmployeeNumberForAttendance', dataItem.employeeNumber);
    window.location.href = '/Employees/Attendance/Detail';//?employeeId=' + dataItem.id + '';


}

function redirecToLeaveRequest(e) {
    //window.location.href = '/Employees/Attendance/Today?empNum=' + dataItem.id + '';
    var row = $(e).closest("tr");
    var grid = $("#AttendanceGrid").data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Request/Leave?employeeId=' + dataItem.employeeId + '&userId=' + dataItem.userId + '&departmentId=' + dataItem.departmentId + '&roleId=' + dataItem.roleId;

}
var processButtonToggling = function (inputJSON) {

    var unProcessedExists = false;
    inputJSON.forEach(function (item) {
        if (item.processedStatus == 'No' && unProcessedExists == false) {
            unProcessedExists = true;
            return;
        }

    });
    //    if (!unProcessedExists) {
    //        $('#btnProcess').removeClass('btn-success').addClass('btn-primary');
    //        $('#btnProcess').html("<i class='fa fa-refresh'></i> Today's attendance already processed");
    //        $('#btnProcess').css('pointer-events', 'none');

    //    }
    //    else {
    //        $('#btnProcess').removeClass('btn-primary').addClass('btn-success');
    //        $('#btnProcess').html('<i class="fa fa-refresh"></i> Process');
    //        $('#btnProcess').css('pointer-events', 'all');
    //    }    
}
var getAttendanceIdsFromGrid = function () {
    //debugger
    var grid = $("#" + attendanceGrid).data("kendoGrid");
    var gridDataSource = grid.dataSource._data;
    var attendanceIds = '';
    for (var i = 0; i < gridDataSource.length; i++) {
        var gridRow = gridDataSource[i];
        attendanceIds += attendanceIds == '' ? gridRow.id : ',' + gridRow.id;
        //console.log(attendanceIds);       
    }
    return attendanceIds;
}
function fnGridColors() {
    setTimeout(function () {
        var grid = $("#" + attendanceGrid).data("kendoGrid");
        var gridData = grid.dataSource.view();
        console.log(gridData)
        for (var i = 0; i < gridData.length; i++) {

            var absentStatus = gridData[i].status;
             if (gridData[i].status != "Absent" && gridData[i].status != "Site") {
           // if (gridData[i].status != "Absent") {

                if (gridData[i].employeeNumber.match(/INMA.*/)) {
                    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").css("background-color", 'rgba(0, 137, 160, 0.13)').css("color", 'rgb(0,0,0)');
                }
                if (gridData[i].employeeNumber.match(/NSS.*/)) {
                    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").css("background-color", 'rgba(6, 0, 155, 0.13)').css("color", 'rgb(0,0,0)');
                }
                if (gridData[i].employeeNumber.match(/SHJ.*/)) {
                    //grid.table.find("tr[data-uid='" + gridData[i].uid + "']").css("background-color", 'rgba(5, 164, 0, 0.13)').css("color", 'rgb(0,0,0)');
                    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").css("background-color", 'rgba(32, 168, 216, 0.25)').css("color", 'rgb(0,0,0)');
                }
               

                if (gridData[i].departmentId == 10) { // Design Section
                    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").css("background-color", 'rgb(56 195 21 / 35%)').css("color", 'rgb(0,0,0)');
                } if (gridData[i].departmentId == 11) { // Supervision Section
                    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").css("background-color", 'rgb(21 195 171 / 35%)').css("color", 'rgb(0,0,0)');
                } if (gridData[i].departmentId == 12) { // Technical Section
                    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").css("background-color", 'rgb(195 149 21 / 35%)').css("color", 'rgb(0,0,0)');
                } if (gridData[i].departmentId == 13) { // Contract And Tender Section
                    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").css("background-color", 'rgb(195 93 21 / 35%)').css("color", 'rgb(0,0,0)');
                } if (gridData[i].departmentId == 14) { // Accountant Section
                    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").css("background-color", 'rgb(168 21 195 / 35%)').css("color", 'rgb(0,0,0)');
                } if (gridData[i].departmentId == 16) { // Administration 
                    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").css("background-color", 'rgb(27 14 133 / 32%)').css("color", 'rgb(0,0,0)');
                } if (gridData[i].departmentId == 8) { // Sharjah Eng Cons.
                    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").css("background-color", 'rgb(0 180 255 / 34%)').css("color", 'rgb(0,0,0)');

                }
                
            }

        }


    }, 100);
}
function calculateFooterData() {
    setTimeout(function () {

        var grid = $("#AttendanceGrid").data("kendoGrid");
        var gridData = grid.dataSource.view();
        var totalPresent = 0, totalAbsent = 0, totallateInTime = 0, totalLate = 0, totalOnSite = 0;

        var t1 = "00:00:00";
        var lateTimeInSeconds = 0, lateTimeInMinutes = 0, lateTimeInHours = 0, earlyTimeOutSeconds = 0, earlyTimeOutMinutes = 0, earlyTimeOutHours = 0;

        for (var i = 0; i < gridData.length; i++) {

            //if (gridData[i].changeColor == 'Yes') {
            //    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("highlighted-row");
            //}
            if (gridData[i].status == 'Absent') {
                grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("badge-danger");
                totalAbsent++;

            } else if (gridData[i].status == 'Site') { // 11 is super vision department id ,this color will be orange as per Company Manager Engr.Muhammad Demand.               
                grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("badge-warning");
                totalOnSite++;
            }
            else if (gridData[i].status == 'Present') {
                totalPresent++;
                // grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("badge-success");

            }
            else if (gridData[i].status == 'Late') {
                totalLate++;
            }


            if (gridData[i].lateInTime != "" && gridData[i].lateInTime != null) {

                totallateInTime++;
                // grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("badge-success");
            }

            //else {

            //    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("badge-primary");
            //}
            if (gridData[i].lateInTime != '') {
                var t2 = gridData[i].lateInTime.split(':');
                lateTimeInSeconds = lateTimeInSeconds + parseInt(Number(t2[2]));
                lateTimeInMinutes = lateTimeInMinutes + parseInt(Number(t2[1]));
                lateTimeInHours = lateTimeInHours + parseInt(Number(t2[0]));

            }
            if (gridData[i].earlyOutTime != '') {
                var earlyOutTime = gridData[i].earlyOutTime.split(':');
                earlyTimeOutSeconds = earlyTimeOutSeconds + parseInt(Number(earlyOutTime[2]));
                earlyTimeOutMinutes = earlyTimeOutMinutes + parseInt(Number(earlyOutTime[1]));
                earlyTimeOutHours = earlyTimeOutHours + parseInt(Number(earlyOutTime[0]));

            }
        }
        lateTimeInSeconds = lateTimeInSeconds + (lateTimeInMinutes * 60) + (lateTimeInHours * 3600);
        var grandTotalLateInTime = ('0' + (parseInt(lateTimeInSeconds / (60 * 60)))).slice(-2) + ":" +
            ('0' + (parseInt(lateTimeInSeconds / 60 % 60))).slice(-2) + ":" +
            ('0' + (lateTimeInSeconds % 60)).slice(-2);

        earlyTimeOutSeconds = earlyTimeOutSeconds + (earlyTimeOutMinutes * 60) + (earlyTimeOutHours * 3600);
        var grandTotalEarlyTimeOut = ('0' + (parseInt(earlyTimeOutSeconds / (60 * 60)))).slice(-2) + ":" +
            ('0' + (parseInt(earlyTimeOutSeconds / 60 % 60))).slice(-2) + ":" +
            ('0' + (earlyTimeOutSeconds % 60)).slice(-2);

        //$(".footerLateTimeInPlaceholder").text(totallateInTime);
        $(".footerLateTimeInPlaceholder").text(grandTotalLateInTime);
        $(".footerLateTimeOutPlaceholder").text(grandTotalEarlyTimeOut);
        $(".footerPresentPlaceholder").text(totalPresent);
        $(".footerAbsentPlaceholder").text(totalAbsent);
        $(".footerLatePlaceholder").text(totalLate);
    }, 100);
}
function loadAttendance_LeaveDropdownList() {
    ajaxRequest({
        commandName: 'DDL_Attendance_Leave',
        values: { Language: _currentLanguage }, CallBack: loadAttendance_LeaveDropdownListCallBack
    });

}
var loadAttendance_LeaveDropdownListCallBack = function (response) {


    $("#ddl-search").kendoDropDownList({
        dataTextField: "value",
        dataValueField: "id",
        index: -1,
        dataSource: JSON.parse(response.Value)
        , change: function () {
            calculateFooterData();
            // var value = this.value();
            var value = this.text();
            if (value) {

                var grid = $("#AttendanceGrid").data("kendoGrid");


                if (value == lblPresent) {
                    grid.dataSource.filter({ field: "status", operator: "contains", value: 'Present' });

                } else if (value == lblAbsent) {
                    grid.dataSource.filter({ field: "status", operator: "contains", value: 'Absent' });
                } else if (value == lblLate) {
                    grid.dataSource.filter({ field: "status", operator: "contains", value: 'Late' });
                } else {
                    //   grid.dataSource.filter({ field: "status", operator: "eq", value: value });


                    grid.dataSource.filter({ logic: "or", filters: [{ field: "status", operator: "contains", value: value }, { field: "remarks", operator: "contains", value: value }] })
                    // , filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },

                }
            } else {
                grid.dataSource.filter({});
            }

        }
    });

}