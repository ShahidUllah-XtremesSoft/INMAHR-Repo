var $VisaSponsorship_grid = "sponsorship-grid";
$(function () {
    $('#Language').val(_currentLanguage);
    loadVisaSponsorshipGrid();
});
function loadVisaSponsorshipGrid() {
    //values - are key value pair json object
    ajaxRequest({ commandName: 'HR_VisaSponsorship_GetAll', values: { Language: $('#Language').val() }, CallBack: loadVisaSponsorshipGridCallBack });
}
var loadVisaSponsorshipGridCallBack = function (inputDataJSON) {
    console.log(inputDataJSON);
    bindVisaSponsorshipGrid(JSON.parse(inputDataJSON.Value));
}
var bindVisaSponsorshipGrid = function (inputDataJSON) {
    var gridColumns = [

        { field: "id", title: "id", hidden: true },

        { field: "nameEng", title: nameEng, width: 100, filterable: true },
        { field: "nameArb", title: nameArb, width: 100, filterable: true },

        //Below is action column
        {
            field: "", width: 50,
            title: ' ',
            template: "<a style='font-size:20px;cursor:pointer;' onClick= editVisaSponsorship(this) title='Edit VisaSponsorship' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteVisaSponsorshipById(this)  title='Delete VisaSponsorship'><span class='fa fa-trash'></span></a>"
        }
    ];
    bindKendoGrid($VisaSponsorship_grid, 50, gridColumns, inputDataJSON);
};
function editVisaSponsorship(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $VisaSponsorship_grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#Id').val(dataItem.id);
    $('#NameEng').val(dataItem.nameEng);
    $('#NameArb').val(dataItem.nameArb);
}

function deleteVisaSponsorshipById(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $VisaSponsorship_grid).data("kendoGrid");
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
            ajaxRequest({ commandName: 'HR_VisaSponsorship_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteVisaSponsorshipByIdCallBack });
        }
    });
    var deleteVisaSponsorshipByIdCallBack = function (response) {
        swal(response.Value);
        $('#Id').val(0);
        loadVisaSponsorshipGrid();
        ClearControl();
    }

}

function ClearControl() {

    $('#NameEng').val('');
    $('#NameArb').val('');
   
}