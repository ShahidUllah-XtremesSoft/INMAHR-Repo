var $menu_grid = "menu-grid";
$(function () {
    $('#Language').val(_currentLanguage);
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('ModuleId', 'Id [Value], NameEng [Text]', 'UserManagement_Module', "NameEng IS NOT NULL AND NameEng <> '' ", 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('ModuleId', 'Id [Value], NameArb [Text]', 'UserManagement_Module', "NameArb IS NOT NULL AND NameArb <> '' ", null, 'menuDropdownListOnChange');
    }   
    setTimeout(function () {
        $("#moduleDropdownList").data("ModuleId").bind("change", moduleDropdownListOnChange);
    }, 1500);
    loadMenuGrid();
});
function loadMenuGrid() {

    //values - are key value pair json object
    ajaxRequest({ commandName: 'UserManagement_Menu_GetAll', values: { Language: $('#Language').val() }, CallBack: loadMenuGridCallBack });
    //var arrayResult = [
    //    { 'id':1,'name': 'Human Resource', 'description':'Human Resource Description'},
    //    { 'id':2,'name': 'User Management', 'description':'User Management Description'}
    //];
    //loadMenuGridCallBack(JSON.stringify(arrayResult));
}
var loadMenuGridCallBack = function (inputDataJSON) {
    bindMenuGrid(JSON.parse(inputDataJSON.Value));
}
var bindMenuGrid = function (inputDataJSON) {
    var gridColumns = [

        { field: "id", title: "id", hidden: true },


        { field: "menuGroup", title: "Menu Group", width: 100, filterable: true },
        { field: "nameEng", title: "Name (Eng)", width: 100, filterable: true },
        { field: "nameArb", title: "Name (Arb)", width: 100, filterable: true },
        { field: "controller", title: "Controller", width: 200, filterable: true,hidden:true },
        { field: "action", title: "Action", width: 200, filterable: true, hidden: true },
        { field: "url", title: "Url", width: 200, filterable: true },
        { field: "icon", title: "Icon", width: 200, filterable: true },
        { field: "moduleName", title: "ModuleName", width: 200, filterable: true },
        { field: "isHRMenu", title: "IsHRMenu", width: 200, filterable: true,hidden:true },
        {
            title: status,
            field: 'isHRMenuText',
            width: 30,
            hidden: false,
            //template: 1 == 1 ? "<span class='badge badge-success'>#:status#</span>" : "<span class='badge badge-danger'>#:status#</span>"
            template: "<span class='badge badge-success'>#:isHRMenuText#</span>"
        },
        //Below is action column
        {
            field: "", width: 100,
            title: "Action",
            //template: "<a style='cursor:pointer; font-size:20px;' onClick= editMenu(this) title='Edit menu' ><span class='fa fa-eye'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= deleteMenuById(this) title='Edit Menu' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteMenuById(this)  title='Delete Menu'><span class='fa fa-trash'></span></a>  "
            template: "<a style='font-size:20px;cursor:pointer;' onClick= editMenu(this) title='Edit Menu' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteMenuById(this)  title='Delete Menu'><span class='fa fa-trash'></span></a>  "

        }
    ];

    bindKendoGrid($menu_grid, 50, gridColumns, inputDataJSON);
};
function editMenu(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $menu_grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#Id').val(dataItem.id);
    $('#NameEng').val(dataItem.nameEng);
    $('#NameArb').val(dataItem.nameArb);
    $('#MenuGroup').val(dataItem.menuGroup);
    $('#Controller').val(dataItem.controller);
    $('#Action').val(dataItem.action);
    $('#Url').val(dataItem.url);
    $('#Icon').val(dataItem.icon);
    $('#ModuleId').val(dataItem.moduleId);
    //$('#moduleDropdownList').data("kendoDropdownList").value(dataItem.moduleId);

    var dropdownlist = $("#ModuleId").data("kendoDropDownList");
    dropdownlist.value(dataItem.moduleId);
    


}
function deleteMenuById(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $menu_grid).data("kendoGrid");
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
            ajaxRequest({ commandName: 'UserManagement_Menu_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteMenuByIdCallBack });
        }
    });
    var deleteMenuByIdCallBack = function (response) {
        swal(response.Value);
        loadMenuGrid();
    }
} 
function moduleDropdownListOnChange(e) { 
    var dataItem = e.sender.dataItem(); 
    $('#ModuleId').val(dataItem.value);

}