var CompanyDocumentGrid = "company-document-grid";
$(function () {
    $('#Language').val(_currentLanguage);
    
    loadCompanyDocumentGrid();
    $("#IssueDate").kendoDatePicker({
        format: "yyyy-MM-dd"
    });
    $("#ExpiryDate").kendoDatePicker({
        format: "yyyy-MM-dd"
    });
});
function loadCompanyDocumentGrid() {
    ajaxRequest({ commandName: 'HR_CompanyDocument_GetAll', values: { Language: $('#Language').val() }, CallBack: loadCompanyDocumentCallBack });
}
var loadCompanyDocumentCallBack = function (inputDataJSON) {
    console.log(inputDataJSON);
    debugger;
    bindCompanyDocumentGrid(JSON.parse(inputDataJSON.Value));
}
var bindCompanyDocumentGrid = function (inputDataJSON) {
    var gridColumns = [

        { field: "id", title: "id", hidden: true },
        { field: "nameEng", title: NameEng, width: 100, filterable: true },
        { field: "nameArb", title: NameArb, width: 100, filterable: true },
        { field: "descriptionEng", title: DescriptionEng, width: 100, filterable: true },
        { field: "descriptionArb", title: DescriptionArb, width: 100, filterable: true },
        { field: "issueDate", title: IssueDate, width: 100, filterable: true },
        { field: "expiryDate", title: ExpiryDate, width: 100, filterable: true },
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
        swalMessage('info','@Resources.EmployeeResourcesUI.MsgAttachmentNotFound', 2000);
        return false;
    }
    window.open('/UploadFile/' + currentFileName, '_blank');
}

function editCompanyDocument(event) {
    debugger;
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
        title: 'Are you sure?',
        text: "Do you really want to delete selected record",
        //input: 'text',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d9534f',
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