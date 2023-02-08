var $RosterGrid = "div-roster-grid";
$(function () {

});

$('#RosterAssociationTabLi').click(function () {
    fnLoadRosterDDL();
    loadDepartmentTreeDropdownList();
    setTimeout(function () {
        $("#DepartmentId").data("kendoDropDownTree").bind("change", departmentTreeViewCheck);

    }, 1000);
})

function departmentTreeViewCheck(e) {

    $('#DepartmentIds').val('');
    var selectedDepartments = e.sender._values;
    var concatenatedDepartments = '';
    selectedDepartments.forEach(function (item) {
        concatenatedDepartments += concatenatedDepartments == '' ? item : ',' + item;
    });
    $('#DepartmentIds').val(concatenatedDepartments);


}
function fnLoadAllEmployeesListAsPerDepartment() {
    var Department = $('#DepartmentId').val();
    if (Department == '' || Department == null) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: select + ' ' + section,
            showConfirmButton: false,
            timer: 1500
        })
        return;
    } else {
        ajaxRequest({
            commandName: 'Roster_Association_Get_AllEmployees_by_DepartmentWise',
            values: {
                LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
                DepartmentId: Department,
                Language: _currentLanguage
            }, CallBack: fnLoadEmployeesByDepartmentIdCallBack
        });

    }
}
function fnLoadRosterDDL() {

    ajaxRequest({
        commandName: 'Setup_Roster_Get_DDL',
        values: {
            Language: _currentLanguage
        }, CallBack: fnLoadRosterDDLCallBack
    });
}
var fnLoadRosterDDLCallBack = function (response) {


    sessionStorage.setItem('RosterDDL', response.Value)

}
var fnLoadEmployeesByDepartmentIdCallBack = function (response) {

    var gridColumns = [
        // {
        //     title: '',
        //
        //     headerTemplate: "<input type='checkbox' id='checkAll'  class='k-checkbox header-checkbox'>",
        //     template: function (dataItem) {
        //         if (dataItem.isAssigned == 1) { return "<div><input type='checkbox' class='k-checkbox row-checkbox' onclick='fnCheckUncheck(this)' id='target' checked ></div>"; }
        //         else { return "<div><input type='checkbox' class='k-checkbox row-checkbox' onclick='fnCheckUncheck(this)' id='target' unchecked='true'></div>"; }
        //     },
        //     width: 5
        // },
        { title: "#", template: "<b>#= ++record #</b>", width: 8, },

        { field: "EmployeeId", title: "EmployeeId", hidden: true },
        // { field: "departmentId", title: "DepartmentId", hidden: true, filterable: false },
        { field: "employeeNumber", title: employeeNumber, hidden: false, width: 20, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, editable: true },
        { field: "name", title: lblName, hidden: false, width: 70, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, editable: true },
        //{ field: "defaultTime", title: "Default Time", hidden: false, width: 20, filterable: false, editor: categoryDropDownEditor },
        { field: "sunday", title: lblSunday, hidden: false, width: 20, filterable: false, editor: categoryDropDownEditor },
        { field: "monday", title: lblMonday, hidden: false, width: 20, filterable: false, editor: categoryDropDownEditor },
        { field: "tuesday", title: lblTuesday, hidden: false, width: 20, filterable: false, editor: categoryDropDownEditor },
        { field: "wednesday", title: lblWednesday, hidden: false, width: 20, filterable: false, editor: categoryDropDownEditor },
        { field: "thursday", title: lblThursday, hidden: false, width: 20, filterable: false, editor: categoryDropDownEditor },
        { field: "friday", title: lblFriday, hidden: false, width: 20, filterable: false, editor: categoryDropDownEditor },
        { field: "saturday", title: lblSaturday, width: 20, filterable: false, editor: categoryDropDownEditor },

        {
            field: "", width: 10,
            title: "",
            template: "   <a style='font-size:20px;cursor:pointer;' onClick= deleteRosterAssociation(this)  title='Delete'><span class='fa fa-trash'></span></a>  "
            //  template: "#if(isRecordExist == 1){ # <a style='font-size:20px;cursor:pointer;' onClick= deleteRosterAssociation(this)  title='Delete'><span class='fa fa-trash'></span></a>#}" +
            //      "else{ #<a style='font-size:20px;cursor:pointer;' onClick= see_EvaluationDetailsById(this)  title='See Detail '><span class='fa fa-eye'></span></a>#}#"

        }
    ];

    bindEditAblekendoGrid('load-employees-by-role-and-department', 100, gridColumns, JSON.parse(response.Value));

    /*$('#btn-select-records-from-grid').attr('disabled', true)*/
};



function categoryDropDownEditor(container, options) {

    var rosterDDL = JSON.parse(sessionStorage.getItem('RosterDDL'))

    $('<input  name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: false,
            dataTextField: "value",
            dataValueField: "id",
            dataSource: rosterDDL,
            change: function (e) {
                // Handle the change event here
                var text = this.text();
                var value = this.value();
                var grid = $("#load-employees-by-role-and-department").data("kendoGrid");
                var dataItem = grid.dataItem(grid.tbody.find("tr.k-grid-edit-row"));


                if (value !== text) {
                    dataItem.set(grid.editable.options.fields.field, text);

                    var uid = this.element.closest("[data-uid]").data("uid"),
                        dataSource = grid.dataSource,
                        item = dataSource.getByUid(uid);
                    item.dirty = true;


                }

                $("#load-employees-by-role-and-department").data("kendoGrid").refresh();
            }
        });

}
function deleteRosterAssociation(event) {
    var row = $(event).closest("tr");
    var grid = $("#load-employees-by-role-and-department").data("kendoGrid");
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
            ajaxRequest({ commandName: 'Setup_Roster_Association_Delete', values: { EmployeeId: dataItem.employeeId, Language: $('#Language').val() }, CallBack: deleteRosterAssociationCallBack });
        }
    });
    var deleteRosterAssociationCallBack = function (response) {
        swal(response.Value);
        fnLoadAllEmployeesListAsPerDepartment();

    }
}




$('#btn-save-roster-association').click(function () {
    buttonAddPleaseWait('btn-save-roster-association');
    fnSaveTimeRosterAssociation(this.value, 'btn-save-roster-association', 'save');
});

function fnSaveTimeRosterAssociation(btnValue, btnId, btnIcon) {

    Swal.fire({

        title: btnSave,
        // text    :,
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

            var grid = $("#load-employees-by-role-and-department").data("kendoGrid");


            var gridd = grid.dataSource._data;


            var postingArray = [];

            for (var i = 0; i < gridd.length; i++) {

                var rosterDDL = JSON.parse(sessionStorage.getItem('RosterDDL'))


                var gridRow = gridd[i];
                if (gridRow.dirty != undefined) {
                    if (gridRow.dirty == true) {


                        for (var z = 0; z < rosterDDL.length; z++) {
                            // Commented Code is working but commented due to Roster Change
                            var check1 = rosterDDL[z].value == gridRow.sunday ? (gridRow.sunday = rosterDDL[z].id) : gridRow.sunday
                            var check2 = rosterDDL[z].value == gridRow.monday ? (gridRow.monday = rosterDDL[z].id) : gridRow.monday
                            var check3 = rosterDDL[z].value == gridRow.tuesday ? (gridRow.tuesday = rosterDDL[z].id) : gridRow.tuesday
                            var check4 = rosterDDL[z].value == gridRow.wednesday ? (gridRow.wednesday = rosterDDL[z].id) : gridRow.wednesday
                            var check5 = rosterDDL[z].value == gridRow.thursday ? (gridRow.thursday = rosterDDL[z].id) : gridRow.thursday
                            var check6 = rosterDDL[z].value == gridRow.friday ? (gridRow.friday = rosterDDL[z].id) : gridRow.friday
                            var check7 = rosterDDL[z].value == gridRow.saturday ? (gridRow.saturday = rosterDDL[z].id) : gridRow.saturday

                            // var check7 = rosterDDL[z].value == gridRow.saturday ? (gridRow.saturday = rosterDDL[z].id) : gridRow.saturday
                        }


                        postingArray.push(
                            {

                                //--------- Grid Data-------------
                                Id: 0,
                                Sunday: gridRow.sunday,
                                Monday: gridRow.monday,
                                Tuesday: gridRow.tuesday,
                                Wednesday: gridRow.wednesday,
                                Thursday: gridRow.thursday,
                                Friday: gridRow.friday,
                                Saturday: gridRow.saturday,
                                HR_Employee_Id: gridRow.employeeId,
                                HR_Department_Id: $('#DepartmentId').val(),
                                //  CreatedBy: parseInt(JSON.parse(localStorage.getItem('User')).id),
                                //LoggedIn_EmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,

                            });
                        //  }

                    }
                }
            }
            if (postingArray.length > 0) {
                //console.log(postingArray)
                ajaxRequest({
                    commandName: 'Setup_Roster_Association_Multipe_Save',
                    values:
                    {
                        AssociationModel: postingArray,
                        CreatedBy: JSON.parse(localStorage.getItem('User')).id,
                        Language: _currentLanguage == null ? '' : _currentLanguage
                    }, CallBack: fnSaveTimeRosterAssociation_callback
                });

                buttonRemovePleaseWait(btnId, btnValue, btnIcon);
            } else {
                buttonRemovePleaseWait(btnId, btnValue, btnIcon);

                return 0;
            }
        } else {

            buttonRemovePleaseWait(btnId, btnValue, btnIcon);
        }
    });

}

var fnSaveTimeRosterAssociation_callback = function (response) {

    swal(response.Value);
    // $("#load-employees-by-role-and-department").data("kendoGrid").refresh();
    fnLoadAllEmployeesListAsPerDepartment();
}
