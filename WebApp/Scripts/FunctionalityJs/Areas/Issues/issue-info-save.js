
var parameterId = (new URL(location.href)).searchParams.get('id');

$(function () {

    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(parseInt(JSON.parse(localStorage.getItem('User')).id));

   
    setTimeout(function () {
        $("#Project_SubSections_DDL").data("kendoDropDownList").enable(false);
    // LOAD KENDO DATE PICKERS

    if (parameterId > 0 == true) { 
        fnEditById(parameterId);
    }

    }, 100);
    loadProjectDropdownListEng();
    loadEmployeeDropdownList();
    loadProjectSectiondownList()
    loadProjectSubSectiondownList();



    $('#btn-save').click(function () {



        $("#DescriptionEng").val(tinymce.get("DescriptionEng").getContent({ format: "html" }));

        if (customValidateForm('frmAddUpdateIssue')) {

            buttonAddPleaseWait('btn-save');

            $("#frmAddUpdateIssue").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    buttonRemovePleaseWait('btn-save', save, 'save');

                    swal(response);
                    var messageResponseParse = JSON.parse(response);
                    if (messageResponseParse.type == undefined) {
                        messageResponseParse = JSON.parse(messageResponseParse);
                    } if (messageResponseParse.type == undefined) {
                        messageResponseParse = JSON.parse(messageResponseParse);
                    }
                    //  $('#EmployeeId').val(messageResponseParse.insertedId);


                    window.location.href = '/Project/Issue/List';

                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    buttonRemovePleaseWait('btn-save', save, 'save');
                    alert(errmsg);
                },
                complete: function () {
                    buttonRemovePleaseWait('btn-save', save, 'save');
                }
            };
            $("#frmAddUpdateIssue").ajaxSubmit(options);
        }
        else {
            buttonRemovePleaseWait('btn-save', save, 'save');
            return false;
        }
    });



    //------------- DDL LOAD -------------------------------

    //Load Lists to Local Storage
    function loadProjectDropdownListEng() { ajaxRequest({ commandName: 'Project_DDL', values: { Language: _currentLanguage }, CallBack: fnloadProjectDropdownListEngCallBack }); }
    function fnloadProjectDropdownListEngCallBack(response) {
        $("#ProjectDDL").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            filter: "contains",
            value: -1,
            dataSource: JSON.parse(response.Value),
            change: function (e) {
                var selected_Id = this.value();
                $('#Project_Id').val(selected_Id);

            },
        });
    }

    function loadEmployeeDropdownList() { ajaxRequest({ commandName: 'HR_Employee_DDL', values: { Language: _currentLanguage }, CallBack: fnloadEmployeeDropdownListEngCallBack }); }
    function fnloadEmployeeDropdownListEngCallBack(response) {
        $("#EmployeeDDL").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            filter: "contains",
            value: -1,
            dataSource: JSON.parse(response.Value),
            change: function (e) {
                var selected_Id = this.value();

                $('#HR_Employee_Id').val(selected_Id);
            },
        });
    }
    function loadProjectSectiondownList() { ajaxRequest({ commandName: 'DDL_Project_MainType_In_Setup_Type', values: { Language: _currentLanguage }, CallBack: fnloadloadProjectSectiondownListCallBack }); }
    function fnloadloadProjectSectiondownListCallBack(response) {
        $("#Project_Section_Parent_Type_DDL").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            filter: "contains",
            value: -1,
            dataSource: JSON.parse(response.Value),
            change: function (e) {
                var selected_Id = this.value();

                $('#Setup_SetupType_Id').val(selected_Id);
                $("#Project_SubSections_DDL").data("kendoDropDownList").enable(true);

                // ---- SEARCH RECORD IN Sub Section DDL
               
                    loadProjectSubSectiondownList();
                
            },
        });
    }

    function loadProjectSubSectiondownList() { ajaxRequest({ commandName: 'DDL_Project_SubSection_In_Setup_TypeDetail', values: { Setup_Id: $('#Setup_SetupType_Id').val(), Language: _currentLanguage }, CallBack: fnloadProjectSubSectiondownListCallBack }); }
    function fnloadProjectSubSectiondownListCallBack(response) {
        $("#Project_SubSections_DDL").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            filter: "contains",
            value: -1,
            dataSource: JSON.parse(response.Value),
            change: function (e) {
                var selected_Id = this.value();

                $('#Setup_SetupTypeDetail_Id').val(selected_Id);


            },
        });


    }




});



function fnEditById(parameterId) {

    ajaxRequest({
        commandName: 'Issue_Edit_By_Id',
        values: {
            Id: parseInt(parameterId),
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            LoggedInEmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            Language: $('#Language').val()
        }, CallBack: editByIdCallBack
    });
}
function editByIdCallBack(response) {
    var response = JSON.parse(response.Value);
    
    $('#Id').val(response.issueId);

    $('#Client_Id').val(response.clientId);
    $('#DescriptionEng').html(response.descriptionEng);

    $("#EmployeeDDL").data('kendoDropDownList').value(response.employeeId);
    $('#HR_Employee_Id').val(response.employeeId);

    $("#ProjectDDL").data('kendoDropDownList').value(response.projectId);
    $('#Project_Id').val(response.projectId);

    $("#Project_Section_Parent_Type_DDL").data('kendoDropDownList').value(response.setup_SetupType_Id);
    $('#Setup_SetupType_Id').val(response.setup_SetupType_Id);
     
    //------ change event 
    var ddl_Project_Section_Parent_Type_DDL = $("#Project_Section_Parent_Type_DDL").data("kendoDropDownList");
    ddl_Project_Section_Parent_Type_DDL.trigger("change");

     
    setTimeout(function () {

        $("#Project_SubSections_DDL").data('kendoDropDownList').value(response.setup_SetupTypeDetail_Id);
        $('#Setup_SetupTypeDetail_Id').val(response.setup_SetupTypeDetail_Id);

        $("#Project_SubSections_DDL").data("kendoDropDownList").enable(true);
    }, 110);

}


