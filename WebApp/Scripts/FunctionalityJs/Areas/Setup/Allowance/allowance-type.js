var $AllowanceTypeGrid = "grid-allowance-type";
$(function () {
    fnLoadAllowanceTypeGrid(); 
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    $('#btn-save-allowance-type').on('click', function (e) {

        if (customValidateForm('frmAddUpdateAllowanceType')) {
            $("#frmAddUpdateAllowanceType").ajaxForm();
            buttonAddPleaseWait('btn-save-allowance-type');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    fnLoadAllowanceTypeGrid();
                    $('#frmAddUpdateAllowanceType')[0].reset();
                    $('#Id').val(0);
                   
                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btn-save-allowance-type', save, 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btn-save-allowance-type', save, 'save');
                    fnLoadAllowanceTypeGrid();
                }
            };
            $("#frmAddUpdateAllowanceType").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btn-save-allowance-type', save, 'save');
        }

    });

});
function fnLoadAllowanceTypeGrid() {

    //values - are key value pair json object
    ajaxRequest({ commandName: 'Setup_Allowance_Type_Get', values: { Language: $('#Language').val() }, CallBack: fnLoadAllowanceTypeGridCallBack });
}
var fnLoadAllowanceTypeGridCallBack = function (inputDataJSON) {
    bindfnLoadAllowanceTypeGrid(JSON.parse(inputDataJSON.Value));
}
var bindfnLoadAllowanceTypeGrid = function (inputDataJSON) {
    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },
        { field: "id", title: "id", hidden: true },
        { field: "typeEng", title: typeEng, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "typeArb", title: typeArb, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } }, 
        //Below is action column
        {
            field: "", width: 10,
            title: "",
            template: "<a style='font-size:20px;cursor:pointer;' onClick= editAllowanceType(this) title='Edit' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteAllowanceType(this)  title='Delete'><span class='fa fa-trash'></span></a>  "

        }
    ];

    bindKendoGrid($AllowanceTypeGrid, 50, gridColumns, inputDataJSON);
};
function editAllowanceType(event) {
   
    var row = $(event).closest("tr");
    var grid = $("#" + $AllowanceTypeGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#Id').val(dataItem.id);
    $('#TypeEng').val(dataItem.typeEng);
    $('#TypeArb').val(dataItem.typeArb);
    



}
function deleteAllowanceType(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $AllowanceTypeGrid).data("kendoGrid");
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
            ajaxRequest({ commandName: 'Setup_Allowance_Type_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteAllowanceTypeByIdCallBack });
        }
    });
    var deleteAllowanceTypeByIdCallBack = function (response) {
        swal(response.Value);
        fnLoadAllowanceTypeGrid();
    }
}
 