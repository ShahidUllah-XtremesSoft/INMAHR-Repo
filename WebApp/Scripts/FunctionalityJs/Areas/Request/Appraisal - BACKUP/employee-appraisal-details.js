
var AppraisalId = parseInt(window.location.href.split('?')[1].split('=')[1]);
var AppraisalEmployeeId = parseInt(window.location.href.split('?')[2].split('=')[1]);
var AppraisalEmployee_DepartmentId = parseInt(window.location.href.split('?')[3].split('=')[1]);
var Appraisal_Year = parseInt(window.location.href.split('?')[4].split('=')[1]);
var Appraisal_ManagerId = parseInt(window.location.href.split('?')[5].split('=')[1]);
var EmployeeNumber = window.location.href.split('?')[6].split('=')[1];


$(function () {


    loadEmployeeProfile();
    fn_Load_Appraisal_Answers();
});

function loadEmployeeProfile() {

    ajaxRequest({
        commandName: 'HR_Employee_GetByNumber', values: { Language: _currentLanguage, EmployeeNumber: EmployeeNumber }, CallBack: loadEmployeeProfileCallBack
    });
}
function loadEmployeeProfileCallBack(response) {


    $.each(JSON.parse(response.Value), function (key, value) {
        $('#' + capitalizeFirstLetter(key)).text(value);
    });


    //------------- Hidden Fields....

    if (JSON.parse(response.Value).currentFileName != null) {
        var profileImage = '/UploadFile/' + JSON.parse(response.Value).currentFileName;
        $('#ProfileImage').attr('src', profileImage);
    }

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
        var isCategoryNameExist = '', appendCategory = '', appendFooter = '', collapse_id_ = '', question_Count = 0, condition_Remarks_ReadOnly = '';

        for (var i = 0; i < db_response.length; i++) {

            question_Count = question_Count + 1
            console.log(db_response[i])

            condition_Remarks_ReadOnly = JSON.parse(localStorage.getItem('User')).employeeId == db_response[i].employee_Id ? 'readonly' : '';
            if (isCategoryNameExist != db_response[i].category) {
                isCategoryNameExist = db_response[i].category;
                collapse_id_ = 'collapse_id_' + i;
                 
                //   appendCategory = `   <div class="card-header" id="Category_` + i + `" style="background-color:whitesmoke;">
                appendCategory = `   <div class="card-header" id="Category_` + i + `" style="background-color:whitesmoke;">
                                        <div class="row">
                                        <div class="col-md-6">
                                        <h5 class="mb-0">
                                           
                                            <button class="btn btn-link" data-toggle="collapse" data-target="#`+ collapse_id_ + `" aria-expanded="true" aria-controls="` + collapse_id_ + `">
                                                <span style="color:` + db_response[i].color + `">` + db_response[i].category + `</span>
                                            </button>
                                        </h5>
                                    </div>
                                    <div class="col-md-6">
                                        <h5 class="mb-0">
                                           
                                            <button class="btn btn-link  ` + PullRight + `" data-toggle="collapse"  aria-expanded="true" aria-controls="` + collapse_id_ + `">
                                                <span style="color:` + db_response[i].color + `">` + db_response[i].status + `</span>
                                            </button>
                                        </h5>
                                    </div>                                    
                                    </div>                                    
                                    </div>`

                if (JSON.parse(localStorage.getItem('User')).employeeId != AppraisalEmployeeId) {

                    appendFooter = `<div class="card-footer">
                                <div class="row">
                                    <div class="col-md-12">
                                        <button onclick="fnSaveRecord($('#question-answer`+ collapse_id_ + `'),'Approved')" class="btn btn-success  ` + PullLeft + `" id="save-btn"><i class="fa fa-save"></i> ` + lblApprove + `</button>
                                        <button onclick="fnSaveRecord($('#question-answer`+ collapse_id_ + `'),'Declined')" class="btn btn-danger  ` + PullLeft + `" id=""><i class="fa fa-remove"></i> ` + lblDecline + `</button>
                                        <a href="/Employees/Request/Appraisal"  class="btn btn-link   ` + PullLeft + `" id="btnBack"><i class="fa fa-back"></i> ` + btnBack + `</a>
                                    </div>
                                </div>
                            </div></br>`
                }
            } else {
                appendCategory = '';
                appendFooter = '';

                $("#question-answer" + collapse_id_).append(` 
                                   
                                    <div class="row">
                                    <div class="col-md-6">
                                    <strong>` + lblQ + '.' + question_Count + `</strong> <span>` + db_response[i].question + `</span></br>
                                        <strong>`+ lblAns + ':' + `</strong>
                                        <textarea readonly class="form-control" cols="20" data-helper-text="" data-ui-id=""
                                                  rows="5" style="background: white;width:100%; overflow: hidden; overflow-wrap: break-word; resize: vertical;">` + db_response[i].answer + `</textarea>
                                        </div>
                                        <div class="col-md-6">
                                         <strong>&nbsp;</strong></br>
                                         <strong>`+ lblremarks + ':' + `</strong></br>
                                        <textarea `+ condition_Remarks_ReadOnly + ` class="Remarks form-control" cols="20" data-helper-text="" data-ui-id="" id=` + db_response[i].question_Id + `
                                                  rows="5" style="color: red;background: white;width:100%; overflow: hidden; overflow-wrap: break-word; resize: vertical;">` + db_response[i].remarks + `</textarea>
                                        </div> `)

            }

            $('.append-appraisal-data').append(
                `  ` + appendCategory + `

                        <div id="`+ collapse_id_ + `" class="collapse show" aria-labelledby="Category_` + i + `" data-parent="#accordion">
                            <div class="card-body">
                                <div id="question-answer`+ collapse_id_ + `" class="question-answer card-block">
                                    <div class="row">
                                    <div class="col-md-6">
                                    <strong>`+ lblQ + '.' + question_Count + `</strong> <span>` + db_response[i].question + `</span></br>                                    
                                        <strong>`+ lblAns + ':' + `</strong>
                                        <textarea  readonly class="form-control" cols="20" data-helper-text="" data-ui-id=""
                                                  rows="5" style="background: white;width:100%; overflow: hidden; overflow-wrap: break-word; resize: vertical;">` + db_response[i].answer + `</textarea>
                                    
                                </div>
                                <div class="col-md-6">
                                         <strong>&nbsp;</strong></br>
                                         <strong>`+ lblremarks + ':' + `</strong></br>
                                        <textarea  `+ condition_Remarks_ReadOnly + ` class="Remarks form-control" cols="20" data-helper-text="" data-ui-id="" id=` + db_response[i].question_Id + `
                                                  rows="5" style="color: red;background: white;width:100%; overflow: hidden; overflow-wrap: break-word; resize: vertical;">` + db_response[i].remarks + `</textarea>
                                        </div>
                                </div>
                                </div>
                              `+ appendFooter + `
                            </div>
                        </div>
                      `);

        }

    }
}
 

function fnSaveRecord(e,bntStatus) {
     
    var formData = $(e).find('.Remarks');
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
         //   console.log(postingArray)

            ajaxRequest({
                commandName: 'Request_Appraisal_Answer_Multiple_Remarks_Save',
                values:
                {
                    AppraisalModel: postingArray,
                    Appraisal_Id: AppraisalId,
                    Status: bntStatus,
                    CreatedBy: JSON.parse(localStorage.getItem('User')).id,
                    Language: _currentLanguage == null ? '' : _currentLanguage
                }, CallBack: fnSaveAppraisalBulk_callback
            });


            
        }  
    }
}


var fnSaveAppraisalBulk_callback = function (response) {

    AppraisalId = JSON.parse(response.Value).insertedId;
    swal(response.Value);
    //fnLoadAllEmployeesListAsPerDepartment();
}

