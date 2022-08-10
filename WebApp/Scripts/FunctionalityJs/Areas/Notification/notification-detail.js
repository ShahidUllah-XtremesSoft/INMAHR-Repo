var parameter_Issue_Id = (new URL(location.href)).searchParams.get('id');

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
}


 
function fnChangeStatus(value) {
    Swal.fire({

        title: areYouSureTitle,
        text: doYouReallyWantToChangeStatus,
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
            ajaxRequest({
                commandName: 'Issue_Change_Status', values: {
                    Id: parameter_Issue_Id,
                    UserId: JSON.parse(localStorage.getItem('User')).id,
                    HR_Employee_Id: JSON.parse(localStorage.getItem('User')).employeeId,
                    Status: value,
                    Language: $('#Language').val()
                }, CallBack: fnChangeStatusCallBack
            });
        }
    });
    var fnChangeStatusCallBack = function (response) {
        swal(response.Value); 
        loadIssueDetails();

    }

}