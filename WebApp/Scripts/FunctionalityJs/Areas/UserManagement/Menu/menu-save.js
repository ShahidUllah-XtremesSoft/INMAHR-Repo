$(function () {

    $('#btnSave').on('click', function (e) {
        debugger
        console.log($('#IsHRMenu').val());
        if ($('#IsHRMenu').val() == 'on') {
            $('#IsHRMenu').val('ON');
        }
        if (customValidateForm('frmMenuDetail')) {
            
            $("#frmMenuDetail").ajaxForm();
            buttonAddPleaseWait('btnSave');
            var options = {
                success: function (response, statusText, jqXHR) {
                    
                    console.log(response);
                    swal(response);
                    loadMenuGrid();
                    buttonRemovePleaseWait('btnSave', save, 'save');
                    ClearControls();
                },
                error: function (xhr, status, error) {
                     
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btnSave', save, 'save');
                }
            };
            $("#frmMenuDetail").ajaxSubmit(options);
        }
        else {

            buttonRemovePleaseWait('btnSave', save, 'save');
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