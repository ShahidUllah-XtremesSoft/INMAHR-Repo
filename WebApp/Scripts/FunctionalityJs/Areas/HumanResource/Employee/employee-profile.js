//var LeaveRequestGrid = 'LeaveRequestGrid';
//var ShortLeaveRequestGrid = "ShortLeaveRequestGrid";
var RequestGrid = 'RequestGrid';
var LoginUserID = '';
var CreatedBy = '';
$(function () {
    $('#Language').val(_currentLanguage);
    //var $document_grid = "document-grid";
    $('#LoggedInUserId').val(JSON.parse(localStorage.getItem('User')).id);
  
    

    //var LeaveRequestGrid = "LeaveRequestGrid";
    loadEmployeeProfile();
    
    //| Buttons Click Events
    var gridColumns = [];
    //$('#btnLeaveRequestTab').click(function () {
    //    $(this).removeClass('btn-dark').addClass('btn-primary');
    //    $('#btnLetterRequestTab').removeClass('btn-primary').addClass('btn-dark');
    //    $('#btnShortLeaveRequestTab').removeClass('btn-primary').addClass('btn-dark');

        
    //    loadLeaveRequestGrid();
    //})
    //$('#btnShortLeaveRequestTab').click(function () {
    //    $(this).removeClass('btn-dark').addClass('btn-primary');
    //    $('#btnLeaveRequestTab').removeClass('btn-primary').addClass('btn-dark');
    //    $('#btnLetterRequestTab').removeClass('btn-primary').addClass('btn-dark');
    //    loadShortLeaveGrid();
    //})
    //$('#btnLetterRequestTab').click(function () {
    //    $(this).removeClass('btn-dark').addClass('btn-primary');
    //    $('#btnLeaveRequestTab').removeClass('btn-primary').addClass('btn-dark');
    //    $('#btnShortLeaveRequestTab').removeClass('btn-primary').addClass('btn-dark');
    //    loadLetterRequestGrid();
    //})
});
//|Load Employee Profile Starts
function loadEmployeeProfile() {
    var employeeNumber = JSON.parse(localStorage.getItem('User')).employeeNumber; //localStorage.getItem('EmployeeNumber');
    ajaxRequest({ commandName: 'HR_Employee_GetByNumber', values: { Language: _currentLanguage, EmployeeNumber: employeeNumber}, CallBack: loadEmployeeProfileCallBack });    
}
function loadEmployeeProfileCallBack(response) {
    $('#CreatedBy').val(JSON.parse(response.Value).id);    
    $('#EmployeeId').val(JSON.parse(response.Value).employeeId);
    $.each(JSON.parse(response.Value), function (key, value) {        
        $('#' + capitalizeFirstLetter(key)).text(value);
    });
    if (JSON.parse(response.Value).currentFileName != null) {
        var profileImage = '/UploadFile/' + JSON.parse(response.Value).currentFileName;
        $('#ProfileImage').attr('src', profileImage);        
    }
    
    //loadLeaveRequestGrid();
    loadPersonalDocumentsGrid();
    loadEducationalDocumentsGrid();
    loadEmployeeAnnualLeaveBalanceDeductionGrid();
    loadEmployeeVacationLeaveBalanceGrid();
    //loadShortLeaveGrid();
}

////|Load Employee Profile Ends

////|Load Leave Request Grid Starts
//function loadLeaveRequestGrid() {
 
//    var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
//    ajaxRequest({ commandName: 'Request_Leave_Get', values: { Id: $('#Id').val(), CreatedBy: $('#CreatedBy').val(), LoggedInUserId: loggedInUserDetail.id, LoggedInUserRoleId: loggedInUserDetail.roleId, LoggedInUserDepartementId: loggedInUserDetail.departmentId, Language: _currentLanguage }, CallBack: loadLeaveRequestGridCallBack });

//}
//var loadLeaveRequestGridCallBack = function (inputDataJSON) {
//    bindLeaveRequestGrid(JSON.parse(inputDataJSON.Value));
//}
//var bindLeaveRequestGrid = function (inputDataJSON) {
    
//    var isHidden = inputDataJSON.length  > 0 ? !inputDataJSON[0].isApproverExist : 0;
//    var gridColumns = [
//        { field: "id", title: "id", hidden: true },        
//        { field: "leaveType", title: "Leave Type", hidden: false, width: 20 },
//        { field: "startDate", title: "Start Date", hidden: false, width: 20 },
//        { field: "endDate", title: "End Date", hidden: false, width: 20 },
//        { field: "totalDays", title: "Days", hidden: false, width: 15 },
//        { field: "leaveTypeId", title: "leaveTypeId", hidden: true, width: 30 },
//        { field: "statusId", title: "StatusId", hidden: true, width: 30 },        
//        {
//            title: 'Status',
//            field: 'status',
//            width:35,
//            hidden:false,
//            //template: 1 == 1 ? "<span class='badge badge-success'>#:status#</span>" : "<span class='badge badge-danger'>#:status#</span>"
//            template: "#if (status.substring(0,7) == 'Decline') { # <span class='badge badge-danger'>#:status#</span> # } else if(status == 'Pending') {# <span class='badge badge-primary'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
//        },
//        {
//            'title': 'Action',
//            'field': 'isApproverExist',
//            'width': 35,
//            //'hidden': false,//'#if(1 == 1) {# false # }  else {# false #}#',
//            hidden: isHidden,
//            'template': '<button class="btn btn-success btn-sm" value="Accept" onClick= approveLeave(this);><i class="fa fa-check"></i>Accept</button><button class="btn btn-danger btn-sm" value="Reject" onClick= declineLeave(this);><i class="fa fa-ban"></i>Decline</button>'
//        },
        
//    ];    
//    $('#RequestGrid').html('');
//    bindKendoGrid(RequestGrid, 50, gridColumns, inputDataJSON, true,300);
//    //bindKendoGrid('LeaveRequestGrid', 50, gridColumns, inputDataJSON, true,300);    
//};
//function approveLeave(event) {
//    var row = $(event).closest("tr");
//    var grid = $("#" + RequestGrid).data("kendoGrid");
//    var dataItem = grid.dataItem(row);
//    Swal.fire({
//        title: 'Approve?',
//        text: "Do you really want to approve this leave",
//        //input: 'text',
//        icon: 'question',
//        showCancelButton: true,
//        confirmButtonColor: '#5cb85c',
//        cancelButtonColor: '#d9534f',
//        confirmButtonText:'Yes Approve',
//        cancelButtonText:'No, Cancel',
//        buttons: {
//            cancel: {
//                text: "No",
//                value: null,
//                visible: true,
//                className: "btn btn-danger",
//                closeModal: true
//            },
//            confirm: {
//                text: "Yes",
//                value: true,
//                visible: true,
//                className: "btn btn-warning",
//                closeModal: true                
//            }
//        }
//    }).then(function (restult) {
//        if (restult.value) {
 
//            var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
//            ajaxRequest({ commandName: 'Request_Leave_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, CreatedBy: $('#CreatedBy').val(), Status: 'Approved', Language: _currentLanguage }, CallBack: approveLeaveCallBack });
//            //Aprove leave logic here
//            //alert(JSON.stringify(dataItem));
//            //alert(JSON.stringify( JSON.parse(localStorage.getItem('User'))));
//        }
//    });
//    var approveLeaveCallBack = function (response) {
//        loadLeaveRequestGrid();
//        swal(response.Value);
        
//    }
    
//}
//function declineLeave(event) {
//    var row = $(event).closest("tr");
//    var grid = $("#" + RequestGrid).data("kendoGrid");
//    var dataItem = grid.dataItem(row);
//    Swal.fire({
//        title: 'Reject?',
//        text: "Do you really want to decline this leave",
//        //input: 'text',
//        icon: 'question',
//        showCancelButton: true,
//        confirmButtonColor: '#5cb85c',
//        cancelButtonColor: '#d9534f',
//        confirmButtonText: 'Yes Approve',
//        cancelButtonText: 'No, Cancel',
//        buttons: {
//            cancel: {
//                text: "No",
//                value: null,
//                visible: true,
//                className: "btn btn-danger",
//                closeModal: true
//            },
//            confirm: {
//                text: "Yes",
//                value: true,
//                visible: true,
//                className: "btn btn-warning",
//                closeModal: true
//            }
//        }
//    }).then(function (restult) {
//        if (restult.value) {
//            //ajaxRequest({ commandName: 'HR_Employee_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteEmployeeByIdCallBack });
//            //Aprove leave logic here
//            //alert(JSON.stringify(dataItem));
//            debugger;
//            var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
//            ajaxRequest({ commandName: 'Request_Leave_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, CreatedBy: $('#CreatedBy').val(), Status: 'Decline', Language: _currentLanguage }, CallBack: declineLeaveCallBack });

//        }
//    });
//    var declineLeaveCallBack = function (response) {
//        loadLeaveRequestGrid();
//        swal(response.Value);
        
//    }   

//}
////|Load Leave Request Grid Ends

////|Load Short Leave Request Grid Starts
//function loadShortLeaveGrid() {

//    ajaxRequest({ commandName: 'Request_ShortLeave_Get', values: { Id: $('#Id').val(), CreatedBy: $('#CreatedBy').val(), LoggedInUserId: JSON.parse(localStorage.getItem('User')).id, LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId, LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId, Language: _currentLanguage }, CallBack: loadShortLeaveGridCallBack });

//}
//var loadShortLeaveGridCallBack = function (inputDataJSON) {
//    bindShortLeaveGrid(JSON.parse(inputDataJSON.Value));
//}
//var bindShortLeaveGrid = function (inputDataJSON) {
//    var isHidden = inputDataJSON.length > 0 ? !inputDataJSON[0].isApproverExist : 0;
//    var gridColumns = [
//        { field: "id", title: "id", hidden: true },
//        { field: "requestDate", title: "Date", hidden: false, width: 20 },
//        { field: "startTime", title: "Start Time", hidden: false, width: 20 },
//        { field: "endTime", title: "End Time", hidden: false, width: 20 },
//        { field: "numberOfHours", title: "Hours", hidden: false, width: 15 },
//        { field: "statusId", title: "StatusId", hidden: true, width: 30 },        
//        {
//            title: 'Status',
//            field: 'status',
//            width: 35,
//            hidden: false,            
//            template: "#if (status.substring(0,7) == 'Decline') { # <span class='badge badge-danger'>#:status#</span> # } else if(status == 'Pending') {# <span class='badge badge-primary'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
//        },
//        //Below is action column
//        {
//            'title': 'Action',
//            'field': 'isApproverExist',
//            'width': 35,
//            //'hidden': false,//'#if(1 == 1) {# false # }  else {# false #}#',
//            hidden: isHidden,
//            'template': '<button class="btn btn-success btn-sm" value="Accept" onClick= approveShortLeave(this);><i class="fa fa-check"></i>Accept</button><button class="btn btn-danger btn-sm" value="Reject" onClick= declineShortLeave(this);><i class="fa fa-ban"></i>Decline</button>'
//        },


//    ];
//    $('#RequestGrid').html('');
//    bindKendoGrid('RequestGrid', 50, gridColumns, inputDataJSON, true,300);
//    //bindKendoGrid(ShortLeaveRequestGrid, 50, gridColumns, inputDataJSON, true,300);

//};
//function approveShortLeave(event) {
//    var row = $(event).closest("tr");
//    var grid = $("#" + RequestGrid).data("kendoGrid");
//    var dataItem = grid.dataItem(row);
//    Swal.fire({
//        title: 'Approve?',
//        text: "Do you really want to approve this leave",
//        //input: 'text',
//        icon: 'question',
//        showCancelButton: true,
//        confirmButtonColor: '#5cb85c',
//        cancelButtonColor: '#d9534f',
//        confirmButtonText: 'Yes Approve',
//        cancelButtonText: 'No, Cancel',
//        buttons: {
//            cancel: {
//                text: "No",
//                value: null,
//                visible: true,
//                className: "btn btn-danger",
//                closeModal: true
//            },
//            confirm: {
//                text: "Yes",
//                value: true,
//                visible: true,
//                className: "btn btn-warning",
//                closeModal: true
//            }
//        }
//    }).then(function (restult) {
//        if (restult.value) {
//            debugger;
//            var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
//            ajaxRequest({ commandName: 'Request_ShortLeave_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, CreatedBy: $('#CreatedBy').val(), Status: 'Approved', Language: _currentLanguage }, CallBack: approveShortLeaveCallBack });
//            //Aprove leave logic here
//            //alert(JSON.stringify(dataItem));
//            //alert(JSON.stringify( JSON.parse(localStorage.getItem('User'))));
//        }
//    });
//    var approveShortLeaveCallBack = function (response) {
//        loadShortLeaveGrid();
//        swal(response.Value);

//    }

//}
//function declineShortLeave(event) {
//    var row = $(event).closest("tr");
//    var grid = $("#" + RequestGrid).data("kendoGrid");
//    var dataItem = grid.dataItem(row);
//    Swal.fire({
//        title: 'Reject?',
//        text: "Do you really want to decline this leave",
//        //input: 'text',
//        icon: 'question',
//        showCancelButton: true,
//        confirmButtonColor: '#5cb85c',
//        cancelButtonColor: '#d9534f',
//        confirmButtonText: 'Yes Approve',
//        cancelButtonText: 'No, Cancel',
//        buttons: {
//            cancel: {
//                text: "No",
//                value: null,
//                visible: true,
//                className: "btn btn-danger",
//                closeModal: true
//            },
//            confirm: {
//                text: "Yes",
//                value: true,
//                visible: true,
//                className: "btn btn-warning",
//                closeModal: true
//            }
//        }
//    }).then(function (restult) {
//        if (restult.value) {
//            debugger;
            
//            //Aprove leave logic here
//            //alert(JSON.stringify(dataItem));
            
//            var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
//            ajaxRequest({ commandName: 'Request_ShortLeave_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, CreatedBy: $('#CreatedBy').val(), Status: 'Decline', Language: _currentLanguage }, CallBack: declineShortLeaveCallBack });

//        }
//    });
//    var declineShortLeaveCallBack = function (response) {
//        loadShortLeaveGrid();
//        swal(response.Value);

//    }

//}

////|Load Short Leave Request Grid Ends

////|Load Short Leave Request Grid Starts
//function loadLetterRequestGrid() {

//    ajaxRequest({ commandName: 'Request_Letter_Get', values: { Id: $('#Id').val(), CreatedBy: $('#CreatedBy').val(), LoggedInUserId: JSON.parse(localStorage.getItem('User')).id, LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId, LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId, Language: _currentLanguage }, CallBack: loadLetterRequestGridCallBack });

//}
//var loadLetterRequestGridCallBack = function (inputDataJSON) {
//    bindLetterRequestGridCallBack(JSON.parse(inputDataJSON.Value));
//}
//var bindLetterRequestGridCallBack = function (inputDataJSON) {
//    var isHidden = inputDataJSON.length > 0 ? !inputDataJSON[0].isApproverExist : 0;
//    var gridColumns = [
//        { field: "id", title: "id", hidden: true },
//        { field: "LetterTypeId", title: "LetterTypeId", hidden: true },
//        { field: "letterType", title: "Letter Type", hidden: false, width: 30 },
//        { field: "note", title: "Note", hidden: false, width: 60 },
//        { field: "other", title: "Comment", hidden: false, width: 30 },
//        { field: "statusId", title: "StatusId", hidden: true, width: 30 },
//        //{ field: "status", title: "Status", hidden: false, width: 30 }
//        {
//            title: 'Status',
//            field: 'status',
//            width: 35,
//            hidden: false,
//            template: "#if (status.substring(0,7) == 'Decline') { # <span class='badge badge-danger'>#:status#</span> # } else if(status == 'Pending') {# <span class='badge badge-primary'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
//        },
//        //Below is action column
//        {
//            'title': 'Action',
//            'field': 'isApproverExist',
//            'width': 35,
//            //'hidden': false,//'#if(1 == 1) {# false # }  else {# false #}#',
//            hidden: isHidden,
//            'template': '<button class="btn btn-success btn-sm" value="Accept" onClick= approveLetterRequest(this);><i class="fa fa-check"></i>Accept</button><button class="btn btn-danger btn-sm" value="Reject" onClick= declineLetterRequest(this);><i class="fa fa-ban"></i>Decline</button>'
//        }       

//    ];
//    $('#RequestGrid').html('');
//    bindKendoGrid(RequestGrid, 50, gridColumns, inputDataJSON, true, 300);
//    //bindKendoGrid(ShortLeaveRequestGrid, 50, gridColumns, inputDataJSON, true,300);

//};
//function approveLetterRequest(event) {
//    var row = $(event).closest("tr");
//    var grid = $("#" + RequestGrid).data("kendoGrid");
//    var dataItem = grid.dataItem(row);
//    Swal.fire({
//        title: 'Approve?',
//        text: "Do you really want to approve this leave",
//        //input: 'text',
//        icon: 'question',
//        showCancelButton: true,
//        confirmButtonColor: '#5cb85c',
//        cancelButtonColor: '#d9534f',
//        confirmButtonText: 'Yes Approve',
//        cancelButtonText: 'No, Cancel',
//        buttons: {
//            cancel: {
//                text: "No",
//                value: null,
//                visible: true,
//                className: "btn btn-danger",
//                closeModal: true
//            },
//            confirm: {
//                text: "Yes",
//                value: true,
//                visible: true,
//                className: "btn btn-warning",
//                closeModal: true
//            }
//        }
//    }).then(function (restult) {
//        if (restult.value) {
//            debugger;
//            var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
//            ajaxRequest({ commandName: 'Request_LetterRequest_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, CreatedBy: $('#CreatedBy').val(), Status: 'Approved', Language: _currentLanguage }, CallBack: approveShortLeaveCallBack });
//            //Aprove leave logic here
//            //alert(JSON.stringify(dataItem));
//            //alert(JSON.stringify( JSON.parse(localStorage.getItem('User'))));
//        }
//    });
//    var approveShortLeaveCallBack = function (response) {
//        loadShortLeaveGrid();
//        swal(response.Value);

//    }

//}
//function declineLetterRequest(event) {
//    var row = $(event).closest("tr");
//    var grid = $("#" + RequestGrid).data("kendoGrid");
//    var dataItem = grid.dataItem(row);
//    Swal.fire({
//        title: 'Reject?',
//        text: "Do you really want to decline this leave",
//        //input: 'text',
//        icon: 'question',
//        showCancelButton: true,
//        confirmButtonColor: '#5cb85c',
//        cancelButtonColor: '#d9534f',
//        confirmButtonText: 'Yes Approve',
//        cancelButtonText: 'No, Cancel',
//        buttons: {
//            cancel: {
//                text: "No",
//                value: null,
//                visible: true,
//                className: "btn btn-danger",
//                closeModal: true
//            },
//            confirm: {
//                text: "Yes",
//                value: true,
//                visible: true,
//                className: "btn btn-warning",
//                closeModal: true
//            }
//        }
//    }).then(function (restult) {
//        if (restult.value) {
//            debugger;

//            //Aprove leave logic here
//            //alert(JSON.stringify(dataItem));

//            var loggedInUserDetail = JSON.parse(localStorage.getItem('User'));
//            ajaxRequest({ commandName: 'Request_LetterRequest_ApproveOrDecline', values: { LoggedInUser: loggedInUserDetail.id, LoggedInUserDepartmentId: loggedInUserDetail.departmentId, RoleId: loggedInUserDetail.roleId, RequestId: dataItem.id, CreatedBy: $('#CreatedBy').val(), Status: 'Decline', Language: _currentLanguage }, CallBack: declineShortLeaveCallBack });

//        }
//    });
//    var declineShortLeaveCallBack = function (response) {
//        loadShortLeaveGrid();
//        swal(response.Value);

//    }

//}

//|Load Short Leave Request Grid Ends

//Employee Personal Document
function loadPersonalDocumentsGrid() {
    ajaxRequest({ commandName: 'HR_Employee_PersonalDocument_Get', values: { PersonalDocumentId: $('#Id').val(), PersonalDocumentEmployeeId: $('#EmployeeId').val(), PersonalDocumentLanguage: _currentLanguage }, CallBack: loadPersonalDocumentsGridCallBack });
}
var loadPersonalDocumentsGridCallBack = function (inputDataJSON) {    
    $('#employeePersonalDocumentGrid tbody').html('');
    var fileCount = 1;
    JSON.parse(inputDataJSON.Value).forEach(function (item) {
        var extension = item.currentFileName.split('.').pop().toLowerCase();
        console.log(item);
        if (extension == 'pdf') {
            var fileImage = '<img src="/Content/Images/pdf.png" style="width:30px;"/>';
        }
        else {
            var fileImage = '<img src="/Content/Images/attachment.png" style="width:30px;"/>';
        }
        if (item.status == 'Valid' || item.status == 'صالح') {
            var status = '<span class="badge badge-success">' + item.status+'</span>';
        }
        else {
            var status = '<span class="badge badge-danger">' + item.status + '</span>';
        }
        $('#employeePersonalDocumentGrid tbody').append(            
            //<td><a class="edit"  title="Edit" data-toggle="tooltip"><i class="fa fa-edit" onclick="editEmployeePersonalDocument(this)" style="font-size: 26px;color: green;"></i></a>   <a class="deleteEmployeeDocumentType" title="Delete" data-toggle="tooltip"><i class="fa fa-trash" style="font-size: 26px;color: #FF4500;" onclick="deleteEmployeePersonalDocument(this)"></i></a></td> 
            '<tr><td hidden class="Id">' + item.id + '</td><td hidden class="SetupDetailTypeId">' + item.setupDetailTypeId + '</td><td hidden class="PersonalDocument">' + item.currentFileName + '</td><td>' + fileCount + '</td><td class="documentType">' + item.documentType + '</td> <td class="releaseDate">' + item.releaseDate + '</td> <td class="expiryDate">' + item.expiryDate + '</td><td class="expiryIn">' + item.expiryIn + '</td><td class="Status">' + status + '</td><td style="text-align: left;font-size: x-large;" class=""><a  target="_blank" href="/UploadFile/' + item.currentFileName + '">' + fileImage + '                           </td>          </tr > '
        );
        fileCount += 1;
    });
}
//| Ends Employee Personal Document

//| Employee Educational Document
function loadEducationalDocumentsGrid() {
    ajaxRequest({ commandName: 'HR_Employee_EducationalDocument_Get', values: { EducationalDocumentId: 0, EducationalDocumentEmployeeId: $('#EmployeeId').val(), EducationalDocumentLanguage: _currentLanguage }, CallBack: loadEducationalDocumentsGridCallBack });
}
var loadEducationalDocumentsGridCallBack = function (inputDataJSON) {        
    $('#employeeEducationalDocumentGrid tbody').html('');
    var fileCount = 1;
    JSON.parse(inputDataJSON.Value).forEach(function (item) {
        var extension = item.currentFileName.split('.').pop().toLowerCase();
        console.log(item);
        if (extension == 'pdf') {
            var fileImage = '<img src="/Content/Images/pdf.png" style="width:30px;"/>';
        }
        else {
            var fileImage = '<img src="/Content/Images/attachment.png" style="width:30px;"/>';
        }
        var tr = '<tr>' +
            '<td>'+fileCount+'</td>'+
            '<td hidden class="EducationalDocumentId">' + item.id + '</td>' +
            '<td hidden class="EducationalDocumentFile">' + item.currentFileName + '</td>' +
            //'<td class="EducationalDocumentDegreeNameEng">' + item.degreeNameEng + '</td>' +
            //'<td class="EducationalDocumentDegreeNameArb">' + item.degreeNameArb + '</td>' +
            '<td class="EducationalDocumentDegreeName">' + item.degreeName + '</td>' +
            //'<td class="EducationalDocumentInstituteEng">' + item.instituteEng + '</td>' +
            //'<td class="EducationalDocumentInstituteArb">' + item.instituteArb + '</td>' +
            '<td class="EducationalDocumentInstitute">' + item.instituteName + '</td>' +
            '<td class="EducationalDocumentReleaseDate">' + item.releaseDate + '</td>' +
            '<td class="EducationalDocumentMarks">' + item.marks + '</td>' +
            '<td hidden class="EducationalDocumentDegreeFromCountryId">' + item.degreeFromCountryId + '</td>' +
            '<td class="EducationalDocumentDegreeFromCountryName">' + item.degreeFromCountryName + '</td>' +

            '<td style="text-align: left;font-size: x-large;" class=""><a  target="_blank" href="/UploadFile/' + item.currentFileName + '">' + fileImage + ' </td>' +
            //'<td>' +
            //'<a class="edit"  title="Edit" data-toggle="tooltip"><i class="fa fa-edit" onclick="editEmployeeEducationalDocument(this)" style="font-size: 26px;color: green;"></i></a>' +
            //'<a class="deleteEmployeeDocumentType" title="Delete" data-toggle="tooltip"><i class="fa fa-trash" style="font-size: 26px;color: #FF4500;" onclick="deleteEmployeeEducationalDocument(this)"></i></a>' +
            //'</td>' +
            '</tr > '        
        $('#employeeEducationalDocumentGrid tbody').append(
            tr

        );
        fileCount += 1;
    });
}
//|End Employee Educational Documnent
//employeeAnnualLeaveBalanceDeductionGrid
//| Employee Annual Leave Balance Deduction
function loadEmployeeAnnualLeaveBalanceDeductionGrid() {
    ajaxRequest({ commandName: 'HR_Employee_Leave_TakenDetail_Get', values: { EmployeeId: $('#EmployeeId').val(), Language: _currentLanguage }, CallBack: loadEmployeeAnnualLeaveBalanceDeductionGridCallBack });
}
var loadEmployeeAnnualLeaveBalanceDeductionGridCallBack = function (inputDataJSON) {
  
   
    $('#employeeAnnualLeaveBalanceDeductionGrid tbody').html('');
    var fileCount = 1,totalLeave = 0;
    JSON.parse(inputDataJSON.Value).forEach(function (item) {        
        var tr = '<tr>' +
            '<td>' + fileCount + '</td>' +            
            '<td class="leaveType">' + item.leaveType + '</td>' +
            '<td class="startDate">' + item.startDate + '</td>' +
            '<td class="takenLeave">' + item.takenLeave + '</td>' +          
            '</tr > '
        totalLeave += item.takenLeave;
        $('#employeeAnnualLeaveBalanceDeductionGrid tbody').append(
            tr

        );
        fileCount += 1;
    });
    $('#employeeAnnualLeaveBalanceDeductionGrid tbody').append(
        '<tr><td>Total</td><td></td><td></td><td>' + totalLeave + '</td></tr>'

    );
}
//|End //| Employee Annual Leave Balance Deduction

    // employeeVacationLeaveBalanceGrid
//| Employee Vaction Balance
function loadEmployeeVacationLeaveBalanceGrid() {
    ajaxRequest({ commandName: 'HR_Employee_Leave_AvailableAndTakenDetail_Get', values: { EmployeeId: $('#EmployeeId').val(), Language: _currentLanguage }, CallBack: loadEmployeeVacationLeaveBalanceGridCallBack });
}
var loadEmployeeVacationLeaveBalanceGridCallBack = function (inputDataJSON) {    
    $('#employeeVacationLeaveBalanceGrid tbody').html('');
    var fileCount = 1, takenLeaveTotal = 0,balanceLeaveTotal = 0;
    JSON.parse(inputDataJSON.Value).forEach(function (item) {
        var tr = '<tr>' +
            '<td>' + fileCount + '</td>' +
            '<td class="leaveType">' + item.leaveType + '</td>' +
            '<td class="balance">' + item.balance + '</td>' +
            '<td class="takenLeave">' + item.takenLeave + '</td>' +
            
            '</tr > '
        takenLeaveTotal += item.takenLeave;
        balanceLeaveTotal += item.balance;
        $('#employeeVacationLeaveBalanceGrid tbody').append(
            tr

        );
        
        fileCount += 1;
    });
    $('#employeeVacationLeaveBalanceGrid tbody').append(
        '<tr><td>Total</td><td></td><td>' + balanceLeaveTotal + '</td><td>' + takenLeaveTotal+'</td></tr>'

    );
}
//|End //| Employee Vaction Balance