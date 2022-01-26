var $ContractType_grid = "contractType-grid";
$(function () {
    $('#Language').val(_currentLanguage);
    loadContractTypeGrid();
});
function loadContractTypeGrid() {
    ajaxRequest({ commandName: 'HR_ContractType_GetAll', values: { Language: $('#Language').val() }, CallBack: loadContractTypeGridCallBack });
}
var loadContractTypeGridCallBack = function (inputDataJSON) {
    console.log(inputDataJSON);

    bindContractTypeGrid(JSON.parse(inputDataJSON.Value));
}
var bindContractTypeGrid = function (inputDataJSON) {
    var gridColumns = [

        { field: "id", title: "id", hidden: true },

        { field: "nameEng", title: nameEng, width: 100, filterable: true },
        { field: "nameArb", title: nameArb, width: 100, filterable: true },

        {
            field: "", width: 50,
            title: ' ',
            template: "<a style='font-size:20px;cursor:pointer;' onClick= editContractType(this) title='Edit ContractType' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteContractTypeById(this)  title='Delete ContractType'><span class='fa fa-trash'></span></a>  "

        }
    ];

    bindKendoGrid($ContractType_grid, 50, gridColumns, inputDataJSON);
};
function editContractType(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + $ContractType_grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#Id').val(dataItem.id);
    $('#NameEng').val(dataItem.nameEng);
    $('#NameArb').val(dataItem.nameArb);
}
function deleteContractTypeById(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $ContractType_grid).data("kendoGrid");
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
            ajaxRequest({ commandName: 'HR_ContractType_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteContractTypeByIdCallBack });
        }
    });
    var deleteContractTypeByIdCallBack = function (response) {
        swal(response.Value);
        ClearControls();
        $('#Id').val(0);
        loadContractTypeGrid();
    }

}
function ClearControls() {

    $('#NameEng').val('');
    $('#NameArb').val('');

}