
$(function () {

    $('#Language').val(_currentLanguage);



    $('#btn-save-employee').click(function () {
       

        if (customValidateForm('frmAddUpdateEmployee')) {

            buttonAddPleaseWait('btn-save-employee');

            $("#frmAddUpdateEmployee").ajaxForm();
            var options = {
                success: function (response, statusText, jqXHR) {
                    buttonRemovePleaseWait('btn-save-employee', 'Save', 'save');
                    
                    swal(response);
                    var messageResponseParse = JSON.parse(response);
                    if (messageResponseParse.type == undefined) {
                        messageResponseParse = JSON.parse(messageResponseParse);
                    } if (messageResponseParse.type == undefined) {
                        messageResponseParse = JSON.parse(messageResponseParse);
                    }
                    $('#EmployeeId').val(messageResponseParse.insertedId);


                    window.location.href = '/HumanResource/Employee/Edit?id=' + messageResponseParse.insertedId;

                },
                error: function (xhr, status, error) {
                    var errmsg = xhr.status + ':' + xhr.responseText + ':' + error;
                    buttonRemovePleaseWait('btn-save-employee', 'Save', 'save');
                    alert(errmsg);
                },
                complete: function () {
                    buttonRemovePleaseWait('btn-save-employee', 'Save', 'save');
                }
            };
            $("#frmAddUpdateEmployee").ajaxSubmit(options);
        }
        else {
            buttonRemovePleaseWait('btn-save-employee', 'Save', 'save');
            return false;
        }
    });



    //function loadDepartment() {
    //    ajaxRequest({ commandName: 'HR_Department_Dropdown_GetAll', values: { Language: 'English', }, CallBack: fillDepartmentDropdown });
    //}

    //function fillDepartmentDropdown(response) {

    //    var resultArray = [];
    //    var parrentArray = [];
    //    var parrentArrayFinal = [];
    //    var childArray = [];
    //    debugger;
    //    var data = JSON.parse(response.Value);
    //    data.forEach(function (row) {            
    //        if (parseInt(row.parentId) > 0) {
    //            console.log(parrentArray);
    //            parrentArray.push(row);
    //        }
    //    });
    //    var parentId = 0;
    //    parrentArray.forEach(function (row) {
    //        if (parentId != row.parentId) {
    //            data.forEach(function (rowData) {

    //                if (rowData.id == row.parentId) {
    //                    parrentArrayFinal.push(rowData);
    //                }                    
    //            });
    //            parentId = row.parentId;
    //        }
    //    });

    //    console.log('Parent Array : ' + JSON.stringify(parrentArrayFinal));
    //    //console.log(JSON.stringify(parrentArray));
    //    parrentArrayFinal.forEach(function (row) {

    //        data.forEach(function (rowData) {
    //            if(parseInt(rowData.parentId) == parseInt(row.id)) {
    //                childArray.push({text: rowData.nameEng});
    //            }
    //        });

    //        resultArray.push({ text: row.nameEng, items: childArray });
    //        childArray = [];
    //    });

    //    console.log(resultArray);

    //    //var parent = data.fetch(row => row.parentId > 0);



    //    $("#DepartmentId").kendoDropDownTree({
    //        dataSource: resultArray
    //    });
    //}







    //function loadDepartmentDropdownList(isBindChangeEvent = true) {
    //    if ($('#Language').val() == 'English') {
    //        loadKendoDropdownList('DepartmentId', 'Id [Value], NameEng [Text]', 'HR_Department', 'NameEng IS NOT NULL', 0, 'menuDropdownListOnChange');
    //    }
    //    else {
    //        loadKendoDropdownList('DepartmentId', 'Id [Value], NameArb [Text]', 'HR_Department', 'NameArb IS NOT NULL', null, 'menuDropdownListOnChange');
    //    }
    //    setTimeout(function () {
    //        if (isBindChangeEvent) {
    //           // $("#DepartmentId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
    //        }
    //    }, 1500);
    //}



});
