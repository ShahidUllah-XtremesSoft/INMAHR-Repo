var Parameter_Project_Id = (new URL(location.href)).searchParams.get('id');
setTimeout(function () {

    if (Parameter_Project_Id == null || Parameter_Project_Id == 0 || Parameter_Project_Id == '') {
        Parameter_Project_Id = $('#DesignSection_Document_ProjectId').val()
    }
}, 200);
//$(function () {

//     fnLoadDesignSection_GovernmentDocument_();

//});

function fnLoadDesignSection_GovernmentDocument_(Parameter_Project_Id) {
    ajaxRequest({
        commandName: 'Project_DesignSection_Document_Get',
        values: {

            Project_Id: Parameter_Project_Id,
            Language: _currentLanguage
        }, CallBack: fnLoadDesignSection_GovernmentDocument_CallBack
    });
}

var fnLoadDesignSection_GovernmentDocument_CallBack = function (inputDataJSON) {
    /*
    var count = 1;
    $('#DesignSection_GovernmentDocument_Grid tbody').html('');


    JSON.parse(inputDataJSON.Value).forEach(function (item) {
       
        var statusClass = ''
        if (item.status == 'Valid') {
            statusClass = 'badge  badge-success '
        } else if (item.status == 'Expired') {
            statusClass = 'badge  badge-danger'
        } else {
            statusClass = 'badge  badge-warning'
        }


        var extension = item.currentFileName.split('.').pop().toLowerCase();
        if (extension == 'pdf') {
            var fileImage = '<img src="/Content/Images/pdf.png" style="width:30px;"/>';
        }
        else {
            var fileImage = '<img src="/Content/Images/attachment.png" style="width:30px;"/>';
        }
        $('#DesignSection_GovernmentDocument_Grid tbody').append(
            '<tr>' +
            '<td hidden class="attachmentId">' + item.attachmentId + '</td>' +
            '<td hidden class="DesignSection_Document_Id">' + item.DesignSection_Document_Id + '</td>' +
            '<td hidden class="PersonalDocumentSetupDetailTypeId">' + item.DesignSection_Document_Id + '</td>' +
            '<td hidden class="PersonalDocumentFile">' + item.currentFileName + '</td>' +
            '<td class="PersonalDocumentType"><b>' + count++ + '</b></td> ' +
            '<td class="PersonalDocumentType">' + item.documentType + '</td> ' +
            '<td class="PersonalDocumentReleaseDate">' + item.releaseDate + '</td> ' +
            '<td hidden class="startDate">' + item.startDate + '</td> ' +
            '<td hidden class="endDate">' + item.endDate + '</td> ' +
            '<td class="PersonalDocumentExpiryDate">' + item.expiryDate + '</td>' +
            '<td class="PersonalDocumentExpiryIn"><span class="' + statusClass + '">' + item.expiryIn + '</span></td>' +
            '<td class="PersonalDocumentStatus "><span class="' + statusClass + '">' + item.status + '</span></td>' +
            '<td style="font-size: x-large;" class=""><a  target="_blank" href="/UploadFile/' + item.currentFileName + '">' + fileImage + '</td>' +
            '<td style="padding-top:20px;">' +
            '<a class="edit"  title="Edit" data-toggle="tooltip"><i class="fa fa-edit" onclick="fnedit_DesignSection_GovernmentDocumentById(this)" style="font-size: 26px;color: green;"></i></a>  ' +
            '<a class="" title="Delete" data-toggle="tooltip"><i class="fa fa-trash" style="font-size: 26px;color: #FF4500;" onclick="fn_delete_DesignSection_GovernmentDocumentById(this)"></i></a>' +
            '</td>' +
            '</tr > '
        );
    });
   */
    fn_Load_DesignSection_GovernmentDocumentByIdResponse(JSON.parse(inputDataJSON.Value));

}
function fnedit_DesignSection_GovernmentDocumentById(e) {
    var row = $(e).closest("tr");
    var grid = $("#DesignSection_GovernmentDocument_KendoGrid").data("kendoGrid");
    var dataItem = grid.dataItem(row);

    $('#DesignSection_Document_Id').val(dataItem.DesignSection_Document_Id);

    $("#DesignSection_GovernmentDocument_StartDate").val(dataItem.startDate);
    $("#DesignSection_GovernmentDocument_EndDate").val(dataItem.endDate);
    $("#Project_DesignSection_GovernmentDocument_Id").val(dataItem.DesignSection_Document_Id);


    var dropdownlist = $("#Project_DesignSection_GovernmentDocument_SetupDetailTypeDDL").data("kendoDropDownList");
    dropdownlist.value(dataItem.DesignSection_Document_Id);


    //$('#DesignSection_Document_Id').val($(e).closest('tr').find(".attachmentId").text());

    //$("#DesignSection_GovernmentDocument_StartDate").val($(e).closest('tr').find(".startDate").text());
    //$("#DesignSection_GovernmentDocument_EndDate").val($(e).closest('tr').find(".endDate").text());
    //$("#Project_DesignSection_GovernmentDocument_Id").val($(e).closest('tr').find(".PersonalDocumentSetupDetailTypeId").text());

}



var fn_Load_DesignSection_GovernmentDocumentByIdResponse = function (inputDataJSON) {        
     

    var gridColumns = [
        { field: "attachmentId", title: "attachmentId", hidden: true, width: 20 },
        { field: "DesignSection_Document_Id", title: "DesignSection_Document_Id", hidden: true },
        { title: "#", template: "<b>#= ++record #</b>", width: 5, },
        {
            field: "currentFileName",
            title: lblDocumentAttachment,
            hidden: false,
            width: 30,
            filterable: false,
            template: " #  if (currentFileName == null )" +
                " { # <label class='pcoded-badge label label-danger'>"+lblNoAttachment+"</label># }                                                                     else if(currentFileName.split('.')[1]=='pdf')" +
                " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/pdf.png'        style='width:30%;'/> </a># }else if(currentFileName.split('.')[1]=='xlsx')" +
                " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/xls.png'        style='width:30%;'/> </a># }else if(currentFileName.split('.')[1]=='docs' || currentFileName.split('.')[1]=='docx'|| currentFileName.split('.')[1]=='doc')" +
                " { #  <a  target='_blank' href='/UploadFile/#=currentFileName #'> <img class='' src='/Content/Images/docx.png'       style='width:30%;'/> </a># } else" +
                " { # <a  target='_blank' href='/UploadFile/#=currentFileName #'>  <img class='' src='/Content/Images/attachment-icon.png' style='width:20%' /></a> #} #"


        },
        { field: "documentType", title: documentType, hidden: true },
        { field: "combineDocumentType", title: documentType, hidden: false, width: 100, filterable: { cell: { operator: "contains", suggestionOperator: "contains" } } },
        {
            field: "releaseDate", title: lblIssueDate, hidden: false, width: 20, filterable: false,
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
                //" <a style='font-size:20px;cursor:pointer;' onClick= fnedit_DesignSection_GovernmentDocumentById(this) title='Edit ' ><span class='fa fa-pencil'></span></a> " +
                " <a style='font-size:20px;cursor:pointer;' onClick= fn_delete_DesignSection_GovernmentDocumentById(this)  title="+lblDelete+"><span class='fa fa-trash'></span></a>  "
        },


    ];
    bindKendoGrid('DesignSection_GovernmentDocument_KendoGrid', 50, gridColumns, inputDataJSON, true, 400);

};


function fn_delete_DesignSection_GovernmentDocumentById(event) {

    var row = $(event).closest("tr");
    var grid = $("#DesignSection_GovernmentDocument_KendoGrid").data("kendoGrid");
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
                commandName: 'Project_DesignSection_Document_Delete',
                values: {
                    Id: dataItem.attachmentId, CreatedBy: JSON.parse(localStorage.getItem('User')).id, Language: _currentLanguage, Document: dataItem.combineDocumentType, ProjectId: $('#Id').val()
                }, CallBack: fn_delete_DesignSection_GovernmentDocumentCallBack
            });
        }
    });
    var fn_delete_DesignSection_GovernmentDocumentCallBack = function (response) {
        $('#frmAddUpdate_DesignSection_Document')[0].reset();
        $('#DesignSection_Document_Id').val(0);
        swal(response.Value);
        fnLoadDesignSection_GovernmentDocument_(Parameter_Project_Id);

    }

}
