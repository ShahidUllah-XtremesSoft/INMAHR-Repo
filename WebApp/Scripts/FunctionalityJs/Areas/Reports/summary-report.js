
var project_Id = (new URL(location.href)).searchParams.get('id');

$(function () {
    $('#Language').val(_currentLanguage);

    loadProjectDropdownListEng();

});
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


    if (project_Id != null) {
        $("#ProjectDDL").data("kendoDropDownList").value(project_Id);
        fnLoadProject_SummaryDataByParamter();
    }

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

function fnLoadProject_SummaryDataByParamterCallBack(responsee) {
    var response = JSON.parse(responsee.Value)[0];
    var response_Task = JSON.parse(responsee.Value)[1];
    var response_Priority = JSON.parse(responsee.Value)[2];

    $('.project-summary-div').show();
    $('.projectName').text(response[0].projectName);
    $('.isVip').text(response[0].vipStatus);
    $('.isUrgent').text(response[0].urgentStatus);
    $('.projectCreatedDate').text(response[0].projectCreatedDate);
    $('.projectCategory').text(response[0].projectCategory);


    //---------------------------- APPEND TASKS >>>>>>>>>>>>>>>>>>
    if (response_Task.length > 0) {



        $('.append-tasks').empty();
        for (var i = 0; i < response_Task.length; i++) {
            var task = response_Task[i];
            var task_tr = `  <tr style="font-size: 12px;">
                                            <td>`+ task.status + `</td>
                                            <td>
                                                <span  class="tag tag-`+ task.bgClass + `" style=` + task.style + `>` + task.count + `</span>
                                            </td>
                                        </tr> `

            $('.append-tasks').append(task_tr);
        }
    }
    //---------------------------- APPEND TASKS END

    //---------------------------- APPEND PRIORITY >>>>>>>>>>>>>>>>>>
    if (response_Priority.length > 0) {



        $('.append-tasks-priority').empty();
        for (var i = 0; i < response_Priority.length; i++) {
            var task_priority = response_Priority[i];
            var task_Priority_tr = `  <tr style="font-size: 12px;` + task_priority.style + `" class="btn-` + task_priority.bgClass + `">
                                            <td>`+ task_priority.priority + `</td>
                                            <td >
                                                <span  style="padding: 5px;">` + task_priority.priorityCount + `</span>
                                            </td>
                                        </tr> `

            $('.append-tasks-priority').append(task_Priority_tr);
        }
    }
    //---------------------------- APPEND PRIORITY END

    loadProjectSectiondownList();

}
function loadProjectSectiondownList() {
    ajaxRequest({ commandName: 'STEPPER_SUB_SECTION_MENU_For_Summary', values: { Project_Id: $('#ProjectDDL').val(), Language: _currentLanguage }, CallBack: steppers_DESIGN_SECTION_CallBack });
}
function steppers_DESIGN_SECTION_CallBack(response) {


    var step_Columns = []
    var steppers_ = JSON.parse(response.Value)[0];
    var steppers_child = JSON.parse(response.Value)[1];



    $('.ul-design').empty();
    $('.ul-technical').empty();
    $('.ul-supervision').empty();
    $('.lblDesignSection').text(0);
    $('.lblTechnicalSection').text(0);
    $('.lblSupervisionSection').text(0);
    $('.lblTotalPercentage').text(0);


    var p_Design = 0;
    var c_t_DesignSection = 0, c_t_TechnicalSection = 0, c_t_SupervisionSection = 0, totalPercentage = 0;

    for (var i = 0; i < steppers_.length; i++) {

        var mainSection_completedColor = '';

        if (steppers_[i].percentage == steppers_[i].calculated_MainPercentagee && steppers_[i].percentage != 0) {
            mainSection_completedColor = 'background-color:#c5ffc84f';
        }
        //************************   PRIORITY WORK 
        var priority_html = '';
        if (steppers_[i].priority != '') {
            priority_html = `<div class="priority_class_">   <table>
                                        <thead>
                                              <tr><th   class=" badge-`+ steppers_[i].bgClass + `" style="` + steppers_[i].priority_style + `; width:65px;text-align: center;">` + steppers_[i].priority + `</th></tr>
                                        </thead>
                                        </table>
                                 </div>`
        }
        //************************   PRIORITY WORK END

        if (steppers_[i].parent_Type == 'DesignSection') {


            if (steppers_[i].sectionIncluded == 'yes') {

                if (steppers_[i].calculated_MainPercentagee !== 0) {
                    c_t_DesignSection = c_t_DesignSection + steppers_[i].calculated_MainPercentagee
                    $('.lblDesignSection').text(c_t_DesignSection)
                }
            }



            $('.ul-design').append(`<ul><li style=` + mainSection_completedColor + ` class='Parent_d' id=` + steppers_[i].id + `>` + priority_html + `<span class="box"><div class="avatar"> ` + steppers_[i].calculated_MainPercentagee + `% </div>` + steppers_[i].name + `</span></li></ul>`);
        } else if (steppers_[i].parent_Type == 'TechnicalSection') {
            if (steppers_[i].sectionIncluded == 'yes') {

                if (steppers_[i].calculated_MainPercentagee !== 0) {

                    c_t_TechnicalSection = c_t_TechnicalSection + steppers_[i].calculated_MainPercentagee
                    $('.lblTechnicalSection').text(c_t_TechnicalSection);
                }
            }
            if (steppers_[i].name.match(/Tender*/) != null) {
                totalPercentage = parseFloat(steppers_[i].calculated_MainPercentagee);
            }




            $('.ul-technical').append(`<ul><li style=` + mainSection_completedColor + ` class='Parent_t' id=` + steppers_[i].id + `>` + priority_html + `<span class="box"><div class="avatar" style="padding-top:6%;font-size: medium;display:flow;"> ` + steppers_[i].calculated_MainPercentagee + `% </div>` + steppers_[i].name + `</span></li></ul>`);

        } else if (steppers_[i].parent_Type == 'SupervisionSection') {

            if (steppers_[i].sectionIncluded == 'yes') {
                if (steppers_[i].calculated_MainPercentagee !== 0) {
                    c_t_SupervisionSection = c_t_SupervisionSection + steppers_[i].calculated_MainPercentagee
                    $('.lblSupervisionSection').text(c_t_SupervisionSection);
                }
            }


            $('.ul-supervision').append(`<ul><li style=` + mainSection_completedColor + ` class='Parent_s' id=` + steppers_[i].id + `>` + priority_html + `<span class="box"><div class="avatar"> ` + steppers_[i].calculated_MainPercentagee + `% </div>` + steppers_[i].name + `</span></li></ul>`);

        }


    }

    totalPercentage = totalPercentage + parseFloat($('.lblDesignSection').text()) + parseFloat($('.lblTechnicalSection').text()) + parseFloat($('.lblSupervisionSection').text());
    $('.lblTotalPercentage').text(totalPercentage.toFixed(1) + '%')


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
                                                            <a target="_blank" href="/Project/Task/Details?id=`+ steppers_child_grouped[z][0].task_Id+`">
                                                            <span class="box child_hover" style='background:#eae8e894' data-task-id=`+ steppers_child_grouped[z][0].task_Id+`>
                                                            <div class="percentage_"> ` + steppers_child_grouped[z][0].subPercentage + `%  </div>` + steppers_child_grouped[z][0].stdName + `
                                                             </br><div class="">
                                                                <div class="task_status_">

                                                                <table>
                                                                     
                                                                 <tbody class="append-tasks">

                                                                                    <tr style="align-self: end;font-size: 12px;">
                                                                                        <td style="`+ steppers_child_grouped[z][0].style + `" class="badge  badge-` + steppers_child_grouped[z][0].bgClass + `">` + steppers_child_grouped[z][0].task_status + `</td>

                                                                                    </tr></tbody>
                                                                    </table>

                                                              </div> </div>` + `
                                                             </br>
                                                            </span>
                                                            </a>
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
    //************************   BY |\/|ATI 

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

function redirectToProject() {

    //console.log(dataItem);
    window.location.href = '/Project/Project/Detail?id=' + $('#ProjectDDL').val() + '';
    /*
    if (dataItem.isEmployeeExist == "No" || dataItem.isAccountant == "Yes") {

        window.location.href = '/Project/Project/Details?id=' + dataItem.id + '';
    } else {

        window.location.href = '/Project/Project/Detail?id=' + dataItem.id + '';

    }
    */
}

 