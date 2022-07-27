var loggedInUser = {};
$(function () {

    loggedInUser = JSON.parse(localStorage.getItem('User'));
    ajaxRequest({
        commandName: 'Project_Dashboard_CountByStatus_Get', values:
        {
            EmployeeId: loggedInUser.employeeId,
            UserId: loggedInUser.id,
            Role: loggedInUser.roleId,
            Language: _currentLanguage
        }, CallBack: getProjectCountByVIPUrgentCallBack
    });
    getProejctCountByCategory();
    getClientMeetingContractorCount();
    getIssueCountByStatus();
    getProjectCountByStatus();
    fnLoadProjectandSectionCount();
    //renderKendoChart();
});

var getProjectCountByVIPUrgentCallBack = function (responseJSON) {
    prepareChartDataFor_ProjectCountByVIPUrgent(JSON.parse(responseJSON.Value));
}
function prepareChartDataFor_ProjectCountByVIPUrgent(inputJSON) {

    //  var lables = ["All", "Urgent", "Non-Urgent", "VIP", "Non-VIP"];
    var lables = ["All", "Urgent", "VIP"];
    var data = [];
    data.push(inputJSON.all);
    data.push(inputJSON.urgent);
    //data.push(inputJSON.noUrgent);
    data.push(inputJSON.vip);
    //  data.push(inputJSON.nonVIP);
    //renderBarChart('chart-project-count-by-vip-urgent', lblProjectByVIPUrgent, lables, data);
    renderKendoChart('chart-project-count-by-vip-urgent-kendo', data, lables, lblProjectByVIPUrgent)
}
function getProejctCountByCategory() {
    ajaxRequest({
        commandName: 'Project_Dashboard_CountByCategory_Get', values:
        {
            EmployeeId: loggedInUser.employeeId,
            UserId: loggedInUser.id,
            Role: loggedInUser.roleId,
            Language: _currentLanguage
        }, CallBack: getProejctCountByCategoryCallBack
    });
}
var getProejctCountByCategoryCallBack = function (responseJSON) {
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




//------------- load Project and main section count  by /\/\ati

function fnLoadProjectandSectionCount() {
    ajaxRequest({
        commandName: 'Project_Dashboard_ProjectAndSectionCount_Get', values:
        {
            EmployeeId: loggedInUser.employeeId,
            UserId: loggedInUser.id,
            Role: loggedInUser.roleId,
            ProjectId: 0
            , DesignSectionId: 0
            , TechnicalSection: 0
            , SupervisionSection: 0
            , Language: _currentLanguage
        }, CallBack: fnLoadProjectandSectionCountCallBack
    });
}
var fnLoadProjectandSectionCountCallBack = function (responseJSON) {
    var projectData = JSON.parse(responseJSON.Value);

    $('#TotalProjectCount').text(projectData[0].projectCount);
    $('#ProjectDesignSectionCount').text(projectData[0].designSectionCount);
    $('#ProjectTechnicalSectionCount').text(projectData[0].technicalSectionCount);
    $('#ProjectSupervisionSectionCount').text(projectData[0].supervisionSectionCount);
}

function fnLoadSectionAllDocument(sectionName) {
    localStorage.setItem('ProjectSectionNameInDashboard', sectionName);

    $("#load-project-subsection-record-by-section-partial-view").load("/Project/Dashboard/LoadProjectSubSectionRecordBySection");

     
}
 