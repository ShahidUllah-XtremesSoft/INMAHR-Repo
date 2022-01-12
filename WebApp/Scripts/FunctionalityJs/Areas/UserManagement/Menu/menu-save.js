$(function () {

    $('#btnSave').on('click', function (e) {
        debugger

        if (customValidateForm('frmMenuDetail')) {
            $("#frmMenuDetail").ajaxForm();
            buttonAddPleaseWait('btnSave');
            var options = {
                success: function (response, statusText, jqXHR) {
                    
                    console.log(response);
                    swal(response);
                    loadMenuGrid();
                    buttonRemovePleaseWait('btnSave', 'Save', 'save');
                    ClearControls();
                },
                error: function (xhr, status, error) {
                     
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btnSave', 'Save', 'save');
                }
            };
            $("#frmMenuDetail").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btnSave', 'Save', 'save');
        }
    });
    
})


function ClearControls() {

    $('#NameArb').val('');
    $('#NameEng').val('');
    $('#MenuGroup').val('');
    $('#ModuleId').val('');
    $('#Url').val('');
    $('#Icon').val('');

}