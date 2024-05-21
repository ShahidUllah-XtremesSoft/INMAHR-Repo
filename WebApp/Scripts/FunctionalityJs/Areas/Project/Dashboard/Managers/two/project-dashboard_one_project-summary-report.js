var loggedInUser = {};
var $grid = "project-summary-grid", requestFrom = '';

var project_Id = 0;
 




function fn_Load_Summary_Projects_Grid() {

    ajaxRequest({
        commandName: 'Dashboard_One_Project_Summary_Getby_Project_No', values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Project_No: $('#Project_No').val(),
            Language: $('#Language').val()
        }, CallBack: fn_Load_Summary_Projects_GridCallBack
    });

}
var fn_Load_Summary_Projects_GridCallBack = function (inputDataJSON) {
    bindGrid(JSON.parse(inputDataJSON.Value));
}
var bindGrid = function (inputDataJSON) {
   
    // console.log(inputDataJSON);
    var gridColumns = [

        { field: "project_Id", title: "Project_Id", hidden: true },
       

        {
            field: "oldProjectNo", title: lblProjectNo,  width: 100, filterable: false
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= detailProject(this)  title=''>#=oldProjectNo#</a> ",
        },

        { field: "projectName", hidden: true, title: lblProject, width: 150, filterable: false },

        {
            field: "oldProjectNo", hidden: true, title: lblProjectNo, width: 150, filterable: false 
        },
        {
            field: "designSection", title: lblDesignSection, width: 150, filterable: false, attributes: { style: "background: white;" }
            , template: "<div class='progressBar d_progress'></div>"
        },
        {
            field: "technicalSection", title: lblTechnicalSection, width: 150, filterable: false, attributes: { style: "background: white;" }
            , template: "<div class='progressBar t_progress'></div>"
        },
        {
            field: "tenderSection", title: lblTenderSection, width: 150, filterable: false, attributes: { style: "background: white;" }
            , template: "<div class='progressBar tender_progress'></div>"
        },
        {
            field: "supervisionSection", title: lblSupervisionSection, width: 150, filterable: false, attributes: { style: "background: white;" }
            , template: "<div class='progressBar s_progress'></div>"
        },
        {
            field: "totalSectionPercentage", title: lblTotal, width: 150, filterable: false, attributes: { style: "background: white;" }
            , template: "<div class='progressBar total_progress'></div>"
        },
        //   { field: "clientName", title: lblClientName, width: 150, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        { field: "projectCreatedDate", hidden: true, title: lblCreatedDate, width: 150, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },

         

    ];

    bindKendoGrid($grid, 1000, gridColumns, inputDataJSON, true,0,false);
    // setTimeout(function (e) {


    var grid = $("#" + $grid).data("kendoGrid");
    //---Design Section
    grid.tbody.find('.d_progress').each(function (e) {
        var row = $(this).closest("tr");
        var model = grid.dataItem(row);
        var d_ProgressBar = $(this).kendoProgressBar({ max: 35, value: model.designSection })
        percentageColors(35, model.designSection, d_ProgressBar)

    })


    //---Technical Section
    grid.tbody.find('.t_progress').each(function (e) {
        var row = $(this).closest("tr");
        var model = grid.dataItem(row);

        var t_ProgressBar = $(this).kendoProgressBar({ max: 25, value: model.technicalSection })
        percentageColors(25, model.technicalSection, t_ProgressBar)

    })
    //---Supervision Section
    grid.tbody.find('.s_progress').each(function (e) {
        var row = $(this).closest("tr");
        var model = grid.dataItem(row);

        var s_ProgressBar = $(this).kendoProgressBar({ max: 30, value: model.supervisionSection })
        percentageColors(30, model.supervisionSection, s_ProgressBar)
    })
    //---Tender Section
    grid.tbody.find('.tender_progress').each(function (e) {
        var row = $(this).closest("tr");
        var model = grid.dataItem(row);
        var tender_ProgressBar = $(this).kendoProgressBar({ max: 10, value: model.tenderSection })
        percentageColors(10, model.tenderSection, tender_ProgressBar)
    })
    //---Total Section
    grid.tbody.find('.total_progress').each(function (e) {
        var row = $(this).closest("tr");
        var model = grid.dataItem(row);
        var total_ProgressBar = $(this).kendoProgressBar({ max: 100, value: model.totalSectionPercentage.toFixed(1) })

        percentageColors(100, model.totalSectionPercentage, total_ProgressBar)


    })

    $('.k-progress-status').append(`%`)
    //}, 100)
};

function percentageColors(default_Percentage, percentage_, progressBar_) {

    switch (true) {
        case (percentage_ == default_Percentage):
            progressBar_.find('.k-state-selected').css("background-color", "darkgreen").css("border", "inherit")
            break;
        /*
        case (percentage_ == 0 && percentage_ != default_Percentage): 
             progressBar_.css('background-color', 'rgb(233 17 17 / 65%)').css("border", "inherit")
            break;
        */
        case (percentage_ != default_Percentage):
            progressBar_.find('.k-state-selected').css("background-color", "darkorange").css("border", "inherit")
            break;

    }

}
function detailProject(e) {
    var row = $(e).closest("tr");
    var grid = $("#" + $grid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    window.location.href = '/Project/Reports/Summary?id=' + dataItem.project_Id + '';

}


