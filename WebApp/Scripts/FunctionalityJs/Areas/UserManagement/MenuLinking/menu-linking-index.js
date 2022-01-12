var $menu_linking_grid = "menu-linking-grid";
$(function () {
    $('#Language').val(_currentLanguage);
   
        
    loadRoleMenuGrid();
    loadModuleDropdownList(false);
    loadRoleDropdownList(false);

    $('#btnSearch').click(function () {
        loadRoleMenuGrid();
    });
    $('#btnSave').click(function () {
        //alert($('#ModuleDropdownList').val());
        buttonAddPleaseWait('btnSave');
        if (customValidateForm('frmMenuLinking')) {
            loopThroughGrid();
        }
        else {

            buttonRemovePleaseWait('btnSave', 'Save', 'save');
        }
        // var gridRows = $('#menu-linking-grid').tbody.find("tr");

        //gridRows.each(function (e) {
        //    var rowItem = grid.dataItem($(this));
        //   // $(this).removeClass("k-state-selected");
        //    console.log(JSON.stringify(rowItem));
        //    //custom logic
        //});
        //debugger;
        //var grid = $("#menu-linking-grid").data("kendoGrid");

        //var dataSource = grid.dataSource;
        //var columns = $("#menu-linking-grid").data("kendoGrid").columns;
        //var rows = $("#menu-linking-grid").data("kendoGrid").rows;
        //dataSource.each(function (rowIndex, rowData) {
        //    console.log(rowData);
        //});
        //var noOfCols = columns.length;

        //grid.items().each(function (a) {
        //    alert(a.text())
        //});

        //alert(e.sender.select().val())
        //rows.each(function(e) {
        //    var grid = $("#menu-linking-grid").data("kendoGrid");
        //    var dataItem = grid.dataItem(this);

        //    alert(dataItem);
        //})

    });
    setTimeout(function () {
        $('#header-chb').change(function (ev) {            
            var checked = ev.target.checked;
            $('.row-checkbox').each(function (idx, item) {
                if (checked) {                   
                    if (!($(item).closest('tr').is('.k-state-selected'))) {
                        $(item).click();
                    }
                } else {                   
                    if ($(item).closest('tr').is('.k-state-selected')) {
                        $(item).click();
                    }
                }
            });
        });
        //bind click event to the checkbox
        grid = $("#menu-linking-grid").data("kendoGrid");
        grid.table.on("click", ".row-checkbox", selectRow);

        $('.kendo-direction').removeClass('k-rtl');
        if (_currentLanguage == 'ar-AE') {
            $('.kendo-direction').addClass('k-rtl');
        }
    },5000);
    
});

function loadModuleDropdownList(isBindChangeEvent = false) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('ModuleDropdownList', 'Id [Value], NameEng [Text]', 'UserManagement_Module', "NameEng IS NOT NULL AND NameEng <> '' ", 0, 'moduleDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('ModuleDropdownList', 'Id [Value], NameArb [Text]', 'UserManagement_Module', "NameArb IS NOT NULL AND NameArb <> '' ", 0, 'moduleDropdownListOnChange');
    }

    setTimeout(function () {
        if (isBindChangeEvent) {
            $("#ModuleDropdownList").data("kendoDropDownList").bind("change", moduleDropdownListOnChange);
        }
    }, 1500);
}
function loadRoleDropdownList(isBindChangeEvent = false) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('RoleDropdownList', 'Id [Value], NameEng [Text]', 'UserManagement_Role', 'NameEng IS NOT NULL', 0, 'moduleDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('RoleDropdownList', 'Id [Value], NameArb [Text]', 'UserManagement_Role', 'NameArb IS NOT NULL', 0, 'moduleDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            $("#ModuleDropdownList").data("kendoDropDownList").bind("change", moduleDropdownListOnChange);
        }
    }, 1500);
}
function moduleDropdownListOnChange(e) {
    var dataItem = e.sender.dataItem();
    //$('#ParentId').val(dataItem.value);  


}


function loadRoleMenuGrid() {

    ajaxRequest({ commandName: 'UserManagement_RoleMenu_GetByDepartmentAndRole', values: { ModuleId: $('#ModuleDropdownList').val(), RoleId: $('#RoleDropdownList').val(), Language: $('#Language').val() }, CallBack: loadRoleMenuGridCallBack });

}
var loadRoleMenuGridCallBack = function (inputDataJSON) {
    bindRoleMenuGrid(JSON.parse(inputDataJSON.Value));
}
var bindRoleMenuGrid = function (inputDataJSON) {
    
    var gridColumns = [
        ////define template column with checkbox and attach click event handler
        //{
        //    title: 'Select All',
        //    headerTemplate: "<input type='checkbox' id='header-chb' class='k-checkbox header-checkbox'>",
        //    //field: "isAssigned",
        //    template: function (dataItem) {
        //        //return "<input type='checkbox' id='" + dataItem.isAssigned + "' class='k-checkbox row-checkbox'>";                
        //        if (dataItem.isAssigned == 1) {
        //            return "<div><input type='checkbox' class='k-checkbox row-checkbox' id='target' checked ></div>";
        //        }
        //        else {
        //            return "<div><input type='checkbox' class='k-checkbox row-checkbox' id='target' unchecked='true'></div>";
        //        }
        //        //return "#if(isAssigned == 0) {#<div><input type='checkbox' id='target' class='checkbox' unchecked='true'></div>#}if(isAssigned == 1) {#<div><input type='checkbox' class='checkbox' id='target' checked></div>#}if(isAssigned ==null) {#<div><input type='checkbox' class='checkbox' id='target'></div>#}#";
        //    },
        //    width: 80
        //},
        {
            title: 'Select All',

            headerTemplate: "<input type='checkbox' id='header-chb' class='k-checkbox header-checkbox'>",
            template: function (dataItem) {
                //return "<input type='checkbox' id='" + dataItem.isAssigned + "' class='k-checkbox row-checkbox'>";
                if (dataItem.isAssigned == 1) {
                    return "<div><input type='checkbox' class='k-checkbox row-checkbox' id='target' checked ></div>";
                }
                else {
                    return "<div><input type='checkbox' class='k-checkbox row-checkbox' id='target' unchecked='true'></div>";
                }
            },
            width: 80
        },
        //{ filed: "IsCheck", selectable: true, width: "50px" },
        { field: "id", title: "id", hidden: true },
        { field: "moduleId", title: "ModuleId", hidden: true },
        { field: "moduleName", title: "Module", hidden: false },
        { field: "menuGroup", title: "MenuGroup", hidden: false },
        { field: "menuId", title: "MenuId", hidden: true },
        { field: "menuName", title: "Menu", hidden: false },
        { field: "url", title: "Url", hidden: false },

        //{
        //    field: "isAssigned",
        //    template: "#if(isAssigned == 0) {#<div><input type='checkbox' id='target' class='checkbox' unchecked='true'></div>#}if(isAssigned == 1) {#<div><input type='checkbox' class='checkbox' id='target' checked></div>#}if(isAssigned ==null) {#<div><input type='checkbox' class='checkbox' id='target'></div>#}#",
        //    //template: "<input type='checkbox' class='checkbox' />"
        //}
         
    ];

    bindKendoGrid($menu_linking_grid, 50, gridColumns, inputDataJSON,true);

    setTimeout(function () {
        var grid = $("#menu-linking-grid").data("kendoGrid");
        grid.table.on("click", ".checkbox", selectRow);
    }, 2000);

};
//bind click event to the checkbox


var checkedIds = {};

//on click of the checkbox:
//function selectRow() {
//    var checked = this.checked,
//        row = $(this).closest("tr"),
//        grid = $("#menu-linking-grid").data("kendoGrid"),
//        dataItem = grid.dataItem(row);
//    dataItem.isAssigned = checked;
//    checkedIds[dataItem.id] = checked;

//    //checkedIds.push(dataItem);
//    if (checked) {
//        //-select the row
//        row.addClass("k-state-selected");
//    } else {
//        //-remove selection
//        row.removeClass("k-state-selected");
//    }
//}
//on click of the checkbox:
function selectRow(e) {
    
    var checked = this.checked,
        row = $(this).closest("tr"),
        grid = $("#menu-linking-grid").data("kendoGrid"),
        dataItem = grid.dataItem(row);
    row.find('.row-checkbox').attr('value', 0);
    checkedIds[dataItem.id] = checked;

    if (checked) {
        //-select the row
        row.addClass("k-state-selected");

        var checkHeader = true;

        $.each(grid.items(), function (index, item) {
            if (!($(item).hasClass("k-state-selected"))) {
                checkHeader = false;
            }
        });

        $("#header-chb")[0].checked = checkHeader;
    } else {
        //-remove selection
        row.removeClass("k-state-selected");
        $("#header-chb")[0].checked = false;
    }
}
function loopThroughGrid(e) {

    var grid = $("#menu-linking-grid").data("kendoGrid");

    //var ds = grid.dataSource.view();
    //var dslength = ds.length;

    //if (dslength > 0) {
    //    for (var i = 0; i < dslength; i++) {
    //        var currRow = ds[i];
    //        console.log('Loop : ' + JSON.stringify(currRow));
    //        //alert($("#menu-linking-grid tbody").find("tr[data-uid=" + currRow.uid + "]").attr("checked"));
    //        //trying to get checkbox value here.
    //    }
    //}


    var menuRoleGrid = grid.dataSource._data;   
    var customAttendancestatus = ''; var myarray = [];
    var postingArray = [];
    for (var i = 0; i < menuRoleGrid.length; i++) {
        var isAssigned = grid.tbody.find("tr:eq("+i+")").find('.row-checkbox').is(':checked');
        
        var gridRow = menuRoleGrid[i];
        //gridRow.isAssigned = gridRow.isAssigned == 0 ? false : gridRow.isAssigned;
        if (isAssigned == true || gridRow.id > 0) {
            postingArray.push(
                {
                    Id: parseInt(gridRow.id),
                    MenuId: parseInt(gridRow.menuId),
                    RoleId: parseInt($('#RoleDropdownList').val()),
                    CreatedBy: parseInt($('#CreatedBy').val()),
                    IsAssigned: isAssigned
                });
        }

    }
    if (postingArray.length > 0) {
        ajaxRequest({ commandName: 'UserManagement_RoleMenu_Save', values: { RoleMenus: postingArray, Language: $('#Language').val() }, CallBack: menuAssignedCallBack });
    }
    else {
        buttonRemovePleaseWait('btnSave', 'Save', 'save');
        swalMessage('info', 'First select records from grid', 1500);
    }

}
function menuAssignedCallBack(response) {
    loadRoleMenuGrid();    
    swal(response.Value);
    buttonRemovePleaseWait('btnSave', 'Save', 'save');
}
