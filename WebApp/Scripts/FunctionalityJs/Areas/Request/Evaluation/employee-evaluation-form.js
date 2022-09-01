var EvaluationId = window.location.href.split('?')[1].split('=')[1];
var EmployeeNumber = window.location.href.split('?')[2].split('=')[1];

$(function () {

    loadEmployeeProfile();
});

function loadEmployeeProfile() {

    ajaxRequest({
        commandName: 'HR_Employee_GetByNumber',
        values: { Language: _currentLanguage, EmployeeNumber: EmployeeNumber }, CallBack: loadEmployeeProfileCallBack
    });
}
function loadEmployeeProfileCallBack(response) {
    $('#EmployeeName').text(JSON.parse(response.Value).employeeName);
    $('#EmployeeProfession').text(JSON.parse(response.Value).profession);
    $('#EmployeeSection').text(JSON.parse(response.Value).department);
    $('#EmployeeLineManager').text(JSON.parse(response.Value).directResponsible);




    if (JSON.parse(response.Value).currentFileName != null) {
        var profileImage = '/UploadFile/' + JSON.parse(response.Value).currentFileName;
        $('#ProfileImage').attr('src', profileImage);
    }


}

//-----------------------------  FUNCTION END ---------------------------------------------------

function fnCheckValue(e) {
    debugger
     
    var total_Column_4 = 0, total_Column_6 = 0, total_Column_8 = 0, total_Column_10 = 0;
    if (e.parentElement.children[1].innerText == "4") {
        if ($('#' + e.id).prop('checked', true) == true) {
            debugger
            total_Column_4 = parseInt($("#total_of_Column_4").text()) + parseInt(e.parentElement.children[1].innerText);
            $("#total_of_Column_4").text(total_Column_4);
        } else {
            total_Column_4 = parseInt($("#total_of_Column_4").text()) - parseInt(e.parentElement.children[1].innerText);
            $("#total_of_Column_4").text(total_Column_4);

        }
    }
}

