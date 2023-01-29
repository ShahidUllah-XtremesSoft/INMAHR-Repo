var $grid = "project-grid";

$(function () { 
  
  //  loadProjectGrid();
 
 
});
/*
function loadProjectGrid() {
    ajaxRequest({
        commandName: 'Project_Get', values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: $('#Language').val()
        }, CallBack: loadProjectGridCallBack
    });

}
*/
function fnLoadProjectBySearch(e,searchValue) {
    if (searchValue != "") {

        ajaxRequest({
            commandName: 'Project_Get_BySearch',
            values: {
                LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
                RoleId: JSON.parse(localStorage.getItem('User')).roleId,
                LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
                SearchParameter: searchValue,
                Language: _currentLanguage
            }, CallBack: loadProjectGridCallBack
        });
    } else {
        swalMessage('info', 'Please enter project no', 1500);
    }
     
    
 

}
var loadProjectGridCallBack = function (inputDataJSON) {
    bindGrid(JSON.parse(inputDataJSON.Value));
}
var bindGrid = function (inputDataJSON) {
    var gridColumns = [

        { field: "id", title: "id", hidden: true },
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },

        {
            field: "projectNumber", title: lblProjectNo, width: 30, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= detailProject(this)  title=''>#=projectNumber#</a> ",
        },
        {
            field: "projectName", title: lblProject, width: 70, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            //, template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= detailProject(this)  title='Project Name'>#=projectName#</a> ",
        },
      //  { field: "clientName", title: lblClientName, width: 70, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "projectCreatedDate", title: lblIssueDate, width: 30, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "urgentStatus", title: lblUrgent, width: 15, filterable: false},
        { field: "vipStatus", title: lblVIP, width: 15, filterable: false},
        { field: "progressStatus", title: lblProjectStatus, width: 25, filterable: false},
        { field: "oldProjectNo", title: ":Old Proj.No", width: 20, filterable: false},
/*
        {
            field: "", title: "", width: 30
            , template: "#if(isEmployeeExist =='Yes'){ #" +

                //   " <a style='font-size:20px;cursor:pointer;' onClick= detailProject(this)  ><span class='fa fa-eye'></span></a> # }" +
                " #} " +
                "else {# " +

                " <a style='font-size:20px;cursor:pointer;' onClick= detailProject(this) title='Details' >View</a>     #}#"
        },

*/


    ];

    if (inputDataJSON.length > 0) {
        localStorage.setItem('isEmployeeExist', inputDataJSON[0].isEmployeeExist); // Used in child js for menu stepper retrieving ... by /\/\ati
    }
    bindKendoGrid($grid, 100, gridColumns, inputDataJSON, true, 750);

};
 
function detailProject(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    var check_isEmployeeExist = localStorage.getItem('isEmployeeExist');
    if (check_isEmployeeExist == "No") {

        window.location.href = '/Project/Project/Details?id=' + dataItem.id + '';
    } else {
      
        window.location.href = '/Project/Project/Detail?id=' + dataItem.id + '';

    }
}
$("#search-project").keyup(function (event) {
    if (event.keyCode === 13) {
         
        if (event.currentTarget.value != "") {

        fnLoadProjectBySearch(event, event.currentTarget.value)
        } else {
            swalMessage('info', 'Please enter project no', 1500);
        }
    } 
});