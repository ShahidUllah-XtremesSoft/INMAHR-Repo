var EvaluationId = window.location.href.split('?')[1].split('=')[1];
var EmployeeNumber = window.location.href.split('?')[2].split('=')[1];
//var Evaluation_History_Id = window.location.href.split('?')[3].split('=')[1];

$(function () {

    //   loadEmployeeProfile();

    fn_Load_Evaluation_Form();
});

function fn_Load_Evaluation_Form() {

    ajaxRequest({
        commandName: 'Evaluation_Template_Get', values: { Language: _currentLanguage }, CallBack: fn_Load_Evaluation_FormCallBack
    });
}

function fn_Load_Evaluation_FormCallBack(response) {

    var header = JSON.parse(response.Value)[0];
    var body = JSON.parse(response.Value)[1];

    //------- SET TOTAL VALUE IT WILL BE USED IN TOTAL CALCULATION.
    $('#TotalColumnOne').val(body[0].totalColumnOne);
    $('#TotalColumnTwo').val(body[0].totalColumnTwo);
    $('#TotalColumnThree').val(body[0].totalColumnThree);
    $('#TotalColumnFour').val(body[0].totalColumnFour);



    if (header.length > 0) {
        $('#employee-evaluation-header').empty()
        for (var headerCount = 0; headerCount < header.length; headerCount++) {

            $('#employee-evaluation-header').append('<td style="text-align:center;border-right: 1px solid;" class=" "><strong>' + header[headerCount].title + '</strong></td>')
        }
    }

    if (body.length > 0) {
        $('#employee-evaluation>tbody').empty()
        var groupCount_to_Avoid_Duplication = 0;
        var previous_group_name = '';
        for (var bodyCount = 0; bodyCount < body.length; bodyCount++) {

            //----------- APPEND GROUP ROW
            if (body[bodyCount].parent == body[bodyCount].groupsForCondition && groupCount_to_Avoid_Duplication == 0) {
                previous_group_name = body[bodyCount].parent;
                groupCount_to_Avoid_Duplication = 1;
                $('#employee-evaluation>tbody').append(' <tr><td colspan="2"  style="background: lightgray;"> <strong> ' + body[bodyCount].groups + '</strong> </td></tr>')
            } else {
                if (body[bodyCount].parent != previous_group_name) {
                    groupCount_to_Avoid_Duplication = 0;
                }
            }

            //----------- APPEND CHILD ROWS
            $('#employee-evaluation>tbody').append(' <tr class=' + body[bodyCount].name + ' style="border: 1px solid;">' +
                // COLUMN ONE
                '<td class="" style="border-right: 1px solid;border-left: 1px solid;">' + body[bodyCount].title + '</td>' +
                '<td class="" style="border-right: 1px solid;">' +
                '<label class="btn  " for=' + body[bodyCount].name + '_' + body[bodyCount].columnOne + 'columnOne' + '  style="margin-bottom: 0px;width:100%;">' +
                '<input type="radio"   id=' + body[bodyCount].name + '_' + body[bodyCount].columnOne + 'columnOne' + '  style="width: 15px;height: 15px;" name=' + body[bodyCount].name + '>' +
                '<font class="columnOne"  style="font-size: large;"> ' + body[bodyCount].columnOne + ' </font>' +
                '</label>' +
                '</td>' +
                // COLUMN TWO
                '<td class="" style="border-right: 1px solid;">' +
                '<label class="btn  " for=' + body[bodyCount].name + '_' + body[bodyCount].columnTwo + 'columnTwo' + '  style="margin-bottom: 0px;width:100%;">' +
                '<input type="radio"  id=' + body[bodyCount].name + '_' + body[bodyCount].columnTwo + 'columnTwo' + '  style="width: 15px;height: 15px;" name=' + body[bodyCount].name + '>' +
                '<font class="columnTwo"  style="font-size: large;"> ' + body[bodyCount].columnTwo + ' </font>' +
                '</label>' +
                '</td>' +
                // COLUMN THREE
                '<td class="" style="border-right: 1px solid;">' +
                '<label class="btn  " for=' + body[bodyCount].name + '_' + body[bodyCount].columnThree + 'columnThree' + '  style="margin-bottom: 0px;width:100%;">' +
                '<input type="radio"   id=' + body[bodyCount].name + '_' + body[bodyCount].columnThree + 'columnThree' + '  style="width: 15px;height: 15px;" name=' + body[bodyCount].name + '>' +
                '<font class="columnThree"  style="font-size: large;"> ' + body[bodyCount].columnThree + ' </font>' +
                '</label>' +
                '</td>' +
                // COLUMN FOUR
                '<td class="" style="border-right: 1px solid;">' +
                '<label class="btn  " for=' + body[bodyCount].name + '_' + body[bodyCount].columnFour + 'columnFour' + '  style="margin-bottom: 0px;width:100%;">' +
                '<input type="radio"  id=' + body[bodyCount].name + '_' + body[bodyCount].columnFour + 'columnFour' + '  style="width: 15px;height: 15px;" name=' + body[bodyCount].name + '>' +
                '<font class="columnFour"  style="font-size: large;"> ' + body[bodyCount].columnFour + ' </font>' +
                '</label>' +
                '</td></tr>')

        }
        //---------- FOOTER 
        $('#employee-evaluation>tbody').append('<tr style="border: 1px solid; background: cyan;" class="PerformanceScores">' +
            '<td style="text-align:center;border-right: 1px solid;border-left: 1px solid;" class=" "><strong>' + lblPerformanceScores + '</strong></td>' +
            '<td style="text-align:center;border-right: 1px solid;font-size: x-large;" class=" "><strong id="total_of_column_one">0</strong></td>                            ' +
            '<td style="text-align:center;border-right: 1px solid;font-size: x-large;" class=" "><strong id="total_of_column_two">0</strong></td>                            ' +
            '<td style="text-align:center;border-right: 1px solid;font-size: x-large;" class=" "><strong id="total_of_column_three">0</strong></td>                            ' +
            '<td style="text-align:center;border-right: 1px solid;font-size: x-large;" class=" "><strong id="total_of_column_four">0</strong></td>                           ' +

            '</tr>' +
            '<tr style="border: 1px solid; background: #cde627;" class="TotalPercentageScores">' +
            '<td style="text-align:center;border-right: 1px solid;border-left: 1px solid;" class=" "><strong> ' + lblTotal + '  %</strong></td>' +
            '<td colspan="4" style="text-align:center;border-right: 1px solid;font-size: x-large;" class=" "><strong id="totalPercentage_of_All_Columns">0</strong></td>' +

            '</tr>' +
            '<tr style="border: 1px solid; " class=" tr-btn-total ">' +
            '<td> </td>' +
            '<td colspan="4" style="text-align:end;border-right: 1px solid;font-size: x-large;" class=" ">' +
            '<button class="btn form-control btn-primary" id="btn-calculate-total-result" onclick="fnCalculate_Total_Result()"><i class="fa fa-calculator"></i> ' + lblTotal + ' </button>' +
            '</td>' +
            '</tr>' +
            ' <tr><td colspan="5"> &nbsp; </td></tr>'
            + '<tr><td colspan="5"> &nbsp; </td></tr>'
            + '<tr><td style="background: lightgray;"> <strong>' + lblProcedures + ' </strong> </td></tr>'
            + '<tr class="Procedures lm-data" style="border: 1px solid;">'
            //    @*------------------------------------- this is Line Manager (LM) data --------------------------------------*@
            + '    <td  style="border-right: 1px solid;border-left: 1px solid;">' + lblLineManager + ' </td>'
            + '    <td  style="border-right: 1px solid;"> <input class="form-control" id="lm-date" type="date" value="@DateTime.Now" /></td>'
            + '    <td  style="border-right: 1px solid;border-left: 1px solid;">' + lblApprovedBy + ' </td>'
            + '    <td  colspan="2" style=" border-right: 1px solid; width: 20%;">'
            + '        <button type="button" id="btn-signature-lm" class="btn  form-control hideSignature_btn" onclick="fnUploadEmployeeSignature();"><i class=""></i> ' + lblSignature + '</button>'
            + '        <div class=" ">'
            + '            <input type="hidden" class="form-control" name="Signature" id="Signature" value="" />'
            + '            <div id="noSignature" style="display:none;">'
            + '                <button type="button" disabled class="btn btn-danger @Resources.Common.PullRight" style=" font-size: large;">' + lblNoSignature + '</button>'
            + '            </div>'
            + '            <div id="loadSignature" style="display:none;">'
            + '                <img src="" class="img-avatar  @Resources.Common.PullLeft" id="loadEmployeeSignature" style="border-radius:4%;width:130px;" alt=' + lblSignature + ' >'
            + '            </div>'
            + '        </div>'
            + '    </td>'
            + '</tr>'
            + '<tr class="Procedures HR-data" style="border: 1px solid;">'
            //    @*------------------------------------- this is HR  data --------------------------------------*@
            + '    <td  style="border-right: 1px solid;border-left: 1px solid;">' + lblHR + ' </td>'
            + '    <td  style="border-right: 1px solid;"> <input class="form-control" id="hr-date" type="date" value="@DateTime.Now" /></td>'
            + '    <td  style="border-right: 1px solid;border-left: 1px solid;">' + lblApprovedBy + ' </td>'
            + '    <td  colspan="2" style=" border-right: 1px solid;">'
            + '        <button type="button" id="btn-signature-hr" class="btn  form-control" onclick="fnUploadEmployeeSignature();"><i class=""></i>' + lblSignature + '</button>'
            + '    </td>'
            + '</tr>'
            + '<tr class="Procedures CM-data" style="border: 1px solid;">'
            //    @*------------------------------------- this is HR  data --------------------------------------*@
            + '    <td  style="border-right: 1px solid;border-left: 1px solid;"> ' + lblCompanyManager + '</td>'
            + '    <td  style="border-right: 1px solid;"> <input class="form-control" id="cm-date" type="date" value="@DateTime.Now" /></td>'
            + '    <td  style="border-right: 1px solid;border-left: 1px solid;">' + lblApprovedBy + '  </td>'
            + '    <td  colspan="2" style=" border-right: 1px solid;">'
            + '        <button type="button" id="btn-signature-cm" class="btn  form-control" onclick="fnUploadEmployeeSignature();"><i class=""></i>  ' + lblSignature + ' </button>'
            + '    </td>'
            + '</tr>')
    }

}

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
    var column_one_value = 0, column_two_value = 0, column_three_value = 0, column_four_value = 0;

    var column_one, column_two, column_three, column_four;

    column_one = $('#employee-evaluation tr td font.columnOne');
    column_two = $('#employee-evaluation tr td font.columnTwo');
    column_three = $('#employee-evaluation tr td font.columnThree');
    column_four = $('#employee-evaluation tr td font.columnFour');


    //--------- LOOP ON EACH FIELD
    for (var i_4 = 0; i_4 < column_one.length; i_4++) {

        var input_isChecked = column_one[i_4].parentElement.children[0].checked


        if (input_isChecked == true) {
            column_one_value = column_one_value + parseInt(column_one[i_4].outerText);
        }

    }

    //--------- LOOP ON EACH FIELD
    for (var i_6 = 0; i_6 < column_two.length; i_6++) {

        var input_isChecked = column_two[i_6].parentElement.children[0].checked
        if (input_isChecked == true) {
            column_two_value = column_two_value + parseInt(column_two[i_6].outerText);
        }

    }
    //--------- LOOP ON EACH FIELD
    for (var i_8 = 0; i_8 < column_three.length; i_8++) {

        var input_isChecked = column_three[i_8].parentElement.children[0].checked
        if (input_isChecked == true) {
            column_three_value = column_three_value + parseInt(column_three[i_8].outerText);
        }

    }     //--------- LOOP ON EACH FIELD
    for (var i_10 = 0; i_10 < column_four.length; i_10++) {

        var input_isChecked = column_four[i_10].parentElement.children[0].checked
        if (input_isChecked == true) {
            column_four_value = column_four_value + parseInt(column_four[i_10].outerText);
        }

    }



    //------ CLEAR FIELDS
    $('#total_of_column_one').text('0')
    $('#total_of_column_two').text('0')
    $('#total_of_column_three').text('0')
    $('#total_of_column_four').text('0')
    //------ SET VALUES

    $('#total_of_column_one').text(column_one_value)
    $('#total_of_column_two').text(column_two_value)
    $('#total_of_column_three').text(column_three_value)
    $('#total_of_column_four').text(column_four_value)

    debugger
    var total_Column_Sum = column_one_value + column_two_value + column_three_value + column_four_value;
    //-------------- TOTAL PERCENTAGE 
    /*
    var column_one_percentage = parseInt($('#total_of_column_one').text()) > 0 ? parseInt($('#TotalColumnOne').val()) - parseInt($('#total_of_column_one').text()) : 0;
    var column_two_percentage = parseInt($('#total_of_column_two').text()) > 0 ? parseInt($('#TotalColumnTwo').val()) - parseInt($('#total_of_column_two').text()) : 0;
    var column_three_percentage = parseInt($('#total_of_column_three').text()) > 0 ? parseInt($('#TotalColumnThree').val()) - parseInt($('#total_of_column_three').text()) : 0;
    var column_four_percentage = parseInt($('#total_of_column_four').text()) > 0 ? parseInt($('#TotalColumnFour').val()) - parseInt($('#total_of_column_four').text()) : 0;
    */

    var column_one_percentage = column_one_value > 0 ? total_Column_Sum / column_one_value : 0;
    var column_two_percentage = column_two_value > 0 ? total_Column_Sum / column_two_value : 0;
    var column_three_percentage = column_three_value > 0 ? total_Column_Sum / column_three_value : 0;
    var column_four_percentage = column_four_value > 0 ? total_Column_Sum / column_four_value : 0;


    var grandTotal_Percentage = column_one_percentage + column_two_percentage + column_three_percentage + column_four_percentage;
    $('#totalPercentage_of_All_Columns').text(grandTotal_Percentage);
}