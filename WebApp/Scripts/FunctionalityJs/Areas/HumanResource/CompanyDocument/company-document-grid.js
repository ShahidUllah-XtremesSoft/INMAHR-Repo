var CompanyDocumentGrid = "company-document-grid";
$(function () {
    $('#Language').val(_currentLanguage);

    loadCompanyDocumentGrid();
    renderKendoDatePicker('IssueDate', 'yyyy-MM-dd')
    renderKendoDatePicker('ExpiryDate', 'yyyy-MM-dd')


    //$("#IssueDate").kendoDatePicker({
    //    format: "yyyy-MM-dd"
    //});
    //$("#ExpiryDate").kendoDatePicker({
    //    format: "yyyy-MM-dd"
    //});
});
function loadCompanyDocumentGrid() {
    ajaxRequest({ commandName: 'HR_CompanyDocument_GetAll', values: { Language: $('#Language').val() }, CallBack: loadCompanyDocumentCallBack });
}
var loadCompanyDocumentCallBack = function (inputDataJSON) {
    console.log(inputDataJSON);
    bindCompanyDocumentGrid(JSON.parse(inputDataJSON.Value));
}
var bindCompanyDocumentGrid = function (inputDataJSON) {
    var record = 0;
    var gridColumns = [
        /*
        { title: "#", template: "<b>#= ++record #</b>", width: 20, },
        { field: "id", title: "id", hidden: true },
        { field: "nameEng", title: NameEng, width: 100, filterable: true },
        { field: "nameArb", title: NameArb, width: 100, filterable: true },
        { field: "descriptionEng", title: DescriptionEng, width: 100, filterable: true },
        { field: "descriptionArb", title: DescriptionArb, width: 100, filterable: true },
        */
        { title: "#", template: "<b>#= ++record #</b>", width: 20, },
        { field: "id", title: "id", hidden: true },
        { field: "nameEng", title: NameEng, width: 100, filterable: true, hidden: true },
        { field: "nameArb", title: NameArb, width: 100, filterable: true, hidden: true },
        { field: "name", title: lblCompanyName, width: 100, filterable: true },
        { field: "description", title: lblCompanyDescription, width: 100, filterable: true },
        { field: "descriptionEng", title: DescriptionEng, width: 100, filterable: true, hidden: true },
        { field: "descriptionArb", title: DescriptionArb, width: 100, filterable: true, hidden: true },
        { field: "issueDate", title: IssueDate, width: 50, filterable: true },
        {
            field: "expiryDate", title: ExpiryDate, width: 50, filterable: true
            //, template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>#:expiryDate#</span> # } else " +
            //    "if (totalDays <= 29) { # <span class='badge badge-warning'>#:expiryDate#</span> # } else" +
            //    "{# <span class='badge badge-success'>#:expiryDate#</span> # }#"
        },
        {
            field: "totalDays", title: lblExpiresIn, width: 50, filterable: false,
            //  template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>#:totalDays#</span> # } else {# <span class='badge badge-success'>#:totalDays#</span> # }#"
            //template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>#:totalDays#</span> # } else " +
            //    "if (totalDays <= 29) { # <span class='badge badge-warning'>#:totalDays#</span> # } else" +
            //    "{# <span class='badge badge-success'>#:totalDays#</span> # }#"

        },
        {
            field: "", title: lblStatus, width: 50, filterable: false,
            //   template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>" + lblStatusExpired + "</span> # } else {# <span class='badge badge-success'>" + lblStatusValid + "</span> # }#"
            template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>" + lblStatusExpired + "</span> # } else " +
                "if (totalDays <= 29) { # <span class='badge badge-warning'>" + lblStatusValid + "</span> # } else" +
                "{# <span class='badge badge-success'>" + lblStatusValid + "</span> # }#"
        },
        {
            field: "",
            width: 40,
            title: attachment,
            template: "<a style='font-size:20px;cursor:pointer;' onClick= viewAttachment('#=currentFileName#')  title='Download Attachment'>#if(currentFileName == null){}else{ if(currentFileName.split('.').pop().toLowerCase() == 'pdf'){#<img src='/Content/Images/pdf.png' style='width:30px;cursor:pointer;'/></a>#} else {#<img src='/Content/Images/ImageIcon.png' style='width:33px;height:34px;cursor:pointer;'/></a>#} }#"
        },
        {
            field: "", width: 50,
            title: ' ',
            template: "<a style='font-size:20px;cursor:pointer;' onClick= editCompanyDocument(this) title='Edit Company Document' ><span class='fa fa-edit'></span></a>  <a style='font-size:20px;cursor:pointer;' onClick= deleteCompanyDocumentById(this)  title='Delete Company Document'><span class='fa fa-trash'></span></a>  "

        }
    ];

    bindKendoGrid(CompanyDocumentGrid, 50, gridColumns, inputDataJSON);
};

function viewAttachment(currentFileName) {

    if (currentFileName == "null") {
        swalMessage('info', '@HRModuleUI.HumanResourceUI.MsgAttachmentNotFound', 2000);
        return false;
    }
    window.open('/UploadFile/' + currentFileName, '_blank');
}

function editCompanyDocument(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + CompanyDocumentGrid).data("kendoGrid");
    var dataItem = grid.dataItem(row);

    $('#Id').val(dataItem.id);
    $('#NameEng').val(dataItem.nameEng);
    $('#NameArb').val(dataItem.nameArb);
    $('#DescriptionEng').val(dataItem.descriptionEng);
    $('#DescriptionArb').val(dataItem.descriptionArb);
    $('#IssueDate').val(dataItem.issueDate);
    $('#ExpiryDate').val(dataItem.expiryDate);
}
function deleteCompanyDocumentById(event) {
    var row = $(event).closest("tr");
    var grid = $("#" + CompanyDocumentGrid).data("kendoGrid");
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
            ajaxRequest({ commandName: 'HR_CompanyDocument_Delete', values: { Id: dataItem.id, Language: $('#Language').val() }, CallBack: deleteCompanyDocumentByIdCallBack });
        }
    });
    var deleteCompanyDocumentByIdCallBack = function (response) {
        swal(response.Value);
        ClearControls();
        $('#Id').val(0);
        loadCompanyDocumentGrid();
    }

}
function ClearControls() {

    $('#Name').val('');
    $('#Description').val('');
    $('#IssueDate').val('');
    $('#ExpiryDate').val('');

}