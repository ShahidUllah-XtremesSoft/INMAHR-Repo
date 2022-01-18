var $Profession_grid = "profession-grid";
$(function () {
    $('#Language').val(_currentLanguage);
    loadProfessionGrid();
});
function loadProfessionGrid() {

    //values - are key value pair json object
    ajaxRequest({ commandName: 'HR_Profession_GetAll', values: { Language: $('#Language').val() }, CallBack: loadProfessionGridCallBack });
}
var loadProfessionGridCallBack = function (inputDataJSON) {
    console.log(JSON.parse(inputDataJSON.Value));
    bindProfessionGrid(JSON.parse(inputDataJSON.Value));
}
var bindProfessionGrid = function (inputDataJSON) {
    var gridColumns = [

        { field: "id", title: "id", hidden: true },

        { field: "nameEng", title: nameEng, width: 100, filterable: true },
        { field: "nameArb", title: nameArb, width: 100, filterable: true },
       /* { field: "nameEng", title: "NameEng", width: 100, filterable: true },*/

        //Below is action column
        {
            field: "", width: 50,
            title: ' ',
            template: "<a style='font-size:20px;cursor:pointer;' onClick= editProfession(this) title='Edit Profession' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteProfessionById(this)  title='Delete Profession'><span class='fa fa-trash'></span></a>"
        }
    ];

    bindKendoGrid($Profession_grid, 50, gridColumns, inputDataJSON);
};
function editProfession(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + $Profession_grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#Id').val(dataItem.id);
    $('#NameEng').val(dataItem.nameEng);
    $('#NameArb').val(dataItem.nameArb);
}
function deleteProfessionById(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $Profession_grid).data("kendoGrid");
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
            ajaxRequest({ commandName: 'HR_Profession_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteProfessionByIdCallBack });
        }
    });
    var deleteProfessionByIdCallBack = function (response) {
        swal(response.Value);
        $('#Id').val(0);
        ClearControls();
        loadProfessionGrid();
    }

}

function ClearControls() {
    $('#NameEng').val('');
    $('#NameArb').val('');

}