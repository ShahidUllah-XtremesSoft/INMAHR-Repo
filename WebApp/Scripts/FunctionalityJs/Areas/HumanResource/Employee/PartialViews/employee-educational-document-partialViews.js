
$(function () {
    $('#EducationalDocumentLanguage').val(_currentLanguage);
    var idQueryStirng = (new URL(location.href)).searchParams.get('id');
    if (idQueryStirng == null) {
        $('#EducationalDocumentEmployeeId').val(JSON.parse(localStorage.getItem('User')).employeeId);
    }
    else {
        $('#EducationalDocumentEmployeeId').val(idQueryStirng);//(new URL(location.href)).searchParams.get('id');
    }
    
    //| Date Picker
    renderKendoDatePicker('EducationalDocumentReleaseDate');
    //|End Date Picker

    //|Functions Calling
    loadKendoDropdownByTypeName('EducationalDocumentDegreeFromCountryId', 'EmployeeEducationalDocument');
    loadEducationalDocumentDegreeFromCountryDropdownList(false);
    loadEducationalDocumentsGrid();

    //|End Function Calling

    //|Click Event
    $('#btnSaveEmployeeEducationalDocument').click(function () {        
        if (customValidateForm('frmEmployeeEducationalDocument')) {
            buttonAddPleaseWait('btnSaveEmployeeEducationalDocument');

            $("#frmEmployeeEducationalDocument").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    buttonRemovePleaseWait('btnSaveEmployeeEducationalDocument', 'Save', 'save');
                    $('#frmEmployeeEducationalDocument')[0].reset();
                    $('#EducationalDocumentId').val('0');
                    loadEducationalDocumentsGrid();
                    swal(response);
                    var response = JSON.parse(response);
                    //clearFields();
                    //$('#EducationalDocumentId').val(response.insertedId);
                    //if (response.type != 'erorr') {
                    //    window.location.href = '/HumanResource/Employee/List';
                    //}
                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    buttonRemovePleaseWait('btnSaveEmployeeEducationalDocument', 'Save', 'save');
                    alert(errmsg);
                },
                complete: function () {
                    buttonRemovePleaseWait('btnSaveEmployeeEducationalDocument', 'Save', 'save');
                }
            };
            $("#frmEmployeeEducationalDocument").ajaxSubmit(options);
        }
        else {
            buttonRemovePleaseWait('btnSaveEmployeeEducationalDocument', 'Save', 'save');
            return false;
        }
    });

    //|End Click Event


});
function validateEducationalDocument(inputId) {
    var fileExtension = ['jpeg', 'jpg', 'pdf'];

    if ($.inArray($('#' + inputId).val().split('.').pop().toLowerCase(), fileExtension) == -1) {

        swalMessage('info', 'Allowed format(s) are (' + fileExtension.join(', ') + ')', 2000);
        $('#' + inputId).val('');
    }

}
function loadEducationalDocumentsGrid() {
    ajaxRequest({ commandName: 'HR_Employee_EducationalDocument_Get', values: { EducationalDocumentId: $('#EducationalDocumentId').val(), EducationalDocumentEmployeeId: $('#EducationalDocumentEmployeeId').val(), EducationalDocumentLanguage: _currentLanguage }, CallBack: loadEducationalDocumentsGridCallBack });
}
var loadEducationalDocumentsGridCallBack = function (inputDataJSON) {
     
    //console.log(JSON.parse(inputDataJSON.Value));
    $('#employeeEducationalDocumentGrid tbody').html('');
    JSON.parse(inputDataJSON.Value).forEach(function (item) {
        var extension = item.currentFileName.split('.').pop().toLowerCase();
        //console.log(item);
        if (extension == 'pdf') {
            var fileImage = '<img src="/Content/Images/pdf.png" style="width:30px;"/>';
        }
        else {
            var fileImage = '<img src="/Content/Images/attachment.png" style="width:30px;"/>';
        }
        var tr = '<tr>' +
            '<td hidden class="EducationalDocumentId">' + item.id + '</td>' +
            '<td hidden class="EducationalDocumentFile">' + item.currentFileName + '</td>' +
            '<td class="EducationalDocumentDegreeNameEng">' + item.degreeNameEng + '</td>' +
            '<td class="EducationalDocumentDegreeNameArb">' + item.degreeNameArb + '</td>' +
            '<td class="EducationalDocumentInstituteEng">' + item.instituteEng + '</td>' +
            '<td class="EducationalDocumentInstituteArb">' + item.instituteArb + '</td>' +
            '<td class="EducationalDocumentReleaseDate">' + item.releaseDate + '</td>' +
            '<td class="EducationalDocumentMarks">' + item.marks + '</td>' +
            '<td hidden class="EducationalDocumentDegreeFromCountryId">' + item.degreeFromCountryId + '</td>' +
            '<td class="EducationalDocumentDegreeFromCountryName">' + item.degreeFromCountryName + '</td>' +
            
            '<td style="font-size: x-large;" class=""><a  target="_blank" href="/UploadFile/' + item.currentFileName + '">' + fileImage + ' </td>' +
            '<td style="padding-top: 20px;">' +
            '<a class="edit"  title="Edit" data-toggle="tooltip"><i class="fa fa-edit" onclick="editEmployeeEducationalDocument(this)" style="font-size: 26px;color: green;"></i></a>' +
            '<a class="deleteEmployeeDocumentType" title="Delete" data-toggle="tooltip"><i class="fa fa-trash" style="font-size: 26px;color: #FF4500;" onclick="deleteEmployeeEducationalDocument(this)"></i></a>' +
            '</td>' +
            '</tr > '
        //console.log(tr);
        $('#employeeEducationalDocumentGrid tbody').append(
            tr
           
        );
    });
}

function editEmployeeEducationalDocument(e) {

    $('#EducationalDocumentId').val($(e).closest('tr').find(".EducationalDocumentId").text());
    $('#EducationalDocumentDegreeNameEng').val($(e).closest('tr').find(".EducationalDocumentDegreeNameEng").text());
    $('#EducationalDocumentDegreeNameArb').val($(e).closest('tr').find(".EducationalDocumentDegreeNameArb").text());
    $('#EducationalDocumentInstituteEng').val($(e).closest('tr').find(".EducationalDocumentInstituteEng").text());
    $('#EducationalDocumentInstituteArb').val($(e).closest('tr').find(".EducationalDocumentInstituteArb").text());
    $('#EducationalDocumentMarks').val($(e).closest('tr').find(".EducationalDocumentMarks").text());
    $("#EducationalDocumentReleaseDate").data("kendoDatePicker").value($(e).closest('tr').find(".EducationalDocumentReleaseDate").text());
    
    var dropdownlist = $("#EducationalDocumentDegreeFromCountryId").data("kendoDropDownList");
    dropdownlist.value($(e).closest('tr').find(".EducationalDocumentDegreeFromCountryId").text());

}
function deleteEmployeeEducationalDocument(e) {    
    Swal.fire({
        //title: 'Are you sure?',
        //text: "Do you really want to delete selected record",
        ////input: 'text',
        //icon: 'question',
        //showCancelButton: true,
        //confirmButtonColor: '#5cb85c',
        //cancelButtonColor: '#d9534f',
        //buttons: {
        //    cancel: {
        //        text: "No",
        //        value: null,
        //        visible: true,
        //        className: "btn btn-danger",
        //        closeModal: true
        //    },
        //    confirm: {
        //        text: "Yes",
        //        value: true,
        //        visible: true,
        //        className: "btn btn-warning",
        //        closeModal: true
        //    }
        //}
        title: areYouSureTitle,
        text: areYouSureText,
        //input: 'text',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
        confirmButtonText: btnYesText,
        cancelButtonText: btnNoText,
        buttons: {
            cancel: {
                text: "No",
                value: null,
                visible: true,
                className: "btn btn-danger",
                closeModal: true
            },
            confirm: {
                text: "Yes",
                value: true,
                visible: true,
                className: "btn btn-warning",
                closeModal: true
            }
        }
    }).then(function (restult) {
        if (restult.value) {
            var id = $(e).closest('tr').find(".EducationalDocumentId").text();
            $(e).closest('tr').remove();
            ajaxRequest({ commandName: 'HR_Employee_EducationalDocument_Delete', values: { Id: id, Language: _currentLanguage }, CallBack: deleteEmployeeEducationalDocumentCallBack });
        }
    });
    var deleteEmployeeEducationalDocumentCallBack = function (response) {
        $('#frmEmployeeEducationalDocument')[0].reset();
        $('#EducationalDocumentId').val(0);
        swal(response.Value);
        loadEducationalDocumentsGrid();
        
    }

}



function loadEducationalDocumentDegreeFromCountryDropdownList(isBindChangeEvent = true) {
    if ($('#EducationalDocumentLanguage').val() == 'en-US') {
        loadKendoDropdownList('EducationalDocumentDegreeFromCountryId', 'Id [Value], NameEng [Text]', 'HR_Nationality', 'NameEng IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('EducationalDocumentDegreeFromCountryId', 'Id [Value], NameArb [Text]', 'HR_Nationality', 'NameArb IS NOT NULL', null, 'menuDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            // $("#NationalityId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);
}