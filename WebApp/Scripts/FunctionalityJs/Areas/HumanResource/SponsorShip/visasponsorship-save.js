$(function () {

    $('#btn-save-sponsorship').on('click', function (e) {
        if (customValidateForm('frmsponsorshipDetail')) {
            $("#frmsponsorshipDetail").ajaxForm();
            buttonAddPleaseWait('btn-save-sponsorship');
            var options = {
                success: function (response, statusText, jqXHR) {
                    swal(response);
                    ClearControl();
                    loadVisaSponsorshipGrid();
                    $('#Id').val(0);
                    buttonRemovePleaseWait('btn-save-sponsorship', 'Save', 'save');
                },
                error: function (xhr, status, error) {
                    buttonRemovePleaseWait('btn-save-sponsorship', 'Save', 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btn-save-sponsorship', 'Save', 'save');
                }
            };
            $("#frmsponsorshipDetail").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btn-save-sponsorship', 'Save', 'save');
        }
    });
})