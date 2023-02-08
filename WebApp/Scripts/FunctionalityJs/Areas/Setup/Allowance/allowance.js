var $AllowanceGrid = "grid-allowance";



$('#AllowanceTabLi').click(function () {
    //--- Load DDL's
    fnLoadAllowancesTypeDDL();
    fnLoadSection_DDL();
    fnLoadProfession_DDL();

    //--- Load Grid
    fnLoadAllowanceGrid();
    $('#CreatedByAllowance').val(JSON.parse(localStorage.getItem('User')).id);
    $('#AllowanceLanguage').val(_currentLanguage)
});



$('#btn-save-allowance').on('click', function (e) {

    if (customValidateForm('frmAddUpdateAllowance')) {
        $("#frmAddUpdateAllowance").ajaxForm();
        buttonAddPleaseWait('btn-save-allowance');
        var options = {
            success: function (response, statusText, jqXHR) {
                swal(response);
                fnLoadAllowanceGrid();
                $('#frmAddUpdateAllowance')[0].reset();
                $('#AllowanceID').val(0);

            },
            error: function (xhr, status, error) {
                buttonRemovePleaseWait('btn-save-allowance', save, 'save');
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
            , complete: function () {
                buttonRemovePleaseWait('btn-save-allowance', save, 'save');
                fnLoadAllowanceGrid();
            }
        };
        $("#frmAddUpdateAllowance").ajaxSubmit(options);
    }
    else {

        buttonRemovePleaseWait('btn-save-allowance', save, 'save');
    }

});


function fnLoadAllowanceGrid() {

    //values - are key value pair json object
    ajaxRequest({ commandName: 'Setup_Allowance_Get', values: { Language: _currentLanguage }, CallBack: fnLoadAllowanceGridCallBack });
}
var fnLoadAllowanceGridCallBack = function (inputDataJSON) {
    bindfnLoadAllowanceGrid(JSON.parse(inputDataJSON.Value));
}
var bindfnLoadAllowanceGrid = function (inputDataJSONs) {
    
    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 8, },
        { field: "allowanceID", title: "allowanceID", hidden: true },
        { field: "setup_Allowance_TypeID", title: "Setup_Allowance_TypeID", hidden: true },
        { field: "hR_Department_Id", title: "HR_Department_Id", hidden: true },
        { field: "hR_Profession_Id", title: "HR_Profession_Id", hidden: true },
        { field: "department", title: lblSection, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "profession", title: lblProfession, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "typeName", title: lblAllowance , width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "allowanceAmount", title: lblAllowance + ' ' + lblAmount, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        //Below is action column
        {
            field: "", width: 20,
            title: "",
            template: "<a style='font-size:20px;cursor:pointer;' onClick=editAllowance(this) title='Edit' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick=deleteAllowance(this)  title='Delete'><span class='fa fa-trash'></span></a>  "

        }
    ];

    bindKendoGrid($AllowanceGrid, 50, gridColumns, inputDataJSONs);
};
function editAllowance(eventt) {
     
    var rows = $(eventt).closest("tr");
    var grid = $("#" + $AllowanceGrid).data("kendoGrid");
    var dataItem = grid.dataItem(rows);
    $('#AllowanceID').val(dataItem.allowanceID);
    $('#Setup_Allowance_TypeID').data("kendoDropDownList").value(dataItem.setup_Allowance_TypeID);
    $('#HR_Profession_Id').data("kendoDropDownList").value(dataItem.hR_Profession_Id);
    $('#AllowanceAmount').val(dataItem.allowanceAmount);
    $("#DepartmentId").data("kendoDropDownTree").value(dataItem.hR_Department_Id);


}
function deleteAllowance(event) {
    var rows = $(event).closest("tr");
    var gridd = $("#" + $AllowanceGrid).data("kendoGrid");
    var dataIteem = gridd.dataItem(rows);
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
            ajaxRequest({ commandName: 'Setup_Allowance_Delete', values: { AllowanceID: dataIteem.allowanceID, Language: _currentLanguage }, CallBack: deleteAllowanceByIdCallBack });
        }
    });
    var deleteAllowanceByIdCallBack = function (response) {
        swal(response.Value);
        fnLoadAllowanceGrid();
    }
}




//---------------------------------  DDL's

function fnLoadAllowancesTypeDDL() {

    ajaxRequest({ commandName: 'Setup_Allowance_Type_Get_DDL', values: { Language: _currentLanguage }, CallBack: fnLoadAllowancesTypeDDLCallBack });
}
var fnLoadAllowancesTypeDDLCallBack = function (response) {
    $("#Setup_Allowance_TypeID").kendoDropDownList({
        dataTextField: "value",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
        change: function (e) {
            var selected_Id = this.value();

            $('#Setup_Allowance_TypeID').val(selected_Id);


        },
    });

}
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
//var fnLoadSection_DDLCallBack = function (response) {
//    $("#HR_Department_Id").kendoDropDownList({
//        dataTextField: "value",
//        dataValueField: "id",
//        filter: "contains",
//        value: -1,
//        dataSource: JSON.parse(response.Value),
//        change: function (e) {
//            var selected_Id = this.value();

//            $('#HR_Department_Id').val(selected_Id);


//        },
//    });

//}
function fnLoadProfession_DDL() {

    ajaxRequest({ commandName: 'HR_Profession_Get', values: { Language: _currentLanguage }, CallBack: fnLoadProfession_DDLCallBack });
}
var fnLoadProfession_DDLCallBack = function (response) {

    $("#HR_Profession_Id").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
        change: function (e) {
            var selected_Id = this.value();

            $('#HR_Profession_Id').val(selected_Id);


        },
    });

}