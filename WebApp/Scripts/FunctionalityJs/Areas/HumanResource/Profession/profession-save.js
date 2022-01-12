$(function () {

    $('#btn-save-Profession').on('click', function (e) {
        if (customValidateForm('frmProfessionDetail')) {
            $("#frmProfessionDetail").ajaxForm();
            buttonAddPleaseWait('btn-save-Profession');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    debugger;
                    loadProfessionGrid();
                    buttonRemovePleaseWait('btn-save-Profession', 'Save', 'save');
                    $('#Id').val('');
                    ClearControls();
                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btn-save-Profession', 'Save', 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btn-save-Profession', 'Save', 'save');
                }
            };
            $("#frmProfessionDetail").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btn-save-Profession', 'Save', 'save');
        }
    });
});

function ClearControls() {
    $('#NameEng').val('');
    $('#NameArb').val('');

}