$(function () {

    $('#btnSave').enable(false);
    $('#btnCancel').enable(false);


    // loadLeaveRequest_Detail('Pending');
    var employee_RequestDetails = JSON.parse(localStorage.getItem('RequestDetails'));
     
    console.log(employee_RequestDetails);
    $('#divFromDepartment').text(employee_RequestDetails.email);
    $('#divFrom').text(employee_RequestDetails.name);

    $('.start-date').text(employee_RequestDetails.startDate);
    $('.end-date').text(employee_RequestDetails.endDate);
    $('.leave-type').text(employee_RequestDetails.leaveType);
    $('#noOfDays').text(employee_RequestDetails.totalDays);
    //$('#request-status').text(employee_RequestDetails.status);
    $('#txt-body').append(employee_RequestDetails.leave_Remarks);

    if (employee_RequestDetails.employee_ProfileImage != null) {
        var profileImage = '/UploadFile/' + employee_RequestDetails.employee_ProfileImage;
        $('#ProfileImage').attr('src', profileImage);
    }

    if (employee_RequestDetails.request_Attachment != null) {

        var fileExtension = "";
        var attachmentName = '';
        //--------------------------- ATTACHMENT FIX ICON WORK HERE ----------------------------------------
        if (employee_RequestDetails.request_Attachment.split('.')[1] == "docx" || employee_RequestDetails.request_Attachment.split('.')[1] == "doc" || employee_RequestDetails.request_Attachment.split('.')[1] == "docs") {
            fileExtension = "/Content/Images/docx.png";
        } else if (employee_RequestDetails.request_Attachment.split('.')[1] == "pdf" || employee_RequestDetails.request_Attachment.split('.')[1] == "PDF") {


            fileExtension = "/Content/Images/pdf.png";

        } else if (employee_RequestDetails.request_Attachment.split('.')[1] == "xls" || employee_RequestDetails.request_Attachment.split('.')[1] == "xlsx") {
            fileExtension = "/Content/Images/xls.png";
            /*fileExtension = "icofont icofont icofont-file-excel f-28 text-muted";*/
        }
        else if (employee_RequestDetails.request_Attachment.split('.')[1] == "jpg" || employee_RequestDetails.request_Attachment.split('.')[1] == "JPG" || employee_RequestDetails.request_Attachment.split('.')[1] == "jpeg" || employee_RequestDetails.request_Attachment.split('.')[1] == "JPEG" || employee_RequestDetails.request_Attachment.split('.')[1] == "png" || employee_RequestDetails.request_Attachment.split('.')[1] == "PNG") {
            //   fileExtension = "/Content/Images/ImageIcon.png";
            fileExtension = '/UploadFile/' + employee_RequestDetails.request_Attachment;
            //fileExtension = "ti-gallery f-28 text-muted";
        } else {
            fileExtension = "/Content/Images/attachment.png";
        }


        //--------------------------- ATTACHMENT FIX ICON WORK END ----------------------------------------



        $('.attachmentRow').show();
        var attachments = '/UploadFile/' + employee_RequestDetails.request_Attachment;
        $('#request-attachment').attr('src', fileExtension).attr('alt', employee_RequestDetails.request_Attachment);
        $('#attachment-open').attr('href', attachments);



    }
    fnLoadRequest_Signed_Signatures();

     
    if (localStorage.getItem('Active_GridArea') == 'Pending') {
        $('.show-hide-buttons-and-signature-area').show();
    } else {
        $('.show-hide-buttons-and-signature-area').hide();

    }
});



function fnLoadRequest_Signed_Signatures() {

    ajaxRequest({
        commandName: 'Request_History_Signed_Get',
        values: {
            Request_Leave_OR_Short_Leave_Id: JSON.parse(localStorage.getItem('RequestDetails')).id,
            Language: _currentLanguage,
        }, CallBack: fnLoadRequest_Signed_SignaturesCallBack
    });

}
function fnLoadRequest_Signed_SignaturesCallBack(inputDataJSON) {

    var responseJSON = JSON.parse(inputDataJSON.Value);
    $('.signed-employee-signatures').empty();
    if (responseJSON != null) {
        for (var i = 0; i < responseJSON.length; i++) {
            var attachments = '';
            if (responseJSON[i].emp_Signature != null) {

                var signature_data = '/UploadFile/' + responseJSON[i].emp_Signature;
                attachments = '<img style="width:65%" src=' + signature_data + ' alt="signature" class="" >';
            } else {

                attachments = '<button type="button" disabled="" class="btn btn-danger  " style=" font-size: x-large;"> ' + lblNoSignature + '</button>';
            }
            $('.signed-employee-signatures').append('<div class="row"> ' +

                ' <div class="col-md-6 text-right"> <p> <b id="emp-name">' + responseJSON[i].empName + '</b></p> </div> ' +
                ' <div class="col-md-6 text-right"> ' + attachments + '  </div> </div><hr>');
        }

    }
}


function fnUploadEmployeeSignature() {

    ajaxRequest({
        commandName: 'HR_Employee_Signature_Get',
        values: {
            //LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            //LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId,
            //LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            // Language: _currentLanguage,
        }, CallBack: loadfnUploadEmployeeSignatureCallBack
    });

}
//--------------------------------  ----------------- --------------------------------------------
//--------------------------------  ----------------- --------------------------------------------
//-------------------------------- SIGNATURE WORK HERE --------------------------------------------
//--------------------------------  ----------------- --------------------------------------------
//-------------------------------- written by /\/\ati --------------------------------------------
function loadfnUploadEmployeeSignatureCallBack(d) {

    $('#btn-signature').attr('disabled', true);
    $('#btnSave').enable(true);
    $('#btnCancel').enable(true);

    var _employeeSignature = JSON.parse(d.Value);

    if (_employeeSignature == null) {
        $('#noSignature').show();
    } else {
        $('#noSignature').hide();
        $('#loadSignature').show();

        if (_employeeSignature.currentFileName != null) {
            var singature_ = '/UploadFile/' + _employeeSignature.currentFileName;
            $('#loadEmployeeSignature').attr('src', singature_);
            $('#SignedBy').val(1);
            $('#Signature').val(_employeeSignature.currentFileName);

            /*
             
            //--------------------------------SAVE  SIGNATURE FOR THE CURRENT REQUEST  --------------------------------------------
            ajaxRequest({
                commandName: 'Request_Signed_Leave',
                values: {
                    CreatedBy: JSON.parse(localStorage.getItem('User')).id,
                    //LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId,
                    //LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId,
                    Signature: $('#Signature').val(),
                    Request_Leave_OR_Short_Leave_Id: JSON.parse(localStorage.getItem('RequestDetails')).id,
                    Signed_Employee_Id: JSON.parse(localStorage.getItem('User')).employeeId,
                }, CallBack: ''
            });
            */



        }
    }

}

$('#btnSave').click(function (e) {
    buttonAddPleaseWait('btnSave');
    fnApprovedOrDeclined(this.value, 'btnSave', 'check');

});
$('#btnCancel').click(function (e) {
    buttonAddPleaseWait('btnCancel');
    fnApprovedOrDeclined(this.value, 'btnCancel', 'ban');

});
function fnApprovedOrDeclined(btnValue, btnId, btnIcon) {


    Swal.fire({

        title: areYouSureTitle,
        text: btnValue == 'Decline' ? declineMultipleText : approveMultipleText,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
        confirmButtonText: btnYesText,
        cancelButtonText: btnNoText,
        buttons: {
            cancel: {
                text: "No",
                value: null,
                visible: true,
                className: "btn btn-danger",
                closeModal: true
            },
            confirm: {
                text: "Yes",
                value: true,
                visible: true,
                className: "btn btn-warning",
                closeModal: true
            }
        }
    }).then(function (restult) {
        if (restult.value) {

            // var getgridIDs = getIdsFromGrid(btnValue, btnId, btnIcon);

            //    if (getgridIDs.length > 0) {

            ajaxRequest({
                commandName: 'Employees_Request_Leave_ApproveOrDecline',
                values: {
                    LoggedInUser: loggedInUserDetail.id,
                    LoggedInUserDepartmentId: loggedInUserDetail.departmentId,
                    RequestIds: JSON.parse(localStorage.getItem('RequestDetails')).id,
                    Status: btnValue,
                    Comment: '',
                    Language: _currentLanguage
                }, CallBack: responseCallBack
            });
            if (btnValue == "Approved") { btnValue = _currentLanguage == "en-US" ? "Approve" : approveTitle; } else { btnValue = _currentLanguage == "en-US" ? "Decline" : lblDecline; }

            buttonRemovePleaseWait(btnId, btnValue, btnIcon);
            //  }


        } else {
            if (btnValue == "Approved") { btnValue = _currentLanguage == "en-US" ? "Approve" : approveTitle; } else { btnValue = _currentLanguage == "en-US" ? "Decline" : lblDecline; }

            buttonRemovePleaseWait(btnId, btnValue, btnIcon);
        }
    });

}
var responseCallBack = function (response) {


    swal(response.Value);
    setTimeout(function () {
        window.open('/Employees/Request/Leaves', '_blank');
        window.close();
    }, 2000);
}
