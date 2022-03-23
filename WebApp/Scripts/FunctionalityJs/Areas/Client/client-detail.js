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






    if (JSON.parse(response.Value).currentFileName != null) {
        var profileImage = '/UploadFile/' + JSON.parse(response.Value).currentFileName;
        $('#ProfileImage').attr('src', profileImage);
    }



}

 

function fnCheckTab(selectedTab) {
 
    if (selectedTab == "ClientDocumentInformation") {
    
        loadPersonalDocumentsKendoGrid();
    }

}