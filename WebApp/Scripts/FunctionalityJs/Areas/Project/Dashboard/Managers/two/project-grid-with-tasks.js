var loggedInUser = {};
var $grid = "project-summary-grid", requestFrom = '';




function fn_Load_Grid_With_Tasks() {
    ajaxRequest({
        commandName: 'Dashboard_One_Project_Task_with_Details_Getby_Project_Id', values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Project_No: $('#Project_No').val(),
            Language: _currentLanguage
        }, CallBack: fn_Load_Grid_With_TasksCallBack
    });

}
var fn_Load_Grid_With_TasksCallBack = function (inputDataJSON) {

    bindGrid_With_Task(JSON.parse(inputDataJSON.Value));
}
var bindGrid_With_Task = function (inputDataJSON) {

    var projectData = inputDataJSON[0];
    var taskarray = inputDataJSON[1];



    taskarray = {
        projectData,
        tasks: taskarray
    };


    var projecttaskarray = [];

    projectData.forEach(function (project) {

        var matchedTasks = taskarray.tasks.filter(function (task) {
            return task.project_Id === project.project_Id;
        });

        if (matchedTasks.length > 0) {


            var combinedProjectTask = {
                oldProjectNo: project.oldProjectNo,
                delay_tasks: project.delay_tasks,
                project_Id: project.project_Id,
                task_Id: 0, //project.task_Id,

                tasks: [matchedTasks]
            };
            projecttaskarray.push(combinedProjectTask);
        }
    });




    var gridColumns = [

        { field: "project_Id", title: "Project_Id", hidden: true },
        { field: "task_Id", title: "task_Id", hidden: true },
        {
            field: "oldProjectNo", hidden: true, title: lblProjectNo, width: 30, filterable: false, attributes: { "style": "text-align:center" },
            // , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_Load_Grid_With_Tasks_Details(this)  title=''>#=oldProjectNo#</a> ",
        },
        { field: "projectName", title: lblProject, width: 100, filterable: false, hidden: true },

        {
            field: 'tasks',
            title: lblTaskStatuses,
            filterable: false,
            width: 100,
            template: function (data) {
                var tasksHTML = `<table class="">
                                    <thead>
                                        <tr >
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                     <tbody>
                                        `;

                for (var i = 0; i < data.tasks[0].length; i++) {
                    var task = data.tasks[0][i];
               //     console.log(task);
                    var className = 'dark';
                    var default_style = 'background:black';
                    if (task.status.match(/Pending.*/)) { className = 'warning'; default_style = '' }
                    else if (task.status.match(/Complete.*/)) { className = 'success'; default_style = '' }
                    else if (task.status.match(/Stuck.*/)) { className = 'danger'; default_style = '' }
                    else if (task.status.match(/None.*/)) { className = 'dark'; default_style = 'background:#b6b6b6' }
                    // if (task.status === 'In Progress') {
                    tasksHTML += `     <tr style="font-size: 12px;cursor:pointer;" onClick= fn_Load_Task_Details_By_TaskId(this)>
                                            <td hidden class='project_Id'>`+ task.project_Id + `</td>
                                            <td class='task_status'>`+ task.status + `</td>
                                            <td>
                                                <span class="tag tag-`+ className + `" style=` + default_style + `>` + task.count + `</span>
                                            </td>
                                        </tr> 
                                     `
                }
                tasksHTML += `</tbody></table>`;
                return tasksHTML;
            }
        },
        {
            field: "delay_tasks", title: lblDelay, width: 30, filterable: false, hidden: false, //attributes: { "style": "text-align:center;font-size:x-large;" }
            //attributes: { "style": "text-align:center; font-size:x-large; background-color:#=delay_tasks# > 0 ? 'red' : 'white';" }
            attributes: { "style": "text-align:center; font-size:x-large; background-color: #if(delay_tasks >0 ){ # red #} else {#white#}#" }
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_Load_Delay_Tasks(this)  title=''>#=delay_tasks#</a> "
        },
    ];

    bindKendoGrid('project-grid-with-tasks', 1000, gridColumns, projecttaskarray, false, 0, false);



};
function getStatusIcon(completed) {
    return completed ? "✔" : "✘";
}

function fn_Load_Grid_With_Tasks_Details(e) {

    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);


    //  window.location.href = '/Project/Task/Details?id=' + dataItem.task_Id + '';

}



function fn_Load_Task_Details_By_TaskId(e) {

    var row = $(e).closest("tr")[0];
    var status = $(row).find('.task_status').text();
    var project_Id = $(row).find('.project_Id').text()

    fn_Load_Tasks_By_Statuses(project_Id, status);

}

function fn_Load_Delay_Tasks(e) {

    var row = $(e).closest("tr");
    var grid_ = $("#project-grid-with-tasks").data("kendoGrid");
    var dataItem = grid_.dataItem(row);

     
    fn_Load_Tasks_By_Statuses(dataItem.project_Id, 'Delay');

}

function fn_Load_Tasks_By_Statuses(project_Id, status) {
    ajaxRequest({
        commandName: 'Dashboard_One_Projects_Getby_Status_Text',
        values: {
            Project_Id: project_Id,
            Task_Status: status,
            Language: _currentLanguage
        }, CallBack: fn_Load_Tasks_By_StatusesCallBack
    });

}

var fn_Load_Tasks_By_StatusesCallBack = function (inputDataJSON) {
    var inputDataJSON = (JSON.parse(inputDataJSON.Value));
    // console.log(inputDataJSON);
    var gridColumns = [


        { field: "projectId", title: "projectId", width: 10, hidden: true },

        {
            field: "task", title: lblDetails, width: 50, filterable: false, hidden: false
            //    , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fnLoadDetailScreen(this)  '>#=document#</a> ",
        }, {
            field: "status", title: lblStatus, width: 20, filterable: false, hidden: false
            //    , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fnLoadDetailScreen(this)  '>#=document#</a> ",
        },
        {
            title: "", width: 10, filterable: false
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_Load_Projects_By_StatusId_Details(this)  title=''>" + lblView + "</a> ",
        },

    ];
    $('#append-dynamic-data').empty();
    bindKendoGrid("append-dynamic-data", 1000, gridColumns, inputDataJSON[0], false, 0, false);



};
