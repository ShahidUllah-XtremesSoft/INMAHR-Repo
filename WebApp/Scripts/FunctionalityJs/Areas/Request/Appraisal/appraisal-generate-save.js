$(function () {

    //loadDepartmentTreeDropdownListWithRoleBaseAndCheckbox_New();
    loadDepartmentManager();
    loadAccessForAppraisal();
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $('#Employee_Id').val(JSON.parse(localStorage.getItem('User')).employeeId);
    //Events Starts



    $('#btnGenerate').on('click', function (e) {

        if (customValidateForm('frmAppraisal')) {

            ajaxRequest({
                commandName: 'Request_Appraisal_AlreadyExist',
                values: {
                    Employee_Id: JSON.parse(localStorage.getItem('User')).employeeId,
                    DepartmentId: $('#DepartmentId').val(),
                    Year: $('#Year').val(),

                    Language: _currentLanguage,
                }, CallBack: fn_Request_Appraisal_AlreadyExist_Callback
            });

        }
        else {

            buttonRemovePleaseWait('btnGenerate', lblGenerate, 'save');
        }
    });

});

function fn_Request_Appraisal_AlreadyExist_Callback(d) {
    var response = JSON.parse(d.Value);

    if (response.id > 0) {
        Swal.fire(
            '',
            lblRecordAlreadyExist,
            'info'
        )
    } else {

        window.location.href = '/Request/Appraisal/Self?AppraisalId=' + 0 + '?' + 'EmployeeId=' + JSON.parse(localStorage.getItem('User')).employeeId + '?' + 'DepartmentId=' + $('#DepartmentId').val() + '?' + 'Year=' + $('#Year').val() + '?' + 'ManagerId=' + $('#LM_Employee_Id').val() + '';
    }


}



function loadAccessForAppraisal() {

    ajaxRequest({
        commandName: 'Setup_Appraisal_Permission_isAccess',
        values: {
            Employee_Id: JSON.parse(localStorage.getItem('User')).employeeId,
            DepartmentId: $('#DepartmentId').val(),
            Year: $('#Year').val(),

            Language: _currentLanguage,
        }, CallBack: loadAccessForAppraisal_callBack
    });

}
function loadAccessForAppraisal_callBack(d) {

    var response = JSON.parse(d.Value);
     //  console.log(response);
     
    if (response != '' && response != null) {
        $('.chk_is_Access').show();

        $('#Year').val(response.year);
    }


}
function loadDepartmentManager() {

    ajaxRequest({
        commandName: 'HR_Employee_Get_By_DepartmentId',
        values: {
            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId,
            LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,

            Language: _currentLanguage,
        }, CallBack: loadDepartmentManager_callBack
    });

}
function loadDepartmentManager_callBack(d) {

    $('#DepartmentId').val(JSON.parse(d.Value).reportedTo_DepartmentId);
    $('#LM_Employee_Id').val(JSON.parse(d.Value).reportedTo_employeeId);


}
/*
function loadDepartmentTreeDropdownListWithRoleBaseAndCheckbox_New() {

    ajaxRequest({
        commandName: 'HR_Department_GetAll_For_Evaluation',
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
*/