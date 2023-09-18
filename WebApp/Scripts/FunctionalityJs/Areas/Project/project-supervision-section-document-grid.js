var Parameter_Project_Id = (new URL(location.href)).searchParams.get('id');
setTimeout(function () {
     
    if (Parameter_Project_Id == null || Parameter_Project_Id == 0 || Parameter_Project_Id == '') {
        Parameter_Project_Id = $('#SupervisionSection_Document_ProjectId').val()
    }
}, 100);

 
function fnLoadSupervisionSection_Document_Grid(Parameter_Project_Id) {
    ajaxRequest({
        commandName: 'Project_SupervisionSection_Document_Get',
        values: {

            Project_Id: Parameter_Project_Id,
            Language: _currentLanguage
        }, CallBack: fnLoadSupervisionSection_Document_CallBack
    });
}

var fnLoadSupervisionSection_Document_CallBack = function (inputDataJSON) {
   
    fn_Load_SupervisionSection_DocumentByIdResponse(JSON.parse(inputDataJSON.Value));

}
function fnedit_SupervisionSection_GovernmentDocumentById(e) {
    var row = $(e).closest("tr");
    var grid = $("#SupervisionSection_Document_KendoGrid").data("kendoGrid");
    var dataItem = grid.dataItem(row);

    $('#SupervisionSection_Document_Id').val(dataItem.SupervisionSection_Document_Id);

    $("#SupervisionSection_Document_StartDate").val(dataItem.startDate);
    $("#SupervisionSection_Document_EndDate").val(dataItem.endDate);
    $("#SupervisionSection_Document_ProjectId").val(dataItem.SupervisionSection_Document_Id);


    var dropdownlist = $("#Project_SupervisionSection_GovernmentDocument_SetupDetailTypeDDL").data("kendoDropDownList");
    dropdownlist.value(dataItem.SupervisionSection_Document_Id);


    //$('#SupervisionSection_Document_Id').val($(e).closest('tr').find(".attachmentId").text());

    //$("#SupervisionSection_Document_StartDate").val($(e).closest('tr').find(".startDate").text());
    //$("#SupervisionSection_Document_EndDate").val($(e).closest('tr').find(".endDate").text());
    //$("#SupervisionSection_Document_ProjectId").val($(e).closest('tr').find(".PersonalDocumentSetupDetailTypeId").text());

}
 


var fn_Load_SupervisionSection_DocumentByIdResponse = function (inputDataJSON) {

    var gridColumns = [
        { field: "attachmentId", title: "attachmentId", hidden: true, width: 20 },
        { field: "SupervisionSection_Document_Id", title: "SupervisionSection_Document_Id", hidden: true },
        { title: "#", template: "<b>#= ++record #</b>", width: 30, },
        {
            field: "currentFileName",
            title: lblDocumentAttachment,
            hidden: false,
            width: 50,
            filterable: false,
            template: " #  if (currentFileName == null )" +
                " { # <label class='pcoded-badge label label-danger'>No Attachment</label># }                                                                     else if(currentFileName.split('.')[1]=='pdf')" +
                " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/pdf.png'        style='width:50%;'/> </a># }else if(currentFileName.split('.')[1]=='xlsx')" +
                " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/xls.png'        style='width:50%;'/> </a># }else if(currentFileName.split('.')[1]=='docs' || currentFileName.split('.')[1]=='docx'|| currentFileName.split('.')[1]=='doc')" +
                " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/docx.png'       style='width:50%;'/> </a># } else" +
                " { # <a  target='_blank' href='/UploadFile/#=currentFileName #'>   <img class='' src='/Content/Images/attachment-icon.png' style='width:50%' /></a> #} #"


        },
        { field: "documentType", title: "documentType", hidden: true},
        { field: "combineDocumentType", title: documentType, hidden: false, width: 200, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        {
            field: "releaseDate", title: lblIssueDate, hidden: false, width: 70, filterable: false ,
            template: "   <label class='badge   badge-success'>#=releaseDate #</label>"
        },
        {
            field: "expiryDate", title: lblExpiryDate, hidden: false, width: 70, filterable: false,
            template: "#if(noExpiry != 1) { #<label class='badge   badge-danger'>#=expiryDate #</label> #} else {# <label class='badge  '>" + lblNoExpiry + "</label> #}#",

        },

        {
            field: "expiryIn", title: lblExpiresIn, hidden: false, width: 70, filterable: false,
           // template: "   <label class='badge   badge-success'>#=expiryIn #</label>"
            template: "#if(noExpiry == 1) { #<label class='badge  '>" + lblNoExpiry + "</label>#} else {#" +
                " #if (totalDays <= 0) { #<span class='badge badge-danger'>#:expiryIn#</span> # } else if (totalDays <= 29) { # <span class='badge badge-warning'>#:expiryIn#</span> # } " +
                "else {# <span class='badge badge-success'>#:expiryIn#</span> # }# #}#"

        },

        {
            title: status,
            field: 'status',
            width: 70,
            hidden: false,
            filterable: false,
            template: "#if (totalDays <= 0 && noExpiry == 0) { # <span class='badge badge-danger'>#:status#</span> # } else " +
                "if (totalDays <= 29 && noExpiry == 0) { # <span class='badge badge-warning'>#:status#</span> # } else" +
                "{# <span class='badge badge-success'>#:status#</span> # }#"


        }, 
        {
            field: "attachmentRemarks",
            title: lblRemarks,
            width: 200,
            hidden: false,
            filterable: false,
           // template: "  <span class='badge badge-info'>#:attachmentRemarks#</span>  "

        }, {
            field: "remarks_comment_for_client_or_employee",
            title: "Remarks For",
            width: 40,
            hidden: true,
            filterable: false,
            template: "  <span class='badge badge-info'>#:remarks_comment_for_client_or_employee#</span>  "

        },
        {
            field: "",
            width: 30,
            title: ' ',

            template:
                " <a style='font-size:20px;cursor:pointer;' onClick= fn_delete_SupervisionSection_DocumentById(this)  title="+lblDelete+"><span class='fa fa-trash'></span></a>  "
        },


    ];
    bindKendoGrid('SupervisionSection_Document_KendoGrid', 50, gridColumns, inputDataJSON, true, 435);

};


function fn_delete_SupervisionSection_DocumentById(event) {

    var row = $(event).closest("tr");
    var grid = $("#SupervisionSection_Document_KendoGrid").data("kendoGrid");
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
                commandName: 'Project_SupervisionSection_Document_Delete',
                values: {
                    Id: dataItem.attachmentId, FileName: dataItem.currentFileName, CreatedBy: JSON.parse(localStorage.getItem('User')).id, Language: _currentLanguage, Document: dataItem.combineDocumentType, ProjectId: $('#Id').val()
                }, CallBack: fn_delete_SupervisionSection_DocumentCallBack
            });        }
    });
    var fn_delete_SupervisionSection_DocumentCallBack = function (response) {
        $('#frmAddUpdate_SupervisionSection_Document')[0].reset();
        $('#SupervisionSection_Document_Id').val(0);
        swal(response.Value);
        fnLoadSupervisionSection_Document_Grid(Parameter_Project_Id);

    }

}
