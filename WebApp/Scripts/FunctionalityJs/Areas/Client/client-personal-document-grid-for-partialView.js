var personalClient_Id = (new URL(location.href)).searchParams.get('id');

$(function () {
   
     loadPersonalDocumentsGrid();

});

function loadPersonalDocumentsGrid() {
    ajaxRequest({
        commandName: 'Client_PersonalDocument_Get',
        values: {

            PersonalClient_Id: personalClient_Id,
            PersonalDocumentLanguage: _currentLanguage
        }, CallBack: loadPersonalDocumentsGridCallBack
    });
}

var loadPersonalDocumentsGridCallBack = function (inputDataJSON) {
    var count = 1;
    $('#PersonalDocumentGrid tbody').html('');


    JSON.parse(inputDataJSON.Value).forEach(function (item) {
        var statusClass = ''
        if (item.status == 'Valid') {
            statusClass = 'badge  badge-success '
        } else if (item.status == 'Expired') {
            statusClass = 'badge  badge-danger'
        } else {
            statusClass = 'badge  badge-warning'
        }


        var extension = item.currentFileName.split('.').pop().toLowerCase();
        if (extension == 'pdf') {
            var fileImage = '<img src="/Content/Images/pdf.png" style="width:30px;"/>';
        }
        else {
            var fileImage = '<img src="/Content/Images/attachment.png" style="width:30px;"/>';
        }
        $('#PersonalDocumentGrid tbody').append(
            '<tr>' +
            '<td hidden class="PersonalDocumentId">' + item.id + '</td>' +
            '<td hidden class="PersonalDocumentSetupDetailTypeId">' + item.setupDetailTypeId + '</td>' +
            '<td hidden class="PersonalDocumentFile">' + item.currentFileName + '</td>' +
            '<td class="PersonalDocumentType"><b>' + count++ + '</b></td> ' +
            '<td class="PersonalDocumentType">' + item.documentType + '</td> ' +
            '<td class="PersonalDocumentReleaseDate">' + item.releaseDate + '</td> ' +
            '<td class="PersonalDocumentExpiryDate">' + item.expiryDate + '</td>' +
            '<td class="PersonalDocumentExpiryIn"><span class="' + statusClass + '">' + item.expiryIn + '</span></td>' +
            '<td class="PersonalDocumentStatus "><span class="' + statusClass + '">' + item.status + '</span></td>' +
            '<td style="font-size: x-large;" class=""><a  target="_blank" href="/UploadFile/' + item.currentFileName + '">' + fileImage + '</td>' +
            '<td style="padding-top:20px;">' +
            '<a class="edit"  title="Edit" data-toggle="tooltip"><i class="fa fa-edit" onclick="editPersonalDocument(this)" style="font-size: 26px;color: green;"></i></a>  ' +
            '<a class="" title="Delete" data-toggle="tooltip"><i class="fa fa-trash" style="font-size: 26px;color: #FF4500;" onclick="deletePersonalDocument(this)"></i></a>' +
            '</td>' +
            '</tr > '
        );
    });
   
}

//-------------- kendo grid for personal document
 function loadPersonalDocumentsKendoGrid() {
    ajaxRequest({
        commandName: 'Client_PersonalDocument_Get',
        values: {

            PersonalClient_Id: personalClient_Id,
            PersonalDocumentLanguage: _currentLanguage
        }, CallBack: loadPersonalDocumentsKendoGridCallBack
    });
}
var loadPersonalDocumentsKendoGridCallBack = function (inputDataJSON) {
    loadPersonalDocumentsKendoGridResponse(JSON.parse(inputDataJSON.Value));
}


var loadPersonalDocumentsKendoGridResponse = function (inputDataJSON) { 

    var gridColumns = [
        { field: "id", title: "id", hidden: true, width: 20 },
        { field: "setupDetailTypeId", title: "id", hidden: true },
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },
        {
            field: "currentFileName",
            title: "currentFileName",
            hidden: false,
            width: 20,
            filterable: false,
            template: " #  if (currentFileName == null )" +
                " { # <label class='pcoded-badge label label-danger'>No Attachment</label># }else if(currentFileName.split('.')[1]=='pdf')" +
                " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/pdf.png'        style='width:30%;'/> </a># } else" +
                " { # <a  target='_blank' href='/UploadFile/#=currentFileName #'>  <img class='' src='/UploadFile/#=currentFileName#' style='width:30%' /></a> #} #"
  




            // template: " #  if (currentFileName == null )" +
            //     " { # <label class='pcoded-badge label label-danger'>No Attachment</label># }else " +
            //     " {# <a  target='_blank' href='/UploadFile/#= " + fileImage +" #'> <img class='' src='/UploadFile/#= " + fileImage+" #' style='width:30%' /></a> #} #"
        },
        { field: "documentType", title: "documentType", hidden: false, width: 20, filterable: false, },
        {
            field: "releaseDate", title: "releaseDate", hidden: false, width: 20, filterable: false,
            template: "   <label class='badge   badge-success'>#=releaseDate #</label>"
        },
        {
            field: "expiryDate", title: "expiryDate", hidden: false, width: 20, filterable: false,
            template: "   <label class='badge   badge-danger'>#=expiryDate #</label>",

        },

        {
            field: "expiryIn", title: "expiryIn", hidden: false, width: 15, filterable: false,
            template: "   <label class='badge   badge-success'>#=expiryIn #</label>"

        },

        {
            title: status,
            field: 'status',
            width: 35,
            hidden: false,
            filterable: false,
            template: " #  if (expiryIn < 0 )" +
                " { #   <label class='badge   badge-danger'>#=status #</label> #} else" +
                " { #  <label class='badge   badge-success'>#=status #</label>  #} #"
        },


    ];
    bindKendoGrid('div-client-personal-document', 50, gridColumns, inputDataJSON, true, 400);

};

