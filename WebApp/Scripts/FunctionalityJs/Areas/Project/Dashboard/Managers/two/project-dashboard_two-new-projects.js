var loggedInUser = {};

var areaType = '', currentYear = 0;

function fnLoadDataByParam(param) {



    if (param != undefined) {


        $('.buttonMenu').removeClass('active');
        $(param).addClass('active');
        areaType = param.value;
    }
    $('#new-total-projects-grid').empty();
    hideDynamicDataCard_dashboar2();



    if (areaType == 'New') {

        fn_Load_Total_Projects_Grids();
        $('.showHideYear').hide();

        currentYear = new Date().getFullYear();
        $('#yearPicker').val(currentYear);

    } else if (areaType == 'Old') {
        $('.showHideYear').show();



        if (currentYear != 0 && currentYear == new Date().getFullYear()) {
            currentYear = currentYear - 1;
            //    $('#yearPicker').val(currentYear);           
            $("#yearPicker").val(currentYear);
            $("#yearPicker").trigger("change");
        }

        fn_Load_Total_Projects_Grids();

    } else if (areaType == 'Tender') {
        $('.showHideYear').show();



        if (currentYear != 0 && currentYear == new Date().getFullYear()) {
            currentYear = currentYear - 1;
            $("#yearPicker").val(currentYear);
            $("#yearPicker").trigger("change");
        }

        fn_Load_Total_Project_Tenders_Grids();

    } else if (areaType == 'Delay') {
        $('.showHideYear').hide();

        if (currentYear != 0 && currentYear == new Date().getFullYear()) {
            currentYear = currentYear - 1;
            $("#yearPicker").val(currentYear);
            $("#yearPicker").trigger("change");
        }

        fn_Load_Delay_Projects_BasedOn_Task_Grids();

    }
    $('#append-delay-steps-here').empty();
}


function fn_Load_Delay_Projects_BasedOn_Task_Grids() {

    ajaxRequest({
        commandName: 'Dashboard_Two_Get_Delay_Projects_basedOn_Task',
        values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            //---- SEARCH FIELDS
            Branch_Id: 0,
            Year: $("#yearPicker").val(),
            AreaType: areaType,
            Language: _currentLanguage
        }, CallBack: fn_dashboard_two_Load_Delay_Projects_By_CallBack
    });

}

var fn_dashboard_two_Load_Delay_Projects_By_CallBack = function (inputDataJSON) {
    var inputDataJSON = (JSON.parse(inputDataJSON.Value));

    var gridColumns = [


        { field: "projectId", title: "projectId", width: 10, hidden: true },

        {
            field: "projectNo", title: lblProjectNo, width: 20, filterable: false
            , filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        {
            field: "projectName", title: lblDetails, width: 50, filterable: false, hidden: false
        },
        { field: "delay_tasks", title: lblDelay, width: 20, filterable: false, hidden: false },
        {
            title: "", width: 15, filterable: false
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_dashboard_two_Load_Delay_Projects_By_Details(this)  title=''>" + lblView + "</a> ",
        },

    ];


    $('#new-total-projects-grid').empty();
    bindKendoGrid("new-total-projects-grid", 1000, gridColumns, inputDataJSON[0], true, 350, false);

    $('#append-delay-steps-here').empty();
    fnGenerateDummyStepsHTML('#append-delay-steps-here');

};


function fn_dashboard_two_Load_Delay_Projects_By_Details(e) {

    var row = $(e).closest("tr");
    var grid_ = $('#new-total-projects-grid').data("kendoGrid");
    var dataItem = grid_.dataItem(row);

    project_Id_ = dataItem.projectId;

    grid_.tbody.find(".k-state-selected").removeClass("k-state-selected");
    grid_.select(row);


    fn_dashboard_two_LoadProject_SummaryDataByParamter();


}







function fn_Load_Total_Project_Tenders_Grids() {

    ajaxRequest({
        commandName: 'Dashboard_Two_Get_Project_Tenders_by_Year',
        values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            //---- SEARCH FIELDS
            Year: $("#yearPicker").val(),
            AreaType: areaType,
            Language: _currentLanguage
        }, CallBack: fn_Load_Total_Projects_GridCallBackk
    });

}

function fn_Load_Total_Projects_Grids() {

    ajaxRequest({
        commandName: 'Dashboard_Two_Get_Projects_by_Year',
        values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            //---- SEARCH FIELDS
            Year: $("#yearPicker").val(),
            AreaType: areaType,
            Language: _currentLanguage
        }, CallBack: fn_Load_Total_Projects_GridCallBackk
    });

}
var fn_Load_Total_Projects_GridCallBackk = function (inputDataJSON) {

    bindGrid_With_TotalProjectss(JSON.parse(inputDataJSON.Value));
}
var bindGrid_With_TotalProjectss = function (inputDataJSON) {

    $('#new-total-projects-grid').empty();


    //  console.log(inputDataJSON);
    var gridColumns = [


        {
            field: "monthName", title: "Month", width: 25, filterable: false
            //  , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_dashboard_two_LoadNewProjects(this)  '>" + lblView + "</a> ",
            //  ,template: function (dataItem) {

            //    var color = getColorForMonth(dataItem.monthName);  
            //    return '<span style="color: ' + color + '">' + dataItem.monthName + '</span>';
            //}

        },
        {
            field: "week_1", title: "Week_1", width: 10, filterable: false, hidden: false
        },
        { field: "week_2", title: "Week_2", width: 10, filterable: false, hidden: false },
        { field: "week_3", title: "Week_3", width: 10, filterable: false, hidden: false },
        { field: "week_4", title: "Week_4", width: 10, filterable: false, hidden: false },
        {
            title: "", width: 10, filterable: false
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_dashboard_two_LoadNewProjects(this)  title=''>" + lblView + "</a> ",
        },

    ];
    bindKendoGrid("new-total-projects-grid", 1000, gridColumns, inputDataJSON, false, 300, false);



};

function fn_dashboard_two_LoadNewProjects(e) {

    var row = $(e).closest("tr");
    var grid_ProjectTotal = $("#new-total-projects-grid").data("kendoGrid");
    var dataItem = grid_ProjectTotal.dataItem(row);
    //    alert(dataItem.status_Id);

    grid_ProjectTotal.tbody.find(".k-state-selected").removeClass("k-state-selected");
    grid_ProjectTotal.select(row);

    $('.showHide-app-dynamic-data').show();
    $('.showhideSection').show();
    $('#load_steps_here_dashboard_two_sample').show();

    // --- CHECK AREA  if it's Tender then Load Tenders
    if (areaType == 'Tender') {
        fn_dashboard_two_Load_Tender_Projects_By_Month(dataItem.monthName)
    } else {

        fn_dashboard_two_Load_Projects_By_StatusId(dataItem.monthName);
    }
    $('#load_steps_here_dashboard_two').show();

    $('#load_steps_here_dashboard_two').empty();
    $('#append-delay-steps-here').empty();

}



/*

function fn_Load_Projects_Tender_Data() {
    ajaxRequest({
        commandName: 'Dashboard_One_Projects_Getby_Tender',
        values: {
            Project_Id: 0,
            Language: _currentLanguage
        }, CallBack: fn_Load_Projects_By_StatusIdCallBack
    });

}
*/
function fn_dashboard_two_Load_Tender_Projects_By_Month(monthName) {
    ajaxRequest({
        commandName: 'Dashboard_Two_Tender_Projects_Getby_Month_name',
        values: {
            MonthName: monthName,
            Language: _currentLanguage
        }, CallBack: fn_dashboard_two_Load_Projects_By_StatusIdCallBack
    });

}

function fn_dashboard_two_Load_Projects_By_StatusId(monthName) {
    ajaxRequest({
        commandName: 'Dashboard_Two_Projects_Getby_Month_name',
        values: {
            MonthName: monthName,
            Language: _currentLanguage
        }, CallBack: fn_dashboard_two_Load_Projects_By_StatusIdCallBack
    });

}

var fn_dashboard_two_Load_Projects_By_StatusIdCallBack = function (inputDataJSON) {
    var inputDataJSON = (JSON.parse(inputDataJSON.Value));

    var gridColumns = [


        { field: "projectId", title: "projectId", width: 10, hidden: true },

        {
            field: "projectNo", title: lblProjectNo, width: 25, filterable: false
            , filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            //  , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_dashboard_two_LoadNewProjects(this)  '>" + lblView + "</a> ",
        },
        {
            field: "projectName", title: lblDetails, width: 50, filterable: false, hidden: false
            //    , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fnLoadDetailScreen(this)  '>#=document#</a> ",
        },
        // { field: "delay_tasks", title: lblDelay, width: 20, filterable: false, hidden: false },
        {
            title: "", width: 15, filterable: false
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_dashboard_two_Load_Projects_By_StatusId_Details(this)  title=''>" + lblView + "</a> ",
        },

    ];

    $('#append-dynamic-data').empty();
    bindKendoGrid("append-dynamic-data", 1000, gridColumns, inputDataJSON[0], true, 350, false);



};
var project_Id_
function fn_dashboard_two_Load_Projects_By_StatusId_Details(e) {

    var row = $(e).closest("tr");
    //var gridnamee = areaType == 'Delay' ? '#new-total-projects-grid' : '#append-dynamic-data'
    //console.log(gridnamee);
    var grid_ = $('#append-dynamic-data').data("kendoGrid");
    var dataItem = grid_.dataItem(row);

    project_Id_ = dataItem.projectId;

    // loadProjectSectiondownList('DesignSection');
    //  $(row).css('k-state-selected');
    grid_.tbody.find(".k-state-selected").removeClass("k-state-selected");
    grid_.select(row);
    $('.main-section-name').text(dataItem.projectNo + ' ' + dataItem.projectName);
    showAllSection();
    fn_dashboard_two_LoadProject_SummaryDataByParamter();
}







function fn_dashboard_two_LoadProject_SummaryDataByParamter() {
    ajaxRequest({
        commandName: 'Dashboard_One_Project_STEPPER_Summary_Getby_Project_Id',
        values: {
            Project_Id: project_Id_,
            Language: _currentLanguage
        }, CallBack: steppers__SECTION_CallBack__
    });


}


function steppers__SECTION_CallBack__(response) {

    var steppers_ = JSON.parse(response.Value)[0];
    // console.log(steppers_);
    $('#load_steps_here_dashboard_two').empty();
    $('#load_steps_here_dashboard_two_sample').empty();

    var count = 0, statusClass = '', text = '', icon = '', icon_div = '', bindClickEvent = '';
    for (var i = 0; i < steppers_.length; i++) {
        //  console.log(steppers_);

        if (steppers_[i].sectionIncluded != "no") {
            count = count + 1;

            if (steppers_[i].delaySection != "") {
                icon_div = 'badge-danger';
                // statusClass = 'badge-success';
                statusClass = icon_div;
                text = 'white';
                icon = '<i class="fa fa-exclamation-circle"></i>'
                bindClickEvent = true
            } else if (steppers_[i].taskStatus.match(/Complete.*/)) {
                icon_div = 'badge-success';
                statusClass = 'badge-success';
                text = 'white';
                icon = '<i class="fa fa-check"></i>'
                bindClickEvent = false
            } else if (steppers_[i].taskStatus.match(/Running.*/)) {
                icon_div = 'badge-warning';
                statusClass = 'badge-warning';
                icon = '<i class="fa fa-clock-o"></i>'
                bindClickEvent = false

            } else if (steppers_[i].taskStatus.match(/.*/)) {
                statusClass = 'badge-light';
                icon_div = 'badge-light';
                icon = '-'
                bindClickEvent = false

            }
            $('#load_steps_here_dashboard_two').append(`
                            <tr style="">
                                <td><div style="width:100%" class="     btn  "> `+ count + ` </div></td>
                             <td style="display: flex;width: -webkit-fill-available;">
                                    <div class="MenuNoSteps btn btn-lg     `+ icon_div + `"> ` + icon + ` </div> 
                                    
                                    <button   task-id=`+ steppers_[i].task_Id + ` project-id=` + steppers_[i].project_Id + ` type="button" id="btn-" class="btn      ` + statusClass + ` buttonMenuSteps"` + (bindClickEvent == false ? '' : 'onclick="fn_dashboard_two_Load_all_sub_task(this)"') + ` value="">` + steppers_[i].name + ` </button>
                                </td>
                            </tr>

                `)
        }
    }

    /*
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
        */
    //************************   BY |\/|ATI 

}

function fn_dashboard_two_Load_all_sub_task(e) {
    var row = $(e).closest("tr");
    var task_id_get = $(e).attr('task-id')
    task_Id = task_id_get;

    var parentTD = e.parentNode;
    var parentTR = e.parentNode;
    var currentStep = $(parentTD).children().text().trim();



    fnLoadProject_Section_SummaryDataByParamter_dashboard_two();


}
var section_Id_ = 0, task__Id = 0;
function fn_Load_Section_Details(e) {

    var row = $(e).closest("tr");

    var row = $(e).closest("tr");
    var grid_Id = $("#append-section-details").data("kendoGrid");
    var dataItem = grid_Id.dataItem(row);
    // console.log(dataItem);
    grid_Id.tbody.find(".k-state-selected").removeClass("k-state-selected");
    grid_Id.select(row);

    section_Id_ = dataItem.id;
    task_Id = dataItem.task_Id == null ? 0 : dataItem.task_Id;
    $('.sub-section-name').text(dataItem.name);

    fnLoadProject_Section_SummaryDataByParamter_dashboard_two()
}

function fnLoadProject_Section_SummaryDataByParamter_dashboard_two() {


    ajaxRequest({
        commandName: 'Project_Task_Details_By_Employee_Id', values: {
            task_Id: task_Id,
            Language: _currentLanguage
        }, CallBack: steppers__SECTION_Details_CallBack_2
    });


}







function steppers__SECTION_Details_CallBack_2(response) {

    var steppers_ = JSON.parse(response.Value);
    //   console.log(steppers_);
    var tr = '', tableData = '';

    var count = 0, statusClass = '', text = '', icon = '', icon_div = '';
    for (var i = 0; i < steppers_.length; i++) {


        count = count + 1;

        if (steppers_[i].task_status != "") {
            icon_div = 'badge-danger';
            statusClass = icon_div;
            text = 'white';
            icon = '<i class="fa fa-exclamation-circle"></i>'
        } else if (steppers_[i].status.match(/Complete.*/)) {
            icon_div = 'badge-success';
            statusClass = 'badge-success';
            text = 'white';
            icon = '<i class="fa fa-check"></i>'
        } else if (steppers_[i].status.match(/Running.*/)) {
            icon_div = 'badge-warning';
            statusClass = 'badge-warning';
            icon = '<i class="fa fa-clock-o"></i>'

        } else if (steppers_[i].status.match(/.*/)) {
            statusClass = 'badge-light';
            icon_div = 'badge-light';
            icon = '-'
        }

        tr += `  <tr style="">
                                <td><div style="width:100%" class="     btn  "> `+ count + ` </div></td>
                             <td style="display: flex;width: -webkit-fill-available;">
                                    <div class="MenuNoSteps btn btn-lg     `+ icon_div + `"> ` + icon + ` </div> 
                                    <button   task-id=`+ steppers_[i].task_Id + ` project-id=` + steppers_[i].task_Id + ` type="button" id="btn-" class="btn      ` + statusClass + ` buttonMenuSteps" onclick="fn_EmployeeTask_Details(this)" value="">` + steppers_[i].taskName + ` </button>
                                </td>
                            </tr> 
                `

    }


    Swal.fire({
        title: "Details",
        html: `</hr>    <table style="width: 385px;"> ` + tr + `</table>`,
        /*  icon: "success"*/
    });

    //************************   BY |\/|ATI 

}



function fn_EmployeeTask_Details(e) {
     
    var emptask_Id = $(e).attr('task-id');
    

    //    window.location.href = `/Project/Task/Details?id=` + dataItem.task_Id + ``;
    window.open(`/Project/Task/Details?id=` + emptask_Id, '_blank');


}


function fn_Load_Section_Sub_Details(e) {

    var row = $(e).closest("tr");
    var grid_Id = $("#append-section-sub-details").data("kendoGrid");
    var dataItem = grid_Id.dataItem(row);
    //console.log(dataItem);
    grid_Id.tbody.find(".k-state-selected").removeClass("k-state-selected");
    grid_Id.select(row);

    //    window.location.href = `/Project/Task/Details?id=` + dataItem.task_Id + ``;
    window.open(`/Project/Task/Details?id=` + dataItem.task_Id, '_blank');


}


function hideDynamicDataCard_dashboar2() {

    $('.showHide-app-dynamic-data').hide();
    $('.append-dynamic-data').empty();

    $('.showhideSection').hide();
    $('#load_steps_here_dashboard_two').empty();

}


//---------------------- FN DUMMy HTMl STEPS 
function fnGenerateDummyStepsHTML(divId) {
    var allSteps = `<table class="table-responsive" style="width: fit-content;">
                            <tbody id="load_steps_here_dashboard_two"></tbody>


                            <tbody id="load_steps_here_dashboard_two_sample" >
                                <tr style="opacity: 0.5;" disabled="disabled">
                                    <td disabled="disabled" style="opacity: 0.5;"><div style="width: 100%; opacity: 0.5;" class="     btn  " disabled="disabled"> 1 </div></td>
                                    <td style="display: flex; width: -webkit-fill-available; opacity: 0.5;" disabled="disabled">
                                        <div class="MenuNoSteps btn     badge-light" disabled="disabled" style="opacity: 0.5;"> - </div>

                                        <button task-id="null" project-id="null" type="button" id="btn-" class="btn      badge-light buttonMenuSteps" onclick="fn_dashboard_two_Load_all_sub_task(this)" value="" disabled="disabled" style="opacity: 0.5;">Government Documents </button>
                                    </td>
                                </tr>


                                <tr style="opacity: 0.5;" disabled="disabled">
                                    <td disabled="disabled" style="opacity: 0.5;"><div style="width: 100%; opacity: 0.5;" class="     btn  " disabled="disabled"> 2 </div></td>
                                    <td style="display: flex; width: -webkit-fill-available; opacity: 0.5;" disabled="disabled">
                                        <div class="MenuNoSteps btn     badge-light" disabled="disabled" style="opacity: 0.5;"> - </div>

                                        <button task-id="null" project-id="null" type="button" id="btn-" class="btn      badge-light buttonMenuSteps" onclick="fn_dashboard_two_Load_all_sub_task(this)" value="" disabled="disabled" style="opacity: 0.5;">Town Planning </button>
                                    </td>
                                </tr>


                                <tr style="opacity: 0.5;" disabled="disabled">
                                    <td disabled="disabled" style="opacity: 0.5;"><div style="width: 100%; opacity: 0.5;" class="     btn  " disabled="disabled"> 3 </div></td>
                                    <td style="display: flex; width: -webkit-fill-available; opacity: 0.5;" disabled="disabled">
                                        <div class="MenuNoSteps btn     badge-light" disabled="disabled" style="opacity: 0.5;"> - </div>

                                        <button task-id="null" project-id="null" type="button" id="btn-" class="btn      badge-light buttonMenuSteps" onclick="fn_dashboard_two_Load_all_sub_task(this)" value="" disabled="disabled" style="opacity: 0.5;">MEP Section </button>
                                    </td>
                                </tr>


                                <tr style="opacity: 0.5;" disabled="disabled">
                                    <td disabled="disabled" style="opacity: 0.5;"><div style="width: 100%; opacity: 0.5;" class="     btn  " disabled="disabled"> 4 </div></td>
                                    <td style="display: flex; width: -webkit-fill-available; opacity: 0.5;" disabled="disabled">
                                        <div class="MenuNoSteps btn     badge-light" disabled="disabled" style="opacity: 0.5;"> - </div>

                                        <button task-id="null" project-id="null" type="button" id="btn-" class="btn      badge-light buttonMenuSteps" onclick="fn_dashboard_two_Load_all_sub_task(this)" value="" disabled="disabled" style="opacity: 0.5;">Structural Section </button>
                                    </td>
                                </tr>


                                <tr style="opacity: 0.5;" disabled="disabled">
                                    <td disabled="disabled" style="opacity: 0.5;"><div style="width: 100%; opacity: 0.5;" class="     btn  " disabled="disabled"> 5 </div></td>
                                    <td style="display: flex; width: -webkit-fill-available; opacity: 0.5;" disabled="disabled">
                                        <div class="MenuNoSteps btn     badge-light" disabled="disabled" style="opacity: 0.5;"> - </div>

                                        <button task-id="null" project-id="null" type="button" id="btn-" class="btn      badge-light buttonMenuSteps" onclick="fn_dashboard_two_Load_all_sub_task(this)" value="" disabled="disabled" style="opacity: 0.5;">Municipality Section </button>
                                    </td>
                                </tr>


                                <tr style="opacity: 0.5;" disabled="disabled">
                                    <td disabled="disabled" style="opacity: 0.5;"><div style="width: 100%; opacity: 0.5;" class="     btn  " disabled="disabled"> 6 </div></td>
                                    <td style="display: flex; width: -webkit-fill-available; opacity: 0.5;" disabled="disabled">
                                        <div class="MenuNoSteps btn     badge-light" disabled="disabled" style="opacity: 0.5;"> - </div>

                                        <button task-id="null" project-id="null" type="button" id="btn-" class="btn      badge-light buttonMenuSteps" onclick="fn_dashboard_two_Load_all_sub_task(this)" value="" disabled="disabled" style="opacity: 0.5;">Supervision Contract </button>
                                    </td>
                                </tr>


                                <tr style="opacity: 0.5;" disabled="disabled">
                                    <td disabled="disabled" style="opacity: 0.5;"><div style="width: 100%; opacity: 0.5;" class="     btn  " disabled="disabled"> 7 </div></td>
                                    <td style="display: flex; width: -webkit-fill-available; opacity: 0.5;" disabled="disabled">
                                        <div class="MenuNoSteps btn     badge-light" disabled="disabled" style="opacity: 0.5;"> - </div>

                                        <button task-id="null" project-id="null" type="button" id="btn-" class="btn      badge-light buttonMenuSteps" onclick="fn_dashboard_two_Load_all_sub_task(this)" value="" disabled="disabled" style="opacity: 0.5;">Completion Document </button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
`
    $(divId).append(allSteps);
}