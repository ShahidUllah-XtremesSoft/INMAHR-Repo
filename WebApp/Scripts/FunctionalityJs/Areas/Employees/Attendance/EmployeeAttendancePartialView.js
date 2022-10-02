var attendanceGrid = "AttendanceGrid", employeeIdForAttendance = 0;
var isLoggedInUserHR = JSON.parse(localStorage.getItem('User')).isHR;
$(function () {
    //if (!isLoggedInUserHR) {
    //    $('#divSearchControls').css('display', 'none');
    //}
    loadAttendance_LeaveDropdownList();

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
    //  console.log(inputDataJSON);
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
        { title: "#", template: "<b>#= ++record #</b>", width: 30, },
        { field: "id", title: "id", hidden: true },
        { field: "employeeNumber", title: empNum, width: 200, filterable: true, hidden: true },
        { field: "employeeId", title: 'EmployeeId', width: 200, filterable: true, hidden: true },
        { field: "employeeName", title: employeeName, width: 200, filterable: false, hidden: true },
        { field: "departmentId", title: 'DepartmentId', width: 200, filterable: true, hidden: true },
        { field: "departmentName", title: department, width: 200, filterable: true, hidden: true },
        {
            field: "checkInDate", title: checkinDate, width: 100, filterable: true
            , footerTemplate: "<span class=''>" + lblPresent + ": <span   class='footerPresentPlaceholder'  >0</span></span>"

        },
        {
            title: status,
            field: 'status',
            width: 80,
            hidden: false,
            filterable: false,
            template: "#if (status == 'Present')" +
                " { # <span class=''>" + lblPresent + "</span> # } else if(status == 'Absent')" +
                " { if(status == 'Absent' && departmentId==11) {# <span class=''>" + lblSite + "</span> # } else { # <span class=''>" + lblAbsent + "</span> # }} " +
                "else  if (status == 'Work P.Leave' || status == 'إذن عمل' ) { if(JSON.parse(localStorage.getItem('User')).isHR == '1' || JSON.parse(localStorage.getItem('User')).roleName =='Chairman' || JSON.parse(localStorage.getItem('User')).roleName =='Company Manager'  || JSON.parse(localStorage.getItem('User')).roleName =='Executive Board Member'  ){ # <span style='cursor:pointer;text-decoration:underline;'  onClick= fnShowLeaveDetailsInPopup(this)>#:status# </span> # }  else { # <span>#:status# </span> #  }}  else " +
                " {# <span class=''>#:status#</span> #}#"
            // , footerTemplate: "<span class=''>" + lblPresent + ": <span   class='footerPresentPlaceholder'  >0</span></span> | <span class=''>" + lblAbsent + ": <span   class='footerAbsentPlaceholder' style='color:red;'>0</span></span>"
            , footerTemplate: "<span class=''>" + lblAbsent + ": <span   class='footerAbsentPlaceholder' style='color:red;'>0</span></span>"

        },


        {
            title: lblMorning + " / " + lblEvening, headerAttributes: { style: "text-align: center;" },
            columns: [
                {
                    field: "checkInTime", title: lblIn, width: 70, filterable: false, headerAttributes: { style: "text-align: center;" },
                    template: "#if (lateInTime =='') { # <span style='color:green;'>#:checkInTime#</span> #}else {# <span style='color:red;'>#:checkInTime#</span> #}#"
                },
                {
                    field: "checkOutTime", title: lblOut, width: 70, filterable: false, hidden: false, headerAttributes: { style: "text-align: center;" },
                    template: "#if (earlyOutTime =='') { # <span style='color:green;'>#:checkOutTime#</span> #}else {# <span style='color:red;'>#:checkOutTime#</span> #}#"
                },

                /*
                {
                    field: "lateInTime", title: lblLate, width: 50, filterable: false, hidden: false, headerAttributes: { style: "text-align: center;" }//, attributes: { "class": "lateforAttedance " }
                    , template: "#if (lateInTime !='') { # <span class='lateforAttedance'>#:lateInTime#</span> #}#"
                    , footerTemplate: "<span class=''> <span   class='footerLateTimeInPlaceholder' style='color:red;'>0</span></span>"
                },
                */
            ]
        }, {
            title: lblBreak, headerAttributes: { style: "text-align: center;" },
            columns: [
                { field: "breakIn", title: lblOut, width: 60, filterable: false, hidden: false, headerAttributes: { style: "text-align: center;" } },
                { field: "breakOut", title: lblIn, width: 60, filterable: false, hidden: false, headerAttributes: { style: "text-align: center;" } },
            ]
        },

        {
            title: "", headerAttributes: { style: "text-align: center;" },
            columns: [
                //   { field: "checkOutTime", title: checkoutTime, width: 100, filterable: false, hidden: false },
                {
                    //    field: "lateInTime", title: lateTimeIn, width: 100, filterable: false, hidden: false//, attributes: { "class": "badge  badge-dark" }
                    field: "totalDelayTime", title: lblDelay, width: 60, filterable: false, hidden: false, headerAttributes: { style: "text-align: center;" }//, attributes: { "class": "lateforAttedance " }
                    , template: "#if (totalDelayTime !='') { # <span class=' ' style='color:red;'>#:totalDelayTime#</span> #}#"
                    , footerTemplate: "<span class=''> <span   class='footerTotalDelayTimeInPlaceholder' style='color:red;'>0</span></span>"
                },
                {

                    field: "totalOverTime", title: lblOverTime, width: 80, filterable: false, hidden: false, headerAttributes: { style: "text-align: center;" }
                    , template: "#if (totalOverTime !=null) { # <span class=' ' style='color:green;'>#:totalOverTime#</span> #}#"
                    , footerTemplate: "<span class=''> <span   class='footerTotalOverTimePlaceholder' style='color:green;'>0</span></span>"
                },

                /*
                {
                    field: "earlyOutTime", title: lblEarly, width: 50, filterable: false, hidden: false, headerAttributes: { style: "text-align: center;" }//, attributes: { "class": "lateforAttedance " }
                    , template: "#if (earlyOutTime !='') { # <span class='lateforAttedance'>#:earlyOutTime#</span> #}#"
                    , format: "{0:HH:mm}"
                    , footerTemplate: "<span class=''><span   class='footerLateTimeOutPlaceholder' style='color:red;'>0</span></span>"
                },

                */
            ]
        },








        //   { field: "checkInTime", title: checkinTime, width: 30, filterable: false },
        //   { field: "checkOutTime", title: checkoutTime, width: 30, filterable: false, hidden: false },
        //  {
        //      field: "lateInTime", title: lateTimeIn, width: 35, filterable: false, hidden: false//, attributes: { "class": "badge  badge-dark" }
        //      , template: "#if (lateInTime !='') { # <span class=''>#:lateInTime#</span> #}#"
        //      , footerTemplate: "<span class=''> <span   class='footerLateTimeInPlaceholder'>0</span></span>"
        //  },
        //  {
        //      field: "earlyOutTime", title: earlyTimeOut, width: 40, filterable: false, hidden: false//, attributes: { "class": "badge  badge-dark" }
        //      , template: "#if (earlyOutTime !='') { # <span class=''>#:earlyOutTime#</span> #}#"
        //      , format: "{0:HH:mm}"
        //      , footerTemplate: "<span class=''><span   class='footerLateTimeOutPlaceholder'>0</span></span>"
        //  },
        //   { field: "breakIn", title: lblBreakIn, width: 40, filterable: false, hidden: false },
        //   { field: "breakOut", title: lblBreakOut, width: 40, filterable: false, hidden: false },
        { field: "remarks", title: lblRemarks, width: 300, filterable: false, hidden: false },

    ];
    bindAttendanceKendoGridOnly(attendanceGrid, 50, gridColumns, inputDataJSON, true, 750);
    setTimeout(function () {
        calculateFooterData();
        /*
        var grid = $("#AttendanceGrid").data("kendoGrid");
        var gridData = grid.dataSource.view();

        var totalPresent = 0, totalAbsent = 0, totallateInTime = 0, totalDelayTime = 0, totalDelayTimeHours = 0, totalDelayTimeMinutes = 0, totalDelayTimeSeconds = 0;
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
             
            if (gridData[i].totalDelayTime != '') {
                var totalDelayTimes = gridData[i].totalDelayTime.split(':');
                
                totalDelayTimeSeconds = totalDelayTimeSeconds + parseInt(Number(totalDelayTimes[2]));
                totalDelayTimeMinutes = totalDelayTimeMinutes + parseInt(Number(totalDelayTimes[1]));
                totalDelayTimeHours = totalDelayTimeHours + parseInt(Number(totalDelayTimes[0]));

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

         
        //------------- Total Dealy Time Calculation
        totalDelayTimeSeconds = totalDelayTimeSeconds + (totalDelayTimeMinutes * 60) + (totalDelayTimeHours * 3600);
        var grandtotalDelayTime = ('0' + (parseInt(totalDelayTimeSeconds / (60 * 60)))).slice(-2) + ":" +
            ('0' + (parseInt(totalDelayTimeSeconds / 60 % 60))).slice(-2) + ":" +
            ('0' + (totalDelayTimeSeconds % 60)).slice(-2);





        //$(".footerLateTimeInPlaceholder").text(totallateInTime);
        $(".footerLateTimeInPlaceholder").text(grandTotalLateInTime);
        $(".footerLateTimeOutPlaceholder").text(grandTotalEarlyTimeOut);
        $(".footerPresentPlaceholder").text(totalPresent);
        $(".footerAbsentPlaceholder").text(totalAbsent);
        $(".footerTotalDelayTimeInPlaceholder").text(grandtotalDelayTime);


        //$(".footerLateTimeInPlaceholder").text(totallateInTime);
        //$(".footerLateTimeInCalculated").text(totallateInTimeCount);
        //$(".footerPresentPlaceholder").text(totalPresent);
        //$(".footerAbsentPlaceholder").text(totalAbsent);
       
        */
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


function calculateFooterData() {
    var grid = $("#AttendanceGrid").data("kendoGrid");
    var gridData = grid.dataSource.view();
    var
        totalPresent = 0, totalAbsent = 0,
        totallateInTime = 0, totalDelayTime = 0,
        totalDelayTimeHours = 0, totalDelayTimeMinutes = 0, totalDelayTimeSeconds = 0,
        totalOvertimeHours = 0, totalOvertimeMinutes = 0, totalOvertimeSeconds = 0;

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
        }

        if (gridData[i].lateInTime != "" && gridData[i].lateInTime != null) {

            totallateInTime++;
            totallateInTimeCount = parseFloat(gridData[i].lateInTime);



        }


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

        //------------- Total Dealy Time Calculation

        if (gridData[i].totalDelayTime != '') {
            var totalDelayTimes = gridData[i].totalDelayTime.split(':');

            totalDelayTimeSeconds = totalDelayTimeSeconds + parseInt(Number(totalDelayTimes[2]));
            totalDelayTimeMinutes = totalDelayTimeMinutes + parseInt(Number(totalDelayTimes[1]));
            totalDelayTimeHours = totalDelayTimeHours + parseInt(Number(totalDelayTimes[0]));

        }
        //------------- Total Over Time Calculation

        if (gridData[i].totalOverTime != null && gridData[i].totalOverTime != '') {
            var totalOvertimes = gridData[i].totalOverTime.split(':');

            totalOvertimeSeconds = totalOvertimeSeconds + parseInt(Number(totalOvertimes[2]));
            totalOvertimeMinutes = totalOvertimeMinutes + parseInt(Number(totalOvertimes[1]));
            totalOvertimeHours = totalOvertimeHours + parseInt(Number(totalOvertimes[0]));

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
    //------------- Total Dealy Time Calculation
    totalDelayTimeSeconds = totalDelayTimeSeconds + (totalDelayTimeMinutes * 60) + (totalDelayTimeHours * 3600);
    var grandtotalDelayTime = ('0' + (parseInt(totalDelayTimeSeconds / (60 * 60)))).slice(-2) + ":" +
        ('0' + (parseInt(totalDelayTimeSeconds / 60 % 60))).slice(-2) + ":" +
        ('0' + (totalDelayTimeSeconds % 60)).slice(-2);

    //------------- Total Dealy Time Calculation
    totalOvertimeSeconds = totalOvertimeSeconds + (totalOvertimeMinutes * 60) + (totalOvertimeHours * 3600);
    var grandtotalOverTime = ('0' + (parseInt(totalOvertimeSeconds / (60 * 60)))).slice(-2) + ":" +
        ('0' + (parseInt(totalOvertimeSeconds / 60 % 60))).slice(-2) + ":" +
        ('0' + (totalOvertimeSeconds % 60)).slice(-2);





    //$(".footerLateTimeInPlaceholder").text(totallateInTime);
    $(".footerLateTimeInPlaceholder").text(grandTotalLateInTime);
    $(".footerLateTimeOutPlaceholder").text(grandTotalEarlyTimeOut);
    $(".footerPresentPlaceholder").text(totalPresent);
    $(".footerAbsentPlaceholder").text(totalAbsent);
    $(".footerTotalDelayTimeInPlaceholder").text(grandtotalDelayTime);
    $(".footerTotalOverTimePlaceholder").text(grandtotalOverTime);

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
                } else if (value != lblPresent || value != lblAbsent) {

                    grid.dataSource.filter({ field: "employeeName", operator: "contains", value: value });
                    grid.dataSource.filter({ field: "status", operator: "contains", value: value });

                } else {
                    grid.dataSource.filter({ logic: "or", filters: [{ field: "status", operator: "contains", value: value }, { field: "remarks", operator: "contains", value: value }] })


                }
            } else {
                grid.dataSource.filter({});
            }

        }
    });

}
function fnShowLeaveDetailsInPopup(e) {
    var row = $(e).closest("tr");
    var grid = $("#AttendanceGrid").data("kendoGrid");
    var dataItem = grid.dataItem(row);
    console.log(dataItem)
    $('.leave-history-modal-title').text(dataItem.status);
   

    $('#btn-show-leave-details-modal').click();
    var inputJSON = {
        EmployeeId: dataItem.employeeId,
        EmployeeUserId: dataItem.userId,
        EmployeeNumber: dataItem.employeeNumber,
        CheckInDate: dataItem.checkInDate,
        Language: _currentLanguage
    }
    setTimeout(function () {

        ajaxRequest({ commandName: 'Employee_Attendance_LeaveDetail_History', values: inputJSON, CallBack: loadAttendanceLeaveDetailsGridCallBack });

    }, 150);


}

var loadAttendanceLeaveDetailsGridCallBack = function (inputDataJSON) {
    loadAttendanceLeaveDetailsGridData(JSON.parse(inputDataJSON.Value));
}

var loadAttendanceLeaveDetailsGridData = function (inputDataJSON) {


    var record = 0;

    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 20, },
        { field: "id", title: "id", hidden: true },
        { field: "employeeNumber", title: empNum, width: 200, filterable: true, hidden: true },
        { field: "employeeId", title: 'EmployeeId', width: 200, filterable: false, hidden: true },
        {
            field: "checkInDate", title: checkinDate, width: 50, filterable: false
            //    , footerTemplate: "<span class=''>" + lblPresent + ": <span   class='footerPresentPlaceholder'  >0</span></span>"

        },
        { field: "startEndTime", title: lblStartEndTime, hidden: false, width: 70, filterable: false },
        {
            field: "inOutTime", title: lblOut + " / " + lblIn, width: 40, filterable: false,
        },
        
        //{
        //    title: lblIn + " / " + lblOut, headerAttributes: { style: "text-align: center;" },
        //    columns: [
        //        {
        //            field: "inOutTime", title: lblIn + " / " + lblOut, width: 50, filterable: false, headerAttributes: { style: "text-align: center;" },
        //            //template: "#if (lateInTime =='' && remarks =='') { # <span style='color:green;'>#:checkInTime#</span> #}else {# <span style='color:red;'>#:checkInTime#</span> #}#"
        //        },

        //    ]
        //},
        {
            title: status,field: 'status',width: 30,hidden: false,filterable: false,
        },
        { field: "requested_Starttime", title: startTime, hidden: true, width: 60, filterable: false },
        { field: "requested_Endtime", title: returnTime, hidden: true, width: 60, filterable: false },



        { field: "leave_Remarks", title: lblRemarks, width: 200, filterable: false, hidden: false },

    ];
    bindKendoGrid("grid-show-leave-details", 50, gridColumns, inputDataJSON, true, 550);

};
