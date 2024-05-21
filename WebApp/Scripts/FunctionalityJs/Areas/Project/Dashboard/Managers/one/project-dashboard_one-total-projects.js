var loggedInUser = {};





function fn_Load_Total_Projects_Grid() {
    ajaxRequest({
        //  commandName: 'Dashboard_One_Project_total_Getby',
        commandName: 'Dashboard_One_Project_total_Getby_New',
        values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Project_No: $('#Project_No').val(),
            //---- SEARCH FIELDS
            Project_ByYear: $('#yearPicker').val(),
            Project_ByMonth: $('#monthPicker').val(),
            Project_ByWeek: $('#weekPicker').val(),
            Project_Status: $('#NewOldProjectsPicker').val(),
            Language: _currentLanguage
        }, CallBack: fn_Load_Total_Projects_GridCallBack
    });

}
var fn_Load_Total_Projects_GridCallBack = function (inputDataJSON) {

    bindGrid_With_TotalProjects(JSON.parse(inputDataJSON.Value));
}
var bindGrid_With_TotalProjects = function (inputDataJSON) {




    // console.log(inputDataJSON);
    var gridColumns = [


        { field: "status_Id", title: "status_Id", width: 10, hidden: true },

        {
            field: "status", title: lblProjects, width: 25, filterable: false
            //  , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_Load_Total_Projects_Grid_Details(this)  '>" + lblView + "</a> ",
        },
        {
            field: "count", title: lblCount, width: 10, filterable: false, hidden: false
            //    , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fnLoadDetailScreen(this)  '>#=document#</a> ",
        },
        {
            title: "", width: 10, filterable: false
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_Load_Total_Projects_Grid_Details(this)  title=''>" + lblView + "</a> ",
        },

    ];
    bindKendoGrid("project-total-projects-grid", 1000, gridColumns, inputDataJSON[0], false, 300, false);




};

function fn_Load_Total_Projects_Grid_Details(e) {

    var row = $(e).closest("tr");
    var grid_ProjectTotal = $("#project-total-projects-grid").data("kendoGrid");
    var dataItem = grid_ProjectTotal.dataItem(row);
    //    alert(dataItem.status_Id);

    //  window.location.href = '/Project/Task/Details?id=' + dataItem.task_Id + '';
    $('.showHide-app-dynamic-data').show();
    if (dataItem.status_Id != 0) {

        fn_Load_Projects_By_StatusId(dataItem.status_Id);
    } else {

        //IF dataItem.status_Id is 0 it means get TENDER data
        fn_Load_Projects_Tender_Data();
    }
}





function fn_Load_Projects_Tender_Data() {
    ajaxRequest({
        commandName: 'Dashboard_One_Projects_Getby_Tender',
        values: {
            Project_Id: 0,
            Language: _currentLanguage
        }, CallBack: fn_Load_Projects_By_StatusIdCallBack
    });

}
function fn_Load_Projects_By_StatusId(status_Id) {
    ajaxRequest({
        commandName: 'Dashboard_One_Projects_Getby_Status_Id',
        values: {
            Status_Id: status_Id,
            Language: _currentLanguage
        }, CallBack: fn_Load_Projects_By_StatusIdCallBack
    });

}

var fn_Load_Projects_By_StatusIdCallBack = function (inputDataJSON) {
    var inputDataJSON = (JSON.parse(inputDataJSON.Value));
    //console.log(inputDataJSON);
    var gridColumns = [


        { field: "projectId", title: "projectId", width: 10, hidden: true },

        {
            field: "projectNo", title: lblProjectNo, width: 20, filterable: false
            //  , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_Load_Total_Projects_Grid_Details(this)  '>" + lblView + "</a> ",
        },
        {
            field: "projectName", title: lblDetails, width: 50, filterable: false, hidden: false
            //    , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fnLoadDetailScreen(this)  '>#=document#</a> ",
        },
        {
            title: "", width: 10, filterable: false
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_Load_Projects_By_StatusId_Details(this)  title=''>" + lblView + "</a> ",
        },

    ];
    $('#append-dynamic-data').empty();
    bindKendoGrid("append-dynamic-data", 1000, gridColumns, inputDataJSON[0], false, 300, false);



};
var project_Id_
function fn_Load_Projects_By_StatusId_Details(e) {

    var row = $(e).closest("tr");
    var grid_ = $("#append-dynamic-data").data("kendoGrid");
    var dataItem = grid_.dataItem(row);

    project_Id_ = dataItem.projectId;

    // loadProjectSectiondownList('DesignSection');

    $('.main-section-name').text(dataItem.projectNo + ' ' + dataItem.projectName);
    showAllSection();
    fnLoadProject_SummaryDataByParamter();
}





/*
function loadProjectSectiondownList(callingArea) {

    ajaxRequest({ commandName: 'STEPPER_SUB_SECTION_MENU', values: { ParentType: callingArea, Project_Id: project_Id_, Language: _currentLanguage }, CallBack: fnloadloadProjectSectiondownListCallBack });

}
function fnloadloadProjectSectiondownListCallBack(response) { stepper_SECTION(response) }

function stepper_SECTION(response) {
    $('.showHideStepperDetails').hide();

    if (JSON.parse(response.Value)[0].parent_Type == 'DesignSection') {
 
        $('#append-section-details').empty();
        var gridColumns = [
            { field: "parent_Type", title: "parentType", width: 10, hidden: true },
            { field: "id", title: "id", width: 10, hidden: true },
            { field: "name", title: " ", width: 25, filterable: false },
            { field: "status", title: lblStatus, width: 15, filterable: false },
            {
                title: "", width: 10, filterable: false
                , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'   class='viewbutton' gridid='append-section-details' onClick= fn_Load_Section_Details(this)  title=''>" + lblView + "</a> ",
            },

        ];
        bindKendoGrid("append-section-details", 1000, gridColumns, JSON.parse(response.Value), false, 200, false);
        loadProjectSectiondownList('TechnicalSection');
    } else if (JSON.parse(response.Value)[0].parent_Type == 'TechnicalSection') {
        $('#append-technical-section').empty();
        var gridColumns = [
            { field: "parent_Type", title: "parentType", width: 10, hidden: true },
            { field: "id", title: "id", width: 10, hidden: true },
            { field: "name", title: " ", width: 25, filterable: false },
            { field: "status", title: lblStatus, width: 15, filterable: false },
            {
                title: "", width: 10, filterable: false
                , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' gridid='append-technical-section' onClick= fn_Load_Section_Details(this)  title=''>" + lblView + "</a> ",
            },

        ];
        bindKendoGrid("append-technical-section", 1000, gridColumns, JSON.parse(response.Value), false, 200, false);

        loadProjectSectiondownList('SupervisionSection');
    } else if (JSON.parse(response.Value)[0].parent_Type == 'SupervisionSection') {
        $('#append-supervision-section').empty();
        var gridColumns = [
            { field: "parent_Type", title: "parentType", width: 10, hidden: true },
            { field: "id", title: "id", width: 10, hidden: true },
            { field: "name", title: " ", width: 25, filterable: false },
            { field: "status", title: lblStatus, width: 15, filterable: false },
            {
                title: "", width: 10, filterable: false
                , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' gridid='append-supervision-section'  onClick= fn_Load_Section_Details(this)  title=''>" + lblView + "</a> ",
            },

        ];
        bindKendoGrid("append-supervision-section", 1000, gridColumns, JSON.parse(response.Value), false, 200, false);


        $('.showHideStepperDetails').fadeToggle();
    } 
}
*/

function hideSubSection() {

    $('.div-sub-section').hide();
    $('#append-section-sub-details').empty();

}
function hideDesignSection() {

    $('.div-design-section').hide();
    $('#append-section-details').empty();

}
function hideTechnicalSection() {

    $('.div-technical-section').hide();
    $('#append-technical-section').empty();

}
function hideSupervisionSection() {

    $('.div-supervision-section').hide();
    $('#append-supervision-section').empty();

}
function showAllSection() {
    $('.div-design-section').show();
    //  $('.showHideStepperDetails').show();
    // $('.div-technical-section').show();
    //  $('.div-supervision-section').show();
}


// Summary Report




function fnLoadProject_SummaryDataByParamter() {
    ajaxRequest({
        commandName: 'Dashboard_One_Project_STEPPER_Summary_Getby_Project_Id',
        values: {
            Project_Id: project_Id_,
            Language: _currentLanguage
        }, CallBack: steppers__SECTION_CallBack_
    });


}


function steppers__SECTION_CallBack_(response) {

    var steppers_ = JSON.parse(response.Value)[0];
    if (steppers_ != null) {
        $('.div-design-section').hide();


        var gridColumns = [
            { field: "parent_Type", title: "parentType", width: 10, hidden: true },
            { field: "id", title: "id", width: 10, hidden: true },
            { field: "name", title: " ", width: 25, filterable: false },
            { field: "totalTask", title: lblTasks, width: 10, filterable: false, hidden: true },
            { field: "taskStatus", title: lblStatus, width: 15, filterable: false },
            { field: "task_Id", title: "task_Id", width: 15, hidden: true },
            {
                title: "", width: 10, filterable: false
                , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'   class='viewbutton' gridid='append-section-details' onClick= fn_Load_Section_Details(this)  title=''>" + lblView + "</a> ",
            },

        ];
        bindKendoGrid("append-section-details", 1000, gridColumns, steppers_, false, 500, false);
        $('.div-design-section').fadeToggle();
    }
    //************************   BY |\/|ATI 

}
var section_Id_ = 0, task__Id = 0;
function fn_Load_Section_Details(e) {

    var row = $(e).closest("tr");

    var row = $(e).closest("tr");
    var grid_Id = $("#append-section-details").data("kendoGrid");
    var dataItem = grid_Id.dataItem(row);
    // console.log(dataItem);

    section_Id_ = dataItem.id;
    task_Id = dataItem.task_Id == null ? 0 : dataItem.task_Id;
    $('.sub-section-name').text(dataItem.name);

    fnLoadProject_Section_SummaryDataByParamter()
}

function fnLoadProject_Section_SummaryDataByParamter() {
    /*
    ajaxRequest({
        commandName: 'Dashboard_One_Project_STEPPER_Summary_Getby_Project_Id_and_SectionId',
        values: {
            Project_Id: project_Id_,
            Section_Id: section_Id_,
            Language: _currentLanguage
        }, CallBack: steppers__SECTION_Details_CallBack_
    });
    */


    ajaxRequest({
        commandName: 'Project_Task_Details_By_Employee_Id', values: {
            task_Id: task_Id,
            Language: _currentLanguage
        }, CallBack: steppers__SECTION_Details_CallBack_
    });


}


function steppers__SECTION_Details_CallBack_(response) {

    var stepper_details = JSON.parse(response.Value);
    // console.log(stepper_details);
    //var stepper_details = JSON.parse(response.Value)[0];
    debugger
    if (stepper_details != null) {
        $('.div-sub-section').hide();
        //  console.log(stepper_details);

        var gridColumns = [
            { title: "#", template: "<b>#= ++record #</b>", width: "3%", },
            { field: "project_Task_Multiple_Id", title: "project_Task_Multiple_Id", filterable: false, hidden: true, editable: true },
            { field: "task_Id", title: "task_Id", filterable: false, hidden: true, editable: true },
            /*{ field: "status", title: "status", filterable: false, hidden: true },*/
            { field: "setup_Sub_Section_Id", title: "setup_Sub_Section_Id", filterable: false, hidden: true, editable: true },
            {
                field: "taskName", title: lblTask, width: "8%", filterable: false, editable: true
                //   template: " #  if(status == '') { # <label style='text-decoration:line-through' class='badge  btn-danger'>#=taskName #</label># } #"
            },
            { field: "completionDate_new", title: lblCompletionDate, width: "5%", filterable: false, editable: true },
            { field: "percentage", title: "percentage", width: "8%", filterable: false, hidden: true, editable: true },
            { field: "status", title: lblStatus, width: "8%", filterable: false, hidden: false, editable: true },
            {
                title: "", width: "5%", filterable: false
                , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'   class='viewbutton'  onClick= fn_Load_Section_Sub_Details(this)  title=''>" + lblView + "</a> ",
            },
            /*
            var gridColumns = [
                { title: "#", template: "<b>#= ++record #</b>", width: 5, },
                { field: "parent_Type", title: "parentType", width: 10, hidden: true },
                { field: "id", title: "id", width: 10, hidden: true },
                { field: "name", title: " ", width: 25, filterable: false, hidden: true },
                { field: "stdName", title: lblTask, width: 50, filterable: false },
                { field: "employeeName", title: lblEmployee, width: 50, filterable: false },
                { field: "priority", title: lblPriority, width: 25, filterable: false },
                { field: "task_status", title: lblStatus, width: 25, filterable: false },
                {
                    title: "", width: 10, filterable: false
                    //   , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'   class='viewbutton'  onClick= fn_Load_Section_Sub_Details(this)  title=''>" + lblView + "</a> ",
                },
                */
        ];
        bindKendoGrid("append-section-sub-details", 1000, gridColumns, stepper_details, false, 500, false);
        $('.div-sub-section').fadeToggle();
    }
    //************************   BY |\/|ATI
}

function fn_Load_Section_Sub_Details(e) {

    var row = $(e).closest("tr");
    var grid_Id = $("#append-section-sub-details").data("kendoGrid");
    var dataItem = grid_Id.dataItem(row);
    console.log(dataItem);

//    window.location.href = `/Project/Task/Details?id=` + dataItem.task_Id + ``;
    window.open(`/Project/Task/Details?id=` + dataItem.task_Id, '_blank');


}