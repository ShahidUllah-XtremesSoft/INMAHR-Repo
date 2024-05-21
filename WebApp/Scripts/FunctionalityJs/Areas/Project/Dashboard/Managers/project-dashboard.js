var loggedInUser = {};
$(function () {


    loggedInUser = JSON.parse(localStorage.getItem('User'));
    $('#employeeName').text(loggedInUser.employeeNameEng)

    fn_LoadBranches();

    fnLoadProjectStatusesByBranchId();
    fngetProejctCountByCategory();

    getClientMeetingContractorCount();
    //getIssueCountByStatus();
    //getProjectCountByStatus();
    ////renderKendoChart();
    //load_IssueGrid();
});




function fnLoadProjectStatusesByBranchId() {
    ajaxRequest({
        commandName: 'Project_Dashboard_CountByStatus_Get', values:
        {
            EmployeeId: loggedInUser.employeeId,
            UserId: loggedInUser.id,
            Role: loggedInUser.roleId,
            Branch_Id: loggedInUser.departmentId,
            Language: _currentLanguage
        }, CallBack: getProjectCountByVIPUrgentCallBack
    });
}
var getProjectCountByVIPUrgentCallBack = function (responseJSON) {
    prepareChartDataFor_ProjectCountByVIPUrgent(JSON.parse(responseJSON.Value));
}

function prepareChartDataFor_ProjectCountByVIPUrgent(inputJSON) {
    var lables = ["Urgent", "VIP"];
    var data = [];
    data.push(inputJSON.all);
    data.push(inputJSON.urgent);
    data.push(inputJSON.vip);

    $('.totalVIP').text(inputJSON.vip);
    $('.totalUrgent').text(inputJSON.urgent);
    $('.TotalActiveProjects').text(inputJSON.totalActiveProjects);
    $('.TotalTemporaryProjects').text(inputJSON.totalTemporaryProjects);
}



function fngetProejctCountByCategory() {
    ajaxRequest({
        commandName: 'Project_Dashboard_CountByCategory_Get', values:
        {
            EmployeeId: loggedInUser.employeeId,
            UserId: loggedInUser.id,
            Role: loggedInUser.roleId,
            Branch_Id: loggedInUser.departmentId,
            Language: _currentLanguage
        }, CallBack: fngetProejctCountByCategoryCallBack
    });
}
var fngetProejctCountByCategoryCallBack = function (responseJSON) {
    prepareChartDataFor_ProjectCountByCategory(JSON.parse(responseJSON.Value));
}
function prepareChartDataFor_ProjectCountByCategory(inputJSON) {
    var labels = [];
    var data = [];
    $.each(inputJSON, function (index, value) {
        labels.push(value.categoryType);
        data.push(value.count);
    });

    // renderBarChart('chart-project-count-by-category', lblProjectByCategory, labels, data);
    renderKendoChart('chart-project-count-by-category-kendo', data, labels, lblProjectByCategory);
    fnCategory_Chart(data, labels, lblProjectByCategory)

}
function getClientMeetingContractorCount() {
    ajaxRequest({
        commandName: 'Project_Dashboard_ClientMeetingContractorCount_Get', values:
        {
            EmployeeId: loggedInUser.employeeId,
            UserId: loggedInUser.id,
            Role: loggedInUser.roleId,
            Language: _currentLanguage
        }, CallBack: getClientMeetingContractorCountCallBack
    });
}
var getClientMeetingContractorCountCallBack = function (responseJSON) {
    prepareChartDataFor_ClientMeetingContractorCount(JSON.parse(responseJSON.Value));
    $('#TotalClient').text(JSON.parse(responseJSON.Value).clients);
    $('#TotalMeeting').text(JSON.parse(responseJSON.Value).meetings);
    $('#TotalContractor').text(JSON.parse(responseJSON.Value).contractors);
}
function prepareChartDataFor_ClientMeetingContractorCount(inputJSON) {
    var labels = ['Clients', 'Meetings', 'Contractors'];
    var data = [];
    data.push(inputJSON.clients)
    data.push(inputJSON.meetings)
    data.push(inputJSON.contractors)

    renderBarChart('chart-total-client-meeting-contractor', lblClientMeetingAndContractor, labels, data);
    renderKendoChart('chart-total-client-meeting-contractor-kendo', data, labels, lblClientMeetingAndContractor);
}
function getIssueCountByStatus() {
    ajaxRequest({
        commandName: 'Project_Dashboard_IssueCountByStatus_Get', values:
        {
            EmployeeId: loggedInUser.employeeId,
            UserId: loggedInUser.id,
            Role: loggedInUser.roleId,
            Language: _currentLanguage
        }, CallBack: getIssueCountByStatusCallBack
    });
}
var getIssueCountByStatusCallBack = function (responseJSON) {
    prepareChartDataFor_IssueCountByStatus(JSON.parse(responseJSON.Value));
}
function prepareChartDataFor_IssueCountByStatus(inputJSON) {
    var labels = [];
    var data = [];
    var allCount = 0;
    $.each(inputJSON, function (index, value) {
        allCount += value.count;
    });
    labels.push('All');
    data.push(allCount);
    $.each(inputJSON, function (index, value) {
        labels.push(value.status);
        data.push(value.count);
    });

    //   renderBarChart('chart-issue-count-by-status', lblIssueByStatus, labels, data);
    //  console.log(inputJSON)
    // renderKendoChart('chart-issue-count-by-status-kendo', data, labels, lblIssueByStatus);
    fnIssuesChart(inputJSON);

}

function getProjectCountByStatus() {
    ajaxRequest({
        commandName: 'Project_Dashboard_ProjectCountByStatus_Get', values:
        {
            EmployeeId: loggedInUser.employeeId,
            UserId: loggedInUser.id,
            Role: loggedInUser.roleId,
            Language: _currentLanguage
        }, CallBack: getProjectCountByStatusCallBack
    });
}
var getProjectCountByStatusCallBack = function (responseJSON) {
    prepareChartDataFor_ProjectCountByStatus(JSON.parse(responseJSON.Value));
}
function prepareChartDataFor_ProjectCountByStatus(inputJSON) {
    var labels = [];
    var data = [];
    var allCount = 0;
    $.each(inputJSON, function (index, value) {
        allCount += value.count;
    });
    labels.push('All');
    data.push(allCount);
    $.each(inputJSON, function (index, value) {
        labels.push(value.status);
        data.push(value.count);
    });
    renderBarChart('chart-project-count-by-status', lblProjectByStatus, labels, data);
    //  renderKendoChart('chart-project-count-by-status-kendo', data, labels, lblProjectByStatus);


}
function renderBarChart(divID, chartTitle, lables, data) {
    var ctx = document.getElementById(divID).getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: lables,
            datasets: [{
                label: chartTitle,
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 5
            }]
        },
        options: {
            is3D: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    });

}

/* Set chart container height */
//var data = [560, 630, 740, 910, 1170, 1380, 100, 150, 100, 100, 300];
//var chartHeight = data.length * 50;
//$("#chart").css("height", chartHeight);
function renderKendoChart(divID, data, categories, chartTitle) {
    $("#" + divID).kendoChart({
        title: {
            text: chartTitle
        },
        legend: {
            visible: true
        },
        seriesDefaults: {
            type: "column"
        },
        series: [{
            data: data,
            tooltip: {
                position: "inside"
            },
            color: function (point) {

                if (point.index == 0) {
                    return "rgb(255, 99, 88)";
                }
                else if (point.index == 1) {
                    return "rgb(255, 210, 70)";
                }
                else if (point.index == 2) {
                    return "rgb(120, 210, 55)";
                }
                else if (point.index == 3) {
                    return "rgb(40, 180, 200)";
                }
                else if (point.index == 4) {
                    return "rgb(255, 99, 88)";
                }
                else if (point.index == 5) {
                    return "rgb(255, 210, 70)";
                }
                else if (point.index == 6) {
                    return "rgb(120, 210, 55)";
                }
                else if (point.index == 7) {
                    return "rgb(40, 180, 200)";
                }
                else if (point.index == 8) {
                    return "rgb(255, 99, 88)";
                }
                else if (point.index == 9) {
                    return "rgb(255, 210, 70)";
                }
                else if (point.index == 10) {
                    return "rgb(120, 210, 55)";
                }
                else if (point.index == 11) {
                    return "rgb(40, 180, 200)";
                }

                // use the default series theme color
            }
        }],
        valueAxis: {
            //max: 400,
            line: {
                visible: false
            },
            minorGridLines: {
                visible: true
            },
            labels: {
                rotation: "auto"
            }
        },
        categoryAxis: {
            categories: categories, //["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            majorGridLines: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            template: "#= value #",

        }
    });
}

//$(document).ready(renderKendoChart);
//$(document).bind("kendo:skinChange", renderKendoChart);


function fnCategory_Chart(data, labels, lblProjectByCategory) {
    /*Pie chart*/


    var pieElem = document.getElementById("chart-category-pieChart");
    var data4 = {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: [
                "#4fc3f7",
                "#33db9e",
                "#ff8a65"
            ],
            hoverBackgroundColor: [
                "#4fc3f7",
                "#33db9e",
                "#ff8a65"
            ]
        }]
    };

    var myPieChart = new Chart(pieElem, {
        type: 'pie',
        data: data4
    });

}
// ------------- Issues Chart
function fnIssuesChart(jsonData) {

    var series = [];
    $.each(jsonData, function (index, value) {
        var colorName = '';
        if (value.status == "Completed") {
            colorName = 'green';
        } else if (value.status == "Pending") {
            colorName = 'red';
        } else if (value.status == "Re-Open") {
            colorName = 'blue';
        } else {
            colorName = '#63c2de';
        }

        series.push({ name: value.status, data: [value.count], color: colorName }
        );
    });

    $("#chart-issue-count-by-status-kendo").kendoChart({
        title: { text: lblIssueByStatus },
        legend: { visible: true },
        seriesDefaults: { type: "bar" },
        series: series,
        valueAxis: {
            max: 10,
            line: {
                visible: false
            },
            minorGridLines: {
                visible: true
            },
            labels: {
                rotation: "auto"
            }
        },

        tooltip: {
            visible: true,
            template: "#= series.name #: #= value #"
        }
    });
}

//--------------- load project sections
function fnLoadProjectSections() {

    //$('#ProjectSection').empty();
    $('.ProjectSection').toggle();
}







//------------- load ISSUE grid START  by |\/|ati

function load_IssueGrid() {
    ajaxRequest({
        commandName: 'Project_Dashboard_Issue_Get', values: {
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            LoggedInDepartmentId: JSON.parse(localStorage.getItem('User')).departmentId,
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

        { field: "issueId", title: "issueId", hidden: true },
        { field: "projectId", title: "ProjectId", hidden: true },
        { field: "employeeId", title: "EmployeeId", hidden: true },
        { field: "clientId", title: "ClientId", hidden: true },
        { field: "isRead", title: "isRead", hidden: true },
        { field: "employeeId", title: "EmployeeId", hidden: true },
        {
            title: "#", template: "<b>#= ++record #</b>", width: 30,

        },

        {
            field: "projectNumber", title: lblProjectNo, width: 150, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "#if(isRead == false){#  <a style='cursor:pointer;text-decoration:underline;color:blue;font-weight:bold;'  class='viewbutton' onClick= fnDetailById(this)  title=''>#=projectNumber#</a>  #} " +
                " else {# <a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fn_IssueGridDetailById(this)  title=''>#=projectNumber#</a> #}#",
        },
        {
            field: "departmentName", title: lblSection, width: 150, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
            , template: "#if(isRead == false){#<div style='font-weight:bold;' >#=departmentName#</div> #} else {#<div  class='viewbutton'>#=departmentName#</div>#}#",
        },
        {
            field: "employeeName", title: lblAssignTo, hidden: false, width: 250, template: "<span class=''>#:employeeName#</span>", filterable: { cell: { operator: "contains", suggestionOperator: "contains" } }
        },
        {
            field: "issueDate", title: lblStartDate, hidden: false, width: 100, template: "<span class=''>#:issueDate#</span>", filterable: false
        },

        {
            field: "status", title: lblStatus, width: 110, filterable: false
            , template: "#if (status == 'Pending')" +
                " { # <span class='badge badge-danger'>#:status#</span> # }" +
                " else if(status == 'Completed') " +
                "{# <span class='badge badge-success'>#:status#</span> # } else " +
                "{# <span class='badge badge-primary'>#:status#</span> # }#"

        }, {
            field: "issueRemarks", title: lblRemarks, hidden: false, width: 550, template: "<span class=''>#:issueRemarks#</span>", filterable: false
        },
        {
            field: "", width: 30, title: ' ', hidden: true,
            template: "" +
                "#if(createdBy == " + JSON.parse(localStorage.getItem('User')).id + "){#" +
                //"<a style='cursor:pointer; font-size:20px;' onClick= detailClient(this) title='View Client Detail' ><span class='fa fa-eye'></span></a>" +
                " <a style='font-size:20px;cursor:pointer;' onClick= fneditById(this) title=" + lblEdit + " ><span class='fa fa-pencil'></span></a> " +
                " <a style='font-size:20px;cursor:pointer;' onClick= fndeleteById(this)  title=" + lblDelete + "><span class='fa fa-trash'></span></a>  "
                + "#}#"
        },



    ];

    bindKendoGrid("issue-grid", 200, gridColumns, inputDataJSON, true, 400);
};
function fn_IssueGridDetailById(e) {
    var row = $(e).closest("tr");
    var grid = $("#issue-grid").data("kendoGrid");
    var dataItem = grid.dataItem(row);


    window.location.href = '/Project/Issue/Details?id=' + dataItem.issueId + '';

}

//------------- load ISSUE grid END by |\/|ati




// ------------------- LOAD BRANCHES DDL 
function fn_LoadBranches() {
    ajaxRequest({
        commandName: 'Branches_DDL', values:
        {
            Branch_Id: loggedInUser.departmentId,
            EmployeeId: loggedInUser.employeeId,
            UserId: loggedInUser.id,
            RoleId: loggedInUser.roleId,
            Language: _currentLanguage
        }, CallBack: fn_LoadBranches_Callback
    });
}
var fn_LoadBranches_Callback = function (responseJSON) {
    $("#BranchDDL").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(responseJSON.Value),
        change: function (e) {
            var selected_Id = this.value();

            loggedInUser.departmentId = selected_Id
            fnLoadProjectStatusesByBranchId();
            fngetProejctCountByCategory();

            fn_Load_Summary_Projects_Grid();

            fn_Load_Grid_With_Tasks();
            fn_Load_Project_Document_expiry();
            //getClientMeetingContractorCount();
            //getIssueCountByStatus();
            //getProjectCountByStatus(); 
            //load_IssueGrid();


        },
    });

}