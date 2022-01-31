var $PublicHolidayGrid = "PublicHolidayGrid";
$(function () {
    loadPublicHolidayGrid();
    renderKendoDatePicker('StartDate');
    renderKendoDatePicker('EndDate');

    $('#btnSave').on('click', function (e) {

        if (customValidateForm('frmPublicHoliday')) {
            $("#frmPublicHoliday").ajaxForm();
            buttonAddPleaseWait('btnSave');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    loadPublicHolidayGrid();
                    $('#frmPublicHoliday')[0].reset();
                    $('#Id').val(0);
                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btnSave', save, 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btnSave', save, 'save');
                    loadPublicHolidayGrid();
                }
            };
            $("#frmPublicHoliday").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btnSave', save, 'save');
        }

    });
    
});
function loadPublicHolidayGrid() {

    //values - are key value pair json object
    ajaxRequest({ commandName: 'Setup_PublicHoliday_Get', values: { Language: $('#Language').val() }, CallBack: loadPublicHolidayGridCallBack });
}
var loadPublicHolidayGridCallBack = function (inputDataJSON) {
    bindloadPublicHolidayGrid(JSON.parse(inputDataJSON.Value));
}
var bindloadPublicHolidayGrid = function (inputDataJSON) {
    var gridColumns = [

        { field: "id", title: "id", hidden: true },        
        { field: "nameEng", title: nameEng, width: 100, filterable: true },
        { field: "nameArb", title: nameArb, width: 100, filterable: true },
        { field: "startDate", title: startDate, width: 200, filterable: true, hidden: false },
        { field: "endDate", title: endDate, width: 200, filterable: true, hidden: false },                
        //Below is action column
        {
            field: "", width: 100,
            title: "",
            //template: "<a style='cursor:pointer; font-size:20px;' onClick= editPublicHoliday(this) title='Edit menu' ><span class='fa fa-eye'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= deletePublicHoliday(this) title='Edit Menu' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deletePublicHoliday(this)  title='Delete Menu'><span class='fa fa-trash'></span></a>  "
            template: "<a style='font-size:20px;cursor:pointer;' onClick= editPublicHoliday(this) title='Edit Menu' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deletePublicHoliday(this)  title='Delete Menu'><span class='fa fa-trash'></span></a>  "

        }
    ];

    bindKendoGrid($PublicHolidayGrid, 50, gridColumns, inputDataJSON);
};
function editPublicHoliday(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $PublicHolidayGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#Id').val(dataItem.id);
    $('#NameEng').val(dataItem.nameEng);
    $('#NameArb').val(dataItem.nameArb);
    $('#StartDate').val(dataItem.startDate);
    $('#EndDate').val(dataItem.endDate);
    



}
function deletePublicHoliday(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $PublicHolidayGrid).data("kendoGrid");
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
            ajaxRequest({ commandName: 'Setup_PublicHoliday_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteMenuByIdCallBack });
        }
    });
    var deleteMenuByIdCallBack = function (response) {
        swal(response.Value);
        loadPublicHolidayGrid();
    }
}
function moduleDropdownListOnChange(e) {
    var dataItem = e.sender.dataItem();
    $('#ModuleId').val(dataItem.value);

}