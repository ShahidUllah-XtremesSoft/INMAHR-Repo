var attendanceGrid = "AttendanceGrid";
var isLoggedInUserHR = JSON.parse(localStorage.getItem('User')).isHR;
$(function () {
    
    if (!isLoggedInUserHR) {
        $('#divSearchControls').css('display', 'none');
    }
    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    $("#CheckinDate").kendoDatePicker({
        format: "yyyy-MM-dd"
    });
    loadDepartmentTreeDropdownListWithCheckbox();
    loadAttendanceGrid();
    setTimeout(function () {
        $("#DepartmentId").data("kendoDropDownTree").bind("change", departmentTreeViewCheck);
        //var treeview = $("#DepartmentId").data("kendoDropDownTree");
        //treeview.bind("check", tree_check);
    }, 1000);

    $('#btnSearch').click(function () {
        loadAttendanceGrid();
    });
});
 
function loadAttendanceGrid() {
    


    var checkInDate = $("#CheckinDate").data("kendoDatePicker").value() == null ? '' : $("#CheckinDate").val();
     
    var employeeIdForAttendance = localStorage.getItem('EmployeeIdForAttendance');
    if (employeeIdForAttendance == null || employeeIdForAttendance == 'null') {
        employeeIdForAttendance = JSON.parse(localStorage.getItem('User')).employeeId;
    }
    else {
        employeeIdForAttendance = localStorage.getItem('EmployeeIdForAttendance');
    }
    ajaxRequest({ commandName: 'Employee_Attendance_GetByEmployee', values: { EmployeeId: employeeIdForAttendance , StartDate: '',EndDate: '', Language: _currentLanguage }, CallBack: loadAttendanceGridCallBack });
}
var loadAttendanceGridCallBack = function (inputDataJSON) {
    localStorage.removeItem('EmployeeIdForAttendance');
    bindAttendanceGrid(JSON.parse(inputDataJSON.Value));
}
var bindAttendanceGrid = function (inputDataJSON) {

    var gridColumns = [

        { field: "id", title: "id", hidden: true },
        { field: "employeeId", title: 'EmployeeId', width: 100, filterable: true, hidden: true },
        { field: "employeeName", title: employeeName, width: 100, filterable: true },
        { field: "departmentId", title: 'DepartmentId', width: 100, filterable: true, hidden: true },
        { field: "departmentName", title: department, width: 100, filterable: true },
        { field: "checkInDate", title: checkinDate, width: 100, filterable: true },
        { field: "checkInTime", title: checkinTime, width: 100, filterable: true },
        { field: "checkOutTime", title: checkoutTime, width: 100, filterable: true, hidden: false },
        //{ field: "status", title: status, width: 100, filterable: true }
        {
            title: status,
            field: 'status',
            width: 100,
            hidden: false,
            //template: 1 == 1 ? "<span class='badge badge-success'>#:status#</span>" : "<span class='badge badge-danger'>#:status#</span>"
            template: "#if (status != 'Present') { # <span class='badge badge-danger'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
        },
    ];

    bindKendoGrid(attendanceGrid, 50, gridColumns, inputDataJSON, true, 750);
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
 