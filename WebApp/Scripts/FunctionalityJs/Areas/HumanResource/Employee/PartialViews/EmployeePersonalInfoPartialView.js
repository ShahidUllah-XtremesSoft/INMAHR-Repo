var employeeNumberForAttendance = 0;
$(function () {
    $('#Language').val(_currentLanguage);
    //var $document_grid = "document-grid";
    $('#LoggedInUserId').val(JSON.parse(localStorage.getItem('User')).id);

    
    employeeNumberForAttendance = localStorage.getItem('EmployeeNumberForAttendance');
    if (employeeNumberForAttendance == null || employeeNumberForAttendance == 'null') {
        employeeNumberForAttendance = JSON.parse(localStorage.getItem('User')).employeeNumber;//localStorage.getItem('EmployeeNumber');
    }
    else {
        employeeNumberForAttendance  = localStorage.getItem('EmployeeNumberForAttendance');
    }
    //var LeaveRequestGrid = "LeaveRequestGrid";
    loadEmployeeProfile();
});
//|Load Employee Profile Starts
function loadEmployeeProfile() {
    //var employeeNumber = localStorage.getItem('EmployeeNumber');
    ajaxRequest({ commandName: 'HR_Employee_GetByNumber', values: { Language: _currentLanguage, EmployeeNumber: employeeNumberForAttendance }, CallBack: loadEmployeeProfileCallBack });
}
function loadEmployeeProfileCallBack(response) {
    localStorage.removeItem('EmployeeNumberForAttendance');
    $('#CreatedBy').val(JSON.parse(response.Value).id);
    $('#EmployeeId').val(JSON.parse(response.Value).employeeId);
    $.each(JSON.parse(response.Value), function (key, value) {
        $('#' + capitalizeFirstLetter(key)).text(value);
    });
    if (JSON.parse(response.Value).currentFileName != null) {
        var profileImage = '/UploadFile/' + JSON.parse(response.Value).currentFileName;
        $('#ProfileImage').attr('src', profileImage);
    }

    //loadLeaveRequestGrid();
    //loadPersonalDocumentsGrid();
    //loadEducationalDocumentsGrid();
    //loadEmployeeAnnualLeaveBalanceDeductionGrid();
    //loadEmployeeVacationLeaveBalanceGrid();
    //loadShortLeaveGrid();
}
