var queryStringLetterId = 0,requestCameFrom;
$(function () {
    queryStringLetterId = (new URL(location.href)).searchParams.get('value');
    requestCameFrom= (new URL(location.href)).searchParams.get('from');
    
   
    
    getInternalLetterById(queryStringLetterId);
});
function getInternalLetterById(queryStringLetterId) {
    ajaxRequest({ commandName: 'Employee_InternalLetter_GetById', values: { Id: queryStringLetterId, Language: _currentLanguage }, CallBack: getInternalLetterByIdCallBack });
    if (requestCameFrom == 'inbox') {
        updateLetterIsRead(queryStringLetterId);
    }

}
var getInternalLetterByIdCallBack = function (inputDataJSON) {    
    var responseJSON = JSON.parse(inputDataJSON.Value);

    var letterToArray = responseJSON.letterTo.split(',');
    
    $('#divTo').html('To - ');
    letterToArray.forEach(function (item) {
        
        $('#divTo').append('<span class="badge badge-success">'+item+'</span>');
    });
    $('#divFrom').text(responseJSON.createdBy);
    $('#divBody').html(responseJSON.body);
    $('#divDate').html(responseJSON.createdDate);
    
}
function updateLetterIsRead(queryStringLetterId) {    
    ajaxRequest({ commandName: 'Employee_InternalLetter_UpdateIsRead', values: { Id: queryStringLetterId, IsRead: true, LoggedInUserId: JSON.parse(localStorage.getItem('User')).id, LoggedInEmployeeDepartmentId: JSON.parse(localStorage.getItem('User')).employeeDepartmentId, Language: _currentLanguage }, CallBack: '' });    

}