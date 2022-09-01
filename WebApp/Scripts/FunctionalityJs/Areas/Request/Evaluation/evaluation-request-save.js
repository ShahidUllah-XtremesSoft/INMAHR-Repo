$(function () {

    loadDepartmentTreeDropdownListWithRoleBaseAndCheckbox_New();
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    //Events Starts
    $('#btnSave').on('click', function (e) {
         
        var thisFieldIsRequired = _currentLanguage == 'en-US' ? 'This field is required' : 'هذه الخانة مطلوبة';
        var valid = true;

        if ($('#DepartmentId').val() == null || $('#DepartmentId').val() == '' || $('#DepartmentId').val() == -1 || $('#DepartmentId').val() == '0') {
            $('#DepartmentId').addClass('invalid');
            $('#DepartmentId').attr('title', thisFieldIsRequired);
            $('#DepartmentId').removeClass("invalid");
            $('#DepartmentId').next("span").remove();
            $('#DepartmentId').after("<span style='color:red;'>" + thisFieldIsRequired + "</span>");
            valid = false;
        }
        else {
            $('#DepartmentId').removeClass("invalid");
            $('#DepartmentId').next("span").remove();

        }
        if (true == customValidateForm('frmEvaluation') && valid == true) {
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
        commandName: 'HR_Department_GetAll_New_By_ID',
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
   
    var _data = treeFomatterRoleBase(JSON.parse(d.Value), 0);
    $("#DepartmentId").kendoDropDownTree({
        checkboxes: false,
        autoClose: true,
        height: 'auto',
        dataSource: _data,
        index: -1,
        change: fn_OnSelect_DDL
        
    });
     
}
 
function fn_OnSelect_DDL(e) {
    
   
    var selected_Id = this.value(); 
    loadAll_LINE_Manager_AsPerDepartmentId(selected_Id);
    //$('#LM_Employee_Id').trigger('reset');
    //$('#Employee_Id').trigger('reset');
};


function loadAll_LINE_Manager_AsPerDepartmentId(departmentId) {
    
    ajaxRequest({
        commandName: 'Evaluation_Get_LineManager_by_DepartmentWise',
        values:
        {
            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            LineManager_DepartmentId: departmentId,
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
        select: fn_OnSelect_Load_All_Employees_DDL,
    });
        

}

function fn_OnSelect_Load_All_Employees_DDL(e) {

    var selected_Id = e.dataItem.id;
    loadAllEmployeesAsPer_LineManager_Department();

};

function loadAllEmployeesAsPer_LineManager_Department() {

    ajaxRequest({
        commandName: 'Evaluation_Get_AllEmployees_by_DepartmentWise',
        values:
        {
            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            LineManager_DepartmentId: $('#DepartmentId').val(),
            Language: _currentLanguage
        }, CallBack: loadAllEmployeesAsPer_LineManager_Department_CallBack
    });

}

var loadAllEmployeesAsPer_LineManager_Department_CallBack = function (inputDataJSON) {
     

    $("#Employee_Id").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains", 
       
        dataSource: JSON.parse(inputDataJSON.Value),
        //   select: fn_Save,
    });
}
