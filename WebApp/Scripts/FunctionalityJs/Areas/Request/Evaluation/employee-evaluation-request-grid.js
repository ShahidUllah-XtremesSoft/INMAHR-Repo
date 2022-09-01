var EvaluationGrid = "evaluation-created-request-grid";
$(function () {
    $('#Language').val(_currentLanguage);

    loadEvaluationGrid();
 
});
function loadEvaluationGrid() {
    ajaxRequest({
        commandName: 'Evaluation_Request_Grid',
        values: { Language: $('#Language').val() }, CallBack: load_EvaluationGridCallBack
    });
}
var load_EvaluationGridCallBack = function (inputDataJSON) {
    
    bindEvaluationGrid(JSON.parse(inputDataJSON.Value));
}
var bindEvaluationGrid = function (inputDataJSON) {
    
    var record = 0;
    var gridColumns = [
   
        { title: "#", template: "<b>#= ++record #</b>", width: 10, },
        { field: "evaluationId", title: "EvaluationId", hidden: true },
        { field: "hr_Employee_Id", title: "HR_Employee_Id", hidden: true },
        { field: "departmentId", title: "DepartmentId", hidden: true },
        { field: "createrName", title: lblFrom, width: 100, filterable: false},
        { field: "lM_Name", title: lblTo , width: 100, filterable: false},
        { field: "employeeName", title: lblEmployeeName, width: 100, filterable: false},
        { field: "departmentName", title: lblSection, width: 100, filterable: false },
        { field: "issueDate", title: IssueDate, width: 50, filterable: false },
        {
            field: "", width: 20,
            title: ' ',
            template: "  <a style='font-size:20px;cursor:pointer;' onClick= delete_EvaluationGridById(this)  title='Delete '><span class='fa fa-trash'></span></a>  "

        }
    ];

    bindKendoGrid(EvaluationGrid, 50, gridColumns, inputDataJSON);
};

  
function delete_EvaluationGridById(event) {
     
    var row = $(event).closest("tr");
    var grid = $("#" + EvaluationGrid).data("kendoGrid");
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
            ajaxRequest({ commandName: 'Evaluation_Request_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: delete_EvaluationGridByIdCallBack });
        }
    });
    var delete_EvaluationGridByIdCallBack = function ( response) {
        location.reload();
      
    }

} 