
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
function prepareChartDataFor_ProjectCountByVIPUrgent(inputJSON){
     
//    var lables = ["All", "Urgent", "Non-Urgent", "VIP", "Non-VIP"];
    var lables = ["Urgent", "VIP"];
    var data = [];
   // data.push(inputJSON.all);
    data.push(inputJSON.urgent);
    //data.push(inputJSON.noUrgent);
    data.push(inputJSON.vip);
   // data.push(inputJSON.nonVIP);
    renderBarChart('chart-project-count-by-vip-urgent', 'Project By VIP/Urgent', lables, data);
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
}