var Parameter_Project_Id = (new URL(location.href)).searchParams.get('id');
setTimeout(function () {
    if (Parameter_Project_Id == null || Parameter_Project_Id == 0 || Parameter_Project_Id == '') {
        Parameter_Project_Id = $('#TechnicalSection_Document_ProjectId').val()
    }
}, 100);

 
function fnLoadTechnicalSection_Document_Grid(Parameter_Project_Id) {
    ajaxRequest({
        commandName: 'Project_TechnicalSection_Document_Get',
        values: {

            Project_Id: Parameter_Project_Id,
            Language: _currentLanguage
        }, CallBack: fnLoadTechnicalSection_Document_CallBack
    });
}

var fnLoadTechnicalSection_Document_CallBack = function (inputDataJSON) {
   
    fn_Load_TechnicalSection_DocumentByIdResponse(JSON.parse(inputDataJSON.Value));

}
function fnedit_TechnicalSection_GovernmentDocumentById(e) {
    var row = $(e).closest("tr");
    var grid = $("#TechnicalSection_Document_KendoGrid").data("kendoGrid");
    var dataItem = grid.dataItem(row);

    $('#TechnicalSection_Document_Id').val(dataItem.TechnicalSection_Document_Id);

    $("#TechnicalSection_Document_StartDate").val(dataItem.startDate);
    $("#TechnicalSection_Document_EndDate").val(dataItem.endDate);
    $("#TechnicalSection_Document_ProjectId").val(dataItem.TechnicalSection_Document_Id);


    var dropdownlist = $("#Project_TechnicalSection_GovernmentDocument_SetupDetailTypeDDL").data("kendoDropDownList");
    dropdownlist.value(dataItem.TechnicalSection_Document_Id);


    //$('#TechnicalSection_Document_Id').val($(e).closest('tr').find(".attachmentId").text());

    //$("#TechnicalSection_Document_StartDate").val($(e).closest('tr').find(".startDate").text());
    //$("#TechnicalSection_Document_EndDate").val($(e).closest('tr').find(".endDate").text());
    //$("#TechnicalSection_Document_ProjectId").val($(e).closest('tr').find(".PersonalDocumentSetupDetailTypeId").text());

}
 


var fn_Load_TechnicalSection_DocumentByIdResponse = function (inputDataJSON) {

    var gridColumns = [
        { field: "attachmentId", title: "attachmentId", hidden: true, width: 20 },
        { field: "TechnicalSection_Document_Id", title: "TechnicalSection_Document_Id", hidden: true },
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },
        {
            field: "currentFileName",
            title: lblDocumentAttachment,
            hidden: false,
            width: 20,
            filterable: false,
            template: " #  if (currentFileName == null )" +
                " { # <label class='pcoded-badge label label-danger'>"+lblNoAttachment+"</label># }                                                                     else if(currentFileName.split('.')[1]=='pdf')" +
                " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/pdf.png'        style='width:30%;'/> </a># }else if(currentFileName.split('.')[1]=='xlsx')" +
                " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/xls.png'        style='width:30%;'/> </a># }else if(currentFileName.split('.')[1]=='docs' || currentFileName.split('.')[1]=='docx'|| currentFileName.split('.')[1]=='doc')" +
                " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/docx.png'       style='width:30%;'/> </a># } else" +
                " { # <a  target='_blank' href='/UploadFile/#=currentFileName #'>  <img class='' src='/UploadFile/#=currentFileName#' style='width:30%' /></a> #} #"


        },
        { field: "documentType", title: "documentType", hidden: true},
        { field: "combineDocumentType", title: documentType, hidden: false, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        {
            field: "releaseDate", title: lblIssueDate, hidden: false, width: 20, filterable: false ,
            template: "   <label class='badge   badge-success'>#=releaseDate #</label>"
        },
        {
            field: "expiryDate", title: lblEndDate, hidden: false, width: 20, filterable: false,
            template: "   <label class='badge   badge-danger'>#=expiryDate #</label>",

        },

        {
            field: "expiryIn", title: lblExpiresIn, hidden: false, width: 15, filterable: false,
           // template: "   <label class='badge   badge-success'>#=expiryIn #</label>"
            template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>#:expiryIn#</span> # } else " +
                "if (totalDays <= 29) { # <span class='badge badge-warning'>#:expiryIn#</span> # } else" +
                "{# <span class='badge badge-success'>#:expiryIn#</span> # }#"

        },

        {
            title: status,
            field: 'status',
            width: 10,
            hidden: false,
            filterable: false,
            template: "#if (totalDays <= 0) { # <span class='badge badge-danger'>#:status#</span> # } else " +
                "if (totalDays <= 29) { # <span class='badge badge-warning'>#:status#</span> # } else" +
                "{# <span class='badge badge-success'>#:status#</span> # }#"

        }, {
            field: "",
            width: 5,
            title: ' ',

            template:
                " <a style='font-size:20px;cursor:pointer;' onClick= fn_delete_TechnicalSection_DocumentById(this)  title='Delete'><span class='fa fa-trash'></span></a>  "
        },


    ];
    bindKendoGrid('TechnicalSection_Document_KendoGrid', 50, gridColumns, inputDataJSON, true, 400);

};


function fn_delete_TechnicalSection_DocumentById(event) {

    var row = $(event).closest("tr");
    var grid = $("#TechnicalSection_Document_KendoGrid").data("kendoGrid");
    var dataItem = grid.dataItem(row);
    Swal.fire({

        title: areYouSureTitle,
        text: doYouReallyWantToDeletThisRecord,
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
             
            ajaxRequest({
                commandName: 'Project_TechnicalSection_Document_Delete',
                values: {
                    Id: dataItem.attachmentId, CreatedBy: JSON.parse(localStorage.getItem('User')).id, Language: _currentLanguage, Document: dataItem.combineDocumentType, ProjectId: $('#Id').val()
                }, CallBack: fn_delete_TechnicalSection_DocumentCallBack
            });        }
    });
    var fn_delete_TechnicalSection_DocumentCallBack = function (response) {
        $('#frmAddUpdate_TechnicalSection_Document')[0].reset();
        $('#TechnicalSection_Document_Id').val(0);
        swal(response.Value);
        fnLoadTechnicalSection_Document_Grid(Parameter_Project_Id);

    }

}
