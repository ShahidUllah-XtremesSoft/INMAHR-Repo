
var PenaltysGrid = "penalty-grid";
$(function () {
    $('#Language').val(_currentLanguage);


    loadPenaltyGrid();
    if (!JSON.parse(localStorage.getItem('User')).isHR) {
        $('.frmCompanypenalty').hide();
    } else {
        $('.frmCompanypenalty').show();
    }

});
function loadPenaltyGrid() {
    ajaxRequest({ commandName: 'HR_Penalty_List', values: { EmployeeId: JSON.parse(localStorage.getItem('User')).employeeId, Language: $('#Language').val() }, CallBack: loadPenaltysCallBack });
}
var loadPenaltysCallBack = function (inputDataJSON) {
    console.log(inputDataJSON);
    bindPenaltysGrid(JSON.parse(inputDataJSON.Value));
}
var bindPenaltysGrid = function (inputDataJSON) {
    var record = 0;
    var gridColumns = [

        {
            title: "#", template: "<b>#= ++record #</b>", width: 5, template: "<a style='cursor:pointer;' onClick= viewAttachment('#=currentFileName#',this)><b>#= ++record #</b></a>"
        },
        { field: "id", title: "id", hidden: true },
        {
            field: "name", title: lblName, width: 50, filterable: true,
            template: "<a style='cursor:pointer;' onClick= viewAttachment('#=currentFileName#',this)>#=name#</a>"
        },
        {
            field: "",
            width: 20,
            title: attachment,
            template: "<a style='font-size:20px;cursor:pointer;' onClick= viewAttachment('#=currentFileName#',this)  title=''>#if(currentFileName == null){}else{ if(currentFileName.split('.').pop().toLowerCase() == 'pdf'){#<img src='/Content/Images/pdf.png' style='width:30px;cursor:pointer;'/></a>#} else {#<img src='/Content/Images/ImageIcon.png' style='width:33px;height:34px;cursor:pointer;'/></a>#} }#"
        },
        {
            field: "penaltyStatus", title: lblStatus, width: 10, filterable: false
            , template: "<a style='cursor:pointer;' onClick= viewAttachment('#=currentFileName#',this)>#=penaltyStatus#</a>"
        },
        {
            field: "", width: 5,
            title: ' ',
            //    template: "<a style='font-size:20px;cursor:pointer;' onClick= editPenaltys(this) title='Edit Company Document' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deletePenaltysById(this)  title='Delete Company Document'><span class='fa fa-trash'></span></a>  "
            template: "#if(JSON.parse(localStorage.getItem('User')).isHR){ #<a style='font-size:20px;cursor:pointer;'  onClick= deletePenaltysById(this)  title=' '><span class='fa fa-trash'></span></a> #} #"

        }
    ];

    bindKendoGrid(PenaltysGrid, 50, gridColumns, inputDataJSON);
};

function viewAttachment(currentFileName, event) {
    var row = $(event).closest("tr");
    var grid = $("#" + PenaltysGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    if (currentFileName == "null") {
        swalMessage('info', '@HRModuleUI.HumanResourceUI.MsgAttachmentNotFound', 2000);
        return false;
    }
    ajaxRequest({
        commandName: 'HR_Penalty_UpdateStatus',
        values: {
            HR_Penalty_Id: dataItem.id,
            EmployeeId: JSON.parse(localStorage.getItem('User')).employeeId,
            LoggedInUserId: JSON.parse(localStorage.getItem('User')).id,
            Language: $('#Language').val()
        }, CallBack: ''
    });

    window.open('/UploadFile/' + currentFileName, '_blank');
    loadPenaltyGrid();

}

function editPenaltys(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + PenaltysGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    $('#Id').val(dataItem.id);
    $('#NameEng').val(dataItem.nameEng);
    $('#NameArb').val(dataItem.nameArb);
    $('#DescriptionEng').val(dataItem.descriptionEng);
    $('#DescriptionArb').val(dataItem.descriptionArb);
}
function deletePenaltysById(event) {

    var row = $(event).closest("tr");
    var grid = $("#" + PenaltysGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({
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
            ajaxRequest({ commandName: 'HR_Penalty_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deletePenaltysByIdCallBack });
        }
    });
    var deletePenaltysByIdCallBack = function (response) {
        swal(response.Value);

        $('#Id').val(0);
        loadPenaltyGrid();
    }

}
