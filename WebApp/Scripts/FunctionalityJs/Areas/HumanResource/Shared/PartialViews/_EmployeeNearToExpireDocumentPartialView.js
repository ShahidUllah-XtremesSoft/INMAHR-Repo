var allNotificationCount = 0;
$(function () {
    var isLoggedInUserHR = JSON.parse(localStorage.getItem('User')).isHR;
    if (!isLoggedInUserHR) {
        $('#liNewToExpireDocument').css('display', 'none');
        $('#spanNotificationCount').text('0');
    }
    else {
        loadNearToExpireDocumentGrid();
    }
});

function viewNearToExpireDocumentsModalGrid() {
    $('#spanNotificationCount').text(allNotificationCount);
    $('#modalNearToExpireDocument').modal();
}
function loadNearToExpireDocumentGrid() {

    //values - are key value pair json object
    ajaxRequest({ commandName: 'HR_Employee_PersonalDocument_GetNearToExpire', values: { Language: _currentLanguage }, CallBack: loadNearToExpireDocumentGridCallBack });
}
var loadNearToExpireDocumentGridCallBack = function (inputDataJSON) {
    bindloadNearToExpireDocumentGrid(JSON.parse(inputDataJSON.Value));
}
var bindloadNearToExpireDocumentGrid = function (inputDataJSON) {
    
    allNotificationCount += inputDataJSON.length;
    $('#spanNotificationCount').text(allNotificationCount);
    $('#documentCount').text(inputDataJSON.length);
    var gridColumns = [

        { field: "employeeNumber", title: employeeNumber, width: 25, filterable: true },
        { field: "name", title: employeeName, width: 100, filterable: true },
        { field: "departmentName", title: section, width: 50, filterable: true },
        { field: "document", title: documentType, width: 50, filterable: true, hidden: false },        
        
        { field: "expiryDate", title: expiryDate, width: 30, filterable: true },
    ];

    bindKendoGrid('nearToExpireDocumentGrid', 12, gridColumns, inputDataJSON,true, 400);
};