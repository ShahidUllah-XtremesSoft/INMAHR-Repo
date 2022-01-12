$(function () {

    $('#btn-save-contract').on('click', function (e) {

        if (customValidateForm('frmContractTypeDetail')) {
            $("#frmContractTypeDetail").ajaxForm();
            buttonAddPleaseWait('btn-save-contract');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    loadContractTypeGrid();
                    ClearControls();
                    $('#Id').val(0);
                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btn-save-contract', 'Save', 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btn-save-contract', 'Save', 'save');
                }
            };
            $("#frmContractTypeDetail").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btn-save-contract', 'Save', 'save');
        }
    });
})

function ClearControls() {

    $('#NameEng').val('');
    $('#NameArb').val('');

}