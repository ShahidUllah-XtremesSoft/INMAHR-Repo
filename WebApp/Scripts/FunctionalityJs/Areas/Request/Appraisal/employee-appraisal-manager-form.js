


var AppraisalId = parseInt(window.location.href.split('?')[1].split('=')[1]);
var AppraisalEmployeeId = parseInt(window.location.href.split('?')[2].split('=')[1]);
var AppraisalEmployee_DepartmentId = parseInt(window.location.href.split('?')[3].split('=')[1]);
var Appraisal_Year = parseInt(window.location.href.split('?')[4].split('=')[1]);
var Appraisal_ManagerId = parseInt(window.location.href.split('?')[5].split('=')[1]);
var EmployeeNumber = window.location.href.split('?')[6].split('=')[1];
var appraisal_Performance_Id = parseInt(window.location.href.split('?')[7].split('=')[1]);
var isUnChecked = 0;  // this variable is also used in employee-appraisal-details.js  --------please keep in mind before any modifications thanks ........by |\/|ati
$(function () {



    //------------------- Manager Appraisal Area
    // $('#ManagerAppraisalTabLi').click(function () {


    if (appraisal_Performance_Id != 0) {

        fn_Load_Appraisal_Form_data_from_db_using_Appraisal_Id();
    } else {
        if (AppraisalEmployeeId != JSON.parse(localStorage.getItem('User')).employeeId) {
            fn_Load_Appraisal_Form_For_Manager();
        }
    }
    setTimeout(function () {

        //  if (AppraisalEmployeeId == JSON.parse(localStorage.getItem('User')).employeeId ) {
        if (JSON.parse(localStorage.getItem('User')).roleName == 'User' || JSON.parse(localStorage.getItem('User')).isHR == true) {
            $('.showHideManagerTab').css('pointer-events', 'none')
            $('#btn-save-appraisal-form').css('pointer-events', 'none');
            $('.btnBack').css('pointer-events', 'none');
            $('#employee-appraisal').css('pointer-events', 'none');
            $('.showHideFromEmployee').hide();
        }


    }, 50)
    //   });
});

function fn_Load_Appraisal_Form_data_from_db_using_Appraisal_Id() {

    ajaxRequest({
        commandName: 'Request_Appraisal_Performance_Answer_Get_By_Id', values: { Id: appraisal_Performance_Id, AppraisalId: AppraisalId, Language: _currentLanguage }, CallBack: fn_Load_Appraisal_Form_For_ManagerCallBack
    });
}
//function fn_Load_Appraisal_Form_For_Manager_data_from_db_using_Appraisal_IdCallBack(response) {


//    $('#employee-appraisal').empty();
//    if (JSON.parse(response.Value) != null) {

//        $('#employee-appraisal').html(JSON.parse(response.Value).appraisalForm);


//        $('.showHideManagerTab').show();
//    } else {
//        $('.showHideManagerTab').hide();
//    }
//}

function fn_Load_Appraisal_Form_For_Manager() {

    ajaxRequest({
        commandName: 'Setup_Appraisal_Template_Get', values: { Language: _currentLanguage }, CallBack: fn_Load_Appraisal_Form_For_ManagerCallBack
    });
}

function fn_Load_Appraisal_Form_For_ManagerCallBack(response) {

    var header = JSON.parse(response.Value)[0];
    var body = JSON.parse(response.Value)[1];

    //------- SET TOTAL VALUE IT WILL BE USED IN TOTAL CALCULATION.
    //$('#TotalColumnOne').val(body[0].totalColumnOne);
    //$('#TotalColumnTwo').val(body[0].totalColumnTwo);
    //$('#TotalColumnThree').val(body[0].totalColumnThree);
    //$('#TotalColumnFour').val(body[0].totalColumnFour);



    if (header.length > 0) {
        $('#employee-appraisal-header').empty()
        for (var headerCount = 0; headerCount < header.length; headerCount++) {

            $('#employee-appraisal-header').append('<td style="text-align:center;border-right: 1px solid;" class=" "><strong>' + header[headerCount].title + '</strong></td>')
        }
    }

    if (body.length > 0) {
        $('#employee-appraisal>tbody').empty()
        var groupCount_to_Avoid_Duplication = 0;
        var previous_group_name = '';

        for (var bodyCount = 0; bodyCount < body.length; bodyCount++) {

            //----------- APPEND GROUP ROW
            if (body[bodyCount].parent == body[bodyCount].groupsForCondition && groupCount_to_Avoid_Duplication == 0) {
                previous_group_name = body[bodyCount].parent;
                groupCount_to_Avoid_Duplication = 1;
                $('#employee-appraisal>tbody').append(' <tr><td colspan="2"  style="background: lightgray;"> <strong> ' + body[bodyCount].groups + '</strong> </td></tr>')
            } else {
                if (body[bodyCount].parent != previous_group_name) {
                    groupCount_to_Avoid_Duplication = 0;
                }
            }

            var checkOne = '', checkTwo = '', checkThree = '', checkFour = '';
            body[bodyCount].isColumnOne == "Checked" ? checkOne = "Checked" : checkOne = "Unchecked";
            body[bodyCount].isColumnTwo == "Checked" ? checkTwo = "Checked" : checkTwo = "Unchecked";
            body[bodyCount].isColumnThree == "Checked" ? checkThree = "Checked" : checkThree = "Unchecked";
            body[bodyCount].isColumnFour == "Checked" ? checkFour = "Checked" : checkFour = "Unchecked";

            //----------- APPEND CHILD ROWS
            $('#employee-appraisal>tbody').append(' <tr class=' + body[bodyCount].name + ' id=' + body[bodyCount].id + ' style="border: 1px solid;">' +
                // COLUMN ONE
                '<td class="" style="border-right: 1px solid;border-left: 1px solid;">' + body[bodyCount].title + '</td>' +
                '<td class="" style="border-right: 1px solid;">' +
                '<label class="btn btn_Column" for=' + body[bodyCount].name + '_' + body[bodyCount].columnOne + 'columnOne' + '  style="margin-bottom: 0px;width:100%;">' +
                '<input type="radio"  ' + checkOne + '  id=' + body[bodyCount].name + '_' + body[bodyCount].columnOne + 'columnOne' + '  style="width: 15px;height: 15px;" name=' + body[bodyCount].name + '>' +
                '<font class="columnOne"  style="font-size: large;"> ' + body[bodyCount].columnOne + ' </font>' +
                '</label>' +
                '</td>' +
                // COLUMN TWO
                '<td class="" style="border-right: 1px solid;">' +
                '<label class="btn btn_Column" for=' + body[bodyCount].name + '_' + body[bodyCount].columnTwo + 'columnTwo' + '  style="margin-bottom: 0px;width:100%;">' +
                '<input type="radio"  ' + checkTwo + ' id=' + body[bodyCount].name + '_' + body[bodyCount].columnTwo + 'columnTwo' + '  style="width: 15px;height: 15px;" name=' + body[bodyCount].name + '>' +
                '<font class="columnTwo"  style="font-size: large;"> ' + body[bodyCount].columnTwo + ' </font>' +
                '</label>' +
                '</td>' +
                // COLUMN THREE
                '<td class="" style="border-right: 1px solid;">' +
                '<label class="btn btn_Column" for=' + body[bodyCount].name + '_' + body[bodyCount].columnThree + 'columnThree' + '  style="margin-bottom: 0px;width:100%;">' +
                '<input type="radio"  ' + checkThree + '  id=' + body[bodyCount].name + '_' + body[bodyCount].columnThree + 'columnThree' + '  style="width: 15px;height: 15px;" name=' + body[bodyCount].name + '>' +
                '<font class="columnThree"  style="font-size: large;"> ' + body[bodyCount].columnThree + ' </font>' +
                '</label>' +
                '</td>' +
                // COLUMN FOUR
                '<td class="" style="border-right: 1px solid;">' +
                '<label class="btn btn_Column" for=' + body[bodyCount].name + '_' + body[bodyCount].columnFour + 'columnFour' + '  style="margin-bottom: 0px;width:100%;">' +
                '<input type="radio"  ' + checkFour + ' id=' + body[bodyCount].name + '_' + body[bodyCount].columnFour + 'columnFour' + '  style="width: 15px;height: 15px;" name=' + body[bodyCount].name + '>' +
                '<font class="columnFour"  style="font-size: large;"> ' + body[bodyCount].columnFour + ' </font>' +
                '</label>' +
                '</td></tr>')


            if ((body.length - 1) == bodyCount) {

                setTimeout(function () {
                    if (JSON.parse(localStorage.getItem('User')).employeeId == AppraisalEmployeeId) {
                        $('#employee-appraisal').css('pointer-events', 'none');
                    }

                    fnCalculate_Total_Result();
                }, 200);
            }
        }


        //---------- FOOTER 
        $('#employee-appraisal>tbody').append('<tr style="border: 1px solid; background: cyan;" class="PerformanceScores">' +
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
            /*  '<tr style="border: 1px solid; " class=" tr-btn-total ">' +
           '<td> </td>' +
           '<td colspan="4" style="text-align:end;border-right: 1px solid;font-size: x-large;" class=" ">' +
           '<button class="btn form-control btn-primary showHideFromEmployee" id="btn-calculate-total-result" onclick="fnCalculate_Total_Result()"><i class="fa fa-calculator"></i> ' + lblTotal + ' </button>' +
           '</td>' +
           '</tr>' +
           ' <tr><td colspan="5"> &nbsp; </td></tr>'
           + '<tr><td colspan="5"> &nbsp; </td></tr>'
           + '<tr><td style="background: lightgray;"> <strong>' + lblProcedures + ' </strong> </td></tr>'
              + '<tr class="Procedures lm-data" style="border: 1px solid;">'
              //    @*------------------------------------- this is Line Manager (LM) data --------------------------------------*@
              + '    <td  style="border-right: 1px solid;border-left: 1px solid;">' + lblLineManager + ' </td>'
              + '    <td  style="border-right: 1px solid;display:none;"> <input class="form-control" onfocusout="fnSetDate(this)" id="lm-date" type="date" value="" /> <span  style="margin-left: 1rem;" id="lm-date-span"></span></td>'
              + '    <td  style="border-right: 1px solid;border-left: 1px solid;">' + lblApprovedBy + ' </td>'
              + '    <td  colspan="2" style="  width: 20%;">'
              + '        <button type="button" id="btn-signature-lm" class="btn form-control hideSignature_btn_LM" areaName="LM" onclick="fnUploadEmployeeSignature(this);"><i class=""></i> ' + lblSignature + '</button>'
              + '        <div class=" ">'
              + '            <input type="hidden" class="form-control" name="Signature" id="Signature" value="" />'
              + '            <div id="lm_noSignature" style="display:none;">'
              + '                <button type="button" disabled class="btn @Resources.Common.PullRight" style=" font-size: large;">' + lblNoSignature + '</button>'
              + '            </div>'
              + '            <div id="lm_loadSignature" style="display:none;">'
              + '                <img src="" class="img-avatar  @Resources.Common.PullLeft" id="lm_loadEmployeeSignature" style="border-radius:4%;width:130px;" alt=' + lblSignature + ' >'
              + '            </div>'
              + '        </div>'
              + '    </td>'
              + '</tr>'
              + '<tr class="Procedures HR-data" style="border: 1px solid;">'
              //    @*------------------------------------- this is HR  data --------------------------------------*@
              + '    <td  style="border-right: 1px solid;border-left: 1px solid;">' + lblHR + ' </td>'
              + '    <td  style="border-right: 1px solid;display:none;"> <input class="form-control" onfocusout="fnSetDate(this)" id="hr-date" type="date" value="" /> <span style="margin-left: 1rem;" id="hr-date-span"></span></td>'
              + '    <td  style="border-right: 1px solid;border-left: 1px solid;">' + lblApprovedBy + ' </td>'
              + '    <td  colspan="2" style="  ">'
              + '        <button type="button" id="btn-signature-hr" class="btn form-control hideSignature_btn_HR"  areaName="HR" onclick="fnUploadEmployeeSignature(this);"><i class=""></i>' + lblSignature + '</button>'
              + '        <div class=" ">'
              + '            <input type="hidden" class="form-control" name="Signature" id="Signature" value="" />'
              + '            <div id="hr_noSignature" style="display:none;">'
              + '                <button type="button" disabled class="btn @Resources.Common.PullRight" style=" font-size: large;">' + lblNoSignature + '</button>'
              + '            </div>'
              + '            <div id="hr_loadSignature" style="display:none;">'
              + '                <img src="" class="img-avatar  @Resources.Common.PullLeft" id="hr_loadEmployeeSignature" style="border-radius:4%;width:130px;" alt=' + lblSignature + ' >'
              + '            </div>'
              + '        </div>'
  
              + '    </td>'
              + '</tr>'
              + '<tr class="Procedures CM-data" style="border: 1px solid;">'
              //    @*------------------------------------- this is CM  data --------------------------------------*@
              + '    <td  style="border-right: 1px solid;border-left: 1px solid;"> ' + lblCompanyManager + '</td>'
              + '    <td  style="border-right: 1px solid;display:none;"> <input class="form-control " onfocusout="fnSetDate(this)" id="cm-date" type="date" value="" /> <span style="margin-left: 1rem;" id="cm-date-span"></span></td>'
              + '    <td  style="border-right: 1px solid;border-left: 1px solid;">' + lblApprovedBy + '  </td>'
              + '    <td  colspan="2" style="  ">'
              + '        <button type="button" id="btn-signature-cm" class="btn form-control hideSignature_btn_CM"  areaName="CM" onclick="fnUploadEmployeeSignature(this);"><i class=""></i>  ' + lblSignature + ' </button>'
              + '        <div class=" ">'
              + '            <input type="hidden" class="form-control" name="Signature" id="Signature" value="" />'
              + '            <div id="cm_noSignature" style="display:none;">'
              + '                <button type="button" disabled class="bt  @Resources.Common.PullRight" style=" font-size: large;">' + lblNoSignature + '</button>'
              + '            </div>'
              + '            <div id="cm_loadSignature" style="display:none;">'
              + '                <img src="" class="img-avatar  @Resources.Common.PullLeft" id="cm_loadEmployeeSignature" style="border-radius:4%;width:130px;" alt=' + lblSignature + ' >'
              + '            </div>'
              + '        </div>'
  
  
              + '    </td>'
              + '</tr>*/
            + '')
    }

}


//---------------- LOAD EMPLOYEE SIGNATURE 
//------------------------------------------ Developed by /\/\ati
function fnUploadEmployeeSignature(areaNameForSignature) {

    sessionStorage.setItem('areaNameForSignature', areaNameForSignature.attributes.areaname.value)
    ajaxRequest({ commandName: 'HR_Employee_Signature_Get', values: { LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId, }, CallBack: loadfnUploadEmployeeSignatureCallBack });
}

function loadfnUploadEmployeeSignatureCallBack(d) {

    var _employeeSignature = JSON.parse(d.Value);

    if (_employeeSignature == null) {
        sessionStorage.getItem('areaNameForSignature') == 'LM' ? ($('#lm_noSignature').show(), $('.hideSignature_btn_LM').hide()) : '';
        sessionStorage.getItem('areaNameForSignature') == 'HR' ? ($('#hr_noSignature').show(), $('.hideSignature_btn_HR').hide()) : '';
        sessionStorage.getItem('areaNameForSignature') == 'CM' ? ($('#cm_noSignature').show(), $('.hideSignature_btn_CM').hide()) : '';


    } else {

        sessionStorage.getItem('areaNameForSignature') == 'LM' ? ($('#lm_loadSignature').show(), $('.hideSignature_btn_LM').hide()) : '';
        sessionStorage.getItem('areaNameForSignature') == 'HR' ? ($('#hr_loadSignature').show(), $('.hideSignature_btn_HR').hide()) : '';
        sessionStorage.getItem('areaNameForSignature') == 'CM' ? ($('#cm_loadSignature').show(), $('.hideSignature_btn_CM').hide()) : '';




        if (_employeeSignature.currentFileName != null) {
            var singature_ = '/UploadFile/' + _employeeSignature.currentFileName;


            sessionStorage.getItem('areaNameForSignature') == 'LM' ? $('#lm_loadEmployeeSignature').attr('src', singature_) : '';
            sessionStorage.getItem('areaNameForSignature') == 'HR' ? $('#hr_loadEmployeeSignature').attr('src', singature_) : '';
            sessionStorage.getItem('areaNameForSignature') == 'CM' ? $('#cm_loadEmployeeSignature').attr('src', singature_) : '';



        }
    }

}





$('#btn-save-appraisal-form').click(function () {
    /*
    var table = $('#employee-appraisal')    
    var table_Body = $('#employee-appraisal>tbody')
    var postingArray = [];
    for (var i = 0; i < table_Body[0].rows.length; i++) {
         
        var tr = table_Body[0].rows[i];
        var child_tr = $(tr).children().length > 1
        if (child_tr == true) {

            for (var j = 1; j < $(tr).children().length; j++) {
                var child_data = $(tr).children()[j];
            }
        }

        postingArray.push(
            {

                //--------- Form Data-------------
                Id: 0,
                QuestionId: formData[i].id,
                Answer: formData[i].value,
                Employee_Id: AppraisalEmployeeId,
                HR_Department_Id: AppraisalEmployee_DepartmentId,
                HR_Department_Manager_Id: Appraisal_ManagerId,
                Year: Appraisal_Year



            });


    }
    */
    var childArray = [];
    var table_Body = $('#employee-appraisal>tbody')
    for (var j = 0; j < table_Body[0].rows.length; j++) {
        var tr = table_Body[0].rows[j];
        var child_tr = $(tr).children().length > 1


        if (child_tr == true) {

            for (var k = 1; k < $(tr).children().length; k++) {
                var child_data = $(tr).children();

                //if ($($('label.btn >input')[k]).is(':checked') == false) {
                if ($(child_data).find('input').length > 0) {
                    if ($(child_data).find('input').is(':checked') == false) {

                        $(tr).addClass('btn-danger')
                        //   isUnChecked = true;
                        break;
                    }
                    else {

                        //    for (var m = 1; m < $(child_data).length; m++) {
                        childArray.push({
                            Setup_Appraisal_Performance_Id: parseInt($(tr)[0].id),
                            AppraisalId: parseInt(AppraisalId),
                            ColumnOne: $($(tr)[0]).find('input')[0].checked == true ? 'Checked' : 'Unchecked',
                            ColumnTwo: $($(tr)[0]).find('input')[1].checked == true ? 'Checked' : 'Unchecked',
                            ColumnThree: $($(tr)[0]).find('input')[2].checked == true ? 'Checked' : 'Unchecked',
                            ColumnFour: $($(tr)[0]).find('input')[3].checked == true ? 'Checked' : 'Unchecked'
                        })
                        //   }
                        //   isUnChecked = false;
                        $(tr).removeClass('btn-danger')

                        break;
                    }
                }
            }

        }


    }
    //  console.log(childArray)
    isUnChecked = $('#employee-appraisal>tbody').find('.btn-danger').length;
    if (isUnChecked == 0) {

        /*
        ajaxRequest({
            commandName: 'Request_Appraisal_Performance_Save',
            values: {
                Id: appraisal_Performance_Id,
                AppraisalId: AppraisalId,
                Employee_Id: AppraisalEmployeeId,
                Employee_Department_Id: AppraisalEmployee_DepartmentId,
                Employee_Department_Parent_Id: JSON.parse(localStorage.getItem('User')).employee_Department_ParentId,
                AppraisalForm: $('#employee-appraisal').html(),
                AppraisalFormArb: $('#employee-appraisal').html(),
                CreatedBy: JSON.parse(localStorage.getItem('User')).id,
                LoggedInEmployee_RoleId: JSON.parse(localStorage.getItem('User')).roleId,
                Year: Appraisal_Year,
                Language: _currentLanguage
            }, CallBack: fn_Request_Appraisal_Employee_Form_Save_CallBack
        });
        */

        ajaxRequest({
            commandName: 'Request_Appraisal_Performance_Multiple_Save',
            values:
            {
                AppraisalPerformanceModel: childArray,
                AppraisalId: AppraisalId,
                CreatedBy: JSON.parse(localStorage.getItem('User')).id,
                Language: _currentLanguage == null ? '' : _currentLanguage
            }, CallBack: fnSaveAppraisalPerformanceBulk_callback
        });
    }

});


function fnSaveAppraisalPerformanceBulk_callback(response) {

    swal(response.Value);

    appraisal_Performance_Id = JSON.parse(response.Value).insertedId;
}

function fnCalculate_Total_Result() {
    var column_one_value = 0, column_two_value = 0, column_three_value = 0, column_four_value = 0;

    var column_one, column_two, column_three, column_four;

    column_one = $('#employee-appraisal tr td font.columnOne');
    column_two = $('#employee-appraisal tr td font.columnTwo');
    column_three = $('#employee-appraisal tr td font.columnThree');
    column_four = $('#employee-appraisal tr td font.columnFour');


    //--------- LOOP ON EACH FIELD
    for (var i_4 = 0; i_4 < column_one.length; i_4++) {

        var input_isChecked = column_one[i_4].parentElement.children[0]


        if (input_isChecked.checked == true) {
            column_one_value = column_one_value + parseInt(column_one[i_4].outerText);

            $('#' + column_one[i_4].parentElement.children[0].id).attr('checked', true)
        } else {
            $('#' + column_one[i_4].parentElement.children[0].id).attr('checked', false)
        }

    }

    //--------- LOOP ON EACH FIELD
    for (var i_6 = 0; i_6 < column_two.length; i_6++) {

        var input_isChecked = column_two[i_6].parentElement.children[0]
        if (input_isChecked.checked == true) {
            column_two_value = column_two_value + parseInt(column_two[i_6].outerText);


            $('#' + column_two[i_6].parentElement.children[0].id).attr('checked', true)
        } else {
            $('#' + column_two[i_6].parentElement.children[0].id).attr('checked', false)


        }

    }
    //--------- LOOP ON EACH FIELD
    for (var i_8 = 0; i_8 < column_three.length; i_8++) {

        var input_isChecked = column_three[i_8].parentElement.children[0]
        if (input_isChecked.checked == true) {
            column_three_value = column_three_value + parseInt(column_three[i_8].outerText);
            $('#' + column_three[i_8].parentElement.children[0].id).attr('checked', true)
        } else {
            $('#' + column_three[i_8].parentElement.children[0].id).attr('checked', false)
        }

    }     //--------- LOOP ON EACH FIELD
    for (var i_10 = 0; i_10 < column_four.length; i_10++) {

        var input_isChecked = column_four[i_10].parentElement.children[0]
        if (input_isChecked.checked == true) {
            column_four_value = column_four_value + parseInt(column_four[i_10].outerText);
            $('#' + column_four[i_10].parentElement.children[0].id).attr('checked', true)

        } else {
            $('#' + column_four[i_10].parentElement.children[0].id).attr('checked', false)
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


    var total_Column_Sum = column_one_value + column_two_value + column_three_value + column_four_value;
    //-------------- TOTAL PERCENTAGE 


    var column_one_percentage = column_one_value > 0 ? total_Column_Sum / column_one_value : 0;
    var column_two_percentage = column_two_value > 0 ? total_Column_Sum / column_two_value : 0;
    var column_three_percentage = column_three_value > 0 ? total_Column_Sum / column_three_value : 0;
    var column_four_percentage = column_four_value > 0 ? total_Column_Sum / column_four_value : 0;


    var grandTotal_Percentage = column_one_percentage + column_two_percentage + column_three_percentage + column_four_percentage;
    $('#totalPercentage_of_All_Columns').text(grandTotal_Percentage.toString().substring(0, 4));
}
function fnSetDate(dateArea) {

    if (dateArea.id == 'lm-date') {

        $('#lm-date-span').text(dateArea.value);
        dateArea.hidden = true;
    } else if (dateArea.id == 'hr-date') {
        $('#hr-date-span').text(dateArea.value);
        dateArea.hidden = true;
    } else if (dateArea.id == 'cm-date') {
        $('#cm-date-span').text(dateArea.value);
        dateArea.hidden = true;
    }

}
$(document).on("change", ".btn_Column", function (e) {

    fnCalculate_Total_Result();
});