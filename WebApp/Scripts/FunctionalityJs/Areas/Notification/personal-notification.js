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

    //                template: "#if(isRead == false){#<div style='font-weight:bold;' >#=createdDate#</div> #} else {#<div  class='viewbutton'>#=createdDate#</div>#}#",


    var gridColumns = [

        { field: "id", title: "id", hidden: true },
        { field: "projectID", title: "ProjectId", hidden: true },
        //{ field: "employeeId", title: "EmployeeId", hidden: true },
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },
        {
            field: "projectNumber", title: lblProjectNo, width: 15, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= detailProject(this)  title=''>#=projectNumber#</a> ",
        },
        {
            field: "sender", title: 'From', width: 15, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "#if(isRead == false){#<div style='font-weight:bold;' >#=sender#</div> #} else {#<div  class='viewbutton'>#=sender#</div>#}#",
        },
        {
            field: "notificationFor", title: 'To', width: 15, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "#if(isRead == false){#<div style='font-weight:bold;' >#=notificationFor#</div> #} else {#<div  class='viewbutton'>#=notificationFor#</div>#}#",
        },
        {
            field: "subject", title: 'Subject', width: 15, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "#if(isRead == false){#<div style='font-weight:bold;' >#=subject#</div> #} else {#<div  class='viewbutton'>#=subject#</div>#}#",
        },
        {
            field: "description", title: 'Description', width: 50, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "#if(isRead == false){#<div style='font-weight:bold;' >#=description#</div> #} else {#<div  class='viewbutton'>#=description#</div>#}#",
        },
        {
            field: "date", title: 'Date', width: 15, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "#if(isRead == false){#<div style='font-weight:bold;' >#=date#</div> #} else {#<div  class='viewbutton'>#=date#</div>#}#",

        }, {
            field: "isRead", title: '', hidden: true, width: 15, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
    ];

    bindKendoGrid($grid, 100, gridColumns, inputDataJSON, true, 750);
};
function detailProject(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);


    ajaxRequest({
        commandName: 'Notification_Change_Status', values: {
            Notification_Id: dataItem.id,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
        }, CallBack: ''
    });

    $('#btnSearch').click();// After updating Notification status.Grid must be refresh .
    window.location.href = '/Project/Project/Detail?id=' + dataItem.projectID + '';

}
