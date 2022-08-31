var EvaluationGrid = "evaluation-created-request-grid";
$(function () {
    $('#Language').val(_currentLanguage);

    loadEvaluationGrid();
 
});
function loadEvaluationGrid() {
    ajaxRequest({
        commandName: 'HR_Evaluation_Request_Grid',
        values: { Language: $('#Language').val() }, CallBack: load_EvaluationGridCallBack
    });
}
var load_EvaluationGridCallBack = function (inputDataJSON) {
    
    bindEvaluationGrid(JSON.parse(inputDataJSON.Value));
}
var bindEvaluationGrid = function (inputDataJSON) {
    var record = 0;
    var gridColumns = [
  
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },
        { field: "id", title: "id", hidden: true },
        { field: "nameEng", title: NameEng, width: 100, filterable: true, hidden: true }, 
        { field: "issueDate", title: IssueDate, width: 50, filterable: true }, 
        {
            field: "", width: 50,
            title: ' ',
            template: "<a style='font-size:20px;cursor:pointer;' onClick= edit_EvaluationGrid(this) title='Edit Company Document' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= delete_EvaluationGridById(this)  title='Delete Company Document'><span class='fa fa-trash'></span></a>  "

        }
    ];

    bindKendoGrid(EvaluationGrid, 50, gridColumns, inputDataJSON);
};

 
function edit_EvaluationGrid(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + EvaluationGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    $('#Id').val(dataItem.id);
    $('#NameEng').val(dataItem.nameEng); 
}
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
            ajaxRequest({ commandName: 'HR_Evaluation_Request_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: delete_EvaluationGridByIdCallBack });
        }
    });
    var delete_EvaluationGridByIdCallBack = function (response) {
        swal(response.Value);
        ClearControls();
        $('#Id').val(0);
        loadEvaluationGrid();
    }

} 