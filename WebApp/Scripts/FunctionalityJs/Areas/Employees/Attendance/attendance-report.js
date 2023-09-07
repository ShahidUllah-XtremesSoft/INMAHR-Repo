var attendanceGrid = "AttendanceReportGrid", employeeIdForAttendance = 0;
var isLoggedInUserHR = JSON.parse(localStorage.getItem('User')).isHR;
$(function () {


    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    $('#StartYear').kendoDatePicker({
        start: "decade",
        depth: "decade",
        format: "yyyy"
        , value: new Date()
    });


    $('#StartMonth').kendoDatePicker({
        start: "year",
        depth: "year",
        format: "MMMM", // Display month and year
        value: new Date()
    });

    $('#btnSearch').click();


});
$('#btnSearch').click(function () {

    if ($("#StartYear").data("kendoDatePicker").value() == null) {

        swalMessage('info', selectYear, 1500);

    }
    else if ($("#StartMonth").data("kendoDatePicker").value() == null) {

        swalMessage('info', selectMonth, 1500);
    }


    loadAttendanceReportGrid({
        EmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
        RoleId: JSON.parse(localStorage.getItem('User')).roleId,
        CreatedBy: JSON.parse(localStorage.getItem('User')).createdBy,
        StartYear: $("#StartYear").val(),
        StartMonth: $("#StartMonth").val(),
        Language: _currentLanguage
    });
});
$('#btnReset').click(function () {
    // loadAttendanceReportGrid({ EmployeeId: employeeIdForAttendance, StartDate: '', EndDate: '', Language: _currentLanguage });
    $("#StartYear").data("kendoDatePicker").value('');
    $("#StartMonth").data("kendoDatePicker").value('');
});
function loadAttendanceReportGrid(inputJSON) {


    ajaxRequest({ commandName: 'Employee_Attendance_YearlyMonthly_Report_Get', values: inputJSON, CallBack: loadAttendanceReportGridCallBack });
}
var loadAttendanceReportGridCallBack = function (inputDataJSON) {
    // $("#AttendanceReportGrid").data("kendoGrid").dataSource.data([])
    bindAttendanceGrid(JSON.parse(inputDataJSON.Value));
}
var bindAttendanceGrid = function (inputDataJSON) {
     console.log(inputDataJSON);
    var record = 0;

    var gridColumns = [
        //{ title: "#", template: "<b>#= ++record #</b>", width: 50, },
        // { field: "id", title: "id", hidden: true },
        {
            field: "employeeNumber", title: empNum, width: 80, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
            template: "<a style='cursor:pointer;text-decoration:underline;'  class='viewbutton' onClick= redirectToEmployeeDetailView(this)  title='Employee Number'>#=employeeNumber#</a> ",

        },
        // { field: "employeeNumber", title: empNum, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }},
        { field: "employeeId", title: 'EmployeeId', width: 20, filterable: true, hidden: true },
        { field: "employeeName", title: employeeName, width: 200, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, },
        { field: "totalShiftStartTime", title: 'TotalShift', width: 100, filterable: false, hidden: true },
        { field: "totalCheckInTime", title: lblCheckinTime + ' ' + lblTotal, width: 100, filterable: false, hidden: true },
        { field: "totalShiftEndTime", title: lblShiftTime, width: 100, filterable: false, hidden: false },
        { field: "totalCheckOutTime", title: lblCheckoutTime +' '+ lblTotal, width: 100, filterable: false, },
        { field: "formattedTotalDelayTime", title: 'formattedTotalDelayTime', width: 100, hidden: true, },
        { field: "formattedTotalOvertime", title: 'formattedTotalOvertime', width: 100, hidden: true, },
        {
            field: "delay", title: lblDelay, width: 100, filterable: false,
            // template: "<span style='color:red;'>#:delay#</span>"
            template: "#if (delay =='0:00:00') { # <span style='color:green;'>#:delay#</span> #}else {# <span style='color:red;'>#:delay#</span> #}#"

        },
        {
            field: "overtime", title: lblOverTime, width: 100, filterable: false,
            template: "#if (delay =='0:00:00') { # <span style='color:green;'>#:overtime#</span> #}else {# <span style='color:red;'>#:overtime#</span> #}#"
        },
        {
            field: "difference", title: '-', width: 100, filterable: false
            //  , template: "if(formattedTotalDelayTime >formattedTotalOvertime ){#<span style='color:red;'>#:overtime#</span> #} else {# <span style='color:red;'>#:overtime#</span> #}#"
            , template: function (dataItem) {
               // if (dataItem.employeeNumber == 'SHJ0064') {
                     
                    if (dataItem.formattedTotalDelayTime > dataItem.formattedTotalOvertime) {
                        return `<span style='color:red;'>` + fnCalculateTotalOfOvertimeAndDelay_rpt(dataItem.employeeId, dataItem.formattedTotalOvertime, dataItem.formattedTotalDelayTime) + ` </span>`
                    } else {
                        return `<span style='color:green;'>` + fnCalculateTotalOfOvertimeAndDelay_rpt(dataItem.employeeId, dataItem.formattedTotalOvertime, dataItem.formattedTotalDelayTime) + ` </span>`

                    }
              //  }
            }
        },
        {
            field: "presents", title: lblPresent, width: 50, filterable: false
            , template: "<span style='color:green;font-size: large;'>#:presents#</span>"
        },
        {
            field: "absents", title: lblAbsent, width: 50, filterable: false
            // , template: "<span style='color:red;font-size: large;'>#:absents#</span>"
            , template: "#if (absents !='0') { # <span class='badge' style='background:rgba(248,203,0,1.000);font-size: initial;'>#:absents#</span> #}else {# <span>#:absents#</span> #}#"

        },
        {
            field: "leaves", title: lblLeave, width: 50, filterable: false
            //    , template: "<span class='badge' style='background:rgba(248,203,0,1.000);font-size: initial;'>#:leaves#</span>"   
            , template: "#if (leaves !='0') { # <span class='badge' style='background:rgba(248,203,0,1.000);font-size: initial;'>#:leaves#</span> #}else {# <span>#:leaves#</span> #}#"

        },

        //{
        //    field: "checkInTime", title: lblIn, width: 100, filterable: false, headerAttributes: { style: "text-align: center;" },
        //    template: "#if (lateInTime =='' && remarks =='') { # <span style='color:green;'>#:checkInTime#</span> #}else {# <span style='color:red;'>#:checkInTime#</span> #}#"
        //},
        //{
        //    field: "checkOutTime", title: lblOut, width: 100, filterable: false, hidden: false, headerAttributes: { style: "text-align: center;" },
        //    template: "#if (earlyOutTime =='' && remarks =='') { # <span style='color:green;'>#:checkOutTime#</span> #}else {# <span style='color:red;'>#:checkOutTime#</span> #}#"
        //},

    ];
    bindAttendanceKendoGridOnly(attendanceGrid, 100, gridColumns, inputDataJSON, true, 750);


    /*
        var exportFlag = false;
        $("#" + attendanceGrid).data("kendoGrid").bind("excelExport", function (e) {
    
            if (!exportFlag) {
                e.sender.showColumn(2);
                e.sender.showColumn(4);
                e.preventDefault();
                exportFlag = true;
                setTimeout(function () {
                    e.sender.saveAsExcel();
                });
            } else {
                e.sender.hideColumn(2);
                e.sender.hideColumn(4);
                exportFlag = false;
            }
    
        }); 
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
 
function fnCalculateTotalOfOvertimeAndDelay_rpt(employeeId = 0, totalOverTime = '00:00:00', totalDelayTime = '00:00:00') {
    var overTimeParts = totalOverTime.split(':');
    var delayTimeParts = totalDelayTime.split(':');

    var overTimeInSeconds = parseInt(overTimeParts[0]) * 3600 + parseInt(overTimeParts[1]) * 60 + parseInt(overTimeParts[2]);
    var delayTimeInSeconds = parseInt(delayTimeParts[0]) * 3600 + parseInt(delayTimeParts[1]) * 60 + parseInt(delayTimeParts[2]);

    var timeDiffInSeconds = overTimeInSeconds - delayTimeInSeconds;

    var sign = timeDiffInSeconds < 0 ? "-" : "";
    timeDiffInSeconds = Math.abs(timeDiffInSeconds);

    var hours = Math.floor(timeDiffInSeconds / 3600);
    timeDiffInSeconds %= 3600;

    var minutes = Math.floor(timeDiffInSeconds / 60);
    var seconds = timeDiffInSeconds % 60;

    var formattedTime = sign + ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
    var dataItem = $("#AttendanceReportGrid").data("kendoGrid").dataSource.data();
    dataItem.map((val) => {
        if (val.employeeId == employeeId) {

            val.set("difference", formattedTime);
        }

    })

    return formattedTime;
}
