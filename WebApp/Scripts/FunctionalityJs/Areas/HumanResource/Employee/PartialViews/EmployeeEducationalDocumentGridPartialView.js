$(function () {    
    loadEducationalDocumentsGrid();

});

//| Employee Educational Document
function loadEducationalDocumentsGrid() {
    ajaxRequest({ commandName: 'HR_Employee_EducationalDocument_Get', values: { EducationalDocumentId: 0, EducationalDocumentEmployeeId: localStorage.getItem('LoggedInEmployeeId'), EducationalDocumentLanguage: _currentLanguage }, CallBack: loadEducationalDocumentsGridCallBack });
}
var loadEducationalDocumentsGridCallBack = function (inputDataJSON) {
    $('#EmployeeEducationalDocumentGrid tbody').html('');
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
        var tr = '<tr>' +
            '<td>' + fileCount + '</td>' +
            '<td hidden class="EducationalDocumentId">' + item.id + '</td>' +
            '<td hidden class="EducationalDocumentFile">' + item.currentFileName + '</td>' +
            //'<td class="EducationalDocumentDegreeNameEng">' + item.degreeNameEng + '</td>' +
            //'<td class="EducationalDocumentDegreeNameArb">' + item.degreeNameArb + '</td>' +
            '<td class="EducationalDocumentDegreeName">' + item.degreeName + '</td>' +
            //'<td class="EducationalDocumentInstituteEng">' + item.instituteEng + '</td>' +
            //'<td class="EducationalDocumentInstituteArb">' + item.instituteArb + '</td>' +
            '<td class="EducationalDocumentInstitute">' + item.instituteName + '</td>' +
            '<td class="EducationalDocumentReleaseDate">' + item.releaseDate + '</td>' +
            '<td class="EducationalDocumentMarks">' + item.marks + '</td>' +
            '<td hidden class="EducationalDocumentDegreeFromCountryId">' + item.degreeFromCountryId + '</td>' +
            '<td class="EducationalDocumentDegreeFromCountryName">' + item.degreeFromCountryName + '</td>' +

            '<td style="text-align: left;font-size: x-large;" class=""><a  target="_blank" href="/UploadFile/' + item.currentFileName + '">' + fileImage + ' </td>' +
            //'<td>' +
            //'<a class="edit"  title="Edit" data-toggle="tooltip"><i class="fa fa-edit" onclick="editEmployeeEducationalDocument(this)" style="font-size: 26px;color: green;"></i></a>' +
            //'<a class="deleteEmployeeDocumentType" title="Delete" data-toggle="tooltip"><i class="fa fa-trash" style="font-size: 26px;color: #FF4500;" onclick="deleteEmployeeEducationalDocument(this)"></i></a>' +
            //'</td>' +
            '</tr > '
        $('#EmployeeEducationalDocumentGrid tbody').append(
            tr

        );
        fileCount += 1;
    });
}
//|End Employee Educational Documnent