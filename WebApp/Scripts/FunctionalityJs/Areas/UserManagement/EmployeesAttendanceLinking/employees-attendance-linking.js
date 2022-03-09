
$(function () {
    //-- LOAD DEPARTMENT
    loadAllMissingEmployeesbyDefaultFromZkDatabase();
    loadDepartmentTreeDropdownListforAdmin();
    loadZkDepartmentTreeDropdownListforAdmin();

    //-- LOAD GRID 1st time
    loadAllEmployeesAsPerDepartmentId();
    loadAllZKEmployeesAsPerDepartmentId();
    setTimeout(function () { $("#DepartmentId").data("kendoDropDownTree").bind("change", departmentTreeViewCheck); }, 500);
    setTimeout(function () { $("#ZKDepartmentId").data("kendoDropDownTree").bind("change", zkdepartmentTreeViewCheck); }, 500);
    setTimeout(function () { console.clear(); }, 500);
   
});





//------------------------ LOAD All Missing Employees by Default from Zk-Database (bio time)
function loadAllMissingEmployeesbyDefaultFromZkDatabase() { ajaxRequest({ commandName: 'Attendance_INMA_And_Attendance_EmployeeNumber_Association', values: {}, CallBack: '' }); }



//------------------------ LOAD INMA EMPLOYEES ON DEPARTMENT WISE
function loadDepartmentTreeDropdownListforAdmin() { ajaxRequest({ commandName: 'HR_Department_Dropdown_GetAll', values: { Language: _currentLanguage, }, CallBack: loadTreeDropdownListforAdmin }); }
function loadTreeDropdownListforAdmin(d) {
    var _data = treeFomatter(JSON.parse(d.Value), 0);
    $("#DepartmentId").kendoDropDownTree({ checkboxes: true, autoClose: false, height: 'auto', dataSource: _data });
}

function departmentTreeViewCheck(e) {

    var getLastValue = 0
    $('#DepartmentIds').val('');
    var selectedDepartments = e.sender._values;
    var concatenatedDepartments = '';
    selectedDepartments.forEach(function (item) {
        concatenatedDepartments += concatenatedDepartments == '' ? item : ',' + item;
        getLastValue = item;
    });
    $('#DepartmentIds').val(concatenatedDepartments);

    loadAllEmployeesAsPerDepartmentId();
}
function loadAllEmployeesAsPerDepartmentId() { ajaxRequest({ commandName: 'Employee_Attendance_Linking', values: { DepartmentIds: $('#DepartmentIds').val(), Language: _currentLanguage }, CallBack: getloadAllEmployeesAsPerDepartmentId }); }

var getloadAllEmployeesAsPerDepartmentId = function (inputDataJSON) { bindGridData(JSON.parse(inputDataJSON.Value)); }
var bindGridData = function (inputDataJSON) {

    var gridColumns = [
        //{
        //    title: '',

        //    headerTemplate: "<input type='checkbox' id='checkAll'  class='k-checkbox header-checkbox'>",
        //    template: function (dataItem) {
        //        if (dataItem.isAssigned == 1) { return "<div><input type='checkbox' class='k-checkbox row-checkbox' onclick='fnCheckUncheck(this)' id='target' checked ></div>"; }
        //        else { return "<div><input type='checkbox' class='k-checkbox row-checkbox' onclick='fnCheckUncheck(this)' id='target' unchecked='true'></div>"; }
        //    },
        //    width: 5
        //},
        { field: "department", title: section, hidden: false, width: 20 },
        { field: "id", title: "id", hidden: true },
        { field: "departmentId", title: "DepartmentId", hidden: true },
        { field: "name", title: lblName, hidden: false, width: 30, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "employeeNumber", title: employeeNumber, hidden: false, width: 20, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        {
            field: "empCode", title: empNumber, hidden: false, width: 20, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            // template: "#if (empCode == '0') { # <span class='badge badge-danger'>#:empCode#</span> # } else {# <span class='badge badge-success'>#:empCode#</span> # }#"
        },


    ];

    bindKendoGrid('employee-attendance-employees-grid', 500, gridColumns, inputDataJSON, true);
    setTimeout(function () {
        var grid = $("#employee-attendance-employees-grid").data("kendoGrid");
        var gridData = grid.dataSource.view();

        for (var i = 0; i < gridData.length; i++) {
            if (gridData[i].empCode == '0') {
                grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("badge-danger");

            }
            //else {
            //    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass("badge-success");
            //}

        }

    }, 50);
};
function fnClearFields() {
    $('#Employee_Attendance_ZkDataEmpAssociation_Id').val('');
    $('#EmployeeNumber').val('');
    $('#EmployeeCode').val('');

}

$('#employee-attendance-employees-grid').on('click', "tr.k-state-selected", function (e) {

    var grid = $("#employee-attendance-employees-grid").data("kendoGrid");
    var dataItemt = grid.dataItem($(this).closest('tr'));

    fnClearFields();
    $('.show-hide-fields').show();
    $('#Employee_Attendance_ZkDataEmpAssociation_Id').val(dataItemt.id);
    $('#EmployeeNumber').val(dataItemt.employeeNumber);
    $('#EmployeeCode').val(dataItemt.empCode);
    $('#EmployeeCode').focus();

    if (parseInt(dataItemt.empCode) == 0) {
        $('#EmployeeCode').addClass('badge-danger')
    } else {
        $('#EmployeeCode').addClass('badge-success').removeClass('badge-danger');
    }

});

//------------ KEY PRESS CODE FOR ENTER BUTTON -----------------------
$('#EmployeeCode').keypress(function (e) {
    var key = e.which;
    if (key == 13)  // the enter key code
    {
        fnSaveUpdateEmployeeAttendanceLinking();
        return false;
    }
});
//------------ KEY PRESS CODE FOR ENTER BUTTON END-----------------------

function fnSaveUpdateEmployeeAttendanceLinking() {


    ajaxRequest({
        commandName: 'Employee_Attendance_ZkData_Emplployee_Linking',
        values:
        {
            Employee_Attendance_ZkDataEmpAssociation_Id: $('#Employee_Attendance_ZkDataEmpAssociation_Id').val(),
            EmployeeNumber: $('#EmployeeNumber').val(),
            EmployeeCode: $('#EmployeeCode').val() == '' ? 0 : $('#EmployeeCode').val(),
            Language: _currentLanguage
        }, CallBack: fnLinkCallBack
    });



}

var fnLinkCallBack = function (response) {

    swal(response.Value);
    loadAllEmployeesAsPerDepartmentId();
    fnClearFields();
    $('.show-hide-fields').hide();
}
//------------------------ LOAD INMA EMPLOYEES ON DEPARTMENT WISE END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//------------------------ LOAD ZK-DATA  EMPLOYEES ON DEPARTMENT WISE START

//------------------------ LOAD ZK EMPLOYEES ON DEPARTMENT WISE
function loadZkDepartmentTreeDropdownListforAdmin() { ajaxRequest({ commandName: 'ZK_Department_Dropdown_GetAll', values: {}, CallBack: loadZKTreeDropdownListforAdmin }); }
function loadZKTreeDropdownListforAdmin(d) {
    var _data = treeFomatter(JSON.parse(d.Value), 0);
    $("#ZKDepartmentId").kendoDropDownTree({ checkboxes: true, autoClose: false, height: 'auto', dataSource: _data });
}

function zkdepartmentTreeViewCheck(e) {

    var getLastValue = 0
    $('#ZKDepartmentIds').val('');
    var selectedDepartments = e.sender._values;
    var concatenatedDepartments = '';
    selectedDepartments.forEach(function (item) {
        concatenatedDepartments += concatenatedDepartments == '' ? item : ',' + item;
        getLastValue = item;
    });
    $('#ZKDepartmentIds').val(concatenatedDepartments);

    loadAllZKEmployeesAsPerDepartmentId();
}
function loadAllZKEmployeesAsPerDepartmentId() { ajaxRequest({ commandName: 'ZK_Employees_Get_By_DepartmentID', values: { DepartmentIds: $('#ZKDepartmentIds').val() }, CallBack: getloadAllzKEmployeesAsPerDepartmentId }); }

var getloadAllzKEmployeesAsPerDepartmentId = function (inputDataJSON) { bindzkGridData(JSON.parse(inputDataJSON.Value)); }
var bindzkGridData = function (inputDataJSON) {

    var gridColumns = [

        { field: "department", title: section, hidden: false, width: 20 },
        { field: "id", title: "id", hidden: true },
        { field: "departmentId", title: "DepartmentId", hidden: true },
        {
            field: "name", title: lblName, hidden: false, width: 30, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        //  { field: "employeeNumber", title: employeeNumber, hidden: false, width: 20 },
        {
            field: "empCode", title: empNumber, hidden: false, width: 20, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },


    ];

    bindKendoGrid('zk-data-employees-grid', 500, gridColumns, inputDataJSON, true);

};
//------------------------ LOAD ZK-DATA  EMPLOYEES ON DEPARTMENT WISE  END >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
