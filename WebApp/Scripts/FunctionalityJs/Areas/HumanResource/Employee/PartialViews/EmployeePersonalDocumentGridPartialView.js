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
        /*
        if (item.status == 'Valid' || item.status == 'صالح') {
            var status = '<span class="badge badge-success">' + item.status + '</span>';
        }
        else {
            var status = '<span class="badge badge-danger">' + item.status + '</span>';
        }
        */
        var classColor = '';
        if (item.totalDays <= 0) {
            classColor = 'badge badge-danger';
        } else if (item.totalDays <= 29) {
            classColor = 'badge badge-warning';
        } else {
            classColor = 'badge badge-success';
        }
        $('#EmployeePersonalDocumentGrid tbody').append(
            //<td><a class="edit"  title="Edit" data-toggle="tooltip"><i class="fa fa-edit" onclick="editEmployeePersonalDocument(this)" style="font-size: 26px;color: green;"></i></a>   <a class="deleteEmployeeDocumentType" title="Delete" data-toggle="tooltip"><i class="fa fa-trash" style="font-size: 26px;color: #FF4500;" onclick="deleteEmployeePersonalDocument(this)"></i></a></td> 
            '<tr>' +
            '<td hidden class="Id">' + item.id + '</td><td hidden class="SetupDetailTypeId">' + item.setupDetailTypeId + '</td>' +
            '<td hidden class="PersonalDocument">' + item.currentFileName + '</td>' +
            '<td>' + fileCount + '</td>' +
            '<td class="documentType">' + item.documentType + '</td> ' +
            '<td class="releaseDate">' + item.releaseDate + '</td> ' +
         //   '<td class="expiryDate"><span class="' + classColor + '">' + item.expiryDate + '</span></td>' +
            '<td class="expiryDate"><span >' + item.expiryDate + '</span></td>' +
        //    '<td class="expiryIn"><span class="' + classColor + '">' + item.totalDays + ' (' + lblDays + ')' + '</span></td>' +
            '<td class="expiryIn"><span >' + item.totalDays + ' (' + lblDays + ')' + '</span></td>' +
            '<td class="Status"><span class="' + classColor + '">' + item.status + '</span></td>' +
            '<td style="text-align: left;font-size: x-large;" class=""><a  target="_blank" href="/UploadFile/' + item.currentFileName + '">' + fileImage + ' </td>  ' +
            '</tr > '
        );
        fileCount += 1;
    });
}
//| Ends Employee Personal Document