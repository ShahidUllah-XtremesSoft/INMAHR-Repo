var $grid = "employee-grid", requestFrom = '';

$(function () {
    localStorage.setItem('EmployeeIdToLoadLeaveBalance', 0);
    requestFrom = (new URL(location.href)).searchParams.get('from');
    $('#Language').val(_currentLanguage);
    loadEmployeeGrid();
    fnLoadNationalityDDL();

    /*    loadDepartmentTreeDropdownList();*/
    loadProfessionDropdownListForLSEng();
    loadProfessionDropdownListForLSArb();

    loadNationalityDropdownListForLSEng();
    loadNationalityDropdownListForLSArb();

    loadSponsorShipDropdownListForLSEng();
    loadSponsorShipDropdownListForLSArb();

    loadContractTypeDropdownListForLSEng();
    loadContractTypeDropdownListForLSArb();

    loadRoleDropdownListForLSEng();
    loadRoleDropdownListForLSArb();

    loadEmiratesStatesDropdownListForLSEng();
    loadEmiratesStatesDropdownListForLSArb();
    /*
    //----------- FOR DDL SEARCH
    loadParentDepartmentTreeDropdownList();
    setTimeout(function () { $("#DepartmentIdForSearch").data("kendoDropDownTree").bind("change", departmentParentTreeViewCheck); }, 500);
    //--------------- END 
    */
});
/*
//------------------------ LOAD PARENT DEPARTMENT  
function loadParentDepartmentTreeDropdownList() {
    ajaxRequest({ commandName: 'HR_Department_Dropdown_GetAll', values: { Language: _currentLanguage, }, CallBack: loadParentTreeDropdownList});
}
function loadParentTreeDropdownList(d) {
    var _data = treeFomatter(JSON.parse(d.Value), 0);
    $("#DepartmentIdForSearch").kendoDropDownTree({ checkboxes: true, autoClose: false, height: 'auto', dataSource: _data });
}

*/

//Load Lists to Local Storage
function loadProfessionDropdownListForLSEng() {
    ajaxRequest({ commandName: 'HR_Profession_Get', values: { Language: 'en-US' }, CallBack: loadProfessionDropdownListForLSEngCallBack });
}
function loadProfessionDropdownListForLSEngCallBack(response) {

    window.localStorage.setItem('ProfessionListEng', response.Value);
}
function loadProfessionDropdownListForLSArb() {
    ajaxRequest({ commandName: 'HR_Profession_Get', values: { Language: 'ar-AE' }, CallBack: loadProfessionDropdownListForLSArbCallBack });
}
function loadProfessionDropdownListForLSArbCallBack(response) {

    window.localStorage.setItem('ProfessionListArb', response.Value);
}




function loadNationalityDropdownListForLSEng() {
    ajaxRequest({ commandName: 'HR_Nationality_Get', values: { Language: 'en-US' }, CallBack: loadNationalityDropdownListForLSEngCallBack });
}
function loadNationalityDropdownListForLSEngCallBack(response) {
    window.localStorage.setItem('NationalityListEng', response.Value);
}
function loadNationalityDropdownListForLSArb() {
    ajaxRequest({ commandName: 'HR_Nationality_Get', values: { Language: 'ar-AE' }, CallBack: loadNationalityDropdownListForLSArbCallBack });
}
function loadNationalityDropdownListForLSArbCallBack(response) {
    window.localStorage.setItem('NationalityListArb', response.Value);
}



function loadSponsorShipDropdownListForLSEng() {
    ajaxRequest({ commandName: 'HR_VisaSponsorship_Get', values: { Language: 'en-US' }, CallBack: loadSponsorShipDropdownListForLSEngCallBack });
}
function loadSponsorShipDropdownListForLSEngCallBack(response) {
    window.localStorage.setItem('SponsorshipListEng', response.Value);
}
function loadSponsorShipDropdownListForLSArb() {
    ajaxRequest({ commandName: 'HR_VisaSponsorship_Get', values: { Language: 'ar-AE' }, CallBack: loadSponsorShipDropdownListForLSArbCallBack });
}
function loadSponsorShipDropdownListForLSArbCallBack(response) {
    window.localStorage.setItem('SponsorshipListArb', response.Value);
}



function loadContractTypeDropdownListForLSEng() {
    ajaxRequest({ commandName: 'HR_ContractType_Get', values: { Language: 'en-US' }, CallBack: loadContractTypeDropdownListForLSEngCallBack });
}
function loadContractTypeDropdownListForLSEngCallBack(response) {
    window.localStorage.setItem('ContractTypeListEng', response.Value);
}
function loadContractTypeDropdownListForLSArb() {
    ajaxRequest({ commandName: 'HR_ContractType_Get', values: { Language: 'ar-AE' }, CallBack: loadContractTypeDropdownListForLSArbCallBack });
}
function loadContractTypeDropdownListForLSArbCallBack(response) {
    window.localStorage.setItem('ContractTypeListArb', response.Value);
}



function loadRoleDropdownListForLSEng() {
    ajaxRequest({ commandName: 'UserManagement_Role_Get', values: { Language: 'en-US' }, CallBack: loadRoleDropdownListForLSEngCallBack });
}
function loadRoleDropdownListForLSEngCallBack(response) {
    window.localStorage.setItem('UserManagementRoleListEng', response.Value);
}
function loadRoleDropdownListForLSArb() {
    ajaxRequest({ commandName: 'UserManagement_Role_Get', values: { Language: 'ar-AE' }, CallBack: loadRoleDropdownListForLSArbCallBack });
}
function loadRoleDropdownListForLSArbCallBack(response) {
    window.localStorage.setItem('UserManagementRoleListArb', response.Value);
}





function loadEmiratesStatesDropdownListForLSEng() {
    ajaxRequest({ commandName: 'HR_EmiratesStates_Get', values: { Language: 'en-US' }, CallBack: loadEmiratesStatesDropdownListForLSEngCallBack });
}
function loadEmiratesStatesDropdownListForLSEngCallBack(response) {
    window.localStorage.setItem('EmiratesStatesListEng', response.Value);
}
function loadEmiratesStatesDropdownListForLSArb() {
    ajaxRequest({ commandName: 'HR_EmiratesStates_Get', values: { Language: 'ar-AE' }, CallBack: loadEmiratesStatesDropdownListForLSArbCallBack });
}
function loadEmiratesStatesDropdownListForLSArbCallBack(response) {
    window.localStorage.setItem('EmiratesStatesListArb', response.Value);
}




















function loadEmployeeGrid() {
    ajaxRequest({ commandName: 'HR_Employee_GetAllForGrid', values: { LoggedInUser: JSON.parse(localStorage.getItem('User')).id, RoleId: JSON.parse(localStorage.getItem('User')).roleId, Language: $('#Language').val() }, CallBack: loadEmployeeGridCallBack });
}
var loadEmployeeGridCallBack = function (inputDataJSON) {
    bindEmployeeGrid(JSON.parse(inputDataJSON.Value));
}
var bindEmployeeGrid = function (inputDataJSON) {
    var record = 0;


    for (var i = 0; i < inputDataJSON.length; i++) {
        if (inputDataJSON[i].childParent == null) {

            inputDataJSON[i].childParent = inputDataJSON[i].companyName

        } else {
            inputDataJSON[i].companyName = inputDataJSON[i].childParent

        }
    }

    var isHR = !inputDataJSON[0].isHR;

    if (requestFrom == 'attendance') {
        isHR = true;
    }
    var gridColumns = [

        { field: "id", title: "id", hidden: true },

        { title: "#", template: "<b>#= ++record #</b>", width: 20, },
        //{ field: "employeeNumber", title: "Employee Number", width: 130, filterable: true },
        {
            field: "employeeNumber", title: employeeNumber, width: 40, filterable: true,
            template: "<a style='cursor:pointer;text-decoration:underline;'  class='viewbutton' onClick= redirectToEmployeeDetailView(this)  title='Employee Number'>#=employeeNumber#</a> ",
            //attributes: { "class": "table-cell", style: "text-align: center; font-weight: bold;" }

        },
        //{ field: "nameEng", title: nameEng, width: 100, filterable: true, },
        //{ field: "nameArb", title: nameArb, width: 100, filterable: true },
        {
            field: "employeeName", title: employeeName, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        {
            field: "department", title: department, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        { field: "phoneNumber", title: phone, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "email", title: email, width: 100, hidden: true, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "joinDate", title: joinDate, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "professionId", title: "Profession", width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, hidden: true },
        { field: "profession", title: profession, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        {
            field: "companyName", title: lblCompany, width: 100, filterable: true,
            //  template: "#if (companyName !=null) { # #:companyName# # } else {#  #:childParent# # }#"

        },
        { field: "passportNumber", title: PassportNumber, width: 100, filterable: true, hidden: true },
        { field: "eidNumber", title: eidNumber, width: 100, filterable: true, hidden: true },
        //{ field: "releaseDate", title: "ReleaseDate", width: 100, filterable: true },
        //{ field: "expiryDate", title: "ExpiryDate", width: 100, filterable: true },
        {
            field: "isLoginAssigned", width: 65,
            title: login,
            hidden: isHR,
            //template: "#if(isLoginAssigned === 0) {#<div><button class='btn btn-primary btn-sm'  onClick= createLogin(this)><span class='fa fa-user'></span> " + btnGridCreateLogin + "</button>#}if(isLoginAssigned == 1) {#<div class='btn btn-success btn-sm'><i class='fa fa-check' aria-hidden='true'></i> " + btnGridAlreadyCreated + "</div>#}#",
            template: "#if(isLoginAssigned === 0) {#<div><button class='btn btn-primary btn-sm'  onClick= createLogin(this)><span class='fa fa-user'></span> " + btnGridCreateLogin + "</button>#} " +
                " if(isLoginAssigned == 1) { #<div class= 'btn btn-success btn-sm' onClick= UpdateLogin(this) > <i class='fa fa-check' aria-hidden='true'></i> " + btnGridAlreadyCreated + "</div>#}#",


        },
        {
            field: "", width: 40,
            title: ' ',
            hidden: isHR,
            template: "<a style='cursor:pointer; font-size:20px;' onClick= viewDetailEmployee(this) title='View Employee Detail' ><span class='fa fa-eye'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= editEmployee(this) title='Edit Employee' ><span class='fa fa-pencil'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteEmployeeById(this)  title='Delete Employee'><span class='fa fa-trash'></span></a>  "
        },



    ];

    bindKendoGrid($grid, 50, gridColumns, inputDataJSON, true, 750);
};
function redirectToEmployeeDetailView(e) {
    var row = $(e).closest("tr");
    var grid = $("#employee-grid").data("kendoGrid");
    var dataItem = grid.dataItem(row);
    localStorage.setItem('EmployeeNumber', dataItem.employeeNumber);
    localStorage.setItem('LoggedInEmployeeId', dataItem.id);
    localStorage.setItem('EmployeeIdToLoadLeaveBalance', dataItem.id);
    if (requestFrom == 'employee') {
        window.location.href = '/HumanResource/Employee/Detail';
    }
    else if (requestFrom == 'attendance') {
        localStorage.setItem('EmployeeIdForAttendance', dataItem.id);
        localStorage.setItem('EmployeeNumberForAttendance', dataItem.employeeNumber);
        window.location.href = '/Employees/Attendance/Detail';//?employeeId=' + dataItem.id + '';
    }


}
function createLogin(e) {

    loadDepartmentTreeDropdownList();
    loadRoleDropdown();
    $('#modal-adduserlogin').modal('show');

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#Id').val(0);
    $('#RoleId').val(0);
    $('#DepartmentId').val(0);

    $('#EmployeeId').val(dataItem.id);
    $('#Email').val(dataItem.employeeNumber);

}
function UpdateLogin(e) {
     
    loadDepartmentTreeDropdownList();
    loadRoleDropdown();
    $('#divDepartmentDropdownList').hide();
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#modal-adduserlogin').modal('show');
    setTimeout(function () {

        $('#Id').val(dataItem.userId);
        $('#EmployeeId').val(dataItem.id);
        $('#Email').val(dataItem.employeeNumber);
        $('#RoleId').val(dataItem.roleId);
        $('#DepartmentId').val(dataItem.departmentId);

    }, 100);









}


$('#btnsave').click(function () {
    if (customValidateForm('frmUserLoginDetail')) {
        $("#frmUserLoginDetail").ajaxForm();
        buttonAddPleaseWait('btnsave');
        var options = {
            success: function (response, statusText, jqXHR) {
                swal(response);
                loadEmployeeGrid();
                $('#divDepartmentDropdownList').css('display', 'block');
                $('#modal-adduserlogin').modal('hide');
            },
            error: function (xhr, status, error) {
                buttonRemovePleaseWait('btnsave', btnSave, 'save');
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
            , complete: function () {
                $('#divDepartmentDropdownList').css('display', 'block');
                buttonRemovePleaseWait('btnsave', btnSave, 'save');
            }
        };
        $("#frmUserLoginDetail").ajaxSubmit(options);
    }
    else {
        buttonRemovePleaseWait('btnsave', btnSave, 'save');
    }
});

function editEmployee(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/HumanResource/Employee/Edit?id=' + dataItem.id + '';
}

function viewDetailEmployee(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/HumanResource/Employee/View?id=' + dataItem.id + '';
}


function loadRoleDropdownList(isBindChangeEvent = false) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('RoleIdex', 'Id [Value], NameEng [Text]', 'UserManagement_Role', 'NameEng IS NOT NULL and UserManagement_MainApplicationModules_Id=1', 0, 'moduleDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('RoleIdex', 'Id [Value], NameArb [Text]', 'UserManagement_Role', 'NameArb IS NOT NULL and UserManagement_MainApplicationModules_Id=1', 0, 'moduleDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            //$("#dropDownListParentId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);
}
//function roleDropdownListOnChange(e) {
//    var dataItem = e.sender.dataItem();
//    $('#ParentId').val(dataItem.value);
//}
function loadRoleDropdown() {

    if ($('#Language').val() == 'en-US') {
        ajaxRequest({ commandName: 'Common_DropdownList', values: { Columns: 'Id [Value], NameEng [Text]', TableName: 'UserManagement_Role', Conditions: 'NameEng IS NOT NULL and UserManagement_MainApplicationModules_Id=1', SelectedValue: 0 }, CallBack: loadRoleDropdownListCallBack });
    }
    else {
        ajaxRequest({ commandName: 'Common_DropdownList', values: { Columns: 'Id [Value], NameArb [Text]', TableName: 'UserManagement_Role', Conditions: 'NameArb IS NOT NULL and UserManagement_MainApplicationModules_Id=1', SelectedValue: 0 }, CallBack: loadRoleDropdownListCallBack });
    }
}
var loadRoleDropdownListCallBack = function (loadjQueryDropdownListResponse) {
    $('#RoleId').empty();
    var option = "";
    var jsonData = JSON.parse(loadjQueryDropdownListResponse.Value)
    option += ("<option value='0' selected>--Select--</option>");
    $.each(jsonData, function (key, val) {
        option += '<option value=' + this.value + '>' + this.text + '</option>';
    });
    $('#RoleId').append(option);
}

$('#RoleId').change(function () {

    var roleName = $("#RoleId option:selected").text();

    var dropdownlist = $("#DepartmentId").data("kendoDropDownTree");
    dropdownlist.value("");

    if (roleName == "User" || roleName == "مستخدم") {
        $('#DepartmentId').val("0");
        //dropdownlist.wrapper.hide()
        $('#divDepartmentDropdownList').css('display', 'none');
        $("#DepartmentId").prop('required', false);

        //var dropdownlist = $("#DepartmentId").data("kendoDropDownTree");
        //dropdownlist.value("");

        //$("#DepartmentId").data("kendoDropDownTree").enable(false);
    }
    else {
        $("#DepartmentId").data("kendoDropDownTree").enable(true);
        $("#DepartmentId").prop('required', true);
        $('#divDepartmentDropdownList').css('display', 'block');

    }

});

function deleteEmployeeById(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
        //title: 'Are you sure?',
        //text: "Do you really want to delete selected record",
        ////input: 'text',
        //icon: 'question',
        //showCancelButton: true,
        //confirmButtonColor: '#5cb85c',
        //cancelButtonColor: '#d9534f',
        //buttons: {
        //    cancel: {
        //        text: "No",
        //        value: null,
        //        visible: true,
        //        className: "btn btn-danger",
        //        closeModal: true
        //    },
        //    confirm: {
        //        text: "Yes",
        //        value: true,
        //        visible: true,
        //        className: "btn btn-warning",
        //        closeModal: true
        //    }
        //}
        title: areYouSureTitle,
        text: doYouReallyWantToDeletThisRecord,
        //input: 'text',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
        confirmButtonText: btnYesText,
        cancelButtonText: btnNoText,
        buttons: {
            cancel: {
                text: "No",
                value: null,
                visible: true,
                className: "btn btn-danger",
                closeModal: true
            },
            confirm: {
                text: "Yes",
                value: true,
                visible: true,
                className: "btn btn-warning",
                closeModal: true
            }
        }
    }).then(function (restult) {
        if (restult.value) {
            ajaxRequest({ commandName: 'HR_Employee_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteEmployeeByIdCallBack });
        }
    });
    var deleteEmployeeByIdCallBack = function (response) {
        swal(response.Value);
        loadEmployeeGrid();
    }

}
function fnLoadNationalityDDL() {
    if (_currentLanguage == 'en-US') {
        ajaxRequest({
            commandName: 'Common_DropdownList',
            values: {
                Columns: 'Id [Value], NameEng [Text]',
                TableName: 'HR_Nationality',
                Conditions: 'NameEng IS NOT NULL',
                SelectedValue: 0
            }, CallBack: loadNationalityDataDDL
        });
    }
    else {

        ajaxRequest({
            commandName: 'Common_DropdownList',
            values: {
                Columns: 'Id [Value], NameArb [Text]',
                TableName: 'HR_Nationality',
                Conditions: 'NameArb IS NOT NULL',
                SelectedValue: 0
            }, CallBack: loadNationalityDataDDL
        });
    }

}
var loadNationalityDataDDL = function (inputDataJSON) {

    localStorage.setItem("nationalityDDL", JSON.stringify(inputDataJSON.Value));
}



/* NO NEED DDL BASE SEARCH
//--------------------------- FOR SEARCH -------------------------------
$('#btnSearch').click(function () {
    var Department = $('#DepartmentId').val();
    //if (Department == '' || Department == null) {
    //    Swal.fire({
    //        position: 'center',icon: 'error',title: 'Please select department',
    //        showConfirmButton: false,
    //        timer: 1500
    //    })
    //    return;
    //}
    loadAttendanceGrid('Employee_Attendance_TodayAttendance_Get', {
        CreatedBy: JSON.parse(localStorage.getItem('User')).id,
        LoggedInUserDepartmentId: JSON.parse(localStorage.getItem('User')).departmentId,
        SearchByDepartmentId: $('#DepartmentId').val(),
        RoleId: JSON.parse(localStorage.getItem('User')).roleId,
        Language: _currentLanguage
    });
});
function departmentParentTreeViewCheck(e) {

    var getLastValue = 0
    $('#DepartmentIdForSearch').val('');
    var selectedDepartments = e.sender._values;
    var concatenatedDepartments = '';
    selectedDepartments.forEach(function (item) {
        concatenatedDepartments += concatenatedDepartments == '' ? item : ',' + item;
        getLastValue = item;
    });
    $('#DepartmentIdForSearch').val(concatenatedDepartments);

    loadAllEmployeesAsPerDepartmentId();
}
function loadAllEmployeesAsPerDepartmentId() {
    ajaxRequest({
        commandName: 'Employee_Attendance_Linking',
        values: {
            DepartmentIds: $('#DepartmentIdForSearch').val(),
            Language: _currentLanguage
        }, CallBack: getloadAllEmployeesAsPerDepartmentId
    });
}

var getloadAllEmployeesAsPerDepartmentId = function (inputDataJSON) { bindGridData(JSON.parse(inputDataJSON.Value)); }
*/