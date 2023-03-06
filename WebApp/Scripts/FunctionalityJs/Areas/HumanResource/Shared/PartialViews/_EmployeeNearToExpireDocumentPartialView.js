var allNotificationCount = 0;
var isLoggedInUserHR = JSON.parse(localStorage.getItem('User')).isHR;
$(function () {

    if (isLoggedInUserHR == false) {
        // $('#liNewToExpireDocument').css('display', 'none');
        $('#liNewToExpireCompanyDocument').css('display', 'none');
        // $('#spanNotificationCount').text('0');
        loadNearToExpireDocumentGrid();
    }
    else {
        loadNearToExpireDocumentGrid();
        // loadNearToExpireCompanyDocumentGrid();

        loadNearToExpireCompanyDocumentGridCount();
    }
});

function viewNearToExpireDocumentsModalGrid(e) {

    $('#spanNotificationCount').text(allNotificationCount);
    if (e == 'EmployeeDocument') {

        $('#modalNearToExpireDocument').modal();
        setTimeout(function () {

            var nearToExpireDocumentGridd = $("#nearToExpireDocumentGrid").data("kendoGrid");
            nearToExpireDocumentGridd.refresh();   
            nearToExpireDocumentGridd.dataSource.read();
            nearToExpireDocumentGridd.resize();
        }, 300)
    } else if (e == 'CompanyDocument') {

        $("#load-company-document-partial-view").load("/CompanyDocument/LoadCompanyDocument");


    }
}


function loadNearToExpireDocumentGrid() {

    //values - are key value pair json object
    if (isLoggedInUserHR == true) {
        ajaxRequest({ commandName: 'HR_Employee_PersonalDocument_GetNearToExpire', values: { Language: _currentLanguage }, CallBack: loadNearToExpireDocumentGridCallBack });
    } else {
        ajaxRequest({
            commandName: 'HR_Employee_PersonalDocument_GetNearToExpire_ById',
            values: {
                EmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
                EmployeeDepartmentId: JSON.parse(localStorage.getItem('User')).employeeDepartmentId,
                EmployeeRoleId: JSON.parse(localStorage.getItem('User')).roleId,
                Language: _currentLanguage
            }, CallBack: loadNearToExpireDocumentGridCallBack
        });
    }
}
var loadNearToExpireDocumentGridCallBack = function (inputDataJSON) {
    bindloadNearToExpireDocumentGrid(JSON.parse(inputDataJSON.Value));
}
var bindloadNearToExpireDocumentGrid = function (inputDataJSON) {

    allNotificationCount += inputDataJSON.length;
    $('#spanNotificationCount').text(allNotificationCount);
    $('#documentCount').text(inputDataJSON.length);
    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 20, },

        {
            field: "employeeNumber", title: employeeNumber, width: 50, filterable: true
            , template: "<a style='cursor:pointer;text-decoration:underline;color:blue;'  class='viewbutton' onClick= fnLoadDetailScreen(this)  '>#=employeeNumber#</a> ",

        },
        { field: "name", title: employeeName, width: 100, filterable: true },
        { field: "departmentName", title: section, width: 50, filterable: true },
        { field: "document", title: documentType, width: 50, filterable: true, hidden: false },

        //{ field: "expiryDate", title: expiryDate, width: 30, filterable: true },
        {
            field: "expiryDate", title: expiryDate, width: 50, filterable: true
            , template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>#:expiryDate#</span> # } else " +
                "if (totalDays <= 29) { # <span class='badge badge-warning'>#:expiryDate#</span> # } else" +
                "{# <span class='badge badge-success'>#:expiryDate#</span> # }#"
        },
        {
            field: "totalDays", title: lblExpiresIn, width: 50, filterable: false,
            //  template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>#:totalDays#</span> # } else {# <span class='badge badge-success'>#:totalDays#</span> # }#"
            template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>#:totalDays#</span> # } else " +
                "if (totalDays <= 29) { # <span class='badge badge-warning'>#:totalDays#</span> # } else" +
                "{# <span class='badge badge-success'>#:totalDays#</span> # }#"

        },
        {
            field: "", title: lblStatus, width: 50, filterable: false,
            //   template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>" + lblStatusExpired + "</span> # } else {# <span class='badge badge-success'>" + lblStatusValid + "</span> # }#"
            template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>" + lblStatusExpired + "</span> # } else " +
                "if (totalDays <= 29) { # <span class='badge badge-warning'>" + lblStatusValid + "</span> # } else" +
                "{# <span class='badge badge-success'>" + lblStatusValid + "</span> # }#"
        },

    ];


    bindKendoGrid('nearToExpireDocumentGrid', 20, gridColumns, inputDataJSON, true, 550);

};


//----------------- COMPANY DOUCMENT NOTIFICATION ALERT
function loadNearToExpireCompanyDocumentGridCount() {

    //values - are key value pair json object
    ajaxRequest({ commandName: 'HR_CompanyDocuments_GetNearToExpire', values: { Language: _currentLanguage }, CallBack: loadNearToExpireCompanyDocumentGridCallBack });
}
var loadNearToExpireCompanyDocumentGridCallBack = function (inputDataJSON) { bindloadNearToExpireCompanyDocumentGrid(JSON.parse(inputDataJSON.Value)); }
var bindloadNearToExpireCompanyDocumentGrid = function (inputDataJSON) {

    allNotificationCount += inputDataJSON.length;
    $('#spanNotificationCount').text(allNotificationCount);
    $('#companyDocumentCount').text(inputDataJSON.length);

};
function fnLoadDetailScreen(e) {
    var row = $(e).closest("tr");
    var grid = $("#nearToExpireDocumentGrid").data("kendoGrid");
    var dataItem = grid.dataItem(row);


    localStorage.setItem('EmployeeNumber', dataItem.employeeNumber);
    localStorage.setItem('LoggedInEmployeeId', dataItem.id);
    localStorage.setItem('EmployeeIdToLoadLeaveBalance', dataItem.id);

    window.location.href = '/HumanResource/Employee/Detail/';
}
