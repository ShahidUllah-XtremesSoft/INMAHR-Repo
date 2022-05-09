var FkID = (new URL(location.href)).searchParams.get('id');


var userId = "";
var username = "";
var employeeId = "";
var roleID = "";

$(function () {

    ////---------------------------------  USER SESSION RECORD START ----------------------------------------------------------------------------
    userId = JSON.parse(localStorage.getItem('User')).id;
    commentemployeeId = JSON.parse(localStorage.getItem('User')).employeeId;
    username = JSON.parse(localStorage.getItem('User')).employeeNameEng;
    roleID = JSON.parse(localStorage.getItem('User')).roleId;

    ////---------------------------------  USER SESSION RECORD END ----------------------------------------------------------------------------
    $("#UserID").val(userId);
    $("#Comment_EmployeeId").val(commentemployeeId);
    $("#FkID").val(FkID);
    $("#CommentLanguage").val(_currentLanguage);
    LoadComments();

});





function LoadComments() {

    ajaxRequest({ commandName: 'Comment_Get_ByAreaID', values: { ByAreaID: $("#FkID").val(), Areatype: $("#Areatype").val() }, CallBack: loadLoadComments });

}


var loadLoadComments = function (d) {

    $('#LoadAllCooments').html('');
    for (var i = 0; i < JSON.parse(d.Value).length; i++) {
        //$('#LoadAllCooments').append('<li class="media"> <div class="media-left" id=' + JSON.parse(d.Value)[i]["commentID"] + '><a href="#"><img class="media-object img-circle comment-img" src="/themes/assets/images/user.png" alt="Generic placeholder image"></a></div><div class="media-body"> <h6 class="media-heading txt-primary">' + JSON.parse(d.Value)[i]["name"] + ' <span class="f-12 text-muted m-l-5">' + JSON.parse(d.Value)[i]["commentDate"] + ' </span></h6> <p>' + JSON.parse(d.Value)[i]["commentDescription"] + '</p > <hr> </div> </li >');

        if (JSON.parse(d.Value)[i].empCurrentFileName != null) {
            var profileImage = '/UploadFile/' + JSON.parse(d.Value)[i].empCurrentFileName;

        } else {
            profileImage = "/Content/Images/user.jpg";
        }

        $('#LoadAllCooments').append('' +
            '<li class="media">' +
            '<div class="media-left commentd" id=' + JSON.parse(d.Value)[i]["commentID"] + '>' +
            '<a href="#"><img class="img-avatar" src="' + profileImage + '"  id="" name="" style="border-radius: 50%; width: 60px;"  /></a>' +
            '</div>' +
            '<div class="media-body"><h6><strong class="txt-employee-name"> ' + JSON.parse(d.Value)[i]["empName"] + '</strong><span class="  text-muted badge txt-comment-posted-date">' + JSON.parse(d.Value)[i]["commentDate"] + ' </span><a><span style="cursor: pointer;" class="text-muted badge pull-right" data-comment-id="' + JSON.parse(d.Value)[i]["commentID"] + '" onClick="fn_DeleteCommentById(this)">Delete </span></h6></a><p>' + JSON.parse(d.Value)[i]["commentDescription"] + '</p><hr>' +
            '</div>' +
            '</li>');
    }


}
function fn_DeleteCommentById(e) {

 
   

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
                commandName: 'Comment_Delete',
                values: {
                    Id: $(e).attr('data-comment-id'),
                    EmployeeId: commentemployeeId,
                    UserId: userId,
                    Language: _currentLanguage
                }, CallBack: fn_DeleteCommentByIdCallBack
            });
        }
    });
    var fn_DeleteCommentByIdCallBack = function (response) {

        swal(response.Value);
        LoadComments();

    }
}

//$('body').on('click', '.childValue', function (e) {

//    if ($(e.target).is('span')) {
//        var value = $(e.target).text();
//        alert(value);
//    }
//});
//$('#btn-save-comment').on('click', function (e) {

//    var txtComment = $('#txt-add-comment').val();
//    if (txtComment != null || txtComment != '') {

//        KendoGlobalAjax({
//            commandName: 'CustomerOrder_DetailsByID', values: {
//                txtComment: txtComment
//            }, CallBack: loadLoadComments
//        });

//    }

//});
function fn_SaveComment() {



    $("#UserID").val(userId);
    $("#Comment_EmployeeId").val(commentemployeeId);
    $("#FkID").val(FkID);
    $("#CommentLanguage").val(_currentLanguage);



    if (customValidateForm('frmAddUpdateComment')) {

        buttonAddPleaseWait('btn-save-comment');

        $("#frmAddUpdateComment").ajaxForm();
        var options = {
            success: function (response, statusText, jqXHR) {
                buttonRemovePleaseWait('btn-save-comment', 'Add Comment', '');

                swal(response);
                var messageResponseParse = JSON.parse(response);
                if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                } if (messageResponseParse.type == undefined) {
                    messageResponseParse = JSON.parse(messageResponseParse);
                }
                $('#frmAddUpdateComment').trigger('reset');
                LoadComments();

            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                buttonRemovePleaseWait('btn-save-comment', 'Add Comment', '');
                alert(errmsg);
            },
            complete: function () {
                buttonRemovePleaseWait('btn-save-comment', 'Add Comment', '');
            }
        };
        $("#frmAddUpdateComment").ajaxSubmit(options);
    }
    else {
        buttonRemovePleaseWait('btn-save-comment', 'Add Comment', '');
        return false;
    }


}

/*
$('#btn-save-comment').on('click', function (e) {
    e.preventDefault();
    if (validateForm('frmAddUpdateComment')) {
        var frm = $(this).closest("form");
        var frm_id = frm.attr("id");
        var frm_id_splitted = frm_id.split("_");
        var frm_id_splitted_2 = frm_id_splitted[2];

        var frm_serialized = frm.serialize();

        $.ajax({
            url: "/services/Xtreme/multipart",
            method: "POST",
            data: frm_serialized,
            success: function (response, statusText, jqXHR) {
                LoadComments();
                $('#CommentDescription').val('');
            },
            error: function (xhr, status, error) {
                var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                alert(errmsg);
            }
        });
    }
    else return false;
});
*/
