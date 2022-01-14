$(function () {
    loadEmployeePersonalDocumentGrid();

});
//Employee Personal Document
function loadEmployeePersonalDocumentGrid() {
    ajaxRequest({ commandName: 'HR_Employee_PersonalDocument_Get', values: { PersonalDocumentId: $('#Id').val(), PersonalDocumentEmployeeId: localStorage.getItem('LoggedInEmployeeId'), PersonalDocumentLanguage: _currentLanguage }, CallBack: loadPersonalDocumentsGridCallBack });
}
var loadPersonalDocumentsGridCallBack = function (inputDataJSON) {
    $('#EmployeePersonalDocumentGrid tbody').html('');
    var fileCount = 1;
    JSON.parse(inputDataJSON.Value).forEach(function (item) {
        var extension = item.currentFileName.split('.').pop().toLowerCase();
        console.log(item);
        if (extension == 'pdf') {
            var fileImage = '<img src="/Content/Images/pdf.png" style="width:30px;"/>';
        }
        else {
            var fileImage = '<img src="/Content/Images/attachment.png" style="width:30px;"/>';
        }
        if (item.status == 'Valid' || item.status == 'صالح') {
            var status = '<span class="badge badge-success">' + item.status + '</span>';
        }
        else {
            var status = '<span class="badge badge-danger">' + item.status + '</span>';
        }
        $('#EmployeePersonalDocumentGrid tbody').append(
            //<td><a class="edit"  title="Edit" data-toggle="tooltip"><i class="fa fa-edit" onclick="editEmployeePersonalDocument(this)" style="font-size: 26px;color: green;"></i></a>   <a class="deleteEmployeeDocumentType" title="Delete" data-toggle="tooltip"><i class="fa fa-trash" style="font-size: 26px;color: #FF4500;" onclick="deleteEmployeePersonalDocument(this)"></i></a></td> 
            '<tr><td hidden class="Id">' + item.id + '</td><td hidden class="SetupDetailTypeId">' + item.setupDetailTypeId + '</td><td hidden class="PersonalDocument">' + item.currentFileName + '</td><td>' + fileCount + '</td><td class="documentType">' + item.documentType + '</td> <td class="releaseDate">' + item.releaseDate + '</td> <td class="expiryDate">' + item.expiryDate + '</td><td class="expiryIn">' + item.expiryIn + '</td><td class="Status">' + status + '</td><td style="text-align: left;font-size: x-large;" class=""><a  target="_blank" href="/UploadFile/' + item.currentFileName + '">' + fileImage + '                           </td>          </tr > '
        );
        fileCount += 1;
    });
}
//| Ends Employee Personal Document