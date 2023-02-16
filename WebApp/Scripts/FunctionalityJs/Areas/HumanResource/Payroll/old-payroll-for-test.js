 
var userId = "";
var username = "";
var roleID = "";
var $grid = "grid-salary-setting";


$(document).ready(function () {
 
    //---------------------------------  MENU SELECTED LI COLOR CHANGE END ----------------------------------------------------------------------------   
    $('.showProceedMsg').hide();
    //---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------   
    userId = window.localStorage.getItem("userId");
    username = window.localStorage.getItem('userName');
    roleID = window.localStorage.getItem("RoleId");

    //---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------   
    $("#UserID").val(userId);
    //----------------------------- LOAD FUNCTIONS START---------------------------------------------------
    LoadEmployeeSalaryKendo('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000', '', '');
    LoadDepartment();
    //----------------------------- LOAD FUNCTIONS END---------------------------------------------------

     

});
$('#btn-search').on('click', function (e) {
    LoadEmployeeSalaryKendo();
});




function LoadEmployeeSalaryKendo() {
    KendoGlobalAjax({
        commandName: 'listEmployeePayroll', values: {
            DepartmentID: $('#DepartmentID :selected').val(),
            DesignationID: $('#DesignationID :selected').val(),
            PayrollMonth: $('#PayrollMonth :selected').val(),
            PayrollYear: $('#PayrollYear :selected').val()

        }, CallBack: loadEmployeeSalaryData
    });
}
var loadEmployeeSalaryData = function (d) {


    if (JSON.parse(d.Value) != null) {
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {

            if (JSON.parse(d.Value)[i].isProceed == true) {
                $('.showHideBtn').hide();
                $('.showProceedMsg').show();
            } else {
                $('.showHideBtn').show();
                $('.showProceedMsg').hide();
            }

        }
    }
    KendoGrid(JSON.parse(d.Value));
}


var KendoGrid = function (_data) {

    var record = 0;
    var colModel = [

        { field: "payrollID", title: "payrollID", hidden: true },
        { field: "employeeID", title: "employeeID", hidden: true },
        { field: "departmentID", title: "Department", hidden: true },
        { field: "designationID", title: "Designation", hidden: true },

        {
            field: "nameofEmployee", title: "Employee", width: 80, filterable: false,
            template: "<a  class='viewbutton' onClick= LoadRecordByID(this)  title='Show Details'>#=nameofEmployee#</a> "
            , filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }

        },
        {
            field: "employeeDesignation", title: "Designation", width: 80, filterable: false,
            template: "#=employeeDesignation#"
        },
        {
            field: "totalpresent", title: "P", width: 20, filterable: false,
            template: "<label class='label label-success'>#=totalpresent#</label>"

        },
        {
            field: "totalAbsent", title: "A", width: 20, filterable: false,
            template: " <label class='label label-danger'>#=totalAbsent#</label>"
        },
        {
            field: "totalleave", title: "L", width: 20, filterable: false,
            template: "  <label class='label label-warning'>#=totalleave#</label>"
        },


        { field: "basicSalary", title: "Basic Salary", width: 50, filterable: false },
        {
            field: "totaladdation", title: "Addition", width: 50, filterable: false
            , attributes: { "class": "totalAddition" }
        },
        {
            field: "totalDeduction", title: "Deduction", width: 50, filterable: false,
            attributes: { "class": "totalDeductionApplied" }
        },
        {
            field: "grosssalary", title: "Gross Salary", width: 50, filterable: false,
            attributes: { "class": "grossSalary" }
        },
        //#10ff00

        {
            field: "", width: 20,
            title: "Action",

            //template: "   <a style='font-size:20px;' data-toggle='modal'  data-target='.modal-add-update-payroll-addition-deduction' onClick= EditDetail(this) title='Edit Salary' ><span class='icofont icofont-ui-edit'></span></a>  <a style='font-size:20px;' onClick= deleteRecordByID('#=employeeID#')  title='Delete Record'><span class='icofont icofont-ui-delete'></span></a>"
            template: "#  if (isProceed == '0' ) { #  <a style='font-size:20px;' data-toggle='modal'  data-target='.modal-add-update-payroll-addition-deduction' onClick= EditDetail(this) title='Edit Salary' ><span class='icofont icofont-ui-edit'></span></a>  #} else if (isProceed == '1') {#<a style='font-size: 20px; color: red; cursor: pointer;' onclick='printSalarySlip(this)' title='Print Slip'><span class='fa fa-print'></span></a>#} # "

        }];

    BindkendoGrid($grid, 50, colModel, _data);
};
function printSalarySlip(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.open('/HR/PrintSalary?' + dataItem.payrollID + '', '_blank');

}
function LoadRecordByID(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Employee/EmployeeDetails?employeeID=' + dataItem.employeeID + '';
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


var deleteRecordByID = function (id) {

    swal.fire({
        title: 'Are you sure?',
        //text: "You won't be able to revert this!",
        text: "You want to delete this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
        buttons: {
            cancel: {
                text: "Cancel",
                value: null,
                visible: true,
                className: "btn btn-danger",
                closeModal: true
            },
            confirm: {
                text: "OK",
                value: true,
                visible: true,
                className: "btn btn-warning",
                closeModal: true
            }
        }
    }).then(function (restult) {

        if (restult.value) {
            KendoGlobalAjax({ commandName: 'deleteAllowanceById', values: { Id: id }, CallBack: '' });

            setTimeout(function () {
                LoadEmployeeSalaryKendo();
            }, 50);

            swal.fire('Deleted', '', 'success');
        } else {
            swal.fire("Cancelled", '', "error");

        }
    });
}



//----------------------------- Data AJAX FUNCTION START---------------------------------------------------

function LoadPayrollAdditionByEmployeeID() {
    KendoGlobalAjax({ commandName: 'Payroll_LoadAdditionByEmployeeByID', values: { EmployeeID: $('#EmployeeID').val(), month: $('#PayrollMonth :selected').val(), PayrollYear: $('#PayrollYear :selected').val() }, CallBack: getLoadPayrollAdditionByEmployeeID });
}
var getLoadPayrollAdditionByEmployeeID = function (d) {

    if (JSON.parse(d.Value).length > 0) {

        $('.appendAddition').empty();
        $('.appendLabourAddition').empty();
        for (var i = 0; i < JSON.parse(d.Value).length; i++) {

            $('.appendAddition').append('<div class="form-group"><label>' + JSON.parse(d.Value)[i].allowanceTypeName + '</label><input class="form-control" oninput="this.value = Math.abs(this.value)" type="number" name="' + JSON.parse(d.Value)[i].allowanceTypeName + '" id="' + JSON.parse(d.Value)[i].allowanceTypeID + '" value="' + JSON.parse(d.Value)[i].allowanceAmount + '"></div>');
        }
    } else {

        LoadAllowanceByEmployeeID();
        LoadLabourOvertimeDetailByID();
    }
}
function LoadPayrollDeductionByEmployeeID() {
    KendoGlobalAjax({ commandName: 'Payroll_LoadDeductionByEmployeeByID', values: { EmployeeID: $('#EmployeeID').val(), month: $('#PayrollMonth :selected').val(), PayrollYear: $('#PayrollYear :selected').val() }, CallBack: getLoadPayrollDeductionByEmployeeID });
}
var getLoadPayrollDeductionByEmployeeID = function (d) {

    if (JSON.parse(d.Value).length > 0) {

        $('#SecurityDeduction').val(JSON.parse(d.Value)[0].securityDeduction);
        $('#LeaveDeduction').val(JSON.parse(d.Value)[0].leaveDeduction);
        $('#LabourWelfareDeduction').val(JSON.parse(d.Value)[0].labourWelfareDeduction);
        $('#ProvidentFundDeduction').val(JSON.parse(d.Value)[0].providentFundDeduction);
        $('#OtherDeduction').val(JSON.parse(d.Value)[0].otherDeduction);


    } else {

    }
}

function LoadAllowanceByEmployeeID() {
    KendoGlobalAjax({
        commandName: 'listEmployeeAllowanceByID',
        values: { Id: $('#EmployeeID').val() }, CallBack: getLoadAllowanceByEmployeeID
    });
}
var getLoadAllowanceByEmployeeID = function (d) {
    $('.appendAddition').empty();


    for (var i = 0; i < JSON.parse(d.Value).length; i++) {

        $('.appendAddition').append('<div class="form-group"><label>' + JSON.parse(d.Value)[i].allowanceTypeName + '</label><input class="form-control" name="' + JSON.parse(d.Value)[i].allowanceTypeName + '" id="' + JSON.parse(d.Value)[i].allowanceTypeID + '" value="' + JSON.parse(d.Value)[i].allowanceAmount + '"></div>');
    }
}

// ------------------ LABOUR OVERTIME ADDITION START-------------------------------

function LoadLabourOvertimeDetailByID() { KendoGlobalAjax({ commandName: 'ManualLabourOvertime_SelectByIDInPayrollNew', values: { EmployeeID: $('#EmployeeID').val(), month: $('#PayrollMonth :selected').val(), Year: $('#PayrollYear :selected').val() }, CallBack: getLoadLabourOvertimeDetailByID }); }
var getLoadLabourOvertimeDetailByID = function (d) {
    $('.appendLabourAddition').empty();

    console.log(JSON.parse(d.Value))
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        $('.appendLabourAddition').append('<div class="form-group"><label>' + JSON.parse(d.Value)[i].name + '</label><input readonly  class="form-control" name="Overtime" id="' + JSON.parse(d.Value)[i].manualLabourOvertimeID + '" value="' + JSON.parse(d.Value)[i].overallprice + '"></div>');
    }
}



// ------------------ LABOUR OVERTIME ADDITION END -------------------------------


function LoadLeavesAndTotalHoursByEmployee() {
    var date = new Date();
    var month = date.toLocaleString('default', { month: 'long' });

    KendoGlobalAjax({ commandName: 'PayrolForEmployee_GetLeavesandTotalhourbyid', values: { EmployeeID: $('#EmployeeID').val(), month: $('#PayrollMonth :selected').val(), year: $('#PayrollYear :selected').val() }, CallBack: getLoadLeavesAndTotalHoursByEmployee });
}
var getLoadLeavesAndTotalHoursByEmployee = function (d) {

    $('#TotalHours').val(JSON.parse(d.Value).totalHourmintwork);
    $('#isPresent').val(JSON.parse(d.Value).isPresent);
    $('#isAbsent').val(JSON.parse(d.Value).isAbsent);
    $('#isLeave').val(JSON.parse(d.Value).isLeave);

    if ((JSON.parse(d.Value).employeetype) == 'Employee') {
        $('#overtime').val("00:00");
    } else {
        $('#overtime').val(JSON.parse(d.Value).overtime);
    }

}

//----------------------------- Data AJAX FUNCTION END---------------------------------------------------
//----------------------------- DDLS AJAX FUNCTION START---------------------------------------------------

function LoadDepartment() { KendoGlobalAjax({ commandName: 'listDepartmentDDL', values: '{}', CallBack: getLoadDepartment }); }
var getLoadDepartment = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#DepartmentID"), "Select Department"); }

function LoadDesignation(eid) { KendoGlobalAjax({ commandName: 'listDesignationByIDDDL', values: { DepartmentID: eid }, CallBack: getLoadDesignation }); }
var getLoadDesignation = function (d) { BindComboForDefault(JSON.parse(d.Value), $("#DesignationID"), "Select Designation"); }
//----------------------------- DDLS AJAX FUNCTION END ---------------------------------------------------

function fnLoadDesignationByID(eid) { LoadDesignation(eid); }

 
$("#btnSave").click(function () {
    proceedPayrollAdditionDeductionRecord();
});
function proceedPayrollAdditionDeductionRecord(e) {

    if ($('.appendAddition input').length > 0) {

        for (var i = 0; i < $('.appendAddition input').length; i++) {

            var data = {
                EmployeeID: $('#EmployeeID').val(), AllowanceID: $('.appendAddition input')[i].id, Amount: $('.appendAddition input')[i].value, PayrollMonth: $('#PayrollMonth :selected').val(), PayrollYear: $('#PayrollYear :selected').val(),
                EntryStatus: $('.appendAddition input')[i].name
            }
            KendoGlobalAjax({ commandName: 'Payroll_addUpdateEmployeePayrollAddition', values: { data: JSON.stringify(data) }, CallBack: '' });
            //console.log(data);
        }

    }
    if ($('.appendLabourAddition input').length > 0) {
        for (var i = 0; i < $('.appendLabourAddition input').length; i++) {

            var data = {
                EmployeeID: $('#EmployeeID').val(), AllowanceID: $('.appendLabourAddition input')[i].id, Amount: $('.appendLabourAddition input')[i].value, PayrollMonth: $('#PayrollMonth :selected').val(), PayrollYear: $('#PayrollYear :selected').val(),
                EntryStatus: $('.appendLabourAddition input')[i].name
            }
            KendoGlobalAjax({ commandName: 'Payroll_addUpdateEmployeePayrollAddition', values: { data: JSON.stringify(data) }, CallBack: '' });
            //   console.log('Overtime')
            //   console.log(data)
        }

    }

    KendoGlobalAjax({
        commandName: 'Payroll_addUpdateEmployeePayrollDeduction',
        values: {
            EmployeeID: $('#EmployeeID').val(),
            PayrollMonth: $('#PayrollMonth :selected').val(),
            PayrollYear: $('#PayrollYear :selected').val(),
            //PayDate: $('#PayDate').val(),
            SecurityDeduction: $('#SecurityDeduction').val(),
            LeaveDeduction: $('#LeaveDeduction').val(),
            LabourWelfareDeduction: $('#LabourWelfareDeduction').val(),
            ProvidentFundDeduction: $('#ProvidentFundDeduction').val(),
            OtherDeduction: $('#OtherDeduction').val(),
            PayrollID: $('#PayrollID').val() == '' ? '00000000-0000-0000-0000-000000000000' : $('#PayrollID').val()


        }, CallBack: ''
    });

    $('.md-close').click();
    setTimeout(function () {
        LoadEmployeeSalaryKendo();
    }, 50);
    Swal.fire({

        icon: 'success',
        title: 'Salary Generated successfully...',
        showConfirmButton: false,
        timer: 1500
    });




}
$('.md-close').click(function () {
    $('#frmAddUpdatePayrollAdditionDeduction').trigger('reset');
});

$('#btnClose').click(function () {
    $('#frmAddUpdatePayrollAdditionDeduction').trigger('reset');
});
$('#btn-proceed-addition-deduction').click(function () {

    proceedAttendanceRecord();
});



function proceedAttendanceRecord(e) {

    var grid = $("#grid-salary-setting").data("kendoGrid");
    var gridData = grid.dataSource._data;

    var payrollDataArray = [];

    
    for (var j = 0; j < gridData.length; j++) {

 
        var payrollData = {
            PayrollID: gridData[j].payrollID, //'00000000-0000-0000-0000-000000000000',
            EmployeeID: gridData[j].employeeID,
            BasicSalary: gridData[j].basicSalary,
            Totaladdation: gridData[j].totaladdation == null ? 0 : gridData[j].totaladdation,
            TotalDeduction: gridData[j].totalDeduction == null ? 0 : gridData[j].totalDeduction,//gridData[j].totalDeduction,
            Grosssalary: gridData[j].grosssalary,
            Totalpresent: gridData[j].totalpresent,
            TotalAbsent: gridData[j].totalAbsent,
            Totalleave: gridData[j].totalleave,
            PayrollMonth: $('#PayrollMonth :selected').val(),
            PayrollYear: $('#PayrollYear :selected').val()

        }

        payrollDataArray.push(payrollData);
    }
     
    KendoGlobalAjax({ commandName: 'Payroll_addUpdateEmployeePayroll', values: { BulkPayrollInsertion: payrollDataArray, UserID: window.localStorage.getItem('userId') }, CallBack: proceedAttendanceRecordCallBack });

 


}
function proceedAttendanceRecordCallBack() {
    $('.showHideBtn').hide();
    $('.showProceedMsg').show();
    Swal.fire({

        icon: 'success',
        title: 'Salary Proceed successfully...',
        showConfirmButton: false,
        timer: 1500
    });
    location.reload();
}