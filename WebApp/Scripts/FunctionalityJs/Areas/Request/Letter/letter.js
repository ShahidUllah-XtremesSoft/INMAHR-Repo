
var $LetterGrid = "LetterGrid";
$(function () {

    $('#Language').val(_currentLanguage);
    $('#CreatedBy').val(JSON.parse(localStorage.getItem('User')).id);
    $("#OtherDiv").css('display', 'none');
    $("#Other").prop('required', false);

    loadLetterTypeDropdownList(true);
    loadLetterGrid();
    $('#btnSave').on('click', function (e) {
        saveLetterRequest();
    });
})

function loadLetterTypeDropdownList(isBindChangeEvent = false) {
    
        loadKendoDropdownByTypeName('LetterTypeId', 'LetterType');
    
    setTimeout(function () {
        if (isBindChangeEvent) {
            $("#LetterTypeId").data("kendoDropDownList").bind("change", letterTypeDropdownListOnChange);
        }
    }, 1500);
}
function letterTypeDropdownListOnChange(e) {
    var dataItem = e.sender.dataItem();
    
    console.log(dataItem.text);
    if (dataItem.text == 'Other' || dataItem.text == 'أخرة') {
        $("#OtherDiv").css('display', 'block');
        $("#Other").prop('required', true);
    }
    else {
        $("#OtherDiv").css('display', 'none');
        $("#Other").prop('required', false);

    }


}
function loadLetterGrid() {

    //ajaxRequest({ commandName: 'Request_Letter_Get', values: { Id: $('#Id').val(), Language: _currentLanguage     }, CallBack: loadLetterGridCallBack });
    ajaxRequest({ commandName: 'Request_Letter_Get', values: { Id: $('#Id').val(), CreatedBy: $('#CreatedBy').val(), LoggedInUserId: JSON.parse(localStorage.getItem('User')).id, LoggedInUserRoleId: JSON.parse(localStorage.getItem('User')).roleId, LoggedInUserDepartementId: JSON.parse(localStorage.getItem('User')).departmentId, Language: _currentLanguage }, CallBack: loadLetterGridCallBack });

}
var loadLetterGridCallBack = function (inputDataJSON) {
    bindLetterGrid(JSON.parse(inputDataJSON.Value));
}
var bindLetterGrid = function (inputDataJSON) {
    var record = 0;
    var gridColumns = [
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },
        { field: "id", title: "id", hidden: true },
        { field: "LetterTypeId", title: "LetterTypeId", hidden: true },
        { field: "letterType", title: letterType, hidden: false, width: 20 },
        { field: "note", title: note, hidden: false, width: 30 },
        { field: "other", title: Other, hidden: false, width: 30 },
        { field: "comment", title: comment, hidden: false, width: 30 },
        { field: "statusId", title: "StatusId", hidden: true, width: 30 },
        //{ field: "status", title: "Status", hidden: false, width: 30 },
        {
            title: Status,
            field: 'statusForCondition',
            width: 30,
            hidden: false,
            //template: 1 == 1 ? "<span class='badge badge-success'>#:status#</span>" : "<span class='badge badge-danger'>#:status#</span>"
            template: "#if (statusForCondition.substring(0,7) == 'Decline') { # <span class='badge badge-danger'>#:statusForCondition#</span> # } else if(statusForCondition == 'Pending') {# <span class='badge badge-primary'>#:status#</span> # } else {# <span class='badge badge-success'>#:status#</span> # }#"
        },
        //Below is action column
        {
            field: "", width: 10,
            title: action,
            template: "# if(statusForCondition == 'Pending') { #<a style = 'font-size:20px;cursor:pointer;' onClick = editLetter(this) title='Edit Letter' > <span class='fa fa-edit'></span></a> <a style='font-size:20px;cursor:pointer;' onClick= deleteLetterById(this)  title = 'Delete Letter' > <span class='fa fa-trash'></span></a >#} else {}# "

        }
              

    ];

    bindKendoGrid($LetterGrid, 50, gridColumns, inputDataJSON, true);    

};
function editLetter(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $LetterGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    $('#Id').val(dataItem.id);
    $('#Note').val(dataItem.note);
    $('#Other').val(dataItem.other);
    var dropdownlist = $("#LetterTypeId").data("kendoDropDownList");
    dropdownlist.value(dataItem.letterTypeId);
    
    dropdownlist.trigger("change")

}
function saveLetterRequest() {   
        if (customValidateForm('frmLetterDetail')) {
            $("#frmLetterDetail").ajaxForm();
            buttonAddPleaseWait('btnSave');
            var options = {
                success: function (response, statusText, jqXHR) {
                    buttonRemovePleaseWait('btnSave', save, 'save');
                    swal(response);
                    $('#Id').val(0);
                    loadLetterGrid();
                    clearFields();

                },
                error: function (xhr, status, error) {                    
                    buttonRemovePleaseWait('btnSave', save, 'save');
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;                    
                    alert(errmsg);
                }
                , complete: function () {
                    buttonRemovePleaseWait('btnSave', save, 'save');
                }
            };
            $("#frmLetterDetail").ajaxSubmit(options);
        }
        else {
            
            buttonRemovePleaseWait('btnSave', save, 'save');

        }
   
}
function clearFields() {
    $('#Id').val(0);
    $('#Other').val('');
    $('#Note').val('');
    var dropdownlist = $("#LetterTypeId").data("kendoDropDownList");
    dropdownlist.value(-1);
}
function deleteLetterById(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + $LetterGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
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
        text: doYouReallyWantToDeletThisRecord,
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
            ajaxRequest({ commandName: 'Request_Letter_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteLetterByIdCallBack });
        }
    });
    var deleteLetterByIdCallBack = function (response) {
        swal(response.Value);
        loadLetterGrid();
    }
}