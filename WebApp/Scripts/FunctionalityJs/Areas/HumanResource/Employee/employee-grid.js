var $grid = "employee-grid", requestFrom = '';

$(function () {
    requestFrom = (new URL(location.href)).searchParams.get('from');
    $('#Language').val(_currentLanguage);
    loadEmployeeGrid();
});
function loadEmployeeGrid() {
    ajaxRequest({ commandName: 'HR_Employee_GetAllForGrid', values: { LoggedInUser: JSON.parse(localStorage.getItem('User')).id, RoleId: JSON.parse(localStorage.getItem('User')).roleId,Language: $('#Language').val() }, CallBack: loadEmployeeGridCallBack });
}
var loadEmployeeGridCallBack = function (inputDataJSON) {    
    bindEmployeeGrid(JSON.parse(inputDataJSON.Value));
}
var bindEmployeeGrid = function (inputDataJSON) {
    var isHR = !inputDataJSON[0].isHR;
   
    if (requestFrom == 'attendance') {
        isHR = true;
    }
    var gridColumns = [

        { field: "id", title: "id", hidden: true },

       
        //{ field: "employeeNumber", title: "Employee Number", width: 130, filterable: true },
        {
            field: "employeeNumber", title: employeeNumber, width: 40, filterable: true,
            template: "<a style='cursor:pointer;text-decoration:underline;'  class='viewbutton' onClick= redirectToEmployeeDetailView(this)  title='Employee Number'>#=employeeNumber#</a> ",
            //attributes: { "class": "table-cell", style: "text-align: center; font-weight: bold;" }

        },
        //{ field: "nameEng", title: nameEng, width: 100, filterable: true, },
        //{ field: "nameArb", title: nameArb, width: 100, filterable: true },
        { field: "employeeName", title: employeeName, width: 100, filterable: true },
        { field: "department", title: department, width: 100, filterable: true },
        { field: "phoneNumber", title: phone, width: 50, filterable: true },
        { field: "email", title: email, width: 100, filterable: true },
        { field: "joinDate", title: joinDate, width: 50, filterable: true },
        { field: "professionId", title: "Profession", width: 100, filterable: true,hidden:true },
        { field: "profession", title: profession, width: 100, filterable: true },
        { field: "passportNumber", title: PassportNumber, width: 100, filterable: true, hidden: true },
        { field: "eidNumber", title: eidNumber, width: 100, filterable: true, hidden: true },
        //{ field: "releaseDate", title: "ReleaseDate", width: 100, filterable: true },
        //{ field: "expiryDate", title: "ExpiryDate", width: 100, filterable: true },
        {
            field: "isLoginAssigned", width: 65,
            title: login,
            hidden: isHR,
            template: "#if(isLoginAssigned === 0) {#<div><button class='btn btn-primary btn-sm'  onClick= createLogin(this) title='Create login' ><span class='fa fa-user'></span> " + btnGridCreateLogin + "</button>#}if(isLoginAssigned == 1) {#<div class='btn btn-success btn-sm'><i class='fa fa-check' aria-hidden='true'></i> " + btnGridAlreadyCreated + "</div>#}#",


        },
        {
            field: "", width: 40,
            title: ' ',
            hidden: isHR,
            template: "<a style='cursor:pointer; font-size:20px;' onClick= viewDetailEmployee(this) title='View Employee Detail' ><span class='fa fa-eye'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= editEmployee(this) title='Edit Employee' ><span class='fa fa-pencil'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteEmployeeById(this)  title='Delete Employee'><span class='fa fa-trash'></span></a>  "
        },


       
    ];

    bindKendoGrid($grid, 50, gridColumns, inputDataJSON,true,750);
};
function redirectToEmployeeDetailView(e) {
    var row = $(e).closest("tr");
    var grid = $("#employee-grid").data("kendoGrid");
    var dataItem = grid.dataItem(row);
    localStorage.setItem('EmployeeNumber', dataItem.employeeNumber);
    localStorage.setItem('LoggedInEmployeeId', dataItem.id);
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

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#EmployeeId').val(dataItem.id);
    $('#Email').val(dataItem.employeeNumber);
    $('#modal-adduserlogin').modal('show');
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
                buttonRemovePleaseWait('btnsave', 'Save', 'save');
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
            , complete: function () {
                $('#divDepartmentDropdownList').css('display', 'block');
                buttonRemovePleaseWait('btnsave', 'Save', 'save');
            }
        };
        $("#frmUserLoginDetail").ajaxSubmit(options);
    }
    else {
        buttonRemovePleaseWait('btnsave', 'Save', 'save');
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
        loadKendoDropdownList('RoleIdex', 'Id [Value], NameEng [Text]', 'UserManagement_Role', 'NameEng IS NOT NULL', 0, 'moduleDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('RoleIdex', 'Id [Value], NameArb [Text]', 'UserManagement_Role', 'NameArb IS NOT NULL', 0, 'moduleDropdownListOnChange');
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
        ajaxRequest({ commandName: 'Common_DropdownList', values: { Columns: 'Id [Value], NameEng [Text]', TableName: 'UserManagement_Role', Conditions: 'NameEng IS NOT NULL', SelectedValue: 0 }, CallBack: loadRoleDropdownListCallBack });
    }
    else {
        ajaxRequest({ commandName: 'Common_DropdownList', values: { Columns: 'Id [Value], NameArb [Text]', TableName: 'UserManagement_Role', Conditions: 'NameArb IS NOT NULL', SelectedValue: 0 }, CallBack: loadRoleDropdownListCallBack });
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
    debugger;
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
        text: areYouSureText,
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