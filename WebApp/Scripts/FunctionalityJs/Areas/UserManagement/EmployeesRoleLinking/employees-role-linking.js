
$(function () {
    loadRoleDropdownList(false);
    //-- LOAD GRID 1st time
    loadProfessionDropdownListForLSEng();
    loadProfessionDropdownListForLSArb();
    loadRoleMenuGrid(0);


    $("#ProfessionId").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('ProfessionListEng')) : fnRemoveSelectInArabic(JSON.parse(localStorage.getItem('ProfessionListArb'))),
        change: function (e) {
            var id = this.value();

            loadRoleMenuGrid(id)
        }
    });


    $('#Language').val(_currentLanguage)
});


function loadRoleDropdownList(isBindChangeEvent = false) {

    if ($('#Language').val() == 'en-US' || $('#Language').val() == '') {
        loadKendoDropdownList('RoleDropdownList', 'Id [Value], NameEng [Text]', 'UserManagement_Role', 'NameEng IS NOT NULL', 0, '');
    }
    else {
        loadKendoDropdownList('RoleDropdownList', 'Id [Value], NameArb [Text]', 'UserManagement_Role', 'NameArb IS NOT NULL', 0, '');
    }

}

//Load Lists to Local Storage
function loadProfessionDropdownListForLSEng() {
    ajaxRequest({ commandName: 'HR_Profession_Get', values: { Language: 'en-US' }, CallBack: loadProfessionDropdownListForLSEngCallBack });
}
function loadProfessionDropdownListForLSEngCallBack(response) {

    window.localStorage.setItem('ProfessionListEng', response.Value);
}
function loadProfessionDropdownListForLSArb() {
    ajaxRequest({ commandName: 'HR_Profession_Get', values: { Language: 'ar-AE' }, CallBack: loadProfessionDropdownListForLSArbCallBack });
}
function loadProfessionDropdownListForLSArbCallBack(response) {

    window.localStorage.setItem('ProfessionListArb', response.Value);
}

//$('#btnSearch').click(function () {
//    loadRoleMenuGrid(0);
//});



function loadRoleMenuGrid(id) {

    ajaxRequest({
        commandName: 'HR_Employee_GetAll_For_Admin',
        values: {

            Id: id,
            Language: $('#Language').val()
        }, CallBack: loadfnCallBack
    });

}
var loadfnCallBack = function (inputDataJSON) {
    bindGrid(JSON.parse(inputDataJSON.Value));
}
var bindGrid = function (inputDataJSON) {

    var gridColumns = [

        {
            title: '',

            headerTemplate: "<input type='checkbox' id='checkAll'  class='k-checkbox header-checkbox'>",
            template: function (dataItem) {
                if (dataItem.isAssigned == 1) { return "<div><input type='checkbox' class='k-checkbox row-checkbox' id='target' checked ></div>"; }
                else { return "<div><input type='checkbox' class='k-checkbox row-checkbox' id='target' unchecked='true'></div>"; }
            },
            width: 20
        },
        { field: "userId", title: "userId", hidden: true },
        { field: "empId", title: "empId", hidden: true },
        { field: "roleId", title: "roleId", hidden: true },
        { field: "employeeNumber", title: employeeNumber, width: 40, filterable: true, },
        { field: "employeeName", title: employeeName, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "departmentId", title: "departmentId", width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, hidden: true },
        { field: "department", title: 'Department', width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "professionId", title: "Profession", width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, hidden: true },
        { field: "profession", title: "Profession", width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "hrRole", title: "HR Role", width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        {
            field: "projectRole", title: "Project Role", width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
            //  template: "#if (newRoleName == null) { # <span class='badge badge-danger'></span> # }   else {# <span class='badge badge-success'>#:newRoleName#</span> # }#"
            template: "#if (projectRole != null)  {# <span class='badge badge-success'>#:projectRole#</span> # }#"
        },
        { field: "companyName", title: lblCompany, width: 100, filterable: true, hidden: true },
        {
            field: "",
            width: 40,
            template: "#if (projectRole != null)  {#    <a style='font-size:20px;cursor:pointer;' onClick= deleteEmployeeByIdfromProjectRole(this)  title='Delete Role from Project'><span class='fa fa-trash'></span></a> # }# "
        },
    ];

    bindKendoGrid('employees-grid', 500, gridColumns, inputDataJSON, true);

    // setTimeout(function () {
    //     var grid = $("#employees-grid").data("kendoGrid");
    //     grid.table.on("click", ".checkbox", selectRow);
    // }, 2000);

};



$(document).on("click", "#checkAll", function () {

    if (this.checked) {
        $("#employees-grid tbody input:checkbox").attr("checked", true);
    } else {
        $("#employees-grid tbody input:checkbox").attr("checked", false);

    }
});




$('#btnSave').click(function () {
    if (customValidateForm('frmAddUpdateProjectRoleLinking')) {


        if ($('#MainModuleId :selected').text() == 'HR Module') {
            buttonAddPleaseWait('btnSave');
            updateOnlySingleRecordForHRModule();
        } else if ($('#MainModuleId :selected').text() == 'Project Module') {
            buttonAddPleaseWait('btnSave');
            loopThroughGridForProject();
        }
    }
    else {
        buttonRemovePleaseWait('btnSave', save, 'save');
        return false;
    }
});

function updateOnlySingleRecordForHRModule(e) {

     
    var grid = $("#employees-grid").data("kendoGrid");
    var gridDataSource = grid.dataSource._data;
    var ids = '';
    for (var i = 0; i < gridDataSource.length; i++) {
        var isAssigned = grid.tbody.find("tr:eq(" + i + ")").find('.row-checkbox').is(':checked');
        if (isAssigned == true) {
            var gridRow = gridDataSource[i];
            ids += ids == '' ? gridRow.id : ',' + gridRow.id;
        }
    }
    if (ids.length > 0) {
        var grid = $("#employees-grid").data("kendoGrid");
        var gridd = grid.dataSource._data;


        for (var i = 0; i < gridd.length; i++) {
            var isAssigned = grid.tbody.find("tr:eq(" + i + ")").find('.row-checkbox').is(':checked');

            var gridRow = gridd[i];
            if (isAssigned == true) {

                ajaxRequest({
                    commandName: 'UserManagement_Login_Role_Update',
                    values:
                    {
                        EmployeeId: parseInt(gridRow.empId),
                        DepartmentId: parseInt(gridRow.departmentId),
                        UserId: parseInt(gridRow.userId),
                        RoleId: parseInt($('#RoleDropdownList').val()),
                        Language: $('#Language').val(),
                    }, CallBack: fnLoadCallBack
                });
                alert('Only Single Record will be updated...');
                return false

            }


        }
    } else {
        buttonRemovePleaseWait('btnSave', save, 'save');
        swalMessage('info', lblFristSelectRecordFromGrid, 1500);
        return 0;
    }




}


function loopThroughGridForProject(e) {


    var getgridIDs = getIdsFromGrid();
    if (getgridIDs.length > 0) {
        var grid = $("#employees-grid").data("kendoGrid");
        var gridd = grid.dataSource._data;
        var postingArray = [];
        for (var i = 0; i < gridd.length; i++) {
            var isAssigned = grid.tbody.find("tr:eq(" + i + ")").find('.row-checkbox').is(':checked');

            var gridRow = gridd[i];
            if (isAssigned == true) {
                postingArray.push(
                    {

                        //--------- Grid Data-------------
                        EmployeeId: parseInt(gridRow.empId),
                        //  RoleId: parseInt(gridRow.roleId),
                        DepartmentId: parseInt(gridRow.departmentId),
                        ProfessionId: parseInt(gridRow.professionId),
                        MainModuleId: parseInt($('#MainModuleId').val()),
                        RoleId: parseInt($('#RoleDropdownList').val()),
                    });
            }

        }
        if (postingArray.length > 0) {

            ajaxRequest({
                commandName: 'Project_Role_Mapping_For_Employees_Save',
                values:
                {
                    RoleMappingDataModel: postingArray
                    //CreatedBy: $('#CreatedBy').val(),
                    //Language: $('#Language').val()
                }, CallBack: fnLoadCallBack
            });
            //  setTimeout(function () {
            //      location.reload();
            //
            //  }, 50);
        }
    }

}
var fnLoadCallBack = function (response) {
   
    swal(response.Value);
    buttonRemovePleaseWait('btnSave', save, 'save');
    loadRoleMenuGrid(parseInt($('#ProfessionId').val()))
}

function getIdsFromGrid(btnValue, btnId, btnIcon) {

    var grid = $("#employees-grid").data("kendoGrid");
    var gridDataSource = grid.dataSource._data;
    var ids = '';
    for (var i = 0; i < gridDataSource.length; i++) {
        var isAssigned = grid.tbody.find("tr:eq(" + i + ")").find('.row-checkbox').is(':checked');
        if (isAssigned == true) {
            var gridRow = gridDataSource[i];
            ids += ids == '' ? gridRow.id : ',' + gridRow.id;
        }
    }
    if (ids.length > 0) { return ids; } else {

        //  if (btnValue == "Approved") { btnValue = _currentLanguage == "en-US" ? "Approve" : approveTitle; } else { btnValue = _currentLanguage == "en-US" ? "Decline" : lblDecline; }


        buttonRemovePleaseWait('btnSave', save, 'save');
        swalMessage('info', lblFristSelectRecordFromGrid, 1500);
        return 0;
    }


}


function deleteEmployeeByIdfromProjectRole(event) {

    var row = $(event).closest("tr");
    var grid = $("#employees-grid").data("kendoGrid");

    var dataItem = grid.dataItem(row);
    Swal.fire({

        title: areYouSureTitle,
        text: doYouReallyWantToDeletThisRecord,
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
            ajaxRequest({ commandName: 'Project_Role_Mapping_For_Employees_Delete', values: { Id: dataItem.empId, Language: $('#Language').val() }, CallBack: deleteEmployeeByIdCallBack });
        }
    });
    var deleteEmployeeByIdCallBack = function (response) {
        swal(response.Value);
        loadRoleMenuGrid(parseInt($('#ProfessionId').val()))
    }

}