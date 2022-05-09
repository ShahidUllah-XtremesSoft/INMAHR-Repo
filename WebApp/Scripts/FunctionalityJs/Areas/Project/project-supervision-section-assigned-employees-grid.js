$(function () {
    if (parameterId == null || parameterId == 0 || parameterId == '') {
        parameterId = $('#SupervisionSection_Document_ProjectId').val()
    }

    // fnloadAssignedEmployees_SupervisionSection();

});


function fnloadAssignedEmployees_SupervisionSection(section_id, sub_section_id) {

     
    ajaxRequest({
        commandName: 'Project_Linked_Employees_Supervision_Section_By_SectionId_Get',
        values: {
            Project_Id: parameterId,
            Section_Id: section_id,                   
            Sub_Section_Id: sub_section_id,           
            Language: _currentLanguage
        }, CallBack: fnloadAssignedEmployees_SupervisionSectionCallBack
    });
}
var fnloadAssignedEmployees_SupervisionSectionCallBack = function (inputDataJSON) {
    bindfnloadAssignedEmployees_SupervisionSection(JSON.parse(inputDataJSON.Value));
}
var bindfnloadAssignedEmployees_SupervisionSection = function (inputDataJSON) {


    var gridColumns = [

        { title: "#", template: "<b>#= ++record #</b>", width: 15 },
        { field: "id", title: "id", width: 10, hidden: true },
        {
            field: "employeeNumber", title: ".employee #", width: 50, hidden: false, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            //    , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fnLoadDetailScreen(this)  '>#=document#</a> ",
        },
        { field: "empName", title: ".empName", width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "setup_type_detail_name", title: ".Assigned Sub Section", width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        {
            field: "", width: 10, title: ' ',
            template: " <a style='font-size:20px;cursor:pointer;' onClick= deleteAssignedEmployeeById_SupervisionSection(this)  title='Delete '><span class='fa fa-trash'></span></a>  "
        },
    ];

    bindKendoGrid('grid-load-supervision-section-all-assigned-employees', 100, gridColumns, inputDataJSON, true, 550);
    
};


function deleteAssignedEmployeeById_SupervisionSection(event) {

    var row = $(event).closest("tr");
    var grid = $("#grid-load-supervision-section-all-assigned-employees").data("kendoGrid");
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
            ajaxRequest({ commandName: 'Project_Linked_Multiple_Employees_Delete_By_Id', values: { Id: dataItem.id, UserId: JSON.parse(localStorage.getItem('User')).id, Language: _currentLanguage }, CallBack: deleteAssignedEmployeeById_SupervisionSectionCallBack });
        }
    });
    var deleteAssignedEmployeeById_SupervisionSectionCallBack = function (response) {
        swal(response.Value);
        fnloadAssignedEmployees_SupervisionSection($('#Project_Supervision_Section_Parent_Type_DDL').val(), $('#Setup_SetupType_Id_for_Supervision_Section').val());

    }

}
