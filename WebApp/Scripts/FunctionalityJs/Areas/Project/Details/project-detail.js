//------- USE FOR STEPPERS
var error_PROJECT_MAIN_SECTION_Information_Stepper = false;
var error_PROJECT_MAIN_SECTION_Design_Stepper = false;
var error_PROJECT_MAIN_SECTION_Technical_Stepper = false;
var error_PROJECT_MAIN_SECTION_Supervision_Stepper = false;


var selected_PROJECT_MAIN_SECTION_Information_Stepper = true;
var selected_PROJECT_MAIN_SECTION_Design_Stepper = false;
var selected_PROJECT_MAIN_SECTION_Technical_Stepper = false;
var selected_PROJECT_MAIN_SECTION_Supervision_Stepper = false;




//-------- END


var project_Id = (new URL(location.href)).searchParams.get('id');

$(function () {
    $('#Language').val(_currentLanguage);
    $('#LoggedInUserId').val(JSON.parse(localStorage.getItem('User')).id);
    loadProjectSectiondownList('');
    loadProject_TechnicalSectiondownList('');
    loadProject_SupervisionSectiondownList();

    setTimeout(function () {

        stepper_PROJECT_MAIN_SECTIONS();
    }, 50);

    fnLoadProjectDetailsById();

  
   
});
//|Load Project Details Start
function fnLoadProjectDetailsById() {
    ajaxRequest({
        commandName: 'Project_Details_By_Id',
        values: {
            Id: project_Id,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            Language: $('#Language').val()
        }, CallBack: loadProjectDetailsByIdCallBack
    });
}
function loadProjectDetailsByIdCallBack(response) {
    var response = JSON.parse(response.Value);

    if (response != null) {

        $(".txt-project-title").text(response.projectTitle)
        $(".project-number").text(response.projectNumber)
        $(".txt-description").html(response.descriptionEng)
        $(".text-price").text(response.price)
        $(".text-startdate").text(response.projectStartDate)
        $(".text-enddate").text(response.projectEndDate)
        $(".text-client-name").text(response.clientName)
        $(".text-progress-status").text(response.projectStatus)
        $(".text-project-created-by").text(response.projectCreaterName)
        $(".project_status_ddl").val(response.status)
        $(".ProjectCategory").text(response.projectCategory)
        $(".IsVIP").text(response.vipStatus)
        $(".IsUrgent").text(response.urgentStatus)
        $(".ProjectCity").text(response.cityName)
        $(".ProjectLocation").text(response.location)
        $(".ProjectType").text(response.projectUnitType)
        $(".ProjectAreaType").text(response.projectUnit)
        $(".ProjectArea").text()
        $(".Floor").text(response.floor)
        $(".PlotNo").text(response.plotNo)
        $(".MulkNo").text(response.mulkNo)
        $(".Room").text(response.rooms)
        $(".Bathroom").text(response.bathrooms)
        $(".Kitchen").text(response.kitchen)
        $(".Hall").text(response.hall)
        $(".Garage").text(response.garage)

        // Contractor Data
        $(".text-contractor").text(response.contractorName);
        $("#client-id-get-by-project").val(response.client_Id);


        fnLoadAttachmentDetailsById();
        //if (JSON.parse(response.Value).currentFileName != null) {
        //    var profileImage = '/UploadFile/' + JSON.parse(response.Value).currentFileName;
        //    $('#ProfileImage').attr('src', profileImage);
    }
}

//|Load Project Details Start
function fnLoadAttachmentDetailsById() {
    ajaxRequest({
        commandName: 'Project_Attachment_By_Id',
        values: {
            Id: project_Id,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            Language: $('#Language').val()
        }, CallBack: fnLoadAttachmentDetailsByIdCallBack
    });
}
function fnLoadAttachmentDetailsByIdCallBack(response) {

    var responseJSON = JSON.parse(response.Value);

    if (responseJSON != null) {
        $('.load-attachments').empty();
        for (var i = 0; i < responseJSON.length; i++) {
            if (responseJSON[i].currentFileName != null) {

                var fileExtension = "";
                var attachmentName = '';
                //--------------------------- ATTACHMENT WORK HERE ----------------------------------------
                if (responseJSON[i].filePath.split('.')[1] == "docx" || responseJSON[i].filePath.split('.')[1] == "doc" || responseJSON[i].filePath.split('.')[1] == "docs") {
                    fileExtension = "/Content/Images/docx.png";
                } else if (responseJSON[i].filePath.split('.')[1] == "pdf" || responseJSON[i].filePath.split('.')[1] == "PDF") {


                    fileExtension = "/Content/Images/pdf.png";

                } else if (responseJSON[i].filePath.split('.')[1] == "xls" || responseJSON[i].filePath.split('.')[1] == "xlsx") {
                    fileExtension = "/Content/Images/xls.png";
                }
                else if (responseJSON[i].filePath.split('.')[1] == "jpg" || responseJSON[i].filePath.split('.')[1] == "JPG" || responseJSON[i].filePath.split('.')[1] == "jpeg" || responseJSON[i].filePath.split('.')[1] == "JPEG" || responseJSON[i].filePath.split('.')[1] == "png" || responseJSON[i].filePath.split('.')[1] == "PNG") {
                    fileExtension = "/Content/Images/attachment-icon.png";
                    // fileExtension = '/UploadFile/' + responseJSON[i].currentFileName;
                } else {
                    fileExtension = "/Content/Images/attachment.png";
                }

                $('.load-attachments').append('' +
                    '<tr>' +
                    '<td><a target="_blank" href="/UploadFile/' + responseJSON[i].currentFileName + '" class="m-b-5 d-block">  <img src="' + fileExtension + '" class="img-avatar"   style="border-radius: 6px;width: auto;height: 3rem;"></a> </td>' +
                    '<td><a target="_blank" href="/UploadFile/' + responseJSON[i].currentFileName + '" class="m-b-5 d-block">' + responseJSON[i].orignalFileName + '</a></td>' +
                    '</tr>')

                //$('.load-attachmentss').append('<a target="_blank" href="/UploadFile/' + responseJSON[i].currentFileName + '" class=""> <div class="col-md-2  " style="height: 130px;"><div class="uploaded-box"><div class="uploaded-img"><img src="' + fileExtension + '" width="50" height="50" class="img-fluid" alt="" style="margin-right:auto;margin-left:auto;"></div><div class="uploaded-img-name" style="text-align: center;"><hr/>' + responseJSON[i].orignalFileName +'</div></div></div></a>')


                //--------------------------- ATTACHMENT  WORK END ----------------------------------------


            }
        }
    }
}





/*

************PROJECT MAIN STEPPER START ********************* By Mati

*/

function stepper_PROJECT_MAIN_SECTIONS() {

    var step_Columns = [
        {
            label: "Project Information",
            error: error_PROJECT_MAIN_SECTION_Information_Stepper,
            //selected: selected_PROJECT_MAIN_SECTION_Information_Stepper,

        },
        {
            label: "Design Section",
            error: error_PROJECT_MAIN_SECTION_Design_Stepper,
            // selected: selected_PROJECT_MAIN_SECTION_Design_Stepper,
            // Id: 333,
        },
        {
            label: "Technical Section",
            error: error_PROJECT_MAIN_SECTION_Technical_Stepper,
            //    selected: selected_PROJECT_MAIN_SECTION_Technical_Stepper
        },
        {
            label: "Supervision Section",
            error: error_PROJECT_MAIN_SECTION_Supervision_Stepper,
            //   selected: selected_PROJECT_MAIN_SECTION_Supervision_Stepper
        },
    ];

    bindkendoStepper('project-section-stepper', false, step_Columns, '', stepper_Fn_Onselect, 1200, "horizontal");
    function onActivate(e) {
        var stepper_data = e.step.options;
    }

    function stepper_Fn_Onselect(e) {

        var stepper_data = e.step.options;
        //  console.log("Selected: " + stepper_data.Id);

        fnCheckProjectTab(stepper_data.label);
    }
}
/*

************PROJECT MAIN STEPPER START END********************* By Mati

*/


function fnCheckProjectTab(selectedTab) {


    if (selectedTab == lblProjectInformation) {

        $('.projectTabs').removeClass('active');
        $('#ProjectInfo').addClass('active');
        $('#sub-section-progress-bar').hide();
        // loadPersonalDocumentsKendoGrid();



    } else if (selectedTab == lblProjectDesignSection) {

        $('.projectTabs').removeClass('active');
        $('#ProjectDesignSection').addClass('active');
        $('#sub-section-progress-bar').show();

        loadProjectSectiondownList('DesignSection');
        setTimeout(function () {

            fnLoadDesignSection_Document(project_Id, $("#design-section-stepper").data('kendoStepper').selectedStep.options.Id, 'grid-project-government-document');

        }, 120);
    } else if (selectedTab == lblProjectTechnicalSection) {

        $('.projectTabs').removeClass('active');
        $('#ProjectTechnicalSection').addClass('active');
        $('#sub-section-progress-bar').show();
        loadProject_TechnicalSectiondownList('TechnicalSection');
        setTimeout(function () {
            var technical_section_stepper_id = $("#technical-section-stepper").data('kendoStepper').selectedStep.options.Id;
            fnLoadTechnicalSection_Document(project_Id, technical_section_stepper_id, 'grid-project-technical-section-technical-manager');

        }, 120);
    } else if (selectedTab == lblProjectSupervisionSection) {

        $('.projectTabs').removeClass('active');
        $('#ProjectSupervisionSection').addClass('active');
        $('#sub-section-progress-bar').show();
        loadProject_SupervisionSectiondownList();
        setTimeout(function () {
            var supervision_section_stepper_id = $("#supervision-section-stepper").data('kendoStepper').selectedStep.options.Id;
            fnLoadSupervisionSection_Document(project_Id, supervision_section_stepper_id, 'grid-project-supervision-section-payments');

        }, 120);

    } else {
        alert('else');
    }

}
function fnCheckProject_SubSection_Tab(selectedTab, current_Step_Id) {
    //  setTimeout(function () {

    //  var design_Selected_step_name = $("#design-section-stepper").data('kendoStepper').selectedStep.options.label;
    //var selectedPanel = $(".projectDesignSectionTabs.tab-pane");
    //  var design_Selected_Step_Name = $('.projectDesignSectionTabs').parent().parent().parent().parent().find('nav').find('.k-step-focus').find('.k-step-text').text();


    //$('.projectDesignSectionTabs').removeClass('active');
    //$('#'+$('.projectDesignSectionTabs div.row').parent()[0].id).addClass('active');

    $('.projectDesignSectionTabs').removeClass('active');
    $('.projectTechnicalSectionTabs').removeClass('active');
    $('.projectSupervisionSectionTabs').removeClass('active');

    if (selectedTab == 'Government Documents') {
        $('#DesignSection_GovernmentInfo').addClass('active');

        fnLoadDesignSection_Document(project_Id, current_Step_Id, 'grid-project-government-document');

    } else if (selectedTab == 'Initial Sketch') {
        $('#DesignSection_InitialSketch').addClass('active');

        fnLoadDesignSection_Document(project_Id, current_Step_Id, 'grid-project-initial-sketch-document');

    } else if (selectedTab == 'Sketch Planning') {
        $('#DesignSection_SketchPlanning').addClass('active');

        fnLoadDesignSection_Document(project_Id, current_Step_Id, 'grid-project-sketch-planning-document');

    } else if (selectedTab == 'Town Planning') {
        $('#DesignSection_TownPlanning').addClass('active');

        fnLoadDesignSection_Document(project_Id, current_Step_Id, 'grid-project-town-planning-document');

    } else if (selectedTab == 'Modifications') {
        $('#DesignSection_Modifications').addClass('active');

        fnLoadDesignSection_Document(project_Id, current_Step_Id, 'grid-project-modification-document');

    } else if (selectedTab == 'Modification Type') {
        $('#DesignSection_ModificationType').addClass('active');

        fnLoadDesignSection_Document(project_Id, current_Step_Id, 'grid-project-modification-type-document');

    } else if (selectedTab == 'Modification Services') {
        $('#DesignSection_ModificationServices').addClass('active');

        fnLoadDesignSection_Document(project_Id, current_Step_Id, 'grid-project-modification-services-document');

    } else if (selectedTab == 'Modification Fee') {
        $('#DesignSection_ModificationFee').addClass('active');

        fnLoadDesignSection_Document(project_Id, current_Step_Id, 'grid-project-modification-fee-document');

    }
    //_____________________ _______________________ _____________________________________________________________
    //_____________________ _______________________ _____________________________________________________________
    //_____________________ TECHNICAL SECTION START _____________________________________________________________
    //_____________________ _______________________ _____________________________________________________________

    else if (selectedTab == 'Technical Manager') {
        $('#TechnicalSection_TechnicalManager').addClass('active');

        fnLoadTechnicalSection_Document(project_Id, current_Step_Id, 'grid-project-technical-section-technical-manager');

    } else if (selectedTab == 'MEP Section') {
        $('#TechnicalSection_MEPSection').addClass('active');

        fnLoadTechnicalSection_Document(project_Id, current_Step_Id, 'grid-project-technical-section-mep-section');

    } else if (selectedTab == 'Structural Section') {
        $('#TechnicalSection_StructuralSection').addClass('active');

        fnLoadTechnicalSection_Document(project_Id, current_Step_Id, 'grid-project-technical-section-structural-section');

    } else if (selectedTab == 'Municipality Section') {
        $('#TechnicalSection_MunicipalitySection').addClass('active');

        fnLoadTechnicalSection_Document(project_Id, current_Step_Id, 'grid-project-technical-section-municipality-section');

    } else if (selectedTab == 'Tender Section') {
        $('#TechnicalSection_TenderSection').addClass('active');

        fnLoadTechnicalSection_Document(project_Id, current_Step_Id, 'grid-project-technical-section-tender-section');

    } else if (selectedTab == 'MEP Submission Section') {
        $('#TechnicalSection_MEPSubmissionSection').addClass('active');

        fnLoadTechnicalSection_Document(project_Id, current_Step_Id, 'grid-project-technical-section-mep-submission-section');

    } else if (selectedTab == 'MEP Approval Section') {
        $('#TechnicalSection_MEPApprovalSection').addClass('active');

        fnLoadTechnicalSection_Document(project_Id, current_Step_Id, 'grid-project-technical-section-mep-approval-section');

    } else if (selectedTab == 'Municipality Submission Section') {
        $('#TechnicalSection_MunicipalitySubmissionSection').addClass('active');

        fnLoadTechnicalSection_Document(project_Id, current_Step_Id, 'grid-project-technical-section-municipality-submission-section');

    }   //_____________________ _______________________ _____________________________________________________________
    //_____________________ _______________________ _____________________________________________________________
    //_____________________ SUPERVISION SECTION START _____________________________________________________________
    //_____________________ _______________________ _____________________________________________________________

    else if (selectedTab == 'Payments') {
        $('#SupervisionSection_Payments').addClass('active');
        fnLoadSupervisionSection_Document(project_Id, current_Step_Id, 'grid-project-supervision-section-payments');

    } else if (selectedTab == 'Site') {
        $('#SupervisionSection_Site').addClass('active');
        fnLoadSupervisionSection_Document(project_Id, current_Step_Id, 'grid-project-supervision-site');

    } else if (selectedTab == 'Supervision Letters') {
        $('#SupervisionSection_SupervisionLetters').addClass('active');
        fnLoadSupervisionSection_Document(project_Id, current_Step_Id, 'grid-project-supervision-section-supervision-letters');

    } else if (selectedTab == 'Supervision Municipality') {
        $('#SupervisionSection_SupervisionMunicipality').addClass('active');
        fnLoadSupervisionSection_Document(project_Id, current_Step_Id, 'grid-project-supervision-section-municipality');

    } else if (selectedTab == 'Shop Drawing/Sub Contractor') {
        $('#SupervisionSection_ShopDrawing_SubContractor').addClass('active');
        fnLoadSupervisionSection_Document(project_Id, current_Step_Id, 'grid-project-supervision-section-shop-drawing-sub-contractor');

    } else if (selectedTab == 'Supervision Documents') {
        $('#SupervisionSection_SupervisionDocuments').addClass('active');
        fnLoadSupervisionSection_Document(project_Id, current_Step_Id, 'grid-project-supervision-section-supervision-documents');

    } else if (selectedTab == 'Cash Flow') {
        $('#SupervisionSection_CashFlow').addClass('active');
        fnLoadSupervisionSection_Document(project_Id, current_Step_Id, 'grid-project-supervision-section-cash-flow');

    } else if (selectedTab == 'Supervision Contract') {
        $('#SupervisionSection_SupervisionContract').addClass('active');
        fnLoadSupervisionSection_Document(project_Id, current_Step_Id, 'grid-project-supervision-section-supervision-contract');

    } else if (selectedTab == 'Completion Document') {
        $('#SupervisionSection_CompletionDocument').addClass('active');
        fnLoadSupervisionSection_Document(project_Id, current_Step_Id, 'grid-project-supervision-section-completion-documents');

    }
    else {


        alert('No Record Found');

    }
    //   }, 100);

}
//----------------------- PROJECT MAIN STEPPER END -------------------------------------------


// --------------------- LOAD PROGRESS BAR START---------------------- 

$(function () {
    $(".sub_section_progressBar").kendoProgressBar({
        min: 0, max: 0,
        type: "percent",
        type: "percent",
        animation: {
            duration: 10
        }
        //  change: onChange,
        // complete: onComplete
    });
});


function progressbar_subSection(differentSectionMenuResponse, CallingArea) {

    var subSection_PB = $(".sub_section_progressBar").data("kendoProgressBar");

    subSection_PB.value(0);
    subSection_PB.options.max = differentSectionMenuResponse.length;//- 1;


    //for (var loopCount = 0; loopCount < differentSectionMenuResponse.length + 1; loopCount++) {
    for (var loopCount = 0; loopCount < differentSectionMenuResponse.length; loopCount++) {

        subSection_PB.value(loopCount + 1);
        //   if (differentSectionMenuResponse[loopCount].project_sub_stepper_menu_error != undefined) {

        if (differentSectionMenuResponse[loopCount].project_sub_stepper_menu_error == true) {
            subSection_PB.value(loopCount);
            return true;

        }
        // }

    }
    setTimeout(console.clear(), 200);
}
// --------------------- LOAD PROGRESS BAR END----------------------BY /\/\ati

// --------------------- LOAD ALL ASSIGNED EMPLOYESS RELATED TO PROJECT START----------------------BY /\/\ati
$('.AssignedEmployees').click(function () {
    fnLoadAssignedEmployeeByProjectId();
});
//|Load Project Details Start
function fnLoadAssignedEmployeeByProjectId() {
    ajaxRequest({
        commandName: 'Project_Linked_Employees_By_Project_Id_Get',
        values: {
            Project_Id: project_Id,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            Language: $('#Language').val()
        }, CallBack: fnLoadAssignedEmployeeByProjectIdCallBack
    });
}
function fnLoadAssignedEmployeeByProjectIdCallBack(response) {

    var responseJSON = JSON.parse(response.Value);

    if (responseJSON != null) {
        $('.load-all-assigned-employees').empty();

        var fileCount = 1;
        for (var i = 0; i < responseJSON.length; i++) {
            var startDate_ClassColor = '',endDate_ClassColor = '', startDate = '', endDate = '';
            if (responseJSON[i].startDate != null) { startDate_ClassColor = 'badge badge-success'; } else { startDate_ClassColor = 'badge badge-danger'; }
            if (responseJSON[i].endDate != null) { endDate_ClassColor = 'badge badge-danger'; } else { endDate_ClassColor = 'badge badge-primary'; }

            startDate = responseJSON[i].startDate == null ? lblNotStartedYet : responseJSON[i].startDate
            endDate = responseJSON[i].endDate == null ? '-' : responseJSON[i].endDate

            $('.load-all-assigned-employees').append('' +

                '<tr>' +

                //'<td><a target="_blank" href="/UploadFile/' + responseJSON[i].employeeNumber + '" class="m-b-5 d-block">' + responseJSON[i].employeeNumber + '</a></td>' +
                '<td>' + fileCount + '</td>' +
                '<td>' + responseJSON[i].employeeNumber + '</td>' +
                '<td>' + responseJSON[i].empName + '</td>' +
                '<td>' + responseJSON[i].professionName + '</td>' +
                //'<td class="expiryDate"><span class="' + startDate_ClassColor + '">' + startDate + '</span></td>' +
                //'<td class="expiryDate"><span class="' + endDate_ClassColor + '">' + endDate + '</span></td>' +
                '</tr>')


            fileCount += 1;

        }
    }
}
 

// --------------------- LOAD ALL ASSIGNED EMPLOYESS RELATED TO PROJECT END----------------------BY /\/\ati

// --------------------- LOAD ALL CLIENT DOCUMENT INFORMATION RELATED TO PROJECT START----------------------BY /\/\ati
$('.ClientInformation_inProject').click(function () {
    fnLoadClientInformationByProjectId();
});
//|Load Project Details Start
function fnLoadClientInformationByProjectId() {
    ajaxRequest({                                   // THIS AJAX IS USED IN CLIENT INFORMATION AREA AS WELL,AFTER ANY CHANGE PLEASE VERIFY IT IN CLIEN DETAIL -> DOCUMENT INFORMATION AREA ....... /\/\ati
        commandName: 'Client_PersonalDocument_Get',
        values: {

            PersonalClient_Id: $('#client-id-get-by-project').val(),
            PersonalDocumentLanguage: _currentLanguage
        }, CallBack: fnLoadClientInformationByProjectIdCallBack
    });
}
function fnLoadClientInformationByProjectIdCallBack(response) {
    var count = 1;
    $('.load-client-iformation-by-project').html('');

    if (JSON.parse(response.Value).length>0) {
        JSON.parse(response.Value).forEach(function (item) {
            var statusClass = ''
            if (item.status == 'Valid') {
                statusClass = 'badge  badge-success '
            } else if (item.status == 'Expired') {
                statusClass = 'badge  badge-danger'
            } else {
                statusClass = 'badge  badge-warning'
            }


            var extension = item.currentFileName.split('.').pop().toLowerCase();
            if (extension == 'pdf') {
                var fileImage = '<img src="/Content/Images/pdf.png" style="width:30px;"/>';
            }
            else {
                var fileImage = '<img src="/Content/Images/attachment.png" style="width:30px;"/>';
            }
            $('.load-client-iformation-by-project').append(
                '<tr>' +
                '<td hidden class="PersonalDocumentId">' + item.id + '</td>' +
                '<td hidden class="PersonalDocumentSetupDetailTypeId">' + item.setupDetailTypeId + '</td>' +
                '<td hidden class="PersonalDocumentFile">' + item.currentFileName + '</td>' +
                '<td class="PersonalDocumentType"><b>' + count++ + '</b></td> ' +
                '<td class="PersonalDocumentType">' + item.documentType + '</td> ' +
                '<td class="PersonalDocumentReleaseDate">' + item.releaseDate + '</td> ' +
                '<td class="PersonalDocumentExpiryDate">' + item.expiryDate + '</td>' +
                '<td class="PersonalDocumentExpiryIn"><span class="' + statusClass + '">' + item.expiryIn + '</span></td>' +
                '<td class="PersonalDocumentStatus "><span class="' + statusClass + '">' + item.status + '</span></td>' +
                '<td style="font-size: x-large;" class=""><a  target="_blank" href="/UploadFile/' + item.currentFileName + '">' + fileImage + '</td>' +
                //'<td style="padding-top:20px;">' +
                //'<a class="edit"  title="Edit" data-toggle="tooltip"><i class="fa fa-edit" onclick="editPersonalDocument(this)" style="font-size: 26px;color: green;"></i></a>  ' +
                //'<a class="" title="Delete" data-toggle="tooltip"><i class="fa fa-trash" style="font-size: 26px;color: #FF4500;" onclick="deletePersonalDocument(this)"></i></a>' +
                //'</td>' +
                '</tr > '
            );
        });
    }
   
}
 

// --------------------- LOAD ALL CLIENT DOCUMENT INFORMATION RELATED TO PROJECT END----------------------BY /\/\ati
function fnLoadAllClientInformation() {
    window.open('/Project/Client/Details?id='+$('#client-id-get-by-project').val(), '_blank');
}


function fnApprovedOrReturn_DDL(ddlName) {


    $("#" + ddlName).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: [
                { value: 'Approved', text: 'Approved' },
                { value: 'Returned', text: 'Returned' }
            ]
        }
    });

}