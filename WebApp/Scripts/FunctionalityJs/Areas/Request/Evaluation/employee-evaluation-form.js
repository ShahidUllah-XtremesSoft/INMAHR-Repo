var EvaluationId = window.location.href.split('?')[1].split('=')[1];
var EmployeeNumber = window.location.href.split('?')[2].split('=')[1];
//var Evaluation_History_Id = window.location.href.split('?')[3].split('=')[1];

$(function () {

    loadEmployeeProfile();
});

function loadEmployeeProfile() {

    ajaxRequest({
        commandName: 'HR_Employee_GetByNumber', values: { Language: _currentLanguage, EmployeeNumber: EmployeeNumber }, CallBack: loadEmployeeProfileCallBack
    });
}
function loadEmployeeProfileCallBack(response) {


    $('#Employee_Id').val(JSON.parse(response.Value).employeeId);
    $('#Employee_Department_Id').val(JSON.parse(response.Value).departmentId);
    $('#EmployeeName').text(JSON.parse(response.Value).employeeName);
    $('#EmployeeProfession').text(JSON.parse(response.Value).profession);
    $('#EmployeeSection').text(JSON.parse(response.Value).department);
    $('#EmployeeLineManager').text(JSON.parse(response.Value).directResponsible);


    //------------- Hidden Fields....

    if (JSON.parse(response.Value).currentFileName != null) {
        var profileImage = '/UploadFile/' + JSON.parse(response.Value).currentFileName;
        $('#ProfileImage').attr('src', profileImage);
    }


    if (JSON.parse(localStorage.getItem('User')).roleName == 'Line Manager') {

        if (JSON.parse(localStorage.getItem('User')).isHR == false) {

            $(".HR-data input,.HR-data button,.HR-data >td ").prop('disabled', true).css('background-color', 'white'); //#eae8e8
            $(".CM-data input,.CM-data button,.CM-data >td ").prop('disabled', true).css('background-color', 'white');

        } else {
            $(".lm-data input,.lm-data button,.lm-data >td ").prop('disabled', true).css('background-color', 'white'); //#eae8e8
            $(".CM-data input,.CM-data button,.CM-data >td ").prop('disabled', true).css('background-color', 'white');

        }

    } else {
        $(".lm-data input,.lm-data button,.lm-data >td ").prop('disabled', true).css('background-color', 'white');
        $(".HR-data input,.HR-data button,.HR-data >td ").prop('disabled', true).css('background-color', 'white');
    }


    //------------ CHECK IF FORM ALREADY EXIST IS DATABASE THEN LOAD ....
    //  fnLoadEmployeeEvaluationForm(Evaluation_History_Id);

}


function fnLoadEmployeeEvaluationForm() {

    ajaxRequest({
        commandName: 'HR_Employee_GetByNumber', values: { Language: _currentLanguage, EmployeeNumber: EmployeeNumber }, CallBack: loadEmployeeProfileCallBack
    });
}
//function loadEmployeeProfileCallBack(response) {




//-----------------------------  FUNCTION END ---------------------------------------------------
var total_Column_4 = 0, total_Column_6 = 0, total_Column_8 = 0, total_Column_10 = 0;
function fnCheckValue(e) {


    var isChecked = $('#' + e.id).prop('checked');
    var groupName = e.parentElement.children[0].name;
    var group_Font_No = parseInt(e.parentElement.children[1].innerText);


    if (group_Font_No == "4" && groupName == "4_No_Group") {

        if (isChecked == true) {

            total_Column_4 = parseInt($("#total_of_Column_4").text()) + group_Font_No;
            $("#total_of_Column_4").text(total_Column_4);


        } else {


            if (parseInt($("#total_of_Column_4").text()) <= 0) {
                $("#total_of_Column_4").text(0)
            } else {
                total_Column_4 = parseInt($("#total_of_Column_4").text()) - parseInt(e.parentElement.children[1].innerText);
            }

            $("#total_of_Column_4").text(total_Column_4);
        }
    } else if (e.parentElement.children[1].innerText == "6") {

        if ($('#' + e.id).prop('checked') == true) {

            total_Column_6 = parseInt($("#total_of_Column_6").text()) + parseInt(e.parentElement.children[1].innerText);
            $("#total_of_Column_6").text(total_Column_6);
        } else {


            if (parseInt($("#total_of_Column_6").text()) <= 0) {
                $("#total_of_Column_6").text(0)
            } else {
                total_Column_6 = parseInt($("#total_of_Column_6").text()) - parseInt(e.parentElement.children[1].innerText);
            }

            $("#total_of_Column_6").text(total_Column_6);
        }
    } else if (e.parentElement.children[1].innerText == "8") {

        if ($('#' + e.id).prop('checked') == true) {

            total_Column_8 = parseInt($("#total_of_Column_8").text()) + parseInt(e.parentElement.children[1].innerText);
            $("#total_of_Column_8").text(total_Column_8);
        } else {


            if (parseInt($("#total_of_Column_8").text()) <= 0) {
                $("#total_of_Column_8").text(0)
            } else {
                total_Column_8 = parseInt($("#total_of_Column_8").text()) - parseInt(e.parentElement.children[1].innerText);
            }

            $("#total_of_Column_8").text(total_Column_8);
        }
    } else if (e.parentElement.children[1].innerText == "10") {

        if ($('#' + e.id).prop('checked') == true) {

            total_Column_10 = parseInt($("#total_of_Column_10").text()) + parseInt(e.parentElement.children[1].innerText);
            $("#total_of_Column_10").text(total_Column_10);
        } else {


            if (parseInt($("#total_of_Column_10").text()) <= 0) {
                $("#total_of_Column_10").text(0)
            } else {
                total_Column_10 = parseInt($("#total_of_Column_10").text()) - parseInt(e.parentElement.children[1].innerText);
            }

            $("#total_of_Column_10").text(total_Column_10);
        }
    }
}
/*
function fnCheckValue(e) {

    var total_Column_4 = 0, total_Column_6 = 0, total_Column_8 = 0, total_Column_10 = 0;
    if (e.parentElement.children[1].innerText == "4") {

        if ($('#' + e.id).prop('checked') == true) {

            total_Column_4 = parseInt($("#total_of_Column_4").text()) + parseInt(e.parentElement.children[1].innerText);
            $("#total_of_Column_4").text(total_Column_4);
        } else {


            if (parseInt($("#total_of_Column_4").text()) <= 0) {
                $("#total_of_Column_4").text(0)
            } else {
                total_Column_4 = parseInt($("#total_of_Column_4").text()) - parseInt(e.parentElement.children[1].innerText);
            }

            $("#total_of_Column_4").text(total_Column_4);
        }
    } else if (e.parentElement.children[1].innerText == "6") {

        if ($('#' + e.id).prop('checked') == true) {

            total_Column_6 = parseInt($("#total_of_Column_6").text()) + parseInt(e.parentElement.children[1].innerText);
            $("#total_of_Column_6").text(total_Column_6);
        } else {


            if (parseInt($("#total_of_Column_6").text()) <= 0) {
                $("#total_of_Column_6").text(0)
            } else {
                total_Column_6 = parseInt($("#total_of_Column_6").text()) - parseInt(e.parentElement.children[1].innerText);
            }

            $("#total_of_Column_6").text(total_Column_6);
        }
    } else if (e.parentElement.children[1].innerText == "8") {

        if ($('#' + e.id).prop('checked') == true) {

            total_Column_8 = parseInt($("#total_of_Column_8").text()) + parseInt(e.parentElement.children[1].innerText);
            $("#total_of_Column_8").text(total_Column_8);
        } else {


            if (parseInt($("#total_of_Column_8").text()) <= 0) {
                $("#total_of_Column_8").text(0)
            } else {
                total_Column_8 = parseInt($("#total_of_Column_8").text()) - parseInt(e.parentElement.children[1].innerText);
            }

            $("#total_of_Column_8").text(total_Column_8);
        }
    } else if (e.parentElement.children[1].innerText == "10") {

        if ($('#' + e.id).prop('checked') == true) {

            total_Column_10 = parseInt($("#total_of_Column_10").text()) + parseInt(e.parentElement.children[1].innerText);
            $("#total_of_Column_10").text(total_Column_10);
        } else {


            if (parseInt($("#total_of_Column_10").text()) <= 0) {
                $("#total_of_Column_10").text(0)
            } else {
                total_Column_10 = parseInt($("#total_of_Column_10").text()) - parseInt(e.parentElement.children[1].innerText);
            }

            $("#total_of_Column_10").text(total_Column_10);
        }
    }
}
*/
//---------------- LOAD EMPLOYEE SIGNATURE 
//------------------------------------------ Developed by /\/\ati
function fnUploadEmployeeSignature() {

    ajaxRequest({ commandName: 'HR_Employee_Signature_Get', values: { LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId, }, CallBack: loadfnUploadEmployeeSignatureCallBack });

}

function loadfnUploadEmployeeSignatureCallBack(d) {

    var _employeeSignature = JSON.parse(d.Value);

    if (_employeeSignature == null) {
        $('#noSignature').show();
        $('.hideSignature_btn').hide();
    } else {
        $('#noSignature').hide();
        $('#loadSignature').show();
        $('.hideSignature_btn').hide();


        if (_employeeSignature.currentFileName != null) {
            var singature_ = '/UploadFile/' + _employeeSignature.currentFileName;
            $('#loadEmployeeSignature').attr('src', singature_);
            $('#SignedBy').val(1);
            $('#Signature').val(_employeeSignature.currentFileName);
        }
    }

}





$('#btn-save-evaluation-form').click(function () {


    //if (customValidateForm('frmEvaluation')) {
    //}
    //else {
    //    buttonRemovePleaseWait('btn-save-evaluation-form', send, 'send');
    //    return false;
    //}
    ajaxRequest({
        commandName: 'Request_Evaluation_Employee_Form_Save',
        values: {
            Id: $('#Id').val(),
            EvaluationId: EvaluationId,
            Employee_Id: $('#Employee_Id').val(),
            Employee_Department_Id: $('#Employee_Department_Id').val(),
            Employee_Department_Parent_Id: JSON.parse(localStorage.getItem('User')).employee_Department_ParentId,
            EvaluationForm: $('#employee-evaluation').html(),
            CreatedBy: JSON.parse(localStorage.getItem('User')).id,
            Language: _currentLanguage
        }, CallBack: fn_Request_Evaluation_Employee_Form_Save_CallBack
    });
});

function fn_Request_Evaluation_Employee_Form_Save_CallBack(response) {

    swal(response);

}

function fnCalculate_Total_Result() {
var column_4_value = 0, column_6_value = 0, column_8_value = 0, column_10_value = 0;
     
    var table, column_4, column_6, column_8, column_10;
    table = $('#employee-evaluation');
    column_4 = $('#employee-evaluation tr td font.4');
    column_6 = $('#employee-evaluation tr td font.6');
    column_8 = $('#employee-evaluation tr td font.8');
    column_10 = $('#employee-evaluation tr td font.10');
     

    //--------- LOOP ON EACH FIELD
    for (var i_4 = 0; i_4 < column_4.length; i_4++)
    {
          
        var input_isChecked = column_4[i_4].parentElement.children[0].checked
        if (input_isChecked == true) { 
            column_4_value = column_4_value + parseInt(column_4[i_4].outerText);
        }

    }
        //--------- LOOP ON EACH FIELD
    for (var i_6 = 0; i_6 < column_6.length; i_6++)
    {
           
        var input_isChecked = column_6[i_6].parentElement.children[0].checked
        if (input_isChecked == true) { 
            column_6_value = column_6_value + parseInt(column_6[i_6].outerText);
        }

    }
          //--------- LOOP ON EACH FIELD
    for (var i_8 = 0; i_8 < column_8.length; i_8++)
    {
           
        var input_isChecked = column_8[i_8].parentElement.children[0].checked
        if (input_isChecked == true) { 
            column_8_value = column_8_value + parseInt(column_8[i_8].outerText);
        }

    }     //--------- LOOP ON EACH FIELD
    for (var i_10 = 0; i_10 < column_10.length; i_10++)
    {
           
        var input_isChecked = column_10[i_10].parentElement.children[0].checked
        if (input_isChecked == true) { 
            column_10_value = column_10_value + parseInt(column_10[i_10].outerText);
        }

    }



    //------ CLEAR FIELDS
    $('#total_of_Column_4').text('0')
    $('#total_of_Column_6').text('0')
    $('#total_of_Column_8').text('0')
    $('#total_of_Column_10').text('0')
    //------ SET VALUES

    $('#total_of_Column_4').text(column_4_value)
    $('#total_of_Column_6').text(column_6_value)
    $('#total_of_Column_8').text(column_8_value)
    $('#total_of_Column_10').text(column_10_value)
}