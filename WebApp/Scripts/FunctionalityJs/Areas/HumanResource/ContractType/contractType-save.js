$(function () {

    $('#btnSave').on('click', function (e) {

        if (customValidateForm('frmContractTypeDetail')) {
            $("#frmContractTypeDetail").ajaxForm();
            buttonAddPleaseWait('btnSave');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    loadContractTypeGrid();
                    ClearControls();
                    $('#Id').val(0);
                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btnSave', save, 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btnSave', save, 'save');
                }
            };
            $("#frmContractTypeDetail").ajaxSubmit(options);
        }
        else {
        
            buttonRemovePleaseWait('btnSave', save, 'save');
        }
        
    });
})

function ClearControls() {

    $('#NameEng').val('');
    $('#NameArb').val('');

}