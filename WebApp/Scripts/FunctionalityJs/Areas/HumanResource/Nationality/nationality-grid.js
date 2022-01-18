var $Nationality_grid = "nationality-grid";
$(function () {
    $('#Language').val(_currentLanguage);
    loadNationalityGrid();
});
function loadNationalityGrid() {
    ajaxRequest({ commandName: 'HR_Nationality_GetAll', values: { Language: $('#Language').val() }, CallBack: loadNationalityGridCallBack });
}
var loadNationalityGridCallBack = function (inputDataJSON) {
    console.log(inputDataJSON);
    bindNationalityGrid(JSON.parse(inputDataJSON.Value));
}
var bindNationalityGrid = function (inputDataJSON) {
    var gridColumns = [

        { field: "id", title: "id", hidden: true },

        { field: "nameEng", title: nameEng, width: 100, filterable: true },
        { field: "nameArb", title: nameArb, width: 100, filterable: true },
        

        //Below is action column
        {
            field: "", width: 50,
            title: ' ',
            //template: "<a style='cursor:pointer; font-size:20px;' onClick= editModule(this) title='Edit Module' ><span class='fa fa-eye'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= deleteModuleById(this) title='Edit Employee' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteModuleById(this)  title='Delete Employee'><span class='fa fa-trash'></span></a>  "
            template: "<a style='font-size:20px;cursor:pointer;' onClick= editNationality(this) title='Edit Nationality' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteNationalityById(this)  title='Delete Nationality'><span class='fa fa-trash'></span></a>  "

        }
    ];

    bindKendoGrid($Nationality_grid, 50, gridColumns, inputDataJSON);
};




function ClearControls() {
    $('#NameEng').val('');
    $('#NameArb').val('');
}

function editNationality(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + $Nationality_grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#Id').val(dataItem.id);
    $('#NameEng').val(dataItem.nameEng);
    $('#NameArb').val(dataItem.nameArb);
}
function deleteNationalityById(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $Nationality_grid).data("kendoGrid");
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
            ajaxRequest({ commandName: 'HR_Nationality_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteNationalityByIdCallBack });
        }
    });
    var deleteNationalityByIdCallBack = function (response) {
        swal(response.Value);
        $('#Id').val(0);
        loadNationalityGrid();
        ClearControls();
    }

}