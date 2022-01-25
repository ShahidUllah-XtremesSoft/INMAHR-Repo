var $department_grid = "department-grid";
$(function () {
    $('#Language').val(_currentLanguage);
    loadDepartmentDropdownList();
    loadDepartmentGrid();   
});

/*
function loadDepartmentGridss() {

    //values - are key value pair json object
    ajaxRequest({ commandName: 'HR_Department_GetAllWithParent', values: { Language: $('#Language').val() }, CallBack: loadDepartmentGridCallBack });
}
var loadDepartmentGridCallBack = function (inputDataJSON) {
    bindDepartmentGrid(JSON.parse(inputDataJSON.Value));
}
var bindDepartmentGrid = function (inputDataJSON) {
    var gridColumns = [

        { field: "id", title: "id", hidden: true },
        { field: "nameEng", title: departmentNameEng, width: 100, filterable: true },
        { field: "nameArb", title: departmentNameArb, width: 100, filterable: true },
        { field: "parentId", title: "ParentId", width: 100, filterable: true, hidden: true },
        { field: "parentDepartmentArb", title: parentDepartmentNameArb, width: 100, filterable: true },
        { field: "parentDepartmentEng", title: parentDepartment, width: 100, filterable: true },

        //Below is action column
        {
            field: "", width: 50,
            title: ' ',
            //template: "<a style='cursor:pointer; font-size:20px;' onClick= editModule(this) title='Edit Module' ><span class='fa fa-eye'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= deleteModuleById(this) title='Edit Employee' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteModuleById(this)  title='Delete Employee'><span class='fa fa-trash'></span></a>  "
            template: "<a style='font-size:20px;cursor:pointer;' onClick= editDepartment(this) title='Edit Department' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteDepartmentById(this)  title='Delete Department'><span class='fa fa-trash'></span></a>  "

        }
    ];

    bindKendoGrid($department_grid, 50, gridColumns, inputDataJSON);
};
*/
function editDepartment(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + $department_grid).data("kendoTreeList");
    var dataItem = grid.dataItem(row);
    //alert(dataItem.parentId);
    $('#Id').val(dataItem.id);
    $('#DepartmentId').data("kendoDropDownList").value(dataItem.parentId);
    $('#NameEng').val(dataItem.nameEng);
    $('#NameArb').val(dataItem.nameArb);
}
function deleteDepartmentById(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $department_grid).data("kendoTreeList");
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
            ajaxRequest({ commandName: 'HR_Department_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteDepartmentByIdCallBack });
        }
    });
    var deleteDepartmentByIdCallBack = function (response) {
        swal(response.Value);
        loadDepartmentGrid();
    }

}
function loadDepartmentDropdownList(isBindChangeEvent = false) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('DepartmentId', 'Id [Value], NameEng [Text]', 'HR_Department', 'NameEng IS NOT NULL AND IsHR = 0', 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('DepartmentId', 'Id [Value], NameArb [Text]', 'HR_Department', 'NameArb IS NOT NULL AND IsHR = 0', null, 'menuDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            $("#dropDownListParentId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);
}


function loadDepartmentGrid(e) {


    //KendoGlobalAjax({ commandName: 'Account_SelectForTreeGrid', values: {}, CallBack: loadChildData });
    ajaxRequest({ commandName: 'HR_Department_GetAllWithParent', values: { Language: $('#Language').val() }, CallBack: loadDepartmentGridCallBack });
}

var loadDepartmentGridCallBack = function (d) { loadoadTreeGridFromDepartment(JSON.parse(d.Value)); }


function loadoadTreeGridFromDepartment(_d) {

    // If the parent id is 0 then it will not show any data 
    var entriess = [];
    for (var i = 0; i < _d.length; i++) {
        entriess.push({
            id: _d[i].id,
            parentId: _d[i].parentId == 0 ? null : _d[i].parentId,
            nameEng: _d[i].nameEng,
            nameArb: _d[i].nameArb,
        });

    }

    $("#department-grid").empty();
    $("#department-grid").kendoTreeList({

        columns: [
            { field: "id", title: "id", hidden: true, width: 100, filterable: true },
            {
                field: "nameEng", title: departmentNameEng, width: 100
            },
            {
                field: "parentId", title: "parentId", width: 100, hidden: true
            },
            {
                field: "nameArb", title: departmentNameArb, width: 100
            },
            //Below is action column
            {
                field: "", width: 50,
                title: ' ',
                //template: "<a style='cursor:pointer; font-size:20px;' onClick= editModule(this) title='Edit Module' ><span class='fa fa-eye'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= deleteModuleById(this) title='Edit Employee' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteModuleById(this)  title='Delete Employee'><span class='fa fa-trash'></span></a>  "
                template: "<a style='font-size:20px;cursor:pointer;' onClick= editDepartment(this) title='Edit Department' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteDepartmentById(this)  title='Delete Department'><span class='fa fa-trash'></span></a>  "

            }


        ],
        toolbar: ["excel"],
        excel: {
            fileName: "Export To Exceel.xlsx"
        },
        selectable: true,
        dragAndDrop: false,
        
        sortable: true,
        expanded: false,
        //filterable: {
        //    mode: "cell"
        //},
        dataSource: entriess

        /*
        , change: function (e) {

            var selectedRows = this.select();
            //   var selectedDataItems = [];
            var dataItem = this.dataItem(selectedRows[0]);
            $('#AccountTypeId').val($('#ddl-account').val());
            $('#ParentID').val(dataItem.id);
            $('#AccountTypeName').val(dataItem.name);

            //  for (var i = 0; i < selectedRows.length; i++) {
            //      var dataItem = this.dataItem(selectedRows[i]);
            //      selectedDataItems.push(dataItem);
            //  } 
        },
        */
    });



}