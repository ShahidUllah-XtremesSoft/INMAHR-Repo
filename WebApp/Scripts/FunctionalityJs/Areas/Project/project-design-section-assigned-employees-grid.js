$(function () {

  
    if (parameterId == null || parameterId == 0 || parameterId == '') {
        parameterId = $('#DesignSection_Document_ProjectId').val()
    }

    // fnloadAssignedEmployees();

});


function fnloadAssignedEmployees(sub_section_id) {


    ajaxRequest({
        commandName: 'Project_Linked_Employees_By_SectionId',
        values: {
            Project_Id: parameterId,
            Sub_Section_Id: sub_section_id,// $('.sectionAndSubSectionId').attr('data-sub-section-id'),
            Language: _currentLanguage
        }, CallBack: fnloadAssignedEmployeesCallBack
    });
}
function fnLoadDefault_AssignedEmployees(parentName) {


    ajaxRequest({
        commandName: 'Project_Linked_Employees_By_Parent',
        values: {
            Project_Id: parameterId,
            ParentType:parentName,
            Language: _currentLanguage
        }, CallBack: fnloadAssignedEmployeesCallBack
    });
}
var fnloadAssignedEmployeesCallBack = function (inputDataJSON) {
   
    bindfnloadAssignedEmployees(JSON.parse(inputDataJSON.Value));
}
var bindfnloadAssignedEmployees = function (inputDataJSON) {
      
    var gridColumns = [

        { title: "#", template: "<b>#= ++record #</b>", width: 15 },
        { field: "id", title: "id", width: 10, hidden: true },
        {
            field: "employeeNumber", title: employeeNumber, width: 20, hidden: false, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            //    , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fnLoadDetailScreen(this)  '>#=document#</a> ",
        },
        { field: "empName", title: employeeName, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "setup_type_detail_name", title: lblWork, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } ,hidden: false},
        {
            field: "startDate", title: lblStartDate, hidden: false, width: 40, filterable: false,
            template: "#if (startDate ==null) { # <span class='badge badge-danger'>" + lblNotStartedYet+"</span> # } else {# <span class='badge badge-success'>#:startDate#</span> # }#"
        },
        {
            field: "endDate", title: lblCompletionDate, hidden: false, width: 40, filterable: false,
            template: "#if (endDate ==null) { # <span class='badge'>-</span> # } else {# <span class='badge badge-danger'>#:endDate#</span> # }#"
        },
        {
            field: "", width: 10, title: ' ',
            template: " <a style='font-size:20px;cursor:pointer;' onClick= deleteAssignedEmployeeById(this)  title="+lblDelete+"><span class='fa fa-trash'></span></a>  "
        },
    ];

    bindKendoGrid('grid-load-all-assigned-employees', 100, gridColumns, inputDataJSON, true, 450);
    $('#checkAll').hide();
};


function deleteAssignedEmployeeById(event) {
     
    var row = $(event).closest("tr");
    var grid = $("#grid-load-all-assigned-employees").data("kendoGrid");
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
            ajaxRequest({
                commandName: 'Project_Linked_Multiple_Employees_Delete_By_Id',
                values: { Id: dataItem.id, UserId: JSON.parse(localStorage.getItem('User')).id, Language: _currentLanguage }, CallBack: deleteAssignedEmployeeByIdCallBack
            });
        }
    });
    var deleteAssignedEmployeeByIdCallBack = function (response) {
         
        swal(response.Value);
        fnloadAssignedEmployees($('#Project_DesignSection_Entity_Id').val());

    }

}
