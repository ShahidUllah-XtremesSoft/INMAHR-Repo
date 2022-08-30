$(function () {    
    loadEmployeeVacationLeaveBalanceGrid();
});

//| Employee Vaction Balance
function loadEmployeeVacationLeaveBalanceGrid() {
    ajaxRequest({ commandName: 'HR_Employee_Leave_AvailableAndTakenDetail_Get', values: { EmployeeId: localStorage.getItem('EmployeeIdToLoadLeaveBalance'), Language: _currentLanguage }, CallBack: loadEmployeeVacationLeaveBalanceGridCallBack });
}
var loadEmployeeVacationLeaveBalanceGridCallBack = function (inputDataJSON) {
    $('#employeeVacationLeaveBalanceGrid tbody').html('');
    var fileCount = 1, takenLeaveTotal = 0, balanceLeaveTotal = 0;
    JSON.parse(inputDataJSON.Value).forEach(function (item) {
        var tr = '<tr>' +
            '<td>' + fileCount + '</td>' +
            '<td class="leaveType">   ' + item.leaveType + '</td>' +
            '<td class="totalBalance">' + item.totalBalance + '</td>' +
            '<td class="takenLeave">  ' + item.takenLeave + '</td>' +
            '<td class="balance">     ' + item.balance + '</td>' +

            '</tr > '
        takenLeaveTotal += item.takenLeave;
        balanceLeaveTotal += item.balance;
        $('#employeeVacationLeaveBalanceGrid tbody').append(
            tr

        );

        fileCount += 1;
    });
    //$('#employeeVacationLeaveBalanceGrid tbody').append(
    //    '<tr><td>Total</td><td></td><td>' + balanceLeaveTotal + '</td><td>' + takenLeaveTotal + '</td></tr>'
    //
    //);
}