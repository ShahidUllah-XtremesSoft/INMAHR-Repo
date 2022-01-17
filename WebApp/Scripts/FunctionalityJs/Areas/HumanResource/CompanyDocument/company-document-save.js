$(function () {

    $('#btn-save-company-document').on('click', function (e) {
 
        if (customValidateForm('frmCompanyDocument')) {
            $("#frmCompanyDocument").ajaxForm();
            buttonAddPleaseWait('btn-save-company-document');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    loadCompanyDocumentGrid();
                    ClearControls();
                    $('#frmCompanyDocument')[0].reset();
                    $('#Id').val(0);
                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btn-save-company-document', 'Save', 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btn-save-company-document', 'Save', 'save');
                }
            };
            $("#frmCompanyDocument").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btn-save-company-document', 'Save', 'save');
        }
    });
})

 