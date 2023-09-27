var $grid = "project-summary-grid", requestFrom = '';

$(function () {
    $('#Language').val(_currentLanguage);

    // loadProjectCategoryTypeDDL();
    loadProjectDropdownListEng();

});
//PROJECT CATEGORY DDL
/*
function loadProjectCategoryTypeDDL() {
    ajaxRequest({ commandName: 'DDL_ProjectCategoryType_In_Setup_TypeDetail_Get', values: { Language: _currentLanguage }, CallBack: loadloadProjectCategoryTypeDDLCallBack });
}
function loadloadProjectCategoryTypeDDLCallBack(response) {

    $("#ProjectCategoryDDL").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        index: 3,
        dataSource: JSON.parse(response.Value),
        change: function (e) {
            var selected_Id = this.value();
            //   $('#ProjectCategoryType_In_Setup_TypeDetail_Id').val(selected_Id);

        },
    });
}
*/
//PROJECT DDL
function loadProjectDropdownListEng() { ajaxRequest({ commandName: 'DDL_Project_No', values: { Language: _currentLanguage }, CallBack: fnloadProjectDropdownListEngCallBack }); }
function fnloadProjectDropdownListEngCallBack(response) {
    $("#ProjectDDL").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
        change: function (e) {
            var selected_Id = this.value();
            // $('#Project_Id').val(selected_Id);

        },
    });
}



function fnLoadProject_SummaryDataByParamter() {


    if (customValidateForm('frmProjectSummary')) {

        buttonAddPleaseWait('btnSearch');

        ajaxRequest({
            commandName: 'Report_Summary_GetByParamters',
            values: {
                //  ProjectCategoryDDL: $('#ProjectCategoryDDL').val(),
                ProjectDDL: $('#ProjectDDL').val(),
                StartDate: $('#StartDate').val(),
                EndDate: $('#EndDate').val(),
                LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
                LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
                RoleId: JSON.parse(localStorage.getItem('User')).roleId,
                Language: $('#Language').val()
            }, CallBack: fnLoadProject_SummaryDataByParamterCallBack
        });
        buttonRemovePleaseWait('btnSearch', 'Search', 'search');

    }
    else {
        buttonRemovePleaseWait('btnSearch', 'Search', 'search');
        return false;
    }
}

function fnLoadProject_SummaryDataByParamterCallBack(response) {
    var response = JSON.parse(response.Value)[0];

    $('.project-summary-div').show();
    $('.projectName').text(response[0].projectName);
    $('.isVip').text(response[0].vipStatus);
    $('.isUrgent').text(response[0].urgentStatus);
    $('.projectCreatedDate').text(response[0].projectCreatedDate);
    $('.projectCategory').text(response[0].projectCategory);

    loadProjectSectiondownList();

}
function loadProjectSectiondownList() {
    ajaxRequest({ commandName: 'STEPPER_SUB_SECTION_MENU_For_Summary', values: { Project_Id: $('#ProjectDDL').val(), Language: _currentLanguage }, CallBack: steppers_DESIGN_SECTION_CallBack });
}
function steppers_DESIGN_SECTION_CallBack(response) {


    var step_Columns = []
    var steppers_ = JSON.parse(response.Value)[0];
    var steppers_child = JSON.parse(response.Value)[1];
    //  console.log(steppers_);

    $('.ul-design').empty();
    $('.ul-technical').empty();
    $('.ul-supervision').empty();

    for (var i = 0; i < steppers_.length; i++) {

        //************************   BY |\/|ATI 
        if (steppers_[i].parent_Type == 'DesignSection') {
            $('.ul-design').append(`<ul><li class='Parent_d' id=` + steppers_[i].id + `><span class="box"><div class="avatar">10%</div>` + steppers_[i].name + `</span></li></ul>`);
        } else if (steppers_[i].parent_Type == 'TechnicalSection') {
            /*$('.ul-technical').append(`<ul><li class='Parent_t' id=` + steppers_[i].id + `><span class="box"><div class="avatar percentage_"></div>` + steppers_[i].name + `<br></span></li></ul>`);*/
            $('.ul-technical').append(`<ul><li class='Parent_t' id=` + steppers_[i].id + `><span class="box"><div class="avatar" style="padding-top:6%;font-size: medium;display:flow;">50% </div>` + steppers_[i].name + `</span></li></ul>`);

        } else if (steppers_[i].parent_Type == 'SupervisionSection') {
            $('.ul-supervision').append(`<ul><li class='Parent_s' id=` + steppers_[i].id + `><span class="box"><div class="avatar">30%</div>` + steppers_[i].name + `</span></li></ul>`);

        }


    }



    const groupedData = {};
    steppers_child.forEach(entry => {
        const { std_Id } = entry;
        if (!groupedData[std_Id]) {
            groupedData[std_Id] = [];
        }
        groupedData[std_Id].push(entry);
    });

    // Convert the grouped data into an array of arrays
    const steppers_child_grouped = Object.values(groupedData);
    var empName = [];


    for (var z = 0; z < steppers_child_grouped.length; z++) {

        if (steppers_child_grouped[z].length > 0) {

            for (var e = 0; e < steppers_child_grouped[z].length; e++) {
                if (steppers_child_grouped[z][e].attachment_Id === 0) {

                } else {

                    empName.push(steppers_child_grouped[z][e].employeeName + '<br>');
                }
            }
        }
        empName = [...new Set(empName)];

         
        $('#' + steppers_child_grouped[z][0].st_Id).addClass('box');
        var checkstepper_Count = steppers_child_grouped[z];
         /*
        if (checkstepper_Count.length > 1) {
            for (var zero = 0; zero < checkstepper_Count.length; zero++) {
                if (checkstepper_Count[zero].attachment_Id === 0) {
                    console.log(checkstepper_Count[zero]);
                    $('#' + steppers_child_grouped[z][0].st_Id).append(`
                                                            <ul>
                                                            <li style='border:2px solid red;' class='child_hover'  id=Notificateion_` + checkstepper_Count[zero].std_Id + `>
                                                            <span class=" "> ` + checkstepper_Count[zero].stdName + `-` + checkstepper_Count[zero].createdDate + `</br> </span>
                                                            <ul><li><span class="box child_hover">` + checkstepper_Count[zero].employeeName + `  </span></li></ul>
                                                            </li>
                                                            </ul>`);
                 //   $('#Notificateion_' + checkstepper_Count[zero].std_Id + '>span').append(`</br>  <span style="` + status_css + `" class=' file_status_span'> ` + steppers_child[x].approvedOrReturned + `-` + steppers_child[x].createdDate + ` </span> `);
                }
                 

            }
        }
        */
        if (steppers_child_grouped[z][0].attachment_Id !== 0) {

            $('#' + steppers_child_grouped[z][0].st_Id).append(`
                                                            <ul>
                                                            <li class='child_hover'  id=Child` + steppers_child_grouped[z][0].std_Id + `>
                                                            <span class="box child_hover" style='background:#eae8e894'>
                                                            <div class="percentage_"> 100%   </div>` + steppers_child_grouped[z][0].stdName + `
                                                             </br>
                                                            </span>
                                                            <ul><li><span class="box child_hover">` + empName + `  </span></li></ul>
                                                            </li>
                                                            </ul>`);
            empName = [];
        }

        /*  
       else {
           $('#' + steppers_child_grouped[z][0].st_Id).append(`
                                                           <ul>
                                                           <li style='border:2px solid red;' class='child_hover'  id=Notificateion_` + steppers_child_grouped[z][0].std_Id + `>
                                                           <span class=" "> ` + steppers_child_grouped[z][0].stdName + `</br> </span>
                                                           <ul><li><span class="box child_hover">` + steppers_child_grouped[z][0].employeeName + `  </span></li></ul>
                                                           </li>
                                                           </ul>`);
       }
       */
    }


    for (var x = 0; x < steppers_child.length; x++) {




        // const filteredPeople = steppers_child.filter(child_ => child_.st_Id > 0);
        var status_css = '';
        if (steppers_child[x].approvedOrReturned.match(/Approve.*/)) {
            status_css = `display: table-cell;padding-right: 5px;background: #6fff186e;color: black;`
        } else if (steppers_child[x].approvedOrReturned.match(/Return.*/)) {
            status_css = `display: table-cell;padding-right: 5px;background: #ffbdbdfa;color: black;`
        } else {
            status_css = `display: table-cell;padding-right: 5px;background: transparent;color: inherit;`
        }


        
        if (steppers_child[x].attachment_Id !== 0) {
            var fileExtension = fn_FileExtension(steppers_child[x]);
            $('#Child' + steppers_child[x].std_Id + '>span').append(`</br>
                                                                <a target="_blank" href="/UploadFile/` + steppers_child[x].currentFileName + ` " >
                                                                <span style="`+ status_css + `" class=' file_status_span'> ` + steppers_child[x].approvedOrReturned + `-` + steppers_child[x].createdDate + ` </span>
                                                                <img src="` + fileExtension + `" class="img-avatar"   style="border-radius: 6px;width: auto;height: 1.3rem;">
                                                                
                                                                </a>`);
        }
        
        //else {
        //    debugger
        //    $('#Notificateion_' + steppers_child[x].std_Id + '>span').append(`</br>  <span style="` + status_css + `" class=' file_status_span'> ` + steppers_child[x].approvedOrReturned + `-` + steppers_child[x].createdDate + ` </span> `);
        //
        //}
    }

}





function fn_FileExtension(loop_data) {
    if (loop_data.currentFileName != null) {

        var fileExtension = "";
        //--------------------------- ATTACHMENT WORK HERE ----------------------------------------
        if (loop_data.filePath.split('.')[1] == "docx" || loop_data.filePath.split('.')[1] == "doc" || loop_data.filePath.split('.')[1] == "docs") {
            fileExtension = "/Content/Images/docx.png";
        } else if (loop_data.filePath.split('.')[1] == "pdf" || loop_data.filePath.split('.')[1] == "PDF") {


            fileExtension = "/Content/Images/pdf.png";

        } else if (loop_data.filePath.split('.')[1] == "xls" || loop_data.filePath.split('.')[1] == "xlsx") {
            fileExtension = "/Content/Images/xls.png";
        }
        else if (loop_data.filePath.split('.')[1] == "jpg" || loop_data.filePath.split('.')[1] == "JPG" || loop_data.filePath.split('.')[1] == "jpeg" || loop_data.filePath.split('.')[1] == "JPEG" || loop_data.filePath.split('.')[1] == "png" || loop_data.filePath.split('.')[1] == "PNG") {
            fileExtension = "/Content/Images/attachment-icon.png";
            // fileExtension = '/UploadFile/' + loop_data.currentFileName;
        } else {
            fileExtension = "/Content/Images/attachment.png";
        }
        return fileExtension;
    }
}