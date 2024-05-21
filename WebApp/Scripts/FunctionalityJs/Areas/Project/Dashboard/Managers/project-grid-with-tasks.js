var loggedInUser = {};
var $grid = "project-summary-grid", requestFrom = '';


$(function () {
    fn_Load_Grid_With_Tasks();

});





function fn_Load_Grid_With_Tasks() {
    ajaxRequest({
        commandName: 'Project_Task_with_Details_Get', values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Branch_Id: loggedInUser.departmentId == undefined ? JSON.parse(localStorage.getItem('User')).departmentId : loggedInUser.departmentId,
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


    //  projectData = inputDataJSON[0]
    //taskarray = inputDataJSON[1]
    taskarray = {
        projectData,
        tasks: taskarray
    };

    //  console.log(taskarray);


    /*
    var taskarray = [
        {
            taskName: 'Task 1',
            projectId: 15,
            // tasks: ['Govt Doc a ', 'TP App a', '3D app a']
            tasks: [
                { task: 'Govt Doc a ', status: 'In Progress', count: '4' },
                { task: 'TP App a ', status: 'Pending', count: '10' },
                { task: '3D app a ', status: 'Stuck', count: '2' },
            ],
        },

        {
            taskName: 'Task 2',
            projectId: 16,
            tasks: [
                { task: 'Govt Doc b ', status: 'None', count: '6' },
                { task: 'TP App b ', status: 'Pending', count: '2' },
                { task: '3D app b ', status: 'Completed', count: '12' },
            ],
        },
        {
            taskName: 'Task 3',
            projectId: 18,
            tasks: [
                { task: 'Govt Doc c ', status: 'In Progress', count: '11' },
                { task: 'TP App c ', status: 'Pending', count: '14' },
                { task: '3D app c ', status: 'Completed', count: '9' },
            ],
        }
    ];
    */
    var projecttaskarray = [];

    projectData.forEach(function (project) {

        var matchedTasks = taskarray.tasks.filter(function (task) {
            return task.project_Id === project.project_Id;
        });

        if (matchedTasks.length > 0) {

            //var matchedTask = taskarray.tasks.find(function (task) {
            //    return task.project_Id === project.project_Id;
            //    pre_Project_Id = project.project_Id;
            //});

            //if (matchedTask) {
            var combinedProjectTask = {
                oldProjectNo: project.oldProjectNo,
                delay_tasks: project.delay_tasks,
                project_Id: project.project_Id,
                task_Id: 0, //project.task_Id,
                //     projectName: project.projectName,
                tasks: [matchedTasks]
            };
            projecttaskarray.push(combinedProjectTask);
        }
    });


    // console.log(projecttaskarray);
   
    var gridColumns = [

        { field: "project_Id", title: "Project_Id", hidden: true },
        { field: "task_Id", title: "task_Id", hidden: true },
        /* { title: "#", template: "<b>#= ++record #</b>", width: 10, },*/
        {
            field: "oldProjectNo", title: lblProjectNo, width: 30, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, attributes: { "style": "text-align:center" },
            // , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_Load_Grid_With_Tasks_Details(this)  title=''>#=oldProjectNo#</a> ",
        },
        { field: "projectName", title: lblProject, width: 100, filterable: false, hidden: true },

        {
            field: 'tasks',
            title: lblTaskStatuses,
            filterable: false,
            width: 100,
            //   template: '# for (var i = 0; i < data.tasks.length; i++) { # #: data.tasks[i] # <br/> # } #'
            template: function (data) {
                //  var tasksHTML = '<ul style="list-style-type: none; padding-left: 0;">';
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
                    var className = 'dark';
                    var default_style = 'background:black';
                    if (task.status.match(/Pending.*/)) { className = 'warning'; default_style = '' }
                    else if (task.status.match(/Complete.*/)) { className = 'success'; default_style = '' }
                    else if (task.status.match(/Stuck.*/)) { className = 'danger'; default_style = '' }
                    else if (task.status.match(/None.*/)) { className = 'dark'; default_style = 'background:#b6b6b6' }
                    // if (task.status === 'In Progress') {
                    tasksHTML += `     <tr style="font-size: 12px;">
                                            <td>`+ task.status + `</td>
                                            <td>
                                                <span class="tag tag-`+ className + `" style=` + default_style + `>` + task.count + `</span>
                                            </td>
                                        </tr> 
                                     `
                    //tasksHTML += '<li> <ul><li> ' + task.status + '</li><li style="list-style-type: none;">&#10003; ' + task.task + '</li></ul></li>'; // Check mark for done tasks
                    //   tasksHTML += '<li style="color: green;">&#10003; ' + task.task + '-' + task.status + '</li>'; // Check mark for done tasks
                    //} else {
                    //    tasksHTML += '<li style="color: red;">&#x2717; ' + task.task + '-' + task.status + '</li>'; // Cross mark or other indicator for pending tasks
                    //}
                }
                tasksHTML += `</tbody></table>`;
                return tasksHTML;
                /*
                var tasksHTML = '';
                for (var i = 0; i < data.tasks.length; i++) {
                    debugger
                    var task = data.tasks[i];
                  //  var taskStatus = getTaskStatus(task); // Assuming you have a function to determine task status

                    if (task.status === 'In Progress') {
                        tasksHTML += '<span style="color: green">&#10003; ' + task.task + '-' + task.status + '</span><br/>'; // Check mark for done tasks
                    } else {
                        tasksHTML += '<span style="color: red">&#x2717; ' + task.task + '</span><br/>'; // Cross mark or other indicator for pending tasks
                    }
                }
                return tasksHTML;
                */
            }
        },
        { field: "delay_tasks", title: lblDelay, width: 30, filterable: false, hidden: false, attributes: { "style": "text-align:center;font-size:x-large;" } },
    ];

    bindKendoGrid('project-grid-with-tasks', 1000, gridColumns, projecttaskarray, false, 400, false);



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


