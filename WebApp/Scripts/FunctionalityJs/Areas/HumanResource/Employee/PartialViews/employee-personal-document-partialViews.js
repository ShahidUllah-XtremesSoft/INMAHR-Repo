
$(function () {
    $('#PersonalDocumentLanguage').val(_currentLanguage);
    $('#PersonalDocumentCreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    //console.log((new URL(location.href)).searchParams.get('id'));
    var idQueryStirng = (new URL(location.href)).searchParams.get('id');
    if (idQueryStirng == null) {
        $('#PersonalDocumentEmployeeId').val(JSON.parse(localStorage.getItem('User')).employeeId);//(new URL(location.href)).searchParams.get('id');
    }
    else {
        $('#PersonalDocumentEmployeeId').val(idQueryStirng);//(new URL(location.href)).searchParams.get('id');
    }
    


    //| Date Picker
    renderKendoDatePicker('PersonalDocumentReleaseDate');
    renderKendoDatePicker('PersonalDocumentExpiryDate');
    
    //|End Date Picker

    //|Functions Calling
    loadKendoDropdownByTypeName('PersonalDocumentSetupDetailTypeId', 'EmployeePersonalDocument');
    loadPersonalDocumentsGrid();

    //|End Function Calling

    //|Click Event
    $('#btnSaveEmployeePersonalDocument').click(function () {

        if (customValidateForm('frmEmployeePersonalDocument')) {
            if (!firstDateShouldBeGreaterThanSecondDate($('#PersonalDocumentReleaseDate').val(), $('#PersonalDocumentExpiryDate').val(), 'Issue date','Expiry date')) {
                return false;
            }
            buttonAddPleaseWait('btnSaveEmployeePersonalDocument');

            $("#frmEmployeePersonalDocument").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    buttonRemovePleaseWait('btnSaveEmployeePersonalDocument', 'Save', 'save');
                    $('#frmEmployeePersonalDocument')[0].reset();
                    $('#PersonalDocumentId').val('0');
                    loadPersonalDocumentsGrid();
                    swal(response);
                    var response = JSON.parse(response);

                    //$('#PersonalDocumentId').val(response.insertedId);
                    //if (response.type != 'erorr') {
                    //    window.location.href = '/HumanResource/Employee/List';
                    //}
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    buttonRemovePleaseWait('btnSaveEmployeePersonalDocument', 'Save', 'save');
                    alert(errmsg);
                },
                complete: function () {
                    buttonRemovePleaseWait('btnSaveEmployeePersonalDocument', 'Save', 'save');
                }
            };
            $("#frmEmployeePersonalDocument").ajaxSubmit(options);
        }
        else {
            buttonRemovePleaseWait('btnSaveEmployeePersonalDocument', 'Save', 'save');
            return false;
        }
    });

    //|End Click Event


});
function validatePersonalDocument(inputId) {
    var fileExtension = ['jpeg', 'jpg', 'pdf'];

    if ($.inArray($('#' + inputId).val().split('.').pop().toLowerCase(), fileExtension) == -1) {

        swalMessage('info', 'Allowed format(s) are (' + fileExtension.join(', ') + ')', 2000);
        $('#' + inputId).val('');
    }

}
function loadPersonalDocumentsGrid() {
    ajaxRequest({ commandName: 'HR_Employee_PersonalDocument_Get', values: { PersonalDocumentId: $('#PersonalDocumentId').val(), PersonalDocumentEmployeeId: $('#PersonalDocumentEmployeeId').val(), PersonalDocumentLanguage: _currentLanguage }, CallBack: loadPersonalDocumentsGridCallBack });
}
var loadPersonalDocumentsGridCallBack = function (inputDataJSON) {
    $('#employeePersonalDocumentGrid tbody').html('');
    JSON.parse(inputDataJSON.Value).forEach(function (item) {
        var extension = item.currentFileName.split('.').pop().toLowerCase();
        if (extension == 'pdf') {
            var fileImage = '<img src="/Content/Images/pdf.png" style="width:30px;"/>';
        }
        else {
            var fileImage = '<img src="/Content/Images/attachment.png" style="width:30px;"/>';
        }
        $('#employeePersonalDocumentGrid tbody').append(
            //~/Content/Images/pdf.png
            //'<tr><td hidden class="SetupDetailTypeId">' + item.setupDetailTypeId + '</td><td class="documentType">' + item.documentType + '</td> <td class="releaseDate">' + item.releaseDate + '</td> <td class="expiryDate">' + item.expiryDate + '</td><td style="text-align: left;font-size: x-large;" class=""><a  target="_blank" href="/UploadFile/' + item.currentFileName + '"> <i  style="text-align: left;font-size: x-large;color:black;"  class="fa fa-download" aria-hidden="true"></i></a>  </td><td><a class="edit"  title="Edit" data-toggle="tooltip"><i class="fa fa-edit" onclick="editEmployeePersonalDocument(this)" style="font-size: 26px;color: green;"></i></a>   <a class="deleteEmployeeDocumentType" title="Delete" data-toggle="tooltip"><i class="fa fa-trash" style="font-size: 26px;color: #FF4500;"></i></a></td>           </tr > '

            '<tr><td hidden class="PersonalDocumentId">' + item.id + '</td><td hidden class="PersonalDocumentSetupDetailTypeId">' + item.setupDetailTypeId + '</td><td hidden class="PersonalDocumentFile">' + item.currentFileName + '</td><td class="PersonalDocumentType">' + item.documentType + '</td> <td class="PersonalDocumentReleaseDate">' + item.releaseDate + '</td> <td class="PersonalDocumentExpiryDate">' + item.expiryDate + '</td><td style="text-align: left;font-size: x-large;" class=""><a  target="_blank" href="/UploadFile/' + item.currentFileName + '">' + fileImage + '                           </td><td style="padding-top:20px;"><a class="edit"  title="Edit" data-toggle="tooltip"><i class="fa fa-edit" onclick="editEmployeePersonalDocument(this)" style="font-size: 26px;color: green;"></i></a>   <a class="deleteEmployeeDocumentType" title="Delete" data-toggle="tooltip"><i class="fa fa-trash" style="font-size: 26px;color: #FF4500;" onclick="deleteEmployeePersonalDocument(this)"></i></a></td>           </tr > '
        );
    });
}

function editEmployeePersonalDocument(e) {

    $('#PersonalDocumentId').val($(e).closest('tr').find(".PersonalDocumentId").text());

    //alert($(e).closest('tr').find(".SetupDetailTypeId").text());

    //$("#ReleaseDate").data("kendoDatePicker").value($(e).closest('tr').find(".releaseDate").text());
    //$("#ReleaseDate").val($(e).closest('tr').find(".releaseDate").text());
    $("#PersonalDocumentReleaseDate").data("kendoDatePicker").value($(e).closest('tr').find(".PersonalDocumentReleaseDate").text());
    $("#PersonalDocumentExpiryDate").data("kendoDatePicker").value($(e).closest('tr').find(".PersonalDocumentExpiryDate").text());
    //$("#ExpiryDate").val($(e).closest('tr').find(".expiryDate").text());

    //$('#PersonalDocument').val($(e).closest('tr').find(".PersonalDocument").text());

    var dropdownlist = $("#PersonalDocumentSetupDetailTypeId").data("kendoDropDownList");
    dropdownlist.value($(e).closest('tr').find(".PersonalDocumentSetupDetailTypeId").text());

}
function deleteEmployeePersonalDocument(e) {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to delete selected record",
        //input: 'text',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
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
            ajaxRequest({ commandName: 'HR_Employee_PersonalDocument_Delete', values: { Id: id, CreatedBy: $('#PersonalDocumentCreatedBy').val(), Language: _currentLanguage }, CallBack: deleteEmployeePersonalDocumentCallBack });
        }
    });
    var deleteEmployeePersonalDocumentCallBack = function (response) {
        $('#frmEmployeePersonalDocument')[0].reset();
        $('#PersonalDocumentId').val(0);
        swal(response.Value);
        loadPersonalDocumentsGrid();

    }

}



