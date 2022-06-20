var meeting_multiple_Id = (new URL(location.href)).searchParams.get('id');

$(function () {
    $('#Language').val(_currentLanguage);
    $('#LoggedInUserId').val(JSON.parse(localStorage.getItem('User')).id);

    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);


    loadMeetingShortDetial();

});
//|Load Employee Profile Starts
function loadMeetingShortDetial() {
    ajaxRequest({
        commandName: 'Meeting_Multiple_Details_By_Id',
        values: {
            Id: meeting_multiple_Id,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            Language: $('#Language').val()
        }, CallBack: loadMeetingShortDetialCallBack
    });
}
function loadMeetingShortDetialCallBack(response) {
    var responseDetails = JSON.parse(response.Value);
    console.log(responseDetails);
    //--- PROJECT DETAILS
    $('.project-number').text(responseDetails.projectNumber);
    $('.txt-project-title').text(responseDetails.projectName);
    $('.txt-description').html(responseDetails.projectDescription);
    $('.project_status_ddl').val(responseDetails.projectStatus);

    //--- MEETING MULTIPLE TABLE DETAILS
    $('.txt-meeting-remarks').html(responseDetails.remarks);
    $('.meeting-date').text(responseDetails.meetingDate);
    $('.meeting-total-timing').text(responseDetails.totaltime);

 

    if (responseDetails.client_Signature != null && responseDetails.client_Signature != "") {
        var clientSignature = '/UploadFile/' + responseDetails.client_Signature;
        $('#loadClientSignature').attr('src', clientSignature);
        $('#loadSignature').show();
        $('#noSignature').hide();
    } else {

        $('#noSignature').show();
        $('#loadSignature').hide();
    }

    
     
    if (responseDetails.currentFileName != null) {

        var fileExtension = "";
        //--------------------------- ATTACHMENT FIX ICON WORK HERE ----------------------------------------
        if (responseDetails.currentFileName.split('.')[1] == "docx" || responseDetails.currentFileName.split('.')[1] == "doc" || responseDetails.currentFileName.split('.')[1] == "docs") {
            fileExtension = "/Content/Images/docx.png";
        } else if (responseDetails.currentFileName.split('.')[1] == "pdf" || responseDetails.currentFileName.split('.')[1] == "PDF") {


            fileExtension = "/Content/Images/pdf.png";

        } else if (responseDetails.currentFileName.split('.')[1] == "xls" || responseDetails.currentFileName.split('.')[1] == "xlsx") {
            fileExtension = "/Content/Images/xls.png";
            /*fileExtension = "icofont icofont icofont-file-excel f-28 text-muted";*/
        }
        else if (responseDetails.currentFileName.split('.')[1] == "jpg" || responseDetails.currentFileName.split('.')[1] == "JPG" || responseDetails.currentFileName.split('.')[1] == "jpeg" || responseDetails.currentFileName.split('.')[1] == "JPEG" || responseDetails.currentFileName.split('.')[1] == "png" || responseDetails.currentFileName.split('.')[1] == "PNG") {
            //   fileExtension = "/Content/Images/ImageIcon.png";
            fileExtension = '/UploadFile/' + responseDetails.currentFileName;
            //fileExtension = "ti-gallery f-28 text-muted";
        } else {
            fileExtension = "/Content/Images/attachment.png";
        }
         
        $('.attachmentRow').show();
        var attachments = '/UploadFile/' + responseDetails.currentFileName;
        $('#meeting-multiple-attachment').attr('src', fileExtension);
        $('#attachment-meeting-multiple-open').attr('href', attachments);
        //--------------------------- ATTACHMENT FIX ICON WORK END ----------------------------------------
    }
}

