var parameter_Issue_Id = (new URL(location.href)).searchParams.get('id');
JSON.parse(localStorage.getItem('User')).roleName == 'User' ? $('.div-assign-issue-to-employee').attr('hidden', true) : $('.div-assign-issue-to-employee').attr('hidden', false)
$(function () {
    $('#Language').val(_currentLanguage);
    $('#LoggedInUserId').val(JSON.parse(localStorage.getItem('User')).id);


    loadIssueDetails();
});
//|Load Employee Profile Starts
function loadIssueDetails() {
    ajaxRequest({
        commandName: 'Issue_Details_By_Id',
        values: {
            Id: parameter_Issue_Id,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInDepartmentId: JSON.parse(localStorage.getItem('User')).departmentId,
            Language: $('#Language').val()
        }, CallBack: loadIssueDetailsCallBack
    });
}
function loadIssueDetailsCallBack(response) {
    var responseDetails = JSON.parse(response.Value);


    //------ Meeting Info
    $(".issue-days").text(responseDetails.dayName)
    $(".issue-date").text(responseDetails.issueDate)
    $(".concern-person").text(responseDetails.employeeName)
    $(".issue-status").text(responseDetails.status)
    $(".issue_status_ddl").val(responseDetails.status)
    $('#txt-body').html(responseDetails.descriptionEng);
    $('#txt-remarks').html(responseDetails.issueRemarks);



    JSON.parse(localStorage.getItem('User')).roleName == 'User' ? $('.div-assign-issue-to-employee').attr('hidden', true) : $('.div-assign-issue-to-employee').attr('hidden', false)
    //  responseDetails.employeeName != null ? $('.div-assign-issue-to-employee').attr('hidden', true) : $('.div-assign-issue-to-employee').attr('hidden', false)

    if (responseDetails.currentFileName != null) {

        var fileExtension = "";
        //--------------------------- ATTACHMENT FIX ICON WORK HERE ----------------------------------------
        if (responseDetails.filePath.split('.')[1] == "docx" || responseDetails.filePath.split('.')[1] == "doc" || responseDetails.filePath.split('.')[1] == "docs") {
            fileExtension = "/Content/Images/docx.png";
        } else if (responseDetails.filePath.split('.')[1] == "pdf" || responseDetails.filePath.split('.')[1] == "PDF") {


            fileExtension = "/Content/Images/pdf.png";

        } else if (responseDetails.filePath.split('.')[1] == "xls" || responseDetails.filePath.split('.')[1] == "xlsx") {
            fileExtension = "/Content/Images/xls.png";
            /*fileExtension = "icofont icofont icofont-file-excel f-28 text-muted";*/
        }
        else if (responseDetails.filePath.split('.')[1] == "jpg" || responseDetails.filePath.split('.')[1] == "JPG" || responseDetails.filePath.split('.')[1] == "jpeg" || responseDetails.filePath.split('.')[1] == "JPEG" || responseDetails.filePath.split('.')[1] == "png" || responseDetails.filePath.split('.')[1] == "PNG") {
            //   fileExtension = "/Content/Images/ImageIcon.png";
            fileExtension = '/UploadFile/' + responseDetails.currentFileName;
            //fileExtension = "ti-gallery f-28 text-muted";
        } else {
            fileExtension = "/Content/Images/attachment.png";
        }


        //--------------------------- ATTACHMENT FIX ICON WORK END ----------------------------------------



        $('.attachmentRow').show();
        var attachments = '/UploadFile/' + responseDetails.currentFileName;
        $('#letter-attachment').attr('src', fileExtension).attr('alt', responseDetails.orignalFileName);
        $('#attachment-open').attr('href', attachments);
    }
    loadEmployeeDropdownList(responseDetails.departmentId);

}



function fnChangeStatus(value) {
    Swal.fire({

        title: "Select Option",
       // text: doYouReallyWantToChangeStatus,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: 'darkslateblue',
        confirmButtonText: "Transfer",
        cancelButtonText: "Update Status",
        buttons: {
            cancel: {
               // text: "Update Status",
                value: null,
                visible: true,
              //  className: "btn btn-danger",
                closeModal: true
            },
            confirm: {
              //  text: "Transfer",
                value: true,
                visible: true,
              //  className: "btn btn-warning",
                closeModal: true
            }
        }
    }).then(function (restult) {
        if (restult.value) {
            fnLoadModal('Transfer');
        } else {
            ajaxRequest({
                commandName: 'Issue_Change_Status',
                values: {
                    Id: parameter_Issue_Id,
                    Status: $('.issue_status_ddl').val(),
                    UserId: JSON.parse(localStorage.getItem('User')).id,
                    HR_Employee_Id: JSON.parse(localStorage.getItem('User')).employeeId,
                    Language: $('#Language').val()

                }, CallBack: ''
            });
            
            location.reload();

            }

        
    });


}


function loadEmployeeDropdownList(departmentId) {
    ajaxRequest({
        commandName: 'DDL_HR_Employee_By_Department',
        values: {

            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            LoggedInDepartmentId: departmentId,
            Language: $('#Language').val()

        }, CallBack: fnloadEmployeeDropdownListEngCallBack
    });
}
function fnloadEmployeeDropdownListEngCallBack(response) {
    $("#EmployeeDDL").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
        popup: { appendTo: $("#container") },
        change: function (e) {
            var selected_Id = this.value();

            $('#HR_Employee_Id').val(selected_Id);


            //  ajaxRequest({ commandName: 'Issue_Assign_and_Transfer', values: { Employee_Id:selected_Id, Language: _currentLanguage }, CallBack: fnloadEmployeeDropdownListEngCallBack });

        },
    });
}



function fnLoadModal(areaName) {

    if (areaName == 'Assign') {
        $('#load-model').click();

        //------- show hide buttons
        $('#btn-assigned').attr('hidden', false)
        $('#btn-transfer').attr('hidden', true)

    } else if (areaName == 'Transfer') {
        $('#load-model').click();

        //------- show hide buttons
        $('#btn-assigned').attr('hidden', true)
        $('#btn-transfer').attr('hidden', false)



    }
}

$('#btn-assigned').click(function () {

    if (customValidateForm('frmAssignTransferDataModal')) {

        ajaxRequest({
            commandName: 'Issue_Assign',
            values: {
                Id: parameter_Issue_Id,
                UserId: JSON.parse(localStorage.getItem('User')).id,
                LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
                AssignTo_EmployeeId: $("#EmployeeDDL").val(),
                Remarks: $('#Remarks').val(),
                Language: $('#Language').val(),
                AssignORTransfer: 'Assigned'

            }, CallBack: fnAssignToCallBack
        });

    }
    else {

        return false;
    }

});
var fnAssignToCallBack = function (response) {
    swal(response.Value);
    $('#load-model').click();
    loadIssueDetails();

}
$('#btn-transfer').click(function () {

    if (customValidateForm('frmAssignTransferDataModal')) {

        ajaxRequest({
            commandName: 'Issue_Transfer',
            values: {
                Id: parameter_Issue_Id,
                UserId: JSON.parse(localStorage.getItem('User')).id,
                LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
                TransferTo_EmployeeId: $("#EmployeeDDL").val(),
                Remarks: $('#Remarks').val(),
                Language: $('#Language').val(),
                AssignORTransfer: 'Transfered'
            }, CallBack: fnTransferToCallBack
        });

    }
    else {

        return false;
    }

});
var fnTransferToCallBack = function (response) {
    swal(response.Value);
    loadIssueDetails();
    $('#load-model').click();

}