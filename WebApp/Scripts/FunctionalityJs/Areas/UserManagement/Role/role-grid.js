var $role_grid = "role-grid";
$(function () {
    $('#Language').val(_currentLanguage);
    loadRoleDropdownList(true);
    loadRoleGrid();
});
function loadRoleGrid() {

    ajaxRequest({ commandName: 'UserManagement_Role_GetAll', values: { Language: $('#Language').val() }, CallBack: loadRoleGridCallBack });
    
}
var loadRoleGridCallBack = function (inputDataJSON) {
    bindRoleGrid(JSON.parse(inputDataJSON.Value));
}
var bindRoleGrid = function (inputDataJSON) {
    var gridColumns = [

        { field: "id", title: "id", hidden: true },


        { field: "name", title: "Name", width: 100, filterable: true },
        { field: "parentId", title: "ParentId", width: 200, filterable: true,hidden:true },
        { field: "parentRole", title: "Parent Role", width: 200, filterable: true },

        //Below is action column
        {
            field: "", width: 50,
            title: "Action",            
            template: "<a style='font-size:20px;cursor:pointer;' onClick= editRole(this) title='Edit Role' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteRoleById(this)  title='Delete Role'><span class='fa fa-trash'></span></a>  "

        }
    ];

    bindKendoGrid($role_grid, 50, gridColumns, inputDataJSON);
};
function editRole(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $role_grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#Id').val(dataItem.id);
    $('#Name').val(dataItem.name);
    var dropdownlist = $("#dropDownListParentId").data("kendoDropDownList");
    dropdownlist.value(dataItem.parentId);


}
function deleteRoleById(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $role_grid).data("kendoGrid");
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
            ajaxRequest({ commandName: 'UserManagement_Role_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteRoleByIdCallBack });
        }
    });
    var deleteRoleByIdCallBack = function (response) {
        swal(response.Value);
        loadRoleGrid();
    }
}
function loadRoleDropdownList(isBindChangeEvent = false) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('dropDownListParentId', 'Id [Value], NameEng [Text]', 'UserManagement_Role', 'NameEng IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('dropDownListParentId', 'Id [Value], NameArb [Text]', 'UserManagement_Role', 'NameArb IS NOT NULL', null, 'menuDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            $("#dropDownListParentId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);
}
function roleDropdownListOnChange(e) {
    var dataItem = e.sender.dataItem();    
    $('#ParentId').val(dataItem.value);
}
