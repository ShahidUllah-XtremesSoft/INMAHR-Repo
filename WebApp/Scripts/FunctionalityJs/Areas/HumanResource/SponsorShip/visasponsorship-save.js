$(function () {

    $('#btnSave').on('click', function (e) {
        if (customValidateForm('frmsponsorshipDetail')) {
            $("#frmsponsorshipDetail").ajaxForm();
            buttonAddPleaseWait('btnSave');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    ClearControl();
                    loadVisaSponsorshipGrid();
                    $('#Id').val(0);
                    buttonRemovePleaseWait('btnSave', save, 'save');
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
            $("#frmsponsorshipDetail").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btnSave', save, 'save');
        }
    });
})