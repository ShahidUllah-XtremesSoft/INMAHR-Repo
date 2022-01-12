////var attendanceGrid = "AttendanceGrid", employeeIdForAttendance = 0;
////var isLoggedInUserHR = JSON.parse(localStorage.getItem('User')).isHR;
////$(function () {
////    //if (!isLoggedInUserHR) {
////    //    $('#divSearchControls').css('display', 'none');
////    //}
////    $('#Language').val(_currentLanguage);
////    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

////    $('#StartDate').kendoDatePicker({
////        format: "yyyy-MM-dd"
////    });
////    $('#EndDate').kendoDatePicker({
////        format: "yyyy-MM-dd"
////    });
////    employeeIdForAttendance = localStorage.getItem('EmployeeIdForAttendance');
////    if (employeeIdForAttendance == null || employeeIdForAttendance == 'null') {
////        employeeIdForAttendance = JSON.parse(localStorage.getItem('User')).employeeId;
////    }
////    else {
////        employeeIdForAttendance = localStorage.getItem('EmployeeIdForAttendance');
////    }
////    //loadAttendanceGridByEmployeeAndDateRange({ EmployeeId: employeeIdForAttendance, StartDate: '', EndDate: '', Language: _currentLanguage });


////    //loadDepartmentTreeDropdownListWithCheckbox();

////    //setTimeout(function () {
////    //    $("#DepartmentId").data("kendoDropDownTree").bind("change", departmentTreeViewCheck);
////    //    //var treeview = $("#DepartmentId").data("kendoDropDownTree");
////    //    //treeview.bind("check", tree_check);
////    //}, 1000);

////    $('#btnSearch').click(function () {
////        debugger;
        
////        if ($("#StartDate").data("kendoDatePicker").value() == null) {

////            swalMessage('info', 'Start date is required', 1500);

////        }
////        else if ($("#EndDate").data("kendoDatePicker").value() == null) {

////            swalMessage('info', 'End date is required', 1500);
////        }
        
////        loadAttendanceGridByEmployeeAndDateRange({ EmployeeId: employeeIdForAttendance, StartDate: $("#StartDate").data("kendoDatePicker").value(), EndDate: $("#EndDate").data("kendoDatePicker").value(), Language: _currentLanguage });
////    });
////});


////function departmentTreeViewCheck(e) {

////    //console.log("Checking", e.sender._values);
////    $('#DepartmentIds').val('');
////    var selectedDepartments = e.sender._values;
////    var concatenatedDepartments = '';
////    selectedDepartments.forEach(function (item) {
////        concatenatedDepartments += concatenatedDepartments == '' ? item : ',' + item;
////    });
////    //alert(concatenatedDepartments);
////    $('#DepartmentIds').val(concatenatedDepartments);
////    //alert($('#DepartmentIds').val());
////}
