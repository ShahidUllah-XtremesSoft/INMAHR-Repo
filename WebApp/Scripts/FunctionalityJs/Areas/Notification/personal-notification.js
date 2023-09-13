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

    $('#btnSearch').click(function (e) {
        debugger
        e.preventDefault();
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

  //  console.log(inputDataJSON)

    var gridColumns = [

        { field: "id", title: "id", hidden: true },
        { field: "projectID", title: "ProjectId", hidden: true },
        //{ field: "employeeId", title: "EmployeeId", hidden: true },
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },
        {
            field: "projectNumber", title: lblProjectNo, width: 10, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            //  , template: "#if(isRemoved== 0){# <a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= detailProject(this)  title=''>#=projectNumber#</a> #}else {#<span>#=projectNumber#</span>#}#",
            , template: " <a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= detailProject(this)  title=''>#=projectNumber#</a>  ",
        },
        {
            field: "isRemoved", title: "isRemoved", width: 20, filterable: false, hidden: true
        },
        {
            field: "sender", title: lblFrom, width: 20, filterable: false
            , template: "#if(isRead == false){#<div style='font-weight:bold;white-space:nowrap;font-size:small' >#=sender#</div> #} else {#<div style='white-space:nowrap;font-size:small' class='viewbutton'>#=sender#</div>#}#",
        },
        {
            field: "notificationFor", title: lblTo, width: 25, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }, hidden: true
            , template: "#if(isRead == false){#<div style='font-weight:bold;' >#=notificationFor#</div> #} else {#<div  class='viewbutton'>#=notificationFor#</div>#}#",
        },
        {
            field: "subject", title: lblStatus, width: 10, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "#if(isRead == false){#<div style='font-weight:bold;' >#=subject#</div> #} else {#<div  class='viewbutton'>#=subject#</div>#}#"

        },
        {
            field: "description", title: lblDetails, width: 50, filterable: false
            , template: "#if(isRead == false){#<div style='font-weight:bold;white-space:nowrap;font-size: small;' >#=description#</div> #} else {#<div  style='white-space:nowrap;font-size: small;' class='viewbutton'>#=description#</div>#}#",

        },
        {
            field: "date", title: lblIssueDate, width: 10, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "#if(isRead == false){#<div style='font-weight:bold;' >#=date#</div> #} else {#<div  class='viewbutton'>#=date#</div>#}#",

        }, {
            field: "isRead", title: '', hidden: true, width: 15, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
    ];

    bindKendoGrid($grid, 12, gridColumns, inputDataJSON, true, 750);

     
    if (inputDataJSON.length != null) {

        fnGridColors();
    }
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

function fnGridColors() {
    //  setTimeout(function () {
    var grid = $("#" + $grid).data("kendoGrid");
    var gridData = grid.dataSource.view();

    for (var i = 0; i < gridData.length; i++) {

        //if (gridData[i].subject.match(/Delete.*/)) {
        //    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").css("background-color", 'rgb(255 0 0 / 25%)')
        //}

        //if (gridData[i].subject.match(/Approve.*/)) {
        //    grid.table.find("tr[data-uid='" + gridData[i].uid + "']").css("background-color", '#bbffb3')
        //}
        if (gridData[i].subject.match(/Return.*/) && gridData[i].isRead == false) {
            grid.table.find("tr[data-uid='" + gridData[i].uid + "']").addClass('blink_me')
        }
        if ((gridData[i].description.match(/create.*/) || gridData[i].description.match(/update.*/)) && gridData[i].isRead == false) {
            grid.table.find("tr[data-uid='" + gridData[i].uid + "']").css("background-color", 'rgb(255 0 0 / 8%)')
        }


    }

}
