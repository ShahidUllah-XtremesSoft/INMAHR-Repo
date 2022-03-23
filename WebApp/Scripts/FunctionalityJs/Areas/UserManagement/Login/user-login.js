$(function () {

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

        getAssignedMenusForRole(JSON.parse(userLoginResponse.Value).roleId, JSON.parse(userLoginResponse.Value).isHR, JSON.parse(userLoginResponse.Value).id);
        localStorage.setItem('User', userLoginResponse.Value);
        localStorage.setItem('EmployeeNumber', JSON.parse(userLoginResponse.Value).employeeNumber);
        swal('success', 'You`re logged in successfully');

    }
}
function getAssignedMenusForRole(roleId, isHR, loggedInUserId) {
    ajaxRequest({ commandName: 'UserManagement_RoleMenu_GetByRole', values: { RoleId: roleId, IsHR: isHR, LoggedInUserId: loggedInUserId, Language: _currentLanguage }, CallBack: getAssignedMenusForRoleCallBack });
}
function getAssignedMenusForRoleCallBack(roleMenus) {

    localStorage.setItem('Menus', (roleMenus.Value));
    window.location.href = "/HumanResource/Employee/Profile";

}