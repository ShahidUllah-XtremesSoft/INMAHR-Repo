var $module_grid = "module-grid";
$(function () {
    $('#Language').val(_currentLanguage);
    loadModuleGrid();
});
function loadModuleGrid() {

    //values - are key value pair json object
    ajaxRequest({ commandName: 'UserManagement_Module_GetAll', values: { Language: $('#Language').val() }, CallBack: loadModuleGridCallBack });
    //var arrayResult = [
    //    { 'id':1,'name': 'Human Resource', 'description':'Human Resource Description'},
    //    { 'id':2,'name': 'User Management', 'description':'User Management Description'}
    //];
    //loadModuleGridCallBack(JSON.stringify(arrayResult));
}
var loadModuleGridCallBack = function (inputDataJSON) {
    bindModuleGrid(JSON.parse(inputDataJSON.Value));
}
var bindModuleGrid = function (inputDataJSON) {
    var gridColumns = [

        { field: "id", title: "id", hidden: true },


        { field: "name", title: "Name", width: 100, filterable: true },
        { field: "description", title: "Description", width: 200, filterable: true },

        //Below is action column
        {
            field: "", width: 50,
            title: "Action",
            //template: "<a style='cursor:pointer; font-size:20px;' onClick= editModule(this) title='Edit Module' ><span class='fa fa-eye'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= deleteModuleById(this) title='Edit Module' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteModuleById(this)  title='Delete Module'><span class='fa fa-trash'></span></a>  "
            template: "<a style='font-size:20px;cursor:pointer;' onClick= editModule(this) title='Edit Module' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteModuleById(this)  title='Delete Module'><span class='fa fa-trash'></span></a>  "

        }
    ];

    bindKendoGrid($module_grid, 50, gridColumns, inputDataJSON);
};
function editModule(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $module_grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#Id').val(dataItem.id);
    $('#Name').val(dataItem.name);
    $('#Description').val(dataItem.description);

}
function deleteModuleById(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $module_grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to delete selected record",
        //input: 'text',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
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
            ajaxRequest({ commandName: 'UserManagement_Module_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteModuleByIdCallBack });
        }
    });
    var deleteModuleByIdCallBack = function (response) {
        swal(response.Value);
        loadModuleGrid();
    }
}
function moduleDropdownListOnChange(e) {
    var dataItem = e.sender.dataItem();
    alert(dataItem.text);
    
}
function modulessDropdownListOnChange(e) {
    var dataItem = e.sender.dataItem();
    alert(dataItem.text);
    
}