var queryStringLetterId = 0, requestCameFrom;
$(function () {

    queryStringLetterId = (new URL(location.href)).searchParams.get('value');
    requestCameFrom = (new URL(location.href)).searchParams.get('from');



    getInternalLetterById(queryStringLetterId);
});
function getInternalLetterById(queryStringLetterId) {
    ajaxRequest({ commandName: 'Employee_InternalLetter_GetById', values: { Id: queryStringLetterId, Language: _currentLanguage }, CallBack: getInternalLetterByIdCallBack });
    if (requestCameFrom == 'outbox') {
        $('.btnReply').hide();
        if (JSON.parse(localStorage.getItem('User')).roleName == 'User') {
            $('.btnForward').hide();
        } else {
            $('.btnForward').show();
        }
    } else {
        if (JSON.parse(localStorage.getItem('User')).roleName == 'User') {
            $('.btnForward').hide();
        } else {
            $('.btnForward').show();
        }
    }

}
var getInternalLetterByIdCallBack = function (inputDataJSON) {
    var responseJSON = JSON.parse(inputDataJSON.Value);

    var letterToArray = responseJSON.letterTo.split(',');


    letterToArray.forEach(function (item) {

        //   $('#divTo').append('<span class="badge badge-success">'+item+'</span>');
        $('#divTo').append('<button type="button" class="btn btn-sm btn-outline-dark waves-effect waves-light">' + item + '</button>');
    });
    //$('#divFrom').text(responseJSON.createdBy);
    //  $('#divFrom').append('<button type="button" class="btn btn btn-success waves-effect waves-light">' + responseJSON.createdBy + '</button>');
    //   $('#divFromDepartment').append('<button type="button" class="btn btn btn-success waves-effect waves-light">' + responseJSON.senderDepartmentName + '</button>');

    $('#divFrom').append('<button type="button" class="btn btn-sm btn-outline-dark waves-effect waves-light">' + responseJSON.createdBy + '</button>');
    $('#divFromDepartment').append('<button type="button" class="btn btn-sm btn-outline-dark waves-effect waves-light">' + responseJSON.senderDepartmentName + '</button>');
    $('.letter-date').append(responseJSON.sendDate);
    $('.letter-number').append(responseJSON.number);
    $('.letter-time').append(responseJSON.letterTime);

    /*$('#divBody').html(responseJSON.body);*/
    $('#divDate').html(responseJSON.createdDate);

    $('#txt-subject').text(responseJSON.subject);
    $('#txt-body').html(responseJSON.body);
    fnUploadEmployeeSignature(responseJSON.empSignature);

    if (responseJSON.empCurrentFileName != null) {
        var profileImage = '/UploadFile/' + responseJSON.empCurrentFileName;
        $('#ProfileImage').attr('src', profileImage);
    }
    getInternalLetter_AttachmentById();
    /*
    if (responseJSON.currentFileName != null) {

        var fileExtension = "";
        var attachmentName = '';
        //--------------------------- ATTACHMENT FIX ICON WORK HERE ----------------------------------------
        if (responseJSON.filePath.split('.')[1] == "docx" || responseJSON.filePath.split('.')[1] == "doc" || responseJSON.filePath.split('.')[1] == "docs") {
            fileExtension = "/Content/Images/docx.png";
        } else if (responseJSON.filePath.split('.')[1] == "pdf" || responseJSON.filePath.split('.')[1] == "PDF") {


            fileExtension = "/Content/Images/pdf.png";

        } else if (responseJSON.filePath.split('.')[1] == "xls" || responseJSON.filePath.split('.')[1] == "xlsx") {
            fileExtension = "/Content/Images/xls.png";
           
        }
        else if (responseJSON.filePath.split('.')[1] == "jpg" || responseJSON.filePath.split('.')[1] == "JPG" || responseJSON.filePath.split('.')[1] == "jpeg" || responseJSON.filePath.split('.')[1] == "JPEG" || responseJSON.filePath.split('.')[1] == "png" || responseJSON.filePath.split('.')[1] == "PNG") {
            
            fileExtension = '/UploadFile/' + responseJSON.currentFileName;
            
        } else {
            fileExtension = "/Content/Images/attachment.png";
        }

        //   $('.loadEmployeeAttachments').append(' <li class="media d-flex m-b-10"><div class="m-r-20 v-middle"><i class="' + fileExtension + '"></i></div><div class="media-body"><a target="_blank" href="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" class="m-b-5 d-block">' + attachmentName + '</div><div class="f-right v-middle text-muted"><i class="icofont icofont-download-alt f-18"></i></div></a></li>')

        //--------------------------- ATTACHMENT FIX ICON WORK END ----------------------------------------



        $('.attachmentRow').show();
        var attachments = '/UploadFile/' + responseJSON.currentFileName;
        $('#letter-attachment').attr('src', fileExtension).attr('alt', responseJSON.orignalFileName);
        $('#attachment-open').attr('href', attachments);



    }
    */

}
function getInternalLetter_AttachmentById() {
    ajaxRequest({ commandName: 'Employee_InternalLetter_Attachment_GetById', values: { Id: queryStringLetterId, Language: _currentLanguage }, CallBack: getInternalLetter_AttachmentByIdCallBack });
    console.log(queryStringLetterId)
}
var getInternalLetter_AttachmentByIdCallBack = function (inputDataJSON) {
    var responseJSON = JSON.parse(inputDataJSON.Value);
    
    for (var i = 0; i < responseJSON.length > 0; i++) {



        if (responseJSON[i].currentFileName != null) {

            var fileExtension = "";
            var attachmentName = '';
            //--------------------------- ATTACHMENT FIX ICON WORK HERE ----------------------------------------
            if (responseJSON[i].filePath.split('.')[1] == "docx" || responseJSON[i].filePath.split('.')[1] == "doc" || responseJSON[i].filePath.split('.')[1] == "docs") {
                fileExtension = "/Content/Images/docx.png";
            } else if (responseJSON[i].filePath.split('.')[1] == "pdf" || responseJSON[i].filePath.split('.')[1] == "PDF") {


                fileExtension = "/Content/Images/pdf.png";

            } else if (responseJSON[i].filePath.split('.')[1] == "xls" || responseJSON[i].filePath.split('.')[1] == "xlsx") {
                fileExtension = "/Content/Images/xls.png";
                /*fileExtension = "icofont icofont icofont-file-excel f-28 text-muted";*/
            }
            else if (responseJSON[i].filePath.split('.')[1] == "jpg" || responseJSON[i].filePath.split('.')[1] == "JPG" || responseJSON[i].filePath.split('.')[1] == "jpeg" || responseJSON[i].filePath.split('.')[1] == "JPEG" || responseJSON[i].filePath.split('.')[1] == "png" || responseJSON[i].filePath.split('.')[1] == "PNG") {
                //   fileExtension = "/Content/Images/ImageIcon.png";
                fileExtension = '/UploadFile/' + responseJSON[i].currentFileName;
                //fileExtension = "ti-gallery f-28 text-muted";
            } else {
                fileExtension = "/Content/Images/attachment.png";
            }

           //  $('.loadEmployeeAttachments').append(' <li class="media d-flex m-b-10"><div class="m-r-20 v-middle"><i class="' + fileExtension + '"></i></div><div class="media-body"><a target="_blank" href="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" class="m-b-5 d-block">' + attachmentName + '</div><div class="f-right v-middle text-muted"><i class="icofont icofont-download-alt f-18"></i></div></a></li>')

            //--------------------------- ATTACHMENT FIX ICON WORK END ----------------------------------------

             

            $('.attachmentRow').show();
            var attachments = '/UploadFile/' + responseJSON[i].currentFileName;
            /*
            $('#letter-attachment').attr('src', fileExtension).attr('alt', responseJSON[i].orignalFileName);
            $('#attachment-open').attr('href', attachments);
            */
            $('.appendLetterAttachment').append('  <div class="col-sm-2 col-md-1"><a target="_blank" id="" href=' + attachments + '> <img id="" src=' + fileExtension + ' alt=' + responseJSON[i].orignalFileName+' class="img-thumbnail" style=" "></a></div>')



        }
    }
}


function updateLetterIsRead(queryStringLetterId) {
    ajaxRequest({
        commandName: 'Employee_InternalLetter_UpdateIsRead',
        values: {
            Id: queryStringLetterId,
            IsRead: true,
            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            LoggedInEmployeeDepartmentId: JSON.parse(localStorage.getItem('User')).employeeDepartmentId,
            Language: _currentLanguage
        }, CallBack: ''
    });

}

function fnRedirectToSpecificScreen(name) {

    if (name == "Reply") {

        window.location.href = '/Employees/InternalLetter/Reply?value=' + queryStringLetterId + '';
    } else {
        window.location.href = '/Employees/InternalLetter/Forward?value=' + queryStringLetterId + '';

    }
}

//--------------------- LOAD EMPLOYEE SIGNAGUE 

function fnUploadEmployeeSignature(d) {

    var _employeeSignature = d;

    if (_employeeSignature == null) {
        $('#noSignature').show();
    } else {
        $('#noSignature').hide();
        $('#loadSignature').show();

        if (_employeeSignature != null) {
            var singature_ = '/UploadFile/' + _employeeSignature;
            $('#loadEmployeeSignature').attr('src', singature_);
            //$('#SignatureBy').val(1);
            //$('#Signature').val(_employeeSignature);
        }
    }

}