var personalClient_Id = (new URL(location.href)).searchParams.get('id');

$(function () {
    $('#PersonalDocumentLanguage').val(_currentLanguage);
    $('#PersonalDocumentCreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $('#PersonalDocumentClientId').val(personalClient_Id);

    //$('#PersonalDocumentTabLi').css('pointer-events','none')
    //$('#PersonalDocumentTabLi').css('cursor','not-allowed')


    //| Date Picker
    renderKendoDatePicker('PersonalDocumentReleaseDate');
    renderKendoDatePicker('PersonalDocumentExpiryDate');

    //|End Date Picker

    //|Functions Calling
    loadKendoDropdownByTypeName('PersonalDocumentSetupDetailTypeId', 'Client Personal Document');
    loadPersonalDocumentsGrid();

    //|End Function Calling

    //|Click Event
    $('#btn-save-client-document').click(function () {

        if (customValidateForm('frmAddUpdateClientDocument')) {
            if (!firstDateShouldBeGreaterThanSecondDate($('#PersonalDocumentReleaseDate').val(), $('#PersonalDocumentExpiryDate').val(), 'Issue date', 'Expiry date')) {
                return false;
            }
            buttonAddPleaseWait('btn-save-client-document');

            $("#frmAddUpdateClientDocument").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    buttonRemovePleaseWait('btn-save-client-document', save, 'save');
                    $('#frmAddUpdateClientDocument')[0].reset();
                    $('#PersonalDocumentId').val('0');
                    loadPersonalDocumentsGrid();
                    swal(response);
                    var response = JSON.parse(response);
                    //  setTimeout(function () {
                    //
                    //      window.location.href = '/User/Login';
                    //  }, 500);
                    //$('#PersonalDocumentId').val(response.insertedId);
                    //if (response.type != 'erorr') {
                    //    window.location.href = '/HumanResource/Employee/List';
                    //}
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    buttonRemovePleaseWait('btn-save-client-document', save, 'save');
                    alert(errmsg);
                },
                complete: function () {
                    buttonRemovePleaseWait('btn-save-client-document', save, 'save');
                }
            };
            $("#frmAddUpdateClientDocument").ajaxSubmit(options);
        }
        else {
            buttonRemovePleaseWait('btn-save-client-document', save, 'save');
            return false;
        }
    });

    //|End Click Event


});
function validatePersonalDocument(inputId) {
    var fileExtension = ['jpeg', 'jpg', 'pdf'];

    if ($.inArray($('#' + inputId).val().split('.').pop().toLowerCase(), fileExtension) == -1) {

        swalMessage('info', lblAllowedFormatsArePngJpgPdf, 2000);
        $('#' + inputId).val('');
    }

}
function loadPersonalDocumentsGrid() {
    ajaxRequest({
        commandName: 'Client_PersonalDocument_Get',
        values: {
            //PersonalDocumentId: $('#PersonalDocumentId').val(),
            //   PersonalDocumentEmployeeId: $('#PersonalDocumentEmployeeId').val(),
            PersonalClient_Id: personalClient_Id == null ? $('#PersonalDocumentClientId').val() : personalClient_Id,
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

function editPersonalDocument(e) {

    $('#PersonalDocumentId').val($(e).closest('tr').find(".PersonalDocumentId").text());

    $("#PersonalDocumentReleaseDate").data("kendoDatePicker").value($(e).closest('tr').find(".PersonalDocumentReleaseDate").text());
    $("#PersonalDocumentExpiryDate").data("kendoDatePicker").value($(e).closest('tr').find(".PersonalDocumentExpiryDate").text());

    var dropdownlist = $("#PersonalDocumentSetupDetailTypeId").data("kendoDropDownList");
    dropdownlist.value($(e).closest('tr').find(".PersonalDocumentSetupDetailTypeId").text());

}
function deletePersonalDocument(e) {
    Swal.fire({

        title: areYouSureTitle,
        text: doYouReallyWantToDeletThisRecord,
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
            var id = $(e).closest('tr').find(".PersonalDocumentId").text();
            $(e).closest('tr').remove();
            ajaxRequest({ commandName: 'Client_PersonalDocument_Delete', values: { Id: id, CreatedBy: $('#PersonalDocumentCreatedBy').val(), Language: _currentLanguage }, CallBack: deletePersonalDocumentCallBack });
        }
    });
    var deletePersonalDocumentCallBack = function (response) {
        $('#frmAddUpdateClientDocument')[0].reset();
        $('#PersonalDocumentId').val(0);
        swal(response.Value);
        loadPersonalDocumentsGrid();

    }

}






