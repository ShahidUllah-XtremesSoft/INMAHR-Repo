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
    $('.client-signed-area').text($('#loadClientSignature').attr('src') == null || '' ? "Not Approved" : "Yes Aprroved");
}



//--------------------------  --------------------- ------------------------------------------------------
//-------------------------- PRINT AND SHARING CODE START ------------------------------------------------------
//--------------------------        By /\/\ati         ------------------------------------------------------

function fnAfterPrint() {

    $('.showhideButtonsUsingPrint').show();
    $('.nav-item').show();

}
/*
$(document).ready(function () {

    $("#btn-print-pdf").click(function () {
        debugger
        // Convert the DOM element to a drawing using kendo.drawing.drawDOM
        kendo.drawing.drawDOM($(".div-print"))
            .then(function (group) {
                // Render the result as a PDF file
                return kendo.drawing.exportPDF(group, {
                    paperSize: "auto",
                    margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" }
                });
            })
            .done(function (data) {
                // Save the PDF file
                kendo.saveAs({
                    dataURI: data,
                    fileName: "Direct-Cheque.pdf",
                    proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
                });
                // setTimeout(window.close(), 200, '');

            });
    });
});
*/


$('#btn-print').click(function () {

    $('.showhideButtonsUsingPrint').hide();
    $('.nav-item').hide();
    setTimeout(function () {
        window.print();
    }, 100);
});
$(document).bind("keyup keydown", function (e) {
    if (e.ctrlKey && e.keyCode == 80) {
        $('#btn-print').hide();

    }

});
$('#btn-email').click(function () {
    
    ajaxRequest({
        commandName: 'MeetingDetails_SendByEmail',
        values: {
            Title: $('.txt-project-title').text(),
            MeetingEmail: $('.div-email-template').html(),   // Pass all partial view which is included in ShortDetails.cshtml
            ClientEmail: sessionStorage.getItem('clientEmail') 
            
        }, CallBack: fnSendEmailCallBack
       
    });
    
   
});

var fnSendEmailCallBack = function (response) {
   // swal(response.Value);
    Swal.fire({
        icon: 'success',
        title: 'Email sent...!',

    });

}

/*


$('#btn-email').click(function () {

    document.documentElement.innerHTML
//    window.open('mailto:test@example.com?subject=subject&body=' + escape($('.container').text()));
    mailpage();
});

function mailpage() {
    debugger
    var mail_str = '';
    mail_str = "mailto:test@example.com?subject=Check out the " + document.title;
    mail_str += "&body=This is body area " + document.title;
    mail_str += ". You can view it at, " + location.href;
    window.open(mail_str ,'_blank');
    //location.href = mail_str;
}
*/