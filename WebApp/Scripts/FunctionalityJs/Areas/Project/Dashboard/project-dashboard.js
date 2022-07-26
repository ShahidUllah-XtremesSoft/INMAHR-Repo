
$(function () {
    ajaxRequest({
        commandName: 'Project_Dashboard_CountByStatus_Get', values:
        {
            EmployeeId:0,
            UserId:0,    
            Role: 0,            
            Language: _currentLanguage
        }, CallBack: getProjectCountByVIPUrgentCallBack
    });
    getProejctCountByCategory();
    getClientMeetingContractorCount();
    getIssueCountByStatus();
    getProjectCountByStatus();
});
var getProjectCountByVIPUrgentCallBack = function (responseJSON) {
    prepareChartDataFor_ProjectCountByVIPUrgent(JSON.parse(responseJSON.Value));
}
<<<<<<< Updated upstream
function prepareChartDataFor_ProjectCountByVIPUrgent(inputJSON){
<<<<<<< HEAD
     
//    var lables = ["All", "Urgent", "Non-Urgent", "VIP", "Non-VIP"];
    var lables = ["Urgent", "VIP"];
=======
    var lables = ["All", "Urgent", "Non-Urgent", "VIP", "Non-VIP"];
>>>>>>> parent of 094aae5 (Project Dashboard - Changes)
=======
function prepareChartDataFor_ProjectCountByVIPUrgent(inputJSON) {
    var lables = [ "Urgent", "VIP"];
  //  var lables = ["All", "Urgent", "Non-Urgent", "VIP", "Non-VIP"];
>>>>>>> Stashed changes
    var data = [];
  //  data.push(inputJSON.all);
    data.push(inputJSON.ugent);
    //data.push(inputJSON.noUrgent);
    data.push(inputJSON.vip);
<<<<<<< Updated upstream
<<<<<<< HEAD
   // data.push(inputJSON.nonVIP);
=======
    data.push(inputJSON.nonVIP);
>>>>>>> parent of 094aae5 (Project Dashboard - Changes)
=======
    //data.push(inputJSON.nonVIP);
>>>>>>> Stashed changes
    renderBarChart('chart-project-count-by-vip-urgent', 'Project By VIP/Urgent', lables, data);
    //renderBarChart('chart-project-count-by-vip-urgent', lblProjectByVIPUrgent, lables, data);
    renderKendoChart('chart-project-count-by-vip-urgent-kendo', data, lables, lblProjectByVIPUrgent)
}
function getProejctCountByCategory() {    
    ajaxRequest({
        commandName: 'Project_Dashboard_CountByCategory_Get', values:
        {
            EmployeeId: 0,
            UserId: 0,
            Role: 0,
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
    renderBarChart('chart-project-count-by-category', 'Project By Category', labels, data);

    
}
function getClientMeetingContractorCount() {
    ajaxRequest({
        commandName: 'Project_Dashboard_ClientMeetingContractorCount_Get', values:
        {
            EmployeeId: 0,
            UserId: 0,
            Role: 0,
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
    var labels = ['Clients','Meetings', 'Contractors'];
    var data = [];
    data.push(inputJSON.clients)
    data.push(inputJSON.meetings)
    data.push(inputJSON.contractors)
    
    renderBarChart('chart-total-client-meeting-contractor', 'Client, Meeting & Contractor', labels, data);
}
function getIssueCountByStatus() {
    ajaxRequest({
        commandName: 'Project_Dashboard_IssueCountByStatus_Get', values:
        {
            EmployeeId: 0,
            UserId: 0,
            Role: 0,
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
    renderBarChart('chart-issue-count-by-status', 'Issue By Status', labels, data);


}

function getProjectCountByStatus() {
    ajaxRequest({
        commandName: 'Project_Dashboard_ProjectCountByStatus_Get', values:
        {
            EmployeeId: 0,
            UserId: 0,
            Role: 0,
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
    renderBarChart('chart-project-count-by-status', 'Project By Status', labels, data);


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
                borderWidth: 1
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
<<<<<<< Updated upstream
}
=======
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
>>>>>>> Stashed changes
