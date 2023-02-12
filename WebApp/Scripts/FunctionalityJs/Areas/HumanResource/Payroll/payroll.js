var $PayrollGrid = "grid-payroll";

$(function () {

    //--- Load Grid
    fnLoadPayrollGrid();

    fnLoadSection_DDL();
    fnLoadProfession_DDL();
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $('#Language').val(_currentLanguage)


    //$("#PayDate").kendoDatePicker({
    //    value: new Date(),
    //    format: "dd/MM/yyyy",
    //    parseFormats: ["MMMM yyyy"]

    //});
});


//---------------------------------  DDL's

function fnLoadSection_DDL() {

    loadDepartmentTreeDropdownList();
    setTimeout(function () {

        $("#DepartmentId").data("kendoDropDownTree").bind("change", fnLoadSection_DDLCallBack);
    }, 1000);
}

function fnLoadSection_DDLCallBack(e) {

    $('#DepartmentId').val('');
    var selectedDepartments = e.sender._values;
    var concatenatedDepartments = '';
    selectedDepartments.forEach(function (item) {
        concatenatedDepartments += concatenatedDepartments == '' ? item : ',' + item;
    });
    $('#DepartmentId').val(concatenatedDepartments);


}
function fnLoadProfession_DDL() {

    ajaxRequest({ commandName: 'HR_Profession_Get', values: { Language: _currentLanguage }, CallBack: fnLoadProfession_DDLCallBack });
}
var fnLoadProfession_DDLCallBack = function (response) {

    $("#DesignationID").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
        change: function (e) {
            var selected_Id = this.value();

            $('#DesignationID').val(selected_Id);


        },
    });

}



function fnLoadPayrollGrid() {
     
    //values - are key value pair json object
    ajaxRequest({
        commandName: 'Employees_SelectForPayroll',
        values: {
            DepartmentID: $('#DepartmentId').val() == "" ? 0 : $('#DepartmentId').val(),
            DesignationID: $('#DesignationID').val() == "" ? 0 : $('#DesignationID').val(),
            PayrollMonth: $('#PayrollMonth').val(),
            PayrollYear: $('#PayrollYear').val(),
            Language: _currentLanguage

        }, CallBack: fnLoadPayrollGridCallBack
    });
}

var fnLoadPayrollGridCallBack = function (inputDataJSONs) {
     
    if (JSON.parse(inputDataJSONs.Value) != null) {
        for (var i = 0; i < JSON.parse(inputDataJSONs.Value).length; i++) {

            if (JSON.parse(inputDataJSONs.Value)[i].isProceed == true) {
                $('.showHideBtn').hide();
                $('.showProceedMsg').show();
            } else {
                $('.showHideBtn').show();
                $('.showProceedMsg').hide();
            }

        }
    }

    inputDataJSONs = JSON.parse(inputDataJSONs.Value)
    console.log(inputDataJSONs)

    var gridColumns = [

        { title: "#", template: "<b>#= ++record #</b>", width: 15, },

        { field: "payrollID", title: "payrollID", hidden: true },
        { field: "employeeID", title: "employeeID", hidden: true },
        { field: "departmentID", title: "Department", hidden: true },
        { field: "designationID", title: "Designation", hidden: true },
        {
            field: "nameofEmployee", title: lblEmployeeName, width: 120, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
            // template: "<a  class='viewbutton' href='/Employee/EmployeeDetails?employeeID=#=employeeID#'  title='Show Details'>#=nameofEmployee#</a> "
        },


        //{
        //    field: "employeeDesignation", title: "employeeDesignation", width: 50, filterable: false,
        //    template: "#=employeeDesignation#"
        //},
        {
            field: "employeetype", title: lblProfession, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
            template: "#=employeetype#"
        },
        {
            field: "totalpresent", title: P, width: 20, filterable: false,
            template: "<label class='label label-success'>#=totalpresent#</label>"

        },
        {
            field: "totalAbsent", title: A, width: 20, filterable: false,
            template: " <label class='label label-danger'>#=totalAbsent#</label>"
        },
        {
            field: "totalleave", title: L, width: 20, filterable: false,
            template: "  <label class='label label-warning'>#=totalleave#</label>"
        },


        { field: "basicSalary", title: lblBasicSalary, width: 40, filterable: false },
        {
            field: "totaladdation", title: lblAddition, width: 40, filterable: false
            , attributes: { "class": "totalAddition" }
        },
        {
            field: "totalDeduction", title: lblDeduction, width: 40, filterable: false,
            attributes: { "class": "totalDeductionApplied" }
        },
        {
            field: "grosssalary", title: lblGrossSalary, width: 40, filterable: false,
            attributes: { "class": "grossSalary" }
        },
        //{
        //    field: "isProceed", title: "isProceed", width: 40, filterable: false,
        //},
        //#10ff00

        {
            field: "", width: 20,
            title: "Action",

            //template: "   <a style='font-size:20px;' data-toggle='modal'  data-target='.modal-add-update-payroll-addition-deduction' onClick= EditDetail(this) title='Edit Salary' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Record'><span class='icofont icofont-ui-delete'></span></a>"
            template: "#  if (isProceed == '0' ) " +
                "{ #  <a style='font-size:20px;cursor:pointer;' data-toggle='modal'  data-target='.modal-add-update-payroll-addition-deduction' onClick= EditDetail(this) title='Edit ' ><span class='  fa fa-edit'></span></a>  #}" +
                " else if (isProceed == '1') " +
                "{#<a style='font-size: 20px; color: red; cursor: pointer;' onclick='printSalarySlip(this)' title='Print Slip'><span class='fa fa-print'></span></a>#} # "

        }];
    bindKendoGrid($PayrollGrid, 500, gridColumns, inputDataJSONs,true,750);
};

function printSalarySlip(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $PayrollGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.open('/HR/PrintSalary?' + dataItem.payrollID + '', '_blank');

}
function LoadRecordByID(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $PayrollGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    //window.location.href = '/Employee/EmployeeDetails?employeeID=' + dataItem.employeeID + '';
}


function EditDetail(e) {
    $('#frmAddUpdatePayrollAdditionDeduction').trigger('reset');

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#PayrollID').val(dataItem.payrollID);
    $('input,select,textarea').removeClass('error');
    $('#EmployeeID').val(dataItem.employeeID);
    $('#nameofEmployee').html(dataItem.nameofEmployee);
    $('#BasicSalary').val(dataItem.basicSalary);



    LoadLeavesAndTotalHoursByEmployee();
    LoadPayrollAdditionByEmployeeID();
    LoadPayrollDeductionByEmployeeID();


} 
$('#btn-search').on('click', function (e) {
    fnLoadPayrollGrid();
});
 