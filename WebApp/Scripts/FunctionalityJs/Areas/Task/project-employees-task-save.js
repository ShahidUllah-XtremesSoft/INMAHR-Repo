var Parameter_Task_Id = 0;

$(function () {
    Parameter_Task_Id = (new URL(location.href)).searchParams.get('id');


    renderKendoDatePicker('StartDate');
    renderKendoDatePicker('CompletionDate');
    var datepicker = $("#StartDate").data("kendoDatePicker");
    datepicker.value(new Date());
    //|End Date Picker
    fnLoadTaskSectionReady();
});
function fnLoadTaskSectionReady() {

    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);

    loadEmployees();
    loadProjects_DDL();
    loadSubSection_DDL();
    loadPriority_DDL()
    if (Parameter_Task_Id > 0 == true) {
        $('#Id').val(Parameter_Task_Id);
        fnEditTaskById(Parameter_Task_Id)
    }



}
//|Click Event
$('#btn-save-task').click(function () {

    var isBodyEmpty = false;
    var editor = tinymce.get("Body");
    var iframe = editor.iframeElement;
    if (tinymce.get("Body").getContent({ format: "html" }) == '') {
        isBodyEmpty = true;
        if (editor) {
            iframe.style.border = '2px solid red';
        }
    } else {
        iframe.style.border = '1px solid #ccc';
    }


    $("#Body").val(tinymce.get("Body").getContent({ format: "html" }));

    if (customValidateForm('frmAddUpdate_Task') && isBodyEmpty == false) {


        buttonAddPleaseWait('btn-save-task');

        $("#frmAddUpdate_Task").ajaxForm();
        var options = {
            success: function (response, statusText, jqXHR) {
                buttonRemovePleaseWait('btn-save-task', save, 'save');

                document.getElementById("frmAddUpdate_Task").reset();
                swal(response);

                var messageResponseParse = JSON.parse(response);
                if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                } if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                }

                window.location.href = '/Project/Task/List';
            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                buttonRemovePleaseWait('btn-save-task', save, 'save');
                alert(errmsg);
            },
            complete: function () {
                buttonRemovePleaseWait('btn-save-task', save, 'save');
            }
        };
        $("#frmAddUpdate_Task").ajaxSubmit(options);
    }
    else {
        buttonRemovePleaseWait('btn-save-task', save, 'save');

        return false;
    }
});

//|End Click Event


function loadProjects_DDL() { ajaxRequest({ commandName: 'DDL_Project', values: { Language: _currentLanguage }, CallBack: fnloadloadProjects_DDLCallBack }); }


function fnloadloadProjects_DDLCallBack(response) {

    $("#Project_Id").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value)
    });
}

$('#Project_Id').change(function () {
    //console.log(this.value)
    var projectId = this.value
    $('#Project_Id').val(projectId)
    loadEmployees();
});



function loadSubSection_DDL() { ajaxRequest({ commandName: 'DDL_Section_Heirarichy', values: { Language: _currentLanguage }, CallBack: fnLoadSubSection_DDLCallBack }); }


function fnLoadSubSection_DDLCallBack(d) {



    var treeFomatted = function (arr, parent) {
        var out = [];
        for (var i in arr) {
            if (arr[i].parentId == parent) {
                var items = treeFomatted(arr, arr[i].value);
                if (items.length) {
                    arr[i].items = items;
                }

                // Check if parentId is 0 and set enabled to true or false
                //  arr[i].enabled = arr[i].parentId !== 0;

                // Hide checkbox if parentId is 0
                arr[i].hideCheckbox = arr[i].parentId === 0;
                /*
                // Check if parentId is 0 and set enabled to true
                if (arr[i].parentId === 0) {
                    arr[i].enabled = false;
                } else {
                    arr[i].enabled = true;
                }
                */
                out.push(arr[i]);
            }
        }
        return out;


    }

    var _data = treeFomatted(JSON.parse(d.Value), 0);
    $("#Setup_Sub_Section_Id").kendoDropDownTree({
        tagMode: 'multiple',
        filter: "contains",
        checkboxes: true,
        autoClose: false,
        dataSource: _data,
        autoScroll: true, // Enable automatic scrolling
        change: function (e) {



            /*
            var getLastValue = 0
            //console.log("Checking", e.sender._values);
            $('#Setup_Sub_Section_Id').val('');
            var selectedDepartments = e.sender._values;
            var concatenatedDepartments = '';
            selectedDepartments.forEach(function (item) {
                //console.log("item", item);
                concatenatedDepartments += concatenatedDepartments == '' ? item : ',' + item;
                getLastValue = item;
            });
            //alert(concatenatedDepartments);
            $('#Setup_Sub_Section_Id').val(concatenatedDepartments);
            */

            var selectedValues = e.sender.value();

            selectedValues.forEach(function (value) {
                if (value.toString().length > 4) {
                    // var parentNodeSelected = false;
                    selectedValues = selectedValues.filter(function (item) {
                        return item !== value
                    })
                    swalMessage('error', lblPleaseChooseChildTask, 1500)
                    // const index = selectedValues.indexOf(value);
                    // if (index > -1) {
                    //     selectedValues.splice(index);
                    // }
                    /*
                   // If none of the child nodes are selected, uncheck the parent node
                   if (!parentNodeSelected) {
                       // Find the checkbox of the parent node and uncheck it
                       var $parentCheckbox = $(e.sender.tree).find('.k-checkbox-wrapper[data-value="' + value + '"]');
                       $parentCheckbox.find('.k-checkbox').prop('checked', false);
                   }
                   */
                }

            });

            var concatenatedDepartments = selectedValues.join(',');
            $('#Setup_Sub_Section_Id').val(concatenatedDepartments);


        }


    });


}


function loadEmployees() { ajaxRequest({ commandName: 'DDL_HR_Employee_For_Task', values: { Project_Id: $('#Project_Id').val() == '' ? 0 : $('#Project_Id').val(), Language: _currentLanguage }, CallBack: fnLoadEmployeesCallBackCallBack }); }
function fnLoadEmployeesCallBackCallBack(response) {

    $("#Employee_Id").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        filter: "contains",
        value: -1,
        dataSource: JSON.parse(response.Value),
    });
}
function loadPriority_DDL() { ajaxRequest({ commandName: 'DDL_Setup_Task_Priority', values: { Language: _currentLanguage }, CallBack: loadPriority_DDLCallBack }); }
function loadPriority_DDLCallBack(response) {
  //  console.log(JSON.parse(response.Value));
    //$('#Priority').empty();
    //for (var i = 0; i < JSON.parse(response.Value).length; i++) {
    //    $('#Priority').append(`<option value="` + JSON.parse(response.Value)[i].id + `" style="` + JSON.parse(response.Value)[i].style + `">` + JSON.parse(response.Value)[i].value + `</option>`);
    //}
    //$("#Priority").kendoDropDownList({
    //    dataTextField: "value",
    //    dataValueField: "id",
    //    filter: "contains",
    //    value: -1,
    //    dataSource: JSON.parse(response.Value),
    //});
    $("#Priority").kendoDropDownList({
        dataTextField: "value",
        dataValueField: "id",
        //dataSource: [
        //    { text: "Option 1", value: 1, color: "#FF0000" }, // Red color
        //    { text: "Option 2", value: 2, color: "#00FF00" }, // Green color
        //    { text: "Option 3", value: 3, color: "#0000FF" }, // Blue color
        //    // Add more options with respective colors as needed
        //],
        dataSource: JSON.parse(response.Value),
        template: '<span style="#=data.style#">#=data.value#</span>', // Use color property in the template
        //template: '<span style="color:#=data.color#">#=data.text#</span>', // Use color property in the template
        template: `<li class="k-item" style="#=data.style#"><span>#=data.value#</span></li>`,
        value: -1
    });

}


function fnEditTaskById(Parameter_Task_Id) {
    ajaxRequest({
        commandName: 'Project_Task_Edit_By_Id',
        values: {
            Id: Parameter_Task_Id,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: _currentLanguage
        }, CallBack: fnEditTaskByIdCallBack
    });
}
function fnEditTaskByIdCallBack(response) {

    var response_Task = JSON.parse(response.Value)[0][0];
    var response_Multiple = JSON.parse(response.Value)[1];

    $('#Id').val(response_Task.task_Id);
    $('#Title').val(response_Task.title);
    $('#Body').html(response_Task.description);

    $('#StartDate').val(response_Task.startDate);
    $('#CompletionDate').val(response_Task.completionDate);



    setTimeout(function () {

        $("#Priority").data('kendoDropDownList').value(response_Task.priority);
        $("#Project_Id").data('kendoDropDownList').value(response_Task.project_Id);
        $("#Employee_Id").data('kendoDropDownList').value(response_Task.employee_Id);


        var values = []
        for (var i = 0; i < response_Multiple.length; i++) {

            // $("#Setup_Sub_Section_Id").data('kendoDropDownTree').value(response_Multiple[i].setup_Sub_Section_Id);


            values.push(response_Multiple[i].setup_Sub_Section_Id)
        }
        var dropdowntree = $("#Setup_Sub_Section_Id").data("kendoDropDownTree");
        dropdowntree.value(values);
        $("#Setup_Sub_Section_Id").val(values)
    }, 50);
}