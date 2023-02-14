var $SalarySettingAdditionDeductionGrid = "grid-salary-setting-addition-deduction";
$(function () {

    fnLoadEmployee_DDL();

    fnLoadSalarySettingAdditionDeductionGrid(); 
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $('#Language').val(_currentLanguage);

  
    renderKendoDatePickerWithNewFormat('RecursiveDate');


    $('#btn-save-setting').on('click', function (e) {

        if (customValidateForm('frmAddUpdateAdditionDeduction')) {
            $("#frmAddUpdateAdditionDeduction").ajaxForm();
            buttonAddPleaseWait('btn-save-setting');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    fnLoadSalarySettingAdditionDeductionGrid();
                    $('#frmAddUpdateAdditionDeduction')[0].reset();
                    $('#RecursiveID').val(0);
                   
                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btn-save-setting', save, 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btn-save-setting', save, 'save');
                    
                }
            };
            $("#frmAddUpdateAdditionDeduction").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btn-save-setting', save, 'save');
        }

    });

});
function fnLoadSalarySettingAdditionDeductionGrid() {
     
    //values - are key value pair json object

    ajaxRequest({ commandName: 'HR_Employee_RecursiveAdditionDeduction_Get', values: { EmployeeId: $('#EmployeeID').val() == '' ? 0 : $('#EmployeeID').val(),Language: _currentLanguage}, CallBack: fnLoadSalarySettingAdditionDeductionGridCallBack });
}
var fnLoadSalarySettingAdditionDeductionGridCallBack = function (inputDataJSON) {
    bindfnLoadSalarySettingAdditionDeductionGrid(JSON.parse(inputDataJSON.Value));
}
var bindfnLoadSalarySettingAdditionDeductionGrid = function (inputDataJSON) {
    
    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 10, },
        { field: "recursiveID", title: "RecursiveID", hidden: true },
        { field: "employeeID", title: "employeeId", hidden: true },
        { field: "employeeName", title: lblEmployeeName, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "amount", title: lblAmount, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "name", title: lblName, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "recursiveType", title: lblType, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "recursiveDate", title: lblDate, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        //Below is action column
        {
            field: "", width: 30,
            title: "",
            template: "<a style='font-size:20px;cursor:pointer;' onClick= editSalarySettingAdditionDeduction(this) title='Edit' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteSalarySettingAdditionDeduction(this)  title='Delete'><span class='fa fa-trash'></span></a>  "

        }
    ];

    bindKendoGrid($SalarySettingAdditionDeductionGrid, 50, gridColumns, inputDataJSON);
};
function editSalarySettingAdditionDeduction(event) {
    
    var row = $(event).closest("tr");
    var grid = $("#" + $SalarySettingAdditionDeductionGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#RecursiveID').val(dataItem.recursiveID);
  //  $('#EmployeeID').val(dataItem.employeeID);
    $('#Amount').val(dataItem.amount);
    $('#Name').val(dataItem.name);
    $('#RecursiveType').val(dataItem.recursiveType);
    $('#RecursiveDate').val(dataItem.recursiveDate);

    $('#EmployeeID').data("kendoDropDownList").value(dataItem.employeeID);



}
function deleteSalarySettingAdditionDeduction(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $SalarySettingAdditionDeductionGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({

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
            ajaxRequest({ commandName: 'HR_Employee_RecursiveAdditionDeduction_Delete', values: { RecursiveID: dataItem.recursiveID, Language: _currentLanguage }, CallBack: deleteSalarySettingAdditionDeductionByIdCallBack });
        }
    });
    var deleteSalarySettingAdditionDeductionByIdCallBack = function (response) {
         
        //swal(response.Value);
        fnLoadSalarySettingAdditionDeductionGrid();
    }
}



//---------------------------------  DDL's

function fnLoadEmployee_DDL() {

    ajaxRequest({ commandName: 'DDL_HR_Employee_Get', values: { Language: _currentLanguage }, CallBack: fnLoadEmployee_DDLCallBack });
}
var fnLoadEmployee_DDLCallBack = function (response) {
  
    $("#EmployeeID").kendoDropDownList({
        dataTextField: "value",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
        change: function (e) {
            
            var selected_Id = this.value();

            $('#EmployeeID').val(selected_Id);
          //  fnLoadSalarySettingAdditionDeductionGrid();

        },
    });

}