$(function () {

    loadDepartmentTreeDropdownListWithRoleBaseAndCheckbox_New();
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $('#Employee_Id').val(JSON.parse(localStorage.getItem('User')).employeeId);
    //Events Starts



    $('#btnGenerate').on('click', function (e) {

        if (customValidateForm('frmAppraisal')) {

            window.location.href = '/Request/Appraisal/Self?AppraisalId=' + 0 + '?' + 'EmployeeId=' + JSON.parse(localStorage.getItem('User')).employeeId + '?' + 'DepartmentId=' + $('#DepartmentId').val() + '?' + 'Year=' + $('#Year').val() + '?' + 'ManagerId=' + $('#LM_Employee_Id').val() + '';
        }
        else {

            buttonRemovePleaseWait('btnGenerate', lblGenerate, 'save');
        }
    });
   
});




function loadDepartmentTreeDropdownListWithRoleBaseAndCheckbox_New() {

    ajaxRequest({
        commandName: 'HR_Department_GetAll_For_Appraisal',
        values: {
            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId,
            LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: _currentLanguage,
        }, CallBack: loadTreeDropdownListWithRoleBaseAndCheckBox_New
    });

}

function loadTreeDropdownListWithRoleBaseAndCheckBox_New(d) {


    $("#DepartmentId").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        // index: -1,
        dataSource: JSON.parse(d.Value),
        select: fn_OnSelect_DDL
    });

}

function fn_OnSelect_DDL(e) {


    setTimeout(function () { loadAll_LINE_Manager_AsPerDepartmentId(); }, 100);

};


function loadAll_LINE_Manager_AsPerDepartmentId() {

    ajaxRequest({
        commandName: 'Appraisal_Get_LineManager_by_DepartmentWise',
        values:
        {
            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            LoggedInEmployeeRoleName: JSON.parse(localStorage.getItem('User')).roleName,
            LineManager_DepartmentId: $('#DepartmentId').val(),
            Language: _currentLanguage
        }, CallBack: getloadAll_LINE_Manager_AsPerDepartmentId
    });

}

var getloadAll_LINE_Manager_AsPerDepartmentId = function (inputDataJSON) {

    $("#LM_Employee_Id").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        // index: -1,
        dataSource: JSON.parse(inputDataJSON.Value),
        //   select: fn_OnSelect_Load_All_Employees_DDL,
    });


} 