var AppraisalId = parseInt(window.location.href.split('?')[1].split('=')[1]);
var AppraisalEmployeeId = parseInt(window.location.href.split('?')[2].split('=')[1]);
var AppraisalEmployee_DepartmentId = parseInt(window.location.href.split('?')[3].split('=')[1]);
var Appraisal_Year = parseInt(window.location.href.split('?')[4].split('=')[1]);
var Appraisal_ManagerId = parseInt(window.location.href.split('?')[5].split('=')[1]);

 
$(function () {



    if (AppraisalId == 0) {
        fn_Load_Appraisal_Form();

    } else {
        fn_Load_Appraisal_Answers();
    }


    // loadEmployeeProfile();
});



function fn_Load_Appraisal_Form() {

    ajaxRequest({
        commandName: 'Appraisal_Template_Get', values: { Language: _currentLanguage }, CallBack: fn_Load_Appraisal_FormCallBack
    });
}
function fn_Load_Appraisal_Answers() {

    ajaxRequest({
        commandName: 'Request_Appraisal_Answer_Get', values: {
            Employee_Id: AppraisalEmployeeId,
            HR_Department_Id: AppraisalEmployee_DepartmentId,
            Year: Appraisal_Year,

            ManagerId: Appraisal_ManagerId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).id,
            Language: _currentLanguage
        }, CallBack: fn_Load_Appraisal_FormCallBack
    });
}

function fn_Load_Appraisal_FormCallBack(response) {

    var db_response = JSON.parse(response.Value);
    if (db_response.length > 0) {
         $('.append-appraisal-data').empty();
        var isCategoryNameExist = '', appendCategory = '', appendFooter = '', collapse_id_ = '', question_Count = 0;

        for (var i = 0; i < db_response.length; i++) {
             
            question_Count = question_Count + 1
            if (isCategoryNameExist != db_response[i].category) {
                isCategoryNameExist = db_response[i].category;
                collapse_id_ = 'collapse_id_' + i;

                appendCategory = `   <div class="card-header" id="Category_` + i + `" style="background-color:` + db_response[i].background+`;">
                                        <h5 class="mb-0">
                                           
                                            <button class="btn btn-link" data-toggle="collapse" data-target="#`+ collapse_id_ + `" aria-expanded="true" aria-controls="` + collapse_id_ + `">
                                                <span>`+ db_response[i].category + `</span>
                                            </button>
                                        </h5>
                                    </div>`

                appendFooter = `<div class="card-footer">
                                <div class="row">
                                    <div class="col-md-12">
                                        <button onclick="fnSaveRecord($('#question-answer`+ collapse_id_ + `'))" class="btn btn-success  ` + PullLeft + `" id="save-btn"><i class="fa fa-save"></i> ` + btnSave + `</button>
                                        <a href="/Request/Appraisal/Create"  class="btn btn-link   ` + PullLeft + `" id="btnBack"><i class="fa fa-back"></i> ` + btnBack + `</a>
                                    </div>
                                </div>
                            </div></br>`
            } else {
                appendCategory = '';
                appendFooter = '';

                $("#question-answer" + collapse_id_).append(` 
                                    <strong>` + lblQ + '.' + question_Count + `</strong> <span>` + db_response[i].question + `</span>
                                    <div class="">
                                        <strong>`+ lblAns + ':' + `</strong>
                                        <textarea required class="form-control" cols="20" data-helper-text="" data-ui-id="" id=`+ db_response[i].question_Id + `
                                                  rows="5" style="width:50%; overflow: hidden; overflow-wrap: break-word; resize: horizontal;">` + db_response[i].answer + `</textarea>
                                    </div>`)

            }

            $('.append-appraisal-data').append(
                `  ` + appendCategory + `

                        <div id="`+ collapse_id_ + `" class="collapse show" aria-labelledby="Category_` + i + `" data-parent="#accordion">
                            <div class="card-body">
                                <div id="question-answer`+ collapse_id_ + `" class="question-answer card-block">
                                    <strong>`+ lblQ + '.' + question_Count + `</strong> <span>` + db_response[i].question + `</span>
                                    <div class="">
                                        <strong>`+ lblAns + ':' + `</strong>
                                        <textarea required class="form-control" cols="20" data-helper-text="" data-ui-id="" id=`+ db_response[i].question_Id + `
                                                  rows="5" style="width:50%; overflow: hidden; overflow-wrap: break-word; resize: horizontal;">` + db_response[i].answer + `</textarea>
                                    </div>
                                </div>
                              `+ appendFooter + `
                            </div>
                        </div>
                      `);

        }

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

    if (JSON.parse(localStorage.getItem('User')).employeeId == JSON.parse(response.Value).employeeId) {
        setTimeout(function () {
            $('#employee-evaluation').css('cursor', 'none').css('pointer-events', 'none');

            $('.card-footer').hide();
            $('.tr-btn-total').hide();
        }, 100);
    }



}

function fnSaveRecord(e) {

    var formData = $(e).find('textarea');
    if (formData.length > 0) {
        var postingArray = [];
        for (var i = 0; i < formData.length; i++) {
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
        if (postingArray.length > 0) {
         

            ajaxRequest({
                commandName: 'Request_Appraisal_Answer_Multiple_Save',
                values:
                {
                    AppraisalModel: postingArray,
                    Appraisal_Id: AppraisalId,
                    CreatedBy: JSON.parse(localStorage.getItem('User')).id,
                    Language: _currentLanguage == null ? '' : _currentLanguage
                }, CallBack: fnSaveAppraisalBulk_callback
            });


            buttonRemovePleaseWait('save-btn', btnSave, 'save');
        } else {
            buttonRemovePleaseWait('save-btn', btnSave, 'save');


            return 0;
        }
    }
}


var fnSaveAppraisalBulk_callback = function (response) {

    AppraisalId = JSON.parse(response.Value).insertedId;
    swal(response.Value);
    //fnLoadAllEmployeesListAsPerDepartment();
}
