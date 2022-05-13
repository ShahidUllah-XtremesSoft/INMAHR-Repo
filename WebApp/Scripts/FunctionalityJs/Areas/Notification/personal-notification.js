var $grid = "grid", requestFrom = '';

$(function () {
    $('#Language').val(_currentLanguage);


    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    $('#StartDate').kendoDatePicker({
        format: "yyyy-MM-dd"
        , value: firstDay//new Date()
    });
    $('#EndDate').kendoDatePicker({
        format: "yyyy-MM-dd"
        , value: new Date()
    });

    loadGrid();

    $('#btnSearch').click(function () {
        loadGrid();
    });
});





function loadGrid() {
    ajaxRequest({
        commandName: 'Notification_Personal_GetAll', values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            StartDate: $("#StartDate").val(),//.data("kendoDatePicker").value(),
            EndDate: $("#EndDate").val(),//.data("kendoDatePicker").value(),
            Language: $('#Language').val()
        }, CallBack: loadGridCallBack
    });

}
var loadGridCallBack = function (inputDataJSON) {
    bindGrid(JSON.parse(inputDataJSON.Value));
}
var bindGrid = function (inputDataJSON) {
    var record = 0;



    var gridColumns = [

        { field: "id", title: "id", hidden: true },
        //{ field: "projectId", title: "ProjectId", hidden: true },
        //{ field: "employeeId", title: "EmployeeId", hidden: true },
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },
        {
            field: "projectNumber", title: lblProjectNo, width: 15, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= detailProject(this)  title=''>#=projectNumber#</a> ",
        },
        {
            field: "sender", title: 'From', width: 15, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }            
        },
        {
            field: "notificationFor", title: 'To', width: 15, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        {
            field: "subject", title: 'Subject', width: 15, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        {
            field: "description", title: 'Description', width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        {
            field: "date", title: 'Date', width: 15, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
    ];

    bindKendoGrid($grid, 100, gridColumns, inputDataJSON, true, 750);
};
function detailProject(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Project/Project/Details?id=' + dataItem.id + '';
}
