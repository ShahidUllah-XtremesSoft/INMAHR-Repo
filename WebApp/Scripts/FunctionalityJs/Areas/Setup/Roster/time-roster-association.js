var $RosterGrid = "div-roster-grid";
$(function () {
    loadDepartmentTreeDropdownList();
    setTimeout(function () {
        $("#DepartmentId").data("kendoDropDownTree").bind("change", departmentTreeViewCheck);

    }, 1000);
});

function departmentTreeViewCheck(e) {

    $('#DepartmentIds').val('');
    var selectedDepartments = e.sender._values;
    var concatenatedDepartments = '';
    selectedDepartments.forEach(function (item) {
        concatenatedDepartments += concatenatedDepartments == '' ? item : ',' + item;
    });
    $('#DepartmentIds').val(concatenatedDepartments);


}
function fnLoadAllEmployeesListAsPerDepartment() {
    var Department = $('#DepartmentId').val();
    if (Department == '' || Department == null) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: select + ' ' + section,
            showConfirmButton: false,
            timer: 1500
        })
        return;
    } else {
        ajaxRequest({
            commandName: 'Roster_Association_Get_AllEmployees_by_DepartmentWise',
            values: {
                LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
                DepartmentId: Department,
                Language: _currentLanguage
            }, CallBack: fnLoadEmployeesByDepartmentIdCallBack
        });

    }
}
var fnLoadEmployeesByDepartmentIdCallBack = function (response) {
    var db_Response = JSON.parse(response.Value)
    var gridColumns = [
        // {
        //     title: '',
        //
        //     headerTemplate: "<input type='checkbox' id='checkAll'  class='k-checkbox header-checkbox'>",
        //     template: function (dataItem) {
        //         if (dataItem.isAssigned == 1) { return "<div><input type='checkbox' class='k-checkbox row-checkbox' onclick='fnCheckUncheck(this)' id='target' checked ></div>"; }
        //         else { return "<div><input type='checkbox' class='k-checkbox row-checkbox' onclick='fnCheckUncheck(this)' id='target' unchecked='true'></div>"; }
        //     },
        //     width: 5
        // },
        { title: "#", template: "<b>#= ++record #</b>", width: 8, },

        { field: "id", title: "id", hidden: true },
        { field: "departmentId", title: "DepartmentId", hidden: true, filterable: false },
        { field: "employeeNumber", title: employeeNumber, hidden: false, width: 20, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "name", title: lblName, hidden: false, width: 70, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }},
        { field: "sunday", title: lblSunday, hidden: false, width: 20, filterable: false },
        { field: "monday", title: lblMonday, hidden: false, width: 20, filterable: false },
        { field: "tuesday", title: lblTuesday, hidden: false, width: 20, filterable: false },
        { field: "wednesday", title: lblWednesday, hidden: false, width: 20, filterable: false},
        { field: "thursday", title: lblThursday, hidden: false, width: 20, filterable: false },
        { field: "friday", title: lblFriday, hidden: false, width: 20, filterable: false },
        { field: "saturday", title: lblSaturday, hidden: false, width: 20, filterable: false},
        /*{ field: "departmentName", title: "", hidden: false, width: 20 },*/
        //{ field: "department", title: section, hidden: false, width: 20 },
        //{ field: "roleName", title: lblRole, hidden: false, width: 20 },


    ];

    bindKendoGrid('load-employees-by-role-and-department', 50, gridColumns, JSON.parse(response.Value), true);

    /*$('#btn-select-records-from-grid').attr('disabled', true)*/
};


