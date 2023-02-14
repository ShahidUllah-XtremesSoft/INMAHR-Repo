﻿var $PayrollGrid = "grid-payroll";

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


    var gridColumns = [

        { title: "#", template: "<b>#= ++record #</b>", width: 15, },

        // { field: "payrollID", title: "payrollID", hidden: true },
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
    bindKendoGrid($PayrollGrid, 500, gridColumns, inputDataJSONs, true, 750);
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
    var grid = $("#" + $PayrollGrid).data("kendoGrid");
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
//----------------------------- Data AJAX FUNCTION START---------------------------------------------------

// ------------------   OVERTIME ADDITION END -------------------------------


function LoadLeavesAndTotalHoursByEmployee() {
    var date = new Date();
    var month = date.toLocaleString('default', { month: 'long' });


    ajaxRequest({
        commandName: 'PayrolForEmployee_GetLeavesandTotalhourbyid',
        values: {
            EmployeeID: $('#EmployeeID').val(),
            month: $('#PayrollMonth :selected').val(),
            year: $('#PayrollYear :selected').val(),
            Language: _currentLanguage

        }, CallBack: getLoadLeavesAndTotalHoursByEmployee
    });

}
var getLoadLeavesAndTotalHoursByEmployee = function (d) {

    $('#TotalHours').val(JSON.parse(d.Value).totalHourmintwork);
    $('#isPresent').val(JSON.parse(d.Value).isPresent);
    $('#isAbsent').val(JSON.parse(d.Value).isAbsent);
    $('#isLeave').val(JSON.parse(d.Value).isLeave);

    // if ((JSON.parse(d.Value).employeetype) == 'Employee') {
    //     $('#overtime').val("00:00");
    // } else {
    $('#overtime').val(JSON.parse(d.Value).overtime);
    //}

}
function LoadPayrollAdditionByEmployeeID() {

    ajaxRequest({
        commandName: 'Payroll_LoadAdditionByEmployeeByID',
        values: {
            EmployeeID: $('#EmployeeID').val(),
            month: $('#PayrollMonth :selected').val(),
            year: $('#PayrollYear :selected').val(),
            Language: _currentLanguage

        }, CallBack: getLoadPayrollAdditionByEmployeeID
    });
}
var getLoadPayrollAdditionByEmployeeID = function (d) {

    $('.appendAllowances').empty();
    $('.appendAddition').empty();
    $('.appendLabourAddition').empty();
    if (JSON.parse(d.Value).length > 0) {

        var additionList = JSON.parse(d.Value)[1];
        var allowanceList = JSON.parse(d.Value)[0];
        for (var i = 0; i < additionList.length; i++) {
            $('.appendAddition').append(
                `<tr>                        
                        <td>
                             <div class="row">
                                 <div class="col-sm-12">
                                     <div>
                                         <div class="form-group">
                                             <label>`+ additionList[i].allowanceTypeName + `</label>
                                             <input class="form-control" min="0" name="` + additionList[i].allowanceTypeName + `"   id="` + additionList[i].allowanceTypeID + `" type="number" value="` + additionList[i].allowanceAmount + `" oninput="this.value = Math.abs(this.value)">
                                         </div>
                                     </div>
                                 </div>
                             </div>
                    </td>
                 </tr>`)
        }
        for (var i = 0; i < allowanceList.length; i++) {

            $('.appendAllowances').append(
                `<tr>                        
                        <td>
                             <div class="row">
                                 <div class="col-sm-12">
                                     <div>
                                         <div class="form-group">
                                             <label>`+ allowanceList[i].allowanceTypeName + `</label>
                                             <input class="form-control" min="0" data-id="`+ allowanceList[i].allowanceType_table_pk_Id + `" name="` + allowanceList[i].allowanceTypeName + `"   id="` + allowanceList[i].allowanceTypeID + `" type="number" value="` + allowanceList[i].allowanceAmount + `" oninput="this.value = Math.abs(this.value)">
                                         </div>
                                     </div>
                                 </div>
                             </div>
                    </td>
                 </tr>`)
        }

        //LoadLabourOvertimeDetailByID();
    }
}

function LoadPayrollDeductionByEmployeeID() {

    ajaxRequest({
        commandName: 'Payroll_LoadDeductionByEmployeeByID',
        values: {
            EmployeeID: $('#EmployeeID').val(),
            month: $('#PayrollMonth :selected').val(),
            PayrollYear: $('#PayrollYear :selected').val(),
            Language: _currentLanguage

        }, CallBack: getLoadPayrollDeductionByEmployeeID
    });
}
var getLoadPayrollDeductionByEmployeeID = function (d) {
     
    if (JSON.parse(d.Value).length > 0) {
       // console.log(JSON.parse(d.Value))
        if (JSON.parse(d.Value)[0].length > 0) {
            $('#SecurityDeduction').val(JSON.parse(d.Value)[0][0].securityDeduction);
            $('#LeaveDeduction').val(JSON.parse(d.Value)[0][0].leaveDeduction);
            $('#LabourWelfareDeduction').val(JSON.parse(d.Value)[0][0].labourWelfareDeduction);
            $('#ProvidentFundDeduction').val(JSON.parse(d.Value)[0][0].providentFundDeduction);
            $('#OtherDeduction').val(JSON.parse(d.Value)[0][0].otherDeduction);

        }
         
        var deductionList = JSON.parse(d.Value)[1];
        $('.appendDeduction').empty();
        if (deductionList.length > 0) {

            for (var i = 0; i < deductionList.length; i++) {
                $('.appendDeduction').append(
                    `<tr>
                        
                        <td>
                             <div class="row">
                                 <div class="col-sm-12">
                                     <div>
                                         <div class="form-group">
                                             <label>`+ deductionList[i].deductionTypeName + `</label>
                                             <input class="form-control" min="0" name="` + deductionList[i].deductionTypeName + `"   id="` + deductionList[i].recursiveID + `" type="number" value="` + deductionList[i].deductionAmount + `" oninput="this.value = Math.abs(this.value)">
                                         </div>
                                     </div>
                                 </div>
                             </div>
                    </td>
                 </tr>`)
            }
        }
    }
}


//----------------------------- Data AJAX FUNCTION END---------------------------------------------------





$('#btn-search').on('click', function (e) {
    fnLoadPayrollGrid();
});
$("#btnSave").click(function () {
    proceedPayrollAdditionDeductionRecord();
});
var deductionIDFrom_Response = 0;
function proceedPayrollAdditionDeductionRecord(e) {

     
    // ------------ NOTE
    // ------------ UPDATE AND INSERT ADDITION AND ALLOWANCES 
    if ($('.appendAddition input').length > 0) {

        for (var i = 0; i < $('.appendAddition input').length; i++) {

            var data = {
                EmployeeID: $('#EmployeeID').val(), AllowanceID: $('.appendAddition input')[i].id, Amount: $('.appendAddition input')[i].value, PayrollMonth: $('#PayrollMonth :selected').val(), PayrollYear: $('#PayrollYear :selected').val(),
                EntryStatus: $('.appendAddition input')[i].name
            }

             ajaxRequest({ commandName: 'Payroll_addUpdateEmployeePayrollRecursiveAddition', values: { data: JSON.stringify(data), Language: _currentLanguage }, CallBack: '' });

           //   console.log(data);
        }

    }
    if ($('.appendAllowances input').length > 0) {

        for (var i = 0; i < $('.appendAllowances input').length; i++) {

            var data = {
                EmployeeID: $('#EmployeeID').val(), AllowanceID: $('.appendAllowances input')[i].id, Amount: $('.appendAllowances input')[i].value, PayrollMonth: $('#PayrollMonth :selected').val(), PayrollYear: $('#PayrollYear :selected').val(),
                EntryStatus: $('.appendAllowances input')[i].name
            }
           ajaxRequest({ commandName: 'Payroll_addUpdateEmployeePayrollAddition', values: { data: JSON.stringify(data), Language: _currentLanguage }, CallBack: '' });

         //  console.log(data);
        }

    }
    if ($('.appendLabourAddition input').length > 0) {
        for (var i = 0; i < $('.appendLabourAddition input').length; i++) {

            var data = {
                EmployeeID: $('#EmployeeID').val(), AllowanceID: $('.appendLabourAddition input')[i].id, Amount: $('.appendLabourAddition input')[i].value, PayrollMonth: $('#PayrollMonth :selected').val(), PayrollYear: $('#PayrollYear :selected').val(),
                EntryStatus: $('.appendLabourAddition input')[i].name
            }
            ajaxRequest({ commandName: 'Payroll_addUpdateEmployeePayrollAddition', values: { data: JSON.stringify(data), Language: _currentLanguage }, CallBack: '' });

            //   console.log('Overtime')
            //     console.log(data)
        }

    }

    // ------------ UPDATE AND INSERT DEUDCTION FROM SALARY SETTING 
    // ------------ UPDATE AND INSERT Static DEUDCTION 
    ajaxRequest({
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
            PayrollID: $('#PayrollID').val() == '' ? '0' : $('#PayrollID').val(),
            Language: _currentLanguage
        }, CallBack: fnLoadPayrollDeduction_Callback
    });



    /*
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
            PayrollID: $('#PayrollID').val() == '' ? '0' : $('#PayrollID').val()


        }, CallBack: ''
      
 
    });  */


}
var fnLoadPayrollDeduction_Callback = function (inputDataJSONs) {
     
    var db_DeductionID = JSON.parse(inputDataJSONs.Value).deductionID
    //   deductionIDFrom_Response
    if ($('.appendDeduction input').length > 0) {

        for (var i = 0; i < $('.appendDeduction input').length; i++) {
             
            var data = {
                EmployeeID: $('#EmployeeID').val(),
                RecursiveID: $('.appendDeduction input')[i].id,
                Amount: $('.appendDeduction input')[i].value,
                PayrollMonth: $('#PayrollMonth :selected').val(),
                PayrollYear: $('#PayrollYear :selected').val(),
                EntryStatus: $('.appendDeduction input')[i].name,
                PayrollDeductionID: db_DeductionID,
                PayrollID: $('#PayrollID').val() == '' ? '0' : $('#PayrollID').val(),
                Language: _currentLanguage
            }
            ajaxRequest({ commandName: 'Payroll_addUpdateEmployeePayrollRecursiveDeduction', values: { data: JSON.stringify(data), Language: _currentLanguage }, CallBack: '' });

          //  console.log(data);
        }

    }


    $('.md-close').click();
    setTimeout(function () {
        fnLoadPayrollGrid();
    }, 50);
    Swal.fire({

        icon: 'success',
        title: 'Salary Generated successfully...',
        showConfirmButton: false,
        timer: 1500
    });
}