
$(function () {



    //  fnLoadAppraisalDDL();
    loadDepartmentTreeDropdownList();
    setTimeout(function () {
        $("#DepartmentId").data("kendoDropDownTree").bind("change", departmentTreeViewCheck);

    }, 1000);
});

function departmentTreeViewCheck(e) {

    $('#DepartmentIds').val('');
    var selectedDepartments = e.sender._values;
    var concatenatedDepartments = '';
    selectedDepartments.forEach(function (item) {
        concatenatedDepartments += concatenatedDepartments == '' ? item : ',' + item;
    });
    $('#DepartmentIds').val(concatenatedDepartments);

    fnLoadAllEmployeesListAsPerDepartment();
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
            commandName: 'Appraisal_Permission_Get_AllEmployees_by_DepartmentWise',
            values: {
                LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
                DepartmentId: Department,
                Year: $('#Year').val(),
                Language: _currentLanguage
            }, CallBack: fnLoadEmployeesByDepartmentIdCallBack
        });

    }
}

var fnLoadEmployeesByDepartmentIdCallBack = function (response) {
    //console.log(response.Value)

    var gridColumns = [
      
        { title: "#", template: "<b>#= ++record #</b>", width: 10, },

        { field: "EmployeeId", title: "EmployeeId", hidden: true },
        // { field: "departmentId", title: "DepartmentId", hidden: true, filterable: false },
        {
            field: "employeeNumber", title: employeeNumber, hidden: false, width: 40, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, editable: true
        },
        {
            field: "name", title: lblName, hidden: false, width: 100, filterable: false, editable: true,
        }, {
            field: "isEnabled", title: "", hidden: true, width: 20, filterable: false, editable: true,
        },
        {
            field: "", title: lblAppraisal, hidden: false, width: 50, filterable: false, type: "boolean"
            // , template: ` <input  checked class="switch" />`
            /* , template: function (e) {
                      debugger
                      if(parseInt(e.isEnabled) == 1) { alert('1'); `<input  checked class="switch" />` }
                      else { alert('else'); `<input  class="switch" />` }
                }
             */
            , template: "<input class='customClass' #if (isEnabled == '1') { # checked='checked' # } # type='checkbox' />", editor: customEditor

        },


       
    ];

    bindEditAblekendoGrid('load-employees-by-role-and-department', 100, gridColumns, JSON.parse(response.Value));

    $('.saveBTN').show();
    var kendoGrid_ = $("#load-employees-by-role-and-department").data("kendoGrid").tbody.find(".customClass");
    createSwitch(kendoGrid_);
  
};

function customEditor(container, options) {

    $('<input type="checkbox" name="' + options.field + '"/>')
        .appendTo(container)
        .kendoSwitch({
            onLabel: lblYes,//"YES",
            offLabel: lblNo// "NO"
        });
}

function createSwitch(element) {

    element.kendoSwitch({
        onLabel: lblYes,//"YES",
        offLabel: lblNo,// "NO"
        change: onChange
    });
}
function onChange(e) {

    var row = e.sender.element.closest("tr");
    var grid = $("#load-employees-by-role-and-department").getKendoGrid();
    var dataItem = grid.dataItem(row);
    var checked = e.checked;

    
}



$('#btn-save-appraisal-association').click(function () {
    buttonAddPleaseWait('btn-save-appraisal-association');
    fnSaveTimeAppraisalAssociation(this.value, 'btn-save-appraisal-association', 'save');
});

function fnSaveTimeAppraisalAssociation(btnValue, btnId, btnIcon) {

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

            // var grid = $("#load-employees-by-role-and-department").data("kendoGrid");
            var grid = $("#load-employees-by-role-and-department").getKendoGrid();

            var gridd = grid.dataSource._data;


            var postingArray = [];

            var chk_Enabled_Disabled = 0;
            for (var i = 0; i < gridd.length; i++) {


                var gridRow = gridd[i];
                var row = grid.table.find("tr[data-uid='" + gridRow.uid + "']");
                var switchElem = row.find(".customClass"); // get the switch element in this row

                if (switchElem.is(":checked")) { // if the switch is checked
                    chk_Enabled_Disabled = 1;

                } else {
                    chk_Enabled_Disabled = 0;

                }
                postingArray.push(
                    {

                        //--------- Grid Data-------------
                        Id: 0,
                        HR_Employee_Id: gridRow.employeeId,
                        HR_Department_Id: $('#DepartmentId').val(),
                        isEnabled: chk_Enabled_Disabled,
                    });


            }
            if (postingArray.length > 0) {

                //     console.log(postingArray)
                ajaxRequest({
                    commandName: 'Setup_Appraisal_Association_Multipe_Save',
                    values:
                    {
                        AssociationModel: postingArray,
                        Year: $('#Year').val(),
                        CreatedBy: JSON.parse(localStorage.getItem('User')).id,
                        Language: _currentLanguage == null ? '' : _currentLanguage
                    }, CallBack: fnSaveTimeAppraisalAssociation_callback
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

var fnSaveTimeAppraisalAssociation_callback = function (response) {

    swal(response.Value);
    fnLoadAllEmployeesListAsPerDepartment();
}
