$(function () {
    //loadMainApplicationModule();
    localStorage.setItem('Menus', ({}));
    localStorage.setItem('User', ({}));
    $('#Email').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#btnLogin').click();
        }
    });
    $('#Password').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#btnLogin').click();
        }
    });
    $('#btnLogin').click(function () {

        $('#error_span').text('');
        $('#progress').show();
        ////If admin admin logged in
        if ($('#Email').val() == 'admin' && $('#Password').val() == 'admin@123') {
            ajaxRequest({ commandName: 'UserManagement_RoleMenu_GetForAdmin', values: {}, CallBack: getAssignedMenusForRoleCallBack });
            localStorage.setItem('User', { id: 0, employeeId: 0, employeeNameEng: 'admin', employeeNameEng: 'admin' });
            localStorage.setItem('EmployeeNumber', '');
            swal('success', 'You`re logged in successfully');
        }
        else {

            // console.log(_currentLanguage)
            ajaxRequest({ commandName: 'UserManagement_ValidateCredenial', values: { Email: $('#Email').val(), Password: $('#Password').val(), Language: _currentLanguage }, CallBack: userLoginCallBack });
        }
    });


});
function userLoginCallBack(userLoginResponse) {

    if (JSON.parse(userLoginResponse.Value).message == 'Detail are not verified' || JSON.parse(userLoginResponse.Value).message == "لم يتم التحقق من التفاصيل"
        //if (userLoginResponse.Value == 'null'  || JSON.parse(userLoginResponse.Value).message == 'Detail are not verified'
        //|| JSON.parse(userLoginResponse.Value).message != null    
    ) {
        //swal('warning', 'Email address or password is not matched');        
        $('#error_span').text('Employee number or password is not valid');
        $('#progress').hide();
    }
    else {

        //   getAssignedMenusForRole(JSON.parse(userLoginResponse.Value).roleId, JSON.parse(userLoginResponse.Value).isHR, JSON.parse(userLoginResponse.Value).id);

        localStorage.setItem('LoggedInUserId', JSON.parse(userLoginResponse.Value).id);
        localStorage.setItem('isHR', JSON.parse(userLoginResponse.Value).isHR);
        localStorage.setItem('roleId', JSON.parse(userLoginResponse.Value).roleId);


        // localStorage.setItem('User', userLoginResponse.Value);
        // localStorage.setItem('EmployeeNumber', JSON.parse(userLoginResponse.Value).employeeNumber);
        window.location.href = "/Home/Application/";
        swal('success', 'You`re logged in successfully');
    }
}
// FN is working but commented due to using another function .
//function getAssignedMenusForRole(roleId, isHR, loggedInUserId) {
//    ajaxRequest({ commandName: 'UserManagement_RoleMenu_GetByRole', values: { RoleId: roleId, IsHR: isHR, LoggedInUserId: loggedInUserId, Language: _currentLanguage, MainApplicationModule_Id: $('#MainApplicationModule_Id').val() }, CallBack: getAssignedMenusForRoleCallBack });
//}

function getAssignedMenusForRoleCallBack(roleMenus) {

    localStorage.setItem('Menus', (roleMenus.Value));
    localStorage.setItem('MainApplicationModule_Id', $('#MainApplicationModule_Id').val());
    window.location.href = "/HumanResource/Employee/Profile";

    /*
    if ($('#MainApplicationModule_Id').val() == "1") { // 1 is HR module id in DB

    window.location.href = "/HumanResource/Employee/Profile";
    } else if ($('#MainApplicationModule_Id').val() == "2") { // 1 is Project module id in DB
        window.location.href = "/Project/Employee/Profile";

    }
    */
}


/*
//Load Lists 
function loadMainApplicationModule() {
    ajaxRequest({ commandName: 'UserManagement_MainApplicationModules_Load', values: { Language: $('#Language').val() }, CallBack: fnLoadMainApplicationModuleCallBack });
}

function fnLoadMainApplicationModuleCallBack(response) {

    var responsee = JSON.parse(response.Value);
    $.each(responsee, function (key, value) {
        $('#MainApplicationModule_Id').append('<option value=' + value.id + '>' + value.name + '</option>');
    });


}
*/





function fnPrintReport(e) {
    var startDate = $('#start-date').val() 
    var reportExtension = "PDF";

    var url = "/Report/DepartmentReportNew?reportExtension=" + reportExtension + "&startDate=" + startDate; 
    var a = document.createElement('a');
    a.setAttribute('href', url);
    //a.innerHTML = "";
    a.target = "_blank";
    a.click();
}