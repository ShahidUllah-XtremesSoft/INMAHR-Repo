
$(function () {

    fnLoad_Task_();

});
function fnLoad_Task_() {
    ajaxRequest({
        commandName: 'Project_Task_Get',
        values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: _currentLanguage
        }, CallBack: fnLoad_Task_CallBack
    });
}

var fnLoad_Task_CallBack = function (inputDataJSON) {

    fn_Load_TaskResponse(JSON.parse(inputDataJSON.Value));

}
var fn_Load_TaskResponse = function (inputDataJSON) {
    console.log(inputDataJSON)

    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 20, },
        { field: "task_Id", title: "task_Id", hidden: true },
        { field: "project_Id", title: "Project_Id", hidden: true },
        { field: "employee_Id", title: "Employee_Id", hidden: true },

        {
            field: "title", title: lblTitle, hidden: false, width: 200, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_Task_Details(this)  title=''>#=title#</a> ",
        },
        { field: "employeeName", title: lblEmployee, hidden: false, width: 200, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "projectName", title: lblProject, hidden: false, width: 200, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        {
            field: "priority", title: lblPriority, hidden: false, width: 70, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } },
            template: " #  if(priority.match(/Extreme.*/))" +
                " { # <label class='badge  btn-danger'>#=priority #</label># }  else if(priority.match(/High.*/))" +
                " { # <label class='badge  btn-warning'>#=priority#</label># }  else if(priority.match(/Medium.*/))" +
                " { # <label class='badge   ' style='background-color:yellow; color:black;'>#=priority#</label># } else if(priority.match(/Low.*/))" +
                " { # <label class='badge badge-success '>#=priority#</label># }  else if(priority.match(/None.*/))" +
                " { # <label class='badge   ' style='background-color:lightgray; color:black;'>#=priority#</label># } #"
        },
        { field: "totalTask", title: lblTotalTask, hidden: false, width: 70, filterable: false },
        {
            field: "startDate", title: lblAssignDate, hidden: false, width: 100, filterable: false,
            template: "<label class='badge   badge-success'>#=startDate #</label>"
        },
        {
            field: "completionDate", title: lblCompletionDate, hidden: false, width: 100, filterable: false,
            template: "<label class='badge   badge-danger'>#=completionDate #</label>"
        },


        {
            title: lblStatus,
            field: 'status',
            width: 70,
            hidden: false,
            filterable: false
        },


        {
            field: "",
            width: 80,
            title: ' ',

            template: "<a style='font-size:20px;cursor:pointer;' onClick= fnedit_Task(this) title=" + lblEdit + " ><span class='fa fa-pencil'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= fn_delete_Task(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>  "
        },


    ];
    bindKendoGrid('project-task-grid', 50, gridColumns, inputDataJSON, true, 435);

};

function fn_Task_Details(e) {
    var row = $(e).closest("tr");
    var grid = $("#project-task-grid").data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Project/Task/Details?id=' + dataItem.task_Id + '';
}
function fnedit_Task(e) {
    var row = $(e).closest("tr");
    var grid = $("#project-task-grid").data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Project/Task/Save?id=' + dataItem.task_Id + '';
}

function fn_delete_Task(event) {

    var row = $(event).closest("tr");
    var grid = $("#project-task-grid").data("kendoGrid");
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
                commandName: 'Project_Task_Delete_By_Id',
                values: {
                    Id: dataItem.task_Id,                  
                    CreatedBy: JSON.parse(localStorage.getItem('User')).id,
                    Language: _currentLanguage
                }, CallBack: fn_delete__TaskCallBack
            });
        }
    });
    var fn_delete__TaskCallBack = function (response) {
     
            swal(response.Value);
        fnLoad_Task_();

    }

}
