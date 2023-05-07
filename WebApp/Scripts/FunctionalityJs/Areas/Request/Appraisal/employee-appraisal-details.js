
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

    fnLoadEmployeeAttendanceAndLeaves_Yearly();
}

function fnLoadEmployeeAttendanceAndLeaves_Yearly() {

    ajaxRequest({
        commandName: 'Employee_GetAttendanceAndLeaves_Yearly', values: { EmployeeID: AppraisalEmployeeId, Year: Appraisal_Year, Language: _currentLanguage }, CallBack: fnLoadEmployeeAttendanceAndLeaves_Yearly_Callback
    });
}
function fnLoadEmployeeAttendanceAndLeaves_Yearly_Callback(response__) {

    if (JSON.parse(response__.Value) != null) {

        $('#isPresent').val(JSON.parse(response__.Value).isPresent);
        $('#isAbsent').val(JSON.parse(response__.Value).isAbsent);
        $('#isLeave').val(JSON.parse(response__.Value).isLeave);
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
function redirecttoEdit() {
    window.location.href = '/Request/Appraisal/Self?AppraisalId=' + AppraisalId + '?' + 'EmployeeId=' + AppraisalEmployeeId + '?' + 'DepartmentId=' + AppraisalEmployee_DepartmentId + '?' + 'Year=' + Appraisal_Year + '?' + 'ManagerId=' + Appraisal_ManagerId + '';
}

function fn_Load_Appraisal_FormCallBack(response) {

    var db_response = JSON.parse(response.Value);


    if (db_response.length > 0) {

        $('#lm-remarks').text(db_response[0].lmRemarks);
        $('#cm-remarks').text(db_response[0].cmRemarks);
        $('#hr-remarks').text(db_response[0].hrRemarks);
        if (JSON.parse(localStorage.getItem('User')).employeeId != AppraisalEmployeeId) {
            if (db_response[0].status != 'Completed') {
                $('.appendButtons').append(`<div class="card-footer  "><div class="row">
                                                    <div class="col-md-12">
                                                        <button onclick="fnSaveRecord($(this),'Approved')" class="btn btn-success   ` + PullLeft + `" id="btnSave_final"><i class="fa fa-save"></i>  ` + lblApprove + `</button>
                                                        <button onclick="fnSaveRecord($('#question-answer`+ collapse_id_ + `'),'Declined')" class="btn btn-danger   ` + PullLeft + `" id=""><i class="fa fa-remove"></i> ` + lblDecline + `   </button>
                                                        <button onclick="history.back()"   class="btn btn-link   ` + PullLeft + `" id="btnBack_final"><i class="fa fa-back"></i> ` + btnBack + ` </button>
                                                    </div>
                                                    </div>
                                                </div>`);
                $('#Remarks').removeAttr('readonly', false);

            } else {

                $('#Remarks').hide();
            }
        } else {

            if (db_response[0].status.match(/Declined*/))

                $('.appendButtons').append(`<div class="card-footer  "><div class="row">
                                                    <div class="col-md-12">
                                                        <button onclick="redirecttoEdit()" class="btn btn-primary   ` + PullLeft + `" id=""><i class="fa fa-edit"></i>  ` + lblEdit + `</button>
                                                    </div>
                                                    </div>
                                                </div>`);
            $('#Remarks').hide();
        }



        $('.append-appraisal-data').empty();
        var isCategoryNameExist = '', appendCategory = '', collapse_id_ = '', question_Count = 0;

        for (var i = 0; i < db_response.length; i++) {

            question_Count = question_Count + 1



            if (isCategoryNameExist != db_response[i].category) {
                isCategoryNameExist = db_response[i].category;
                collapse_id_ = 'collapse_id_' + i;

                //   appendCategory = `   <div class="card-header" id="Category_` + i + `" style="background-color:whitesmoke;">
                appendCategory = `   <div class="card-header" id="Category_` + i + `" style="background-color:whitesmoke;">
                                        <div class="row">
                                        <div class="col-md-12">
                                        <h5 class="mb-0">
                                           
                                            <button class="btn btn-link" data-toggle="collapse" data-target="#`+ collapse_id_ + `" aria-expanded="true" aria-controls="` + collapse_id_ + `">
                                                <span style="color:` + db_response[i].color + `">` + db_response[i].category + `</span>
                                            </button>
                                        </h5>
                                    </div>                        
                                    </div>                                    
                                    </div>`



                $('.append-appraisal-data').append(
                    `  ` + appendCategory + `

                        <div id="`+ collapse_id_ + `" class="collapse show" aria-labelledby="Category_` + i + `" data-parent="#accordion">
                            <div class="card-body">
                                <div id="question-answer`+ collapse_id_ + `" class="question-answer card-block">
                                    <div class="row">
                                    <div class="col-md-12">
                                    <strong>`+ lblQ + '.' + question_Count + `</strong> <span>` + db_response[i].question + `</span></br>                                    
                                        <strong>`+ lblAns + ':' + `</strong>
                                        <textarea  readonly class="form-control" cols="20" data-helper-text="" data-ui-id=""
                                                  rows="5" style="background: white;width:100%; overflow: hidden; overflow-wrap: break-word; resize: vertical;">` + db_response[i].answer + `</textarea>
                                    
                                </div>
                                
                                </div>
                                </div>
                              
                            </div>
                        </div>
                      `);
            } else {
                appendCategory = '';


                $("#question-answer" + collapse_id_).append(` 
                                   
                                    <div class="row">
                                    <div class="col-md-12">
                                    <strong>` + lblQ + '.' + question_Count + `</strong> <span>` + db_response[i].question + `</span></br>
                                        <strong>`+ lblAns + ':' + `</strong>
                                        <textarea readonly class="form-control" cols="20" data-helper-text="" data-ui-id=""
                                                  rows="5" style="background: white;width:100%; overflow: hidden; overflow-wrap: break-word; resize: vertical;">` + db_response[i].answer + `</textarea>
                                        </div>
                                         `)

            }

            $('#' + collapse_id_).collapse('show');

        }

    }
}

function fnSaveRecord(e, bntStatus) {

    var isUnCheckedExist = 0;
    //if (JSON.parse(localStorage.getItem('User')).roleName == 'Line Manager') {
    if (JSON.parse(localStorage.getItem('User')).roleName != 'User' || JSON.parse(localStorage.getItem('User')).isHR != true) {
        $('#btn-save-appraisal-form').click();
        isUnCheckedExist = $('#employee-appraisal>tbody').find('.btn-danger').length;
    }

    if (isUnCheckedExist == 0) {


        ajaxRequest({
            commandName: 'Request_Appraisal_Update',
            values:
            {
                Appraisal_Id: AppraisalId,
                Remarks: $('#Remarks').val(),
                Status: bntStatus,
                isHR: JSON.parse(localStorage.getItem('User')).isHR == true ? 1 : 0,
                CreatedBy: JSON.parse(localStorage.getItem('User')).id,
                LoggedInRoleName: JSON.parse(localStorage.getItem('User')).roleName,
                Language: _currentLanguage == null ? '' : _currentLanguage
            }, CallBack: fnSaveAppraisalUpdate_callback
        });


    }
}

var fnSaveAppraisalUpdate_callback = function (response) {

    AppraisalId = JSON.parse(response.Value).insertedId;
    swal(response.Value);
    setTimeout(function () {

        window.location.href = '/Employees/Request/Appraisal';
    }, 500);
    //fnLoadAllEmployeesListAsPerDepartment();
}

