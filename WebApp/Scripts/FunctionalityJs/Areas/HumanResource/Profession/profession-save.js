$(function () {

    $('#btnSave').on('click', function (e) {
        if (customValidateForm('frmProfessionDetail')) {
            $("#frmProfessionDetail").ajaxForm();
            buttonAddPleaseWait('btnSave');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    debugger;
                    loadProfessionGrid();
                    buttonRemovePleaseWait('btnSave', save, 'save');
                    $('#Id').val('');
                    ClearControls();
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
            $("#frmProfessionDetail").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btnSave', save, 'save');
        }
    });
});

function ClearControls() {
    $('#NameEng').val('');
    $('#NameArb').val('');

}