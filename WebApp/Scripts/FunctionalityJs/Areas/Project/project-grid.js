var $grid = "project-grid";

$(function () {

    // requestFrom = (new URL(location.href)).searchParams.get('from');
    $('#Language').val(_currentLanguage);
    loadProjectGrid();
    /*
    if (JSON.parse(localStorage.getItem('User')).roleName != "User") {
        $('#btnAddNewProject').show();
    } else {
        $('#btnAddNewProject').hide();

    }
    */
});





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
            field: "projectName", title: lblProject, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            //, template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= detailProject(this)  title='Project Name'>#=projectName#</a> ",
        },
        { field: "clientName", title: lblClientName, width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "projectCreatedDate", title: lblIssueDate, width: 30, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "urgentStatus", title: lblUrgent, width: 15, filterable: false},
        { field: "vipStatus", title: lblVIP, width: 15, filterable: false},
        { field: "progressStatus", title: lblProjectStatus, width: 20, filterable: false},
        {
            field: "", title: "", width: 30
            , template: "#if(isEmployeeExist =='Yes'){ #" +

                //   " <a style='font-size:20px;cursor:pointer;' onClick= detailProject(this)  ><span class='fa fa-eye'></span></a> # }" +
                " #} " +
                "else {# " +

                " <a style='font-size:20px;cursor:pointer;' onClick= editProject(this) title=" + lblEdit + " ><span class='fa fa-pencil'></span></a> " +
                " <a style='font-size:20px;cursor:pointer;' onClick= deleteProjectById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>   #}#"
        },




    ];

    if (inputDataJSON.length > 0) {
        localStorage.setItem('isEmployeeExist', inputDataJSON[0].isEmployeeExist); // Used in child js for menu stepper retrieving ... by /\/\ati
    }
    bindKendoGrid($grid, 100, gridColumns, inputDataJSON, true, 750);

};

function editProject(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    window.location.href = '/Project/Project/Save?id=' + dataItem.id + '';
}

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


function deleteProjectById(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
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
            ajaxRequest({ commandName: 'Project_Delete', values: { Id: dataItem.id, UserId: JSON.parse(localStorage.getItem('User')).id, Language: $('#Language').val() }, CallBack: deleteByIdCallBack });
        }
    });
    var deleteByIdCallBack = function (response) {
        swal(response.Value);
        loadProjectGrid();
    }

}
