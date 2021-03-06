var attendanceGrid = "AttendanceGrid", employeeIdForAttendance = 0;
var isLoggedInUserHR = JSON.parse(localStorage.getItem('User')).isHR;
$(function () {
    //if (!isLoggedInUserHR) {
    //    $('#divSearchControls').css('display', 'none');
    //}
    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    $('#StartDate').kendoDatePicker({
        format: "yyyy-MM-dd"
        //,value: new Date()
    });
    $('#EndDate').kendoDatePicker({
        format: "yyyy-MM-dd"
        //, value: new Date()
    });
    employeeIdForAttendance = localStorage.getItem('EmployeeIdForAttendance');
    //if (employeeIdForAttendance == null || employeeIdForAttendance == 'null') {
    var splitUrl = window.location.href.split('/');
    if (splitUrl[splitUrl.length - 1] == 'Personal') {

        employeeIdForAttendance = JSON.parse(localStorage.getItem('User')).employeeId;
    }
    else {
        employeeIdForAttendance = localStorage.getItem('EmployeeIdForAttendance');
    }
    loadAttendanceGrid({ EmployeeId: employeeIdForAttendance, StartDate: '', EndDate: '', Language: _currentLanguage });

    //loadDepartmentTreeDropdownListWithCheckbox();

    //setTimeout(function () {
    //    $("#DepartmentId").data("kendoDropDownTree").bind("change", departmentTreeViewCheck);
    //    //var treeview = $("#DepartmentId").data("kendoDropDownTree");
    //    //treeview.bind("check", tree_check);
    //}, 1000);

    $('#btnSearch').click(function () {


        if ($("#StartDate").data("kendoDatePicker").value() == null) {

            //swalMessage('info', 'Start date is required', 1500);
            swalMessage('info', startdateisrequired, 1500);

        }
        else if ($("#EndDate").data("kendoDatePicker").value() == null) {

            // swalMessage('info', 'End date is required', 1500);
            swalMessage('info', enddateisrequired, 1500);
        }

        loadAttendanceGrid({ EmployeeId: employeeIdForAttendance, StartDate: $("#StartDate").data("kendoDatePicker").value(), EndDate: $("#EndDate").data("kendoDatePicker").value(), Language: _currentLanguage });
    });
    $('#btnReset').click(function () {
        loadAttendanceGrid({ EmployeeId: employeeIdForAttendance, StartDate: '', EndDate: '', Language: _currentLanguage });
        $("#StartDate").data("kendoDatePicker").value('');
        $("#EndDate").data("kendoDatePicker").value('');
    });
});
function loadAttendanceGrid(inputJSON) {

    var checkInDate = $("#StartDate").data("kendoDatePicker").value() == null ? '' : $("#StartDate").val();

    var employeeIdForAttendance = localStorage.getItem('EmployeeIdForAttendance');
    if (employeeIdForAttendance == null || employeeIdForAttendance == 'null') {
        employeeIdForAttendance = JSON.parse(localStorage.getItem('User')).employeeId;
    }
    else {
        employeeIdForAttendance = localStorage.getItem('EmployeeIdForAttendance');
    }
    ajaxRequest({ commandName: 'Employee_Attendance_GetByEmployee', values: inputJSON, CallBack: loadAttendanceGridCallBack });
}
var loadAttendanceGridCallBack = function (inputDataJSON) {        
    //localStorage.removeItem('EmployeeIdForAttendance');
    bindAttendanceGrid(JSON.parse(inputDataJSON.Value));
}
var bindAttendanceGrid = function (inputDataJSON) {
    
    var record = 0;
    /* Commented below code on 20 June 2022
    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 10 },
        { field: "id", title: "id", hidden: true },
        { field: "employeeNumber", title: empNum, width: 30, filterable: true },
        { field: "employeeId", title: 'EmployeeId', width: 100, filterable: true, hidden: true },
        { field: "employeeName", title: employeeName, width: 100, filterable: true },
        { field: "departmentId", title: 'DepartmentId', width: 80, filterable: true, hidden: true },
        { field: "departmentName", title: department, width: 100, filterable: true },
        { field: "checkInDate", title: checkinDate, width: 30, filterable: true },
        { field: "checkInTime", title: checkinTime, width: 30, filterable: true },
        { field: "checkOutTime", title: checkoutTime, width: 30, filterable: true, hidden: false },
        {
            field: "lateInTime", title: lateTimeIn, width: 30, filterable: true, hidden: false
            , template: "#if (lateInTime !='') { # <span class='badge  badge-danger'>#:lateInTime#</span> #}#"
          //  , footerTemplate: "<span class='badge badge-danger'>" + lateTimeIn + ": <span   class='footerLateTimeInPlaceholder'>0</span></span> | <span class='badge badge-danger'>" + lateTimeIn + ": <span   class='footerLateTimeInCalculated'>0</span></span>"
            , footerTemplate: "<span class='badge badge-danger'>" + lateTimeIn + ": <span   class='footerLateTimeInPlaceholder'>0</span></span>"
        },
        { field: "earlyOutTime", title: earlyTimeOut, width: 30, filterable: true, hidden: true },
        //{ field: "status", title: status, width: 100, filterable: true }
        {
            title: status,
            field: 'status',
            width: 50,
            hidden: false,
            //template: 1 == 1 ? "<span class='badge badge-success'>#:status#</span>" : "<span class='badge badge-danger'>#:status#</span>"
            //    template: "#if (status != 'Present') { # <span class='badge badge-danger'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
            template: "#if (status == 'Present') { # <span class='badge badge-success'>" + lblPresent + "</span> # } else if(status == 'Absent'){# <span class='badge badge-danger'>" + lblAbsent + "</span> # } else{# <span class='badge badge-primary'>#:status#</span> #}#"
            , footerTemplate: "<span class='badge badge-success'>" + lblPresent + ": <span   class='footerPresentPlaceholder'>0</span></span> | <span class='badge badge-danger'>" + lblAbsent + ": <span   class='footerAbsentPlaceholder'>0</span></span>"
        },
        // {
        //     field: "remarks", title: remarks, width: 40, filterable: true, hidden: false
        //     //, template: " <span class='badge badge-danger'>#:remarks#</span>"
        // },
    ];
    */
    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 15, },
        { field: "id", title: "id", hidden: true },
        { field: "employeeNumber", title: empNum, width: 40, filterable: true },
        { field: "employeeId", title: 'EmployeeId', width: 100, filterable: true, hidden: true },
        { field: "employeeName", title: employeeName, width: 100, filterable: true },
        { field: "departmentId", title: 'DepartmentId', width: 100, filterable: true, hidden: true },
        { field: "departmentName", title: department, width: 100, filterable: true },
        { field: "checkInDate", title: checkinDate, width: 40, filterable: true },
        { field: "checkInTime", title: checkinTime, width: 30, filterable: true },
        { field: "checkOutTime", title: checkoutTime, width: 30, filterable: true, hidden: false },
        {
            field: "lateInTime", title: lateTimeIn, width: 35, filterable: true, hidden: false//, attributes: { "class": "badge  badge-dark" }
            , template: "#if (lateInTime !='') { # <span class='badge  badge-danger'>#:lateInTime#</span> #}#"
            , footerTemplate: "<span class='badge badge-danger'> <span   class='footerLateTimeInPlaceholder'>0</span></span>"
        },
        {
            field: "earlyOutTime", title: earlyTimeOut, width: 40, filterable: true, hidden: false//, attributes: { "class": "badge  badge-dark" }
            , template: "#if (earlyOutTime !='') { # <span class='badge  badge-danger'>#:earlyOutTime#</span> #}#"
            , format: "{0:HH:mm}"
            , footerTemplate: "<span class='badge badge-danger'><span   class='footerLateTimeOutPlaceholder'>0</span></span>"
        },
        {
            title: status,
            field: 'status',
            width: 50,
            hidden: false,
            template: "#if (status == 'Present')" +
                " { # <span class='badge badge-success'>" + lblPresent + "</span> # } else if(status == 'Absent')" +
                " { if(status == 'Absent' && departmentId==11) {# <span class='badge badge-danger'>" + lblSite + "</span> # } else { # <span class='badge badge-danger'>" + lblAbsent + "</span> # }}   else " +
                " {# <span class='badge badge-primary'>#:status#</span> #}#"
            , footerTemplate: "<span class='badge badge-success'>" + lblPresent + ": <span   class='footerPresentPlaceholder'>0</span></span> | <span class='badge badge-danger'>" + lblAbsent + ": <span   class='footerAbsentPlaceholder'>0</span></span>"

        },
        { field: "remarks", title: 'Remarks', width: 40, filterable: true, hidden: false },
        
    ];
    bindAttendanceKendoGridOnly(attendanceGrid, 50, gridColumns, inputDataJSON, true, 750);
    setTimeout(function () {
        var grid = $("#AttendanceGrid").data("kendoGrid");
        var gridData = grid.dataSource.view();

        var totalPresent = 0, totalAbsent = 0, totallateInTime = 0;
        var totallateInTimeCount = "";
        var t1 = "00:00:00";
        var lateTimeInSeconds = 0, lateTimeInMinutes = 0, lateTimeInHours = 0, earlyTimeOutSeconds = 0, earlyTimeOutMinutes = 0, earlyTimeOutHours = 0;



        for (var i = 0; i < gridData.length; i++) {

            if (gridData[i].changeColor == 'Yes') {
                grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("highlighted-row");

            }
            if (gridData[i].status == 'Absent') {
                grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("badge-danger");
                totalAbsent++;
            }
            else if (gridData[i].status == 'Present') {
                totalPresent++;
                // grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("badge-success");
            }

            if (gridData[i].lateInTime != "" && gridData[i].lateInTime != null) {
                
                totallateInTime++;
                totallateInTimeCount = parseFloat(gridData[i].lateInTime);
         
               
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


        //$(".footerLateTimeInPlaceholder").text(totallateInTime);
        //$(".footerLateTimeInCalculated").text(totallateInTimeCount);
        //$(".footerPresentPlaceholder").text(totalPresent);
        //$(".footerAbsentPlaceholder").text(totalAbsent);


    }, 100);
};

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
 
 
 