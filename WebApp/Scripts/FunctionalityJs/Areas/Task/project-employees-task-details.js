var Parameter_Task_Id = (new URL(location.href)).searchParams.get('id');
$(function () {





    fn_Load_Task_Statuses();
    getTaskById(Parameter_Task_Id);
});
function getTaskById(Parameter_Task_Id) {
    ajaxRequest({
        commandName: 'Project_Task_Detail_By_Id',
        values: {
            Id: Parameter_Task_Id,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: _currentLanguage
        },
        CallBack: getTaskByIdCallBack
    });


}
var getTaskByIdCallBack = function (inputDataJSON) {
    var responseJSON = JSON.parse(inputDataJSON.Value);
    // console.log(responseJSON);
    //var _ToArray = responseJSON.taskTo.split(',');


    $('#hold-project-id').val(responseJSON.project_Id)

    //   $('#divTo').append('<span class="badge badge-success">'+item+'</span>');
    $('#divTo').append('<button type="button" class="btn btn-sm btn-outline-dark waves-effect waves-light">' + responseJSON.taskTo + '</button>');


    //$('#divFrom').text(responseJSON.createdBy);
    //  $('#divFrom').append('<button type="button" class="btn btn btn-success waves-effect waves-light">' + responseJSON.createdBy + '</button>');
    //   $('#divFromDepartment').append('<button type="button" class="btn btn btn-success waves-effect waves-light">' + responseJSON.senderDepartmentName + '</button>');

    // $('#divFrom').append('<button type="button" class="btn btn-sm btn-outline-dark waves-effect waves-light">' + responseJSON.createdBy + '</button>');
    $('#divFrom').append(responseJSON.createdBy);
    $('#ProjectNo').append(responseJSON.projectNo + '    -      ' + responseJSON.projectName);
    //$('#divFromDepartment').append('<button type="button" class="btn btn-sm btn-outline-dark waves-effect waves-light">' + responseJSON.senderDepartmentName + '</button>');
    $('.task-date').append(responseJSON.sendDate);

    //$('.task-time').append(responseJSON.taskTime);

    /*$('#divBody').html(responseJSON.body);*/
    $('#divDate').html(responseJSON.createdDate);

    $('#txt-subject').text(responseJSON.subject);
    var priorityClassCSS = '', priorityCSS = '';
    if (responseJSON.priority.match(/Extreme.*/)) {
        priorityClassCSS = 'badge  btn-danger'
        priorityCSS = ''
    } else if (responseJSON.priority.match(/High.*/)) {
        priorityClassCSS = 'badge  btn-warning'
        priorityCSS = 'badge'
    }
    else if (responseJSON.priority.match(/Medium.*/)) {
        priorityClassCSS = 'badge'
        priorityCSS = `background-color:yellow;`
    } else if (responseJSON.priority.match(/Low.*/)) {
        priorityClassCSS = 'badge  btn-success'
        priorityCSS = ''
    } else if (responseJSON.priority.match(/None.*/)) {
        priorityClassCSS = 'badge'
        priorityCSS = `background-color:lightgray;`
    }



    var spanClass = priorityClassCSS !== '' ? 'class="' + priorityClassCSS + '"' : '';
    var spanStyle = priorityCSS !== '' ? 'style="' + priorityCSS + '"' : '';

    var spanElement = '<span ' + spanClass + ' ' + spanStyle + '>' + responseJSON.priority + '</span>';
    $('.task-priority').append(spanElement);

    $('#txt-body').html(responseJSON.body);

    if (responseJSON.empCurrentFileName != null) {
        var profileImage = '/UploadFile/' + responseJSON.empCurrentFileName;
        $('#ProfileImage').attr('src', profileImage);
    }
    fnLoadTaskDetailsGridByEmployeeId();
    getTask_AttachmentById();


}
function getTask_AttachmentById() {
    ajaxRequest({ commandName: 'Project_Task_Attachment_By_Id', values: { Id: Parameter_Task_Id, Language: _currentLanguage }, CallBack: getTask_AttachmentByIdCallBack });
    // console.log(Parameter_Task_Id)
}
var getTask_AttachmentByIdCallBack = function (inputDataJSON) {
    var responseJSON = JSON.parse(inputDataJSON.Value);

    for (var i = 0; i < responseJSON.length > 0; i++) {



        if (responseJSON[i].currentFileName != null) {

            var fileExtension = "";
            var attachmentName = '';
            //--------------------------- ATTACHMENT FIX ICON WORK HERE ----------------------------------------
            if (responseJSON[i].filePath.split('.')[1] == "docx" || responseJSON[i].filePath.split('.')[1] == "doc" || responseJSON[i].filePath.split('.')[1] == "docs") {
                fileExtension = "/Content/Images/docx.png";
            } else if (responseJSON[i].filePath.split('.')[1] == "pdf" || responseJSON[i].filePath.split('.')[1] == "PDF") {


                fileExtension = "/Content/Images/pdf.png";

            } else if (responseJSON[i].filePath.split('.')[1] == "xls" || responseJSON[i].filePath.split('.')[1] == "xlsx") {
                fileExtension = "/Content/Images/xls.png";
                /*fileExtension = "icofont icofont icofont-file-excel f-28 text-muted";*/
            }
            else if (responseJSON[i].filePath.split('.')[1] == "jpg" || responseJSON[i].filePath.split('.')[1] == "JPG" || responseJSON[i].filePath.split('.')[1] == "jpeg" || responseJSON[i].filePath.split('.')[1] == "JPEG" || responseJSON[i].filePath.split('.')[1] == "png" || responseJSON[i].filePath.split('.')[1] == "PNG") {
                //   fileExtension = "/Content/Images/ImageIcon.png";
                fileExtension = '/UploadFile/' + responseJSON[i].currentFileName;
                //fileExtension = "ti-gallery f-28 text-muted";
            } else {
                fileExtension = "/Content/Images/attachment.png";
            }

            //  $('.loadEmployeeAttachments').append(' <li class="media d-flex m-b-10"><div class="m-r-20 v-middle"><i class="' + fileExtension + '"></i></div><div class="media-body"><a target="_blank" href="../../Temp/' + JSON.parse(d.Value)[i]["path"] + '" class="m-b-5 d-block">' + attachmentName + '</div><div class="f-right v-middle text-muted"><i class="icofont icofont-download-alt f-18"></i></div></a></li>')

            //--------------------------- ATTACHMENT FIX ICON WORK END ----------------------------------------



            $('.attachmentRow').show();
            var attachments = '/UploadFile/' + responseJSON[i].currentFileName;
            /*
            $('#task-attachment').attr('src', fileExtension).attr('alt', responseJSON[i].orignalFileName);
            $('#attachment-open').attr('href', attachments);
            */
            $('.appendLetterAttachment').append('  <div class="col-sm-2 col-md-1" ><a target="_blank" id="" href=' + attachments + '> <img id="" src=' + fileExtension + ' alt=' + responseJSON[i].orignalFileName + ' class="img-thumbnail" ></a></div>')


            $('.appendLetterAttachment').find('img').css({
                'width': '50px', // Set your desired width here
                'height': '50px', // Set your desired height here
                'border-radius': '7px'
            });
        }
    }
}


function updateLetterIsRead(Parameter_Task_Id) {
    ajaxRequest({
        commandName: 'Employee_Task_UpdateIsRead',
        values: {
            Id: Parameter_Task_Id,
            IsRead: true,
            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            LoggedInEmployeeDepartmentId: JSON.parse(localStorage.getItem('User')).employeeDepartmentId,
            Language: _currentLanguage
        }, CallBack: ''
    });

}


//--------------- LOAD TASK DETAILS GRID >>>>>>>>>>>>


function fnLoadTaskDetailsGridByEmployeeId() {


    ajaxRequest({
        commandName: 'Project_Task_Details_By_Employee_Id', values: {
            task_Id: Parameter_Task_Id,
            Language: _currentLanguage
        }, CallBack: fnLoadTaskDetailsGridByEmployeeIdCallBack
    });

}
var fnLoadTaskDetailsGridByEmployeeIdCallBack = function (inputDataJSON) {
    fnLoadTaskDetailsGridByEmployeeIdbindGrid(JSON.parse(inputDataJSON.Value));
}
var fnLoadTaskDetailsGridByEmployeeIdbindGrid = function (inputDataJSONs) {
    var record = 0;

    var gridColumnss = [

        { field: "project_Task_Multiple_Id", title: "project_Task_Multiple_Id", filterable: false, hidden: true, editable: true },
        { field: "task_Id", title: "task_Id", filterable: false, hidden: true, editable: true },
        /*{ field: "status", title: "status", filterable: false, hidden: true },*/
        { field: "setup_Sub_Section_Id", title: "setup_Sub_Section_Id", filterable: false, hidden: true, editable: true },
        {
            field: "taskName", title: lblTask, width: "8%", filterable: false, editable: true
            //   template: " #  if(status == '') { # <label style='text-decoration:line-through' class='badge  btn-danger'>#=taskName #</label># } #"
        },
        { field: "completionDate_new", title: lblCompletionDate, width: "5%", filterable: false, editable: true },
        { field: "percentage", title: "percentage", width: "8%", filterable: false, hidden: true, editable: true },
        { field: "task_status", title: "task_status", width: "8%", hidden: true, editable: true },
        {
            field: "status", title: lblClickStatus, width: "4%", filterable: false,
            editable: function (dataItem) {


                if (dataItem.status != null && dataItem.status.match(/Complete.*/)) {
                    return false;
                } else {
                    return true
                }
            },

            editor: categoryDropDownEditor,
            template: function (dataItem) {

                if (status === '') {

                    if (dataItem.status == null || (dataItem.status.match(/Pending.*/))) {
                        return "<button class='btn-danger'>" + btnStart + "</button>";
                    } else {
                        return dataItem.status
                    }
                }

            },
        },


        { field: "defaultValidity_In_Month", title: "defaultValidity_In_Month", width: "8%", filterable: false, hidden: true, editable: true },

    ];
    bindEditAblekendoGrid("load-task-details-grid-employee-by-id", 100, gridColumnss, inputDataJSONs, true);




    var gridElement = $("#load-task-details-grid-employee-by-id");
    gridElement.find(".k-grid-content").on("click", "tr", function () {
        gridElement.find("tr.k-state-selected").removeClass("k-state-selected");
        $(this).addClass("k-state-selected");
    });
    fnGridColors();
};


function fnGridColors() {
    setTimeout(function () {
         
        var grid = $("#load-task-details-grid-employee-by-id").data("kendoGrid");
        var gridData = grid.dataSource.view();
     //   console.log(gridData)
        for (var i = 0; i < gridData.length; i++) {

            var delay_Status = gridData[i].task_status;

            if (gridData[i].task_status.match(/Delay.*/)) { 

                grid.table.find("tr[data-uid='" + gridData[i].uid + "']").css("background-color", 'rgba(248,108,107)').css("color", 'white');
  
            }
        }




    }, 50);
}

/*
//--------------- LOAD TASK DETAILS GRID END 
function categoryDropDownEditor(container, options) {
     


    var statuses_Array = [
        { id: 1, value: 'Started' },
        { id: 2, value: 'InProgress' },
        { id: 3, value: 'Stuck' },
        { id: 4, value: 'Completed' }
    ];

    var ddl_name = options.field
    $('<input  name="' + options.field + '" />')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: false,
            dataTextField: "value",
            dataValueField: "id",
            dataSource: statuses_Array,
           
            change: function (e) {

                var dataItem = this.dataItem();
                var text = this.text();
                var value = this.value();
                var grid = $("#load-task-details-grid-employee-by-id").data("kendoGrid");
                var dataItem = grid.dataItem(grid.tbody.find("tr.k-grid-edit-row"));



                if (value !== text) {
                    dataItem.set(grid.editable.options.fields.field, text);


                    var uid = this.element.closest("[data-uid]").data("uid"),
                        dataSource = grid.dataSource,
                        item = dataSource.getByUid(uid);
                    item.dirty = true;


                }

                $("#load-task-details-grid-employee-by-id").data("kendoGrid").refresh();

            }
        });
     
 
}

*/
//--------------- LOAD TASK DETAILS GRID END 

function fn_Load_Task_Statuses() {
    ajaxRequest({
        commandName: 'DDL_Setup_Task_Statuses', values: { Language: _currentLanguage }, CallBack: fn_Load_Task_Statuses_Callback
    });

}
var statuses_Array = [];
function fn_Load_Task_Statuses_Callback(inputDataJSON) {
    statuses_Array = inputDataJSON.Value;
}

function categoryDropDownEditor(container, options) {

    // console.log(statuses_Array);
    /*
    var statuses_Array = [
        { id: 1, value: 'Started' },
        { id: 2, value: 'InProgress' },
        { id: 3, value: 'Stuck' },
        { id: 4, value: 'Completed' }
    ];

    */



    var ddl_name = options.field;
    var dropdown = $('<input  name="' + options.field + '" />')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: false,
            dataTextField: "value",
            dataValueField: "id",
            dataSource: JSON.parse(statuses_Array),
            open: function (e) {
                // Close dropdown if it's already opened
                if (!this.listView.bound()) {
                    this.toggle();
                }
            },
            change: function (e) {
                var dataItem = this.dataItem();
                var text = this.text();
                var value = this.value();
                var grid = $("#load-task-details-grid-employee-by-id").data("kendoGrid");
                var dataItem = grid.dataItem(grid.tbody.find("tr.k-grid-edit-row"));

                if (value !== text) {
                    dataItem.set(grid.editable.options.fields.field, text);
                    var uid = this.element.closest("[data-uid]").data("uid"),
                        dataSource = grid.dataSource,
                        item = dataSource.getByUid(uid);
                    item.dirty = true;
                }

                $("#load-task-details-grid-employee-by-id").data("kendoGrid").refresh();

                $('#hold-status-id').val(value)
                $('#hold-status-text').val(text)
                $('#Task_Multiple_Id').val(dataItem.project_Task_Multiple_Id)


                fnRemarks();

                // update_SubTask_Status();
            }
        });

    // Open the dropdown after creation
    dropdown.data("kendoDropDownList").open();
}

function update_SubTask_Status() {



    ajaxRequest({
        commandName: 'Project_Task_Log_Save',
        values: {
            Task_Multiple_Id: $('#Task_Multiple_Id').val(),
            FkTypeID: Parameter_Task_Id,
            Name: $('#hold-status-text').val(),
            //  Status: $('#hold-status-text').val(),
            Status: $('#hold-status-id').val(),
            Description: $('#hold-remarks-text').val(),
            CreatedBy: JSON.parse(localStorage.getItem('User')).employeeId,
            Type: $('#hold-status-text').val(),
            Language: _currentLanguage
        },
        CallBack: update_SubTask_Status_CallBack
    });


}
var update_SubTask_Status_CallBack = function (inputDataJSON) {
    //  var responseJSON = JSON.parse(inputDataJSON.Value);
    //console.log(responseJSON);
    //var _ToArray = responseJSON.taskTo.split(',');
    swal(inputDataJSON.Value);

    fnLoadDetailByID_();
    update_SubTask_Status_Update();
}

function update_SubTask_Status_Update() {
    ajaxRequest({
        commandName: 'Project_Sub_Task_Status_Update_By_Employee_Id',
        values: {
            Task_Multiple_Id: $('#Task_Multiple_Id').val(),
            Status: $('#hold-status-id').val(),
            CreatedBy: JSON.parse(localStorage.getItem('User')).id,
        },
        CallBack: ''
    });


    setTimeout(function () {

        //--------- Reload the tasks grid 
        fnLoadTaskDetailsGridByEmployeeId();
    }, 500);

}



var inputRemarks = '';
function fnRemarks(e) {


    Swal.fire({
        //     text: lblRemarks,
        html: lblRemarksOptional + '<br/>' + '<textarea id="swal-input1" class="swal2-input"> </textarea>' +
            `<div style='display: flex; flex-wrap: wrap;' id='append-predefined-msgs'></div>`,
        // input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Save',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        //   html: `<br/> You can use <b>bold text</b>,<a href="#">links</a>,    and other HTML tags  `,

    }).then((result) => {


        var inputVal = $('.swal2-input').val();
        if (result.dismiss) {
            //    Swal.fire('Changes are not saved', '', 'info')

        } else if (inputVal.length > 0) {
            $('#hold-remarks-text').val(inputVal)
            update_SubTask_Status();

        } else {
            $('#hold-remarks-text').val('')
            update_SubTask_Status();
        }

    })
    if (inputRemarks.value != '') {
        $('.swal2-input').val(inputRemarks.value)


    }
    fnPreDefinedRemarks_Get();
}




function fnPreDefinedRemarks_Get() {
    ajaxRequest({
        commandName: 'Pre_Defined_MSGS_Get',
        values: {
            Area: 'SubTask',
            Language: _currentLanguage
        },
        CallBack: fnPreDefinedRemarks_CallBack
    });


}


function fnPreDefinedRemarks_CallBack(inputDataJSON) {

    var statuses_Array = JSON.parse(inputDataJSON.Value)

    $('#append-predefined-msgs').empty();
    for (var i = 0; i < statuses_Array.length; i++) {
        $('#append-predefined-msgs').append(`<button onClick='fnPredefiendMsg_Clicked(this)' type="button" style="border: 1px solid darkgrey;border-radius: 20px;color: #0000007d;font-size: small; " class="btn  btn-outline-info">` + statuses_Array[i].msg + `</button>`)
    }
}
function fnPredefiendMsg_Clicked(e) {
    //console.log(e);

    var existingText = $('#swal-input1').val();
    var clickedText = $(e).text();
    var newText = existingText + ' ' + clickedText + ' , ';

    $('#swal-input1').val(newText.trim());
    $(e).remove();



}
function fnLoadProjectDetailsById() {
    //console.log(e);
    var project_Id = $('#hold-project-id').val()

    window.location.href = '/Project/Project/Detail?id=' + project_Id + '';




}