$(function () {

    loadDepartmentTreeDropdownListWithRoleBaseAndCheckbox_New();
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);     
    $('#Employee_Id').val(JSON.parse(localStorage.getItem('User')).employeeId);
    //Events Starts
    $('#btnSave').on('click', function (e) {
 
        if (  customValidateForm('frmEvaluation')  ) {
            $("#frmEvaluation").ajaxForm();


            buttonAddPleaseWait('btnSave');
            var options = {
                success: function (response, statusText, jqXHR) {
                    buttonRemovePleaseWait('btnSave', lblSend, 'send');
                    location.reload();
                    //swal(response);


                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btnSave', lblSend, 'send');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btnSave', lblSend, 'send');
                }
            };
            $("#frmEvaluation").ajaxSubmit(options);

        }
        else {

            buttonRemovePleaseWait('btnSave', lblSend, 'send');
        }
    });
    //Events ends

});



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
        commandName: 'Evaluation_Get_LineManager_by_DepartmentWise',
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

//function fn_OnSelect_Load_All_Employees_DDL(e) {

//    var selected_Id = e.dataItem.id;
//    loadAllEmployeesAsPer_LineManager_Department();

//};

//function loadAllEmployeesAsPer_LineManager_Department() {

//    ajaxRequest({
//        commandName: 'Evaluation_Get_AllEmployees_by_DepartmentWise',
//        values:
//        {
//            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
//            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
//            LineManager_DepartmentId: $('#DepartmentId').val(),
//            Language: _currentLanguage
//        }, CallBack: loadAllEmployeesAsPer_LineManager_Department_CallBack
//    });

//}

//var loadAllEmployeesAsPer_LineManager_Department_CallBack = function (inputDataJSON) {


//    $("#Employee_Id").kendoDropDownList({
//        dataTextField: "name",
//        dataValueField: "id",
//        filter: "contains",

//        dataSource: JSON.parse(inputDataJSON.Value),
//        //   select: fn_Save,
//    });
//}
