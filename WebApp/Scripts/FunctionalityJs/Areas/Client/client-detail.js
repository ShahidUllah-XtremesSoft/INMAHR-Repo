var personalClient_Id = (new URL(location.href)).searchParams.get('id');

$(function () {
    $('#Language').val(_currentLanguage);
    $('#LoggedInUserId').val(JSON.parse(localStorage.getItem('User')).id);


    loadProfile();

});
//|Load Employee Profile Starts
function loadProfile() {
    ajaxRequest({
        commandName: 'Client_Details_By_Id',
        values: {
            Id: personalClient_Id,
            LoggedInUser: JSON.parse(localStorage.getItem('User')).id,
            RoleId: JSON.parse(localStorage.getItem('User')).roleId,
            Language: $('#Language').val()
        }, CallBack: loadProfileCallBack
    });
}
function loadProfileCallBack(response) {
    var clientDetails = JSON.parse(response.Value);
    $(".ClientName").text(clientDetails.clientName)
    $(".PhoneNumber1").text(clientDetails.phoneNumber1)
    $(".PhoneNumber2").text(clientDetails.phoneNumber2)
    $(".Email1").text(clientDetails.email1)
    $(".Email2").text(clientDetails.email2)
    $(".Nationality").text(clientDetails.nationalityName)
    $(".ClientCity").text(clientDetails.cityName)
    $(".ClientLocation").text(clientDetails.location)
    $(".ClientCreatedDate").text(clientDetails.clientCreatedDate)
    $(".client-username").text(clientDetails.username);
    $(".client-password").text(clientDetails.password);






    if (JSON.parse(response.Value).currentFileName != null) {
        var profileImage = '/UploadFile/' + JSON.parse(response.Value).currentFileName;
        $('#ProfileImage').attr('src', profileImage);
    }
     

    if (JSON.parse(response.Value).client_Signature != null) {
        var clientSignature= '/UploadFile/' + JSON.parse(response.Value).client_Signature;
        $('#ClientSignature').attr('src', clientSignature);
    } else {
        $('.hideClient_signature').hide();
    }



}



function fnCheckTab(selectedTab) {

    if (selectedTab == "ClientDocumentInformation") {

        loadPersonalDocumentsKendoGrid();
    } else if (selectedTab == "ClientProjectInformation") {
         
        loadClientProjectInformationKendoGrid();
    } else if (selectedTab == "ClientMeetingInformation") {
         
        loadClientMeetingInformationKendoGrid();
    } else if (selectedTab == "ClientProjectIssuesInformation") {
         
        loadClientProjectIssueInformationKendoGrid();
    }

}