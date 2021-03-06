var departmentDefaultId = 0;

$(function () {
    $('#Language').val(_currentLanguage);
    $('#ProfileImageDiv').css('display', 'none');
    //loadDepartmentTreeDropdownList();
    $('#ProfileImage').hide();
 

    lodEmployeeById();


        //Comment the request for better performance
    //loadDepartmentTreeDropdownList();
    //loadProfessionDropdownList(isBindChangeEvent = true);
    //loadDepartmentDropdownList(isBindChangeEvent = true);
    //loadNationalityDropdownList(isBindChangeEvent = true);
    //loadSponsorShipDropdownList(isBindChangeEvent = true);
    //loadContractTypeDropdownList(isBindChangeEvent = true);
    loadRoleDropdownList(isBindChangeEvent = true);
    //loadEmiratesStatesDropdownList(false);

    
        $("#ProfessionId").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            filter: "contains",
            index: -1,
            dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('ProfessionListEng')) : JSON.parse(localStorage.getItem('ProfessionListArb')),
        });
        $("#NationalityId").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            filter: "contains",
            index: -1,
            dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('NationalityListEng')) : JSON.parse(localStorage.getItem('NationalityListArb')),
        });
        $("#VisaSponsorshipId").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            filter: "contains",
            index: -1,
            dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('SponsorshipListEng')) : JSON.parse(localStorage.getItem('SponsorshipListArb')),
        });
        $("#ContractTypeId").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            filter: "contains",
            index: -1,
            dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('ContractTypeListEng')) : JSON.parse(localStorage.getItem('ContractTypeListArb')),
        });

        $("#EmiratesStateId").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            filter: "contains",
            index: -1,
            dataSource: _currentLanguage == 'en-US' ? JSON.parse(localStorage.getItem('EmiratesStatesListEng')) : JSON.parse(localStorage.getItem('EmiratesStatesListArb')),
        });

});

function lodEmployeeById() {
    
    var full_url = document.URL;           // Get current url
    var url_array = full_url.split('=');  //Split
    id = url_array[url_array.length - 1];//Get ID
    if (id != url_array) {
        $('#EmployeeId').val(id);
        $('#PersonalDocumentEmployeeId').val(id);
        $('#EducationalDocumentEmployeeId').val(id);
        ajaxRequest({ commandName: 'HR_Employee_GetById', values: { Language: _currentLanguage, id: id }, CallBack: loadClientDataByID });
    }
}
function loadClientDataByID(d) {
    
    setResponseToFormInputs(d);
    var profession = $("#ProfessionId").data("kendoDropDownList");
    profession.value(JSON.parse(d.Value).professionId);

    var Nationality = $("#NationalityId").data("kendoDropDownList");
    Nationality.value(JSON.parse(d.Value).nationalityId);

    var visaSponsorshiop = $("#VisaSponsorshipId").data("kendoDropDownList");
    visaSponsorshiop.value(JSON.parse(d.Value).visaSponsorshipId);

    var contractType = $("#ContractTypeId").data("kendoDropDownList");
    contractType.value(JSON.parse(d.Value).contractTypeId);

    var emilatesState = $("#EmiratesStateId").data("kendoDropDownList");
    emilatesState.value(JSON.parse(d.Value).emiratesStateId);
    //setTimeout(function () {
        console.log(JSON.parse(d.Value).currentFileName);
        if (JSON.parse(d.Value).currentFileName != null) {
            var profileImage = '/UploadFile/' + JSON.parse(d.Value).currentFileName;
            $('#ProfileImage').attr('src', profileImage);
    }
    ajaxRequest({ commandName: 'HR_Department_Dropdown_GetAll', values: { Language: _currentLanguage, }, CallBack: loadTreeDropdownListEdit });
    //}, 1000);
    //$professionId = JSON.parse(d.Value).professionId;
    //$departmentId = JSON.parse(d.Value).departmentId;
    //$visaSposershipId = JSON.parse(d.Value).visaSponsorshipId;
    //$contractTypeId = JSON.parse(d.Value).contractTypeId;
    //$nationalityId = JSON.parse(d.Value).nationalityId;
    //$roleId = JSON.parse(d.Value).roleId;
    //$('#Id').val(JSON.parse(d.Value).id);
    //$('#Name').val(JSON.parse(d.Value).name);
    //$('#PhoneNumber').val(JSON.parse(d.Value).phoneNumber);
    //$('#Email').val(JSON.parse(d.Value).email);
    //$('#JoinDate').val(formatDate(JSON.parse(d.Value).joinDate));
    //$('#Salary').val(JSON.parse(d.Value).salary);
    //$('#SocialStatus').val(JSON.parse(d.Value).socialStatus);
    //$('#EIDNumber').val(JSON.parse(d.Value).eidNumber);
    //$('#PassportNumber').val(JSON.parse(d.Value).passportNumber);
    //$('#ReleaseDate').val(formatDate(JSON.parse(d.Value).releaseDate));
    //$('#ExpiryDate').val(formatDate(JSON.parse(d.Value).expiryDate));
    //$('#VisaExpiryDate').val(formatDate(JSON.parse(d.Value).visaExpiryDate));
    //$('#OtherStatus').val(JSON.parse(d.Value).otherStatus);
    //$('#EmiratesOfResidencyEng').val(JSON.parse(d.Value).emiratesOfResidencyEng);
    //$('#EmiratesOfResidencyArb').val(JSON.parse(d.Value).emiratesOfResidencyArb);
    //$('#MunicipalityCardNumber').val(JSON.parse(d.Value).municipalityCardNumber);
    //$('#MunicipalityCardReleaseDate').val(formatDate(JSON.parse(d.Value).municipalityCardReleaseDate));
    //$('#MunicipalityCardExpirtDate').val(formatDate(JSON.parse(d.Value).municipalityCardExpirtDate));


    //loadDepartmentDropdownList(isBindChangeEvent = false);
    //loadNationalityDropdownList(isBindChangeEvent = false);
    //loadSponsorShipDropdownList(isBindChangeEvent = false);
    //loadContractTypeDropdownList(isBindChangeEvent = false);
    //loadRoleDropdownList(isBindChangeEvent = false)
}
function loadTreeDropdownListEdit(d) {
    var _data = treeFomatter(JSON.parse(d.Value), 0);
    $("#DepartmentId").kendoDropDownTree({
        tagMode: 'single',
        height: 'auto',
        dataSource: _data
    });
    var department = $("#DepartmentId").data("kendoDropDownTree");
    department.value(departmentDefaultId);
}
function loadNationalityDropdownList(isBindChangeEvent = true) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('NationalityId', 'Id [Value], NameEng [Text]', 'HR_Nationality', 'NameEng IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('NationalityId', 'Id [Value], NameArb [Text]', 'HR_Nationality', 'NameArb IS NOT NULL', null, 'menuDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            // $("#NationalityId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);
}
function loadEmiratesStatesDropdownList(isBindChangeEvent = true) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('EmiratesStateId', 'Id [Value], NameEng [Text]', 'HR_EmiratesStates', 'NameEng IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('EmiratesStateId', 'Id [Value], NameArb [Text]', 'HR_EmiratesStates', 'NameArb IS NOT NULL', null, 'menuDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            // $("#NationalityId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);
}
function loadSponsorShipDropdownList(isBindChangeEvent = true) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('VisaSponsorshipId', 'Id [Value], NameEng [Text]', 'HR_VisaSponsorship', 'NameEng IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('VisaSponsorshipId', 'Id [Value], NameArb [Text]', 'HR_VisaSponsorship', 'NameArb IS NOT NULL', null, 'menuDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            //  $("#VisaSposershipId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);
}


function loadContractTypeDropdownList(isBindChangeEvent = true) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('ContractTypeId', 'Id [Value], NameEng [Text]', 'HR_ContractType', 'NameEng IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('ContractTypeId', 'Id [Value], NameArb [Text]', 'HR_ContractType', 'NameArb IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            // $("#ContractTypeId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);
}





function loadRoleDropdownList(isBindChangeEvent = true) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('RoleId', 'Id [Value], NameEng [Text]', 'UserManagement_Role', 'NameEng IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('RoleId', 'Id [Value], NameArb [Text]', 'UserManagement_Role', 'NameArb IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            // $("#RoleId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);
}
function loadProfessionDropdownList(isBindChangeEvent = true) {
    if ($('#Language').val() == 'en-US') {
        loadKendoDropdownList('ProfessionId', 'Id [Value], NameEng [Text]', 'HR_Profession', 'NameEng IS NOT NULL', 0, 'menuDropdownListOnChange');
    }
    else {
        loadKendoDropdownList('ProfessionId', 'Id [Value], NameArb [Text]', 'HR_Profession', 'NameArb IS NOT NULL', null, 'menuDropdownListOnChange');
    }
    setTimeout(function () {
        if (isBindChangeEvent) {
            // $("#ProfessionId").data("kendoDropDownList").bind("change", roleDropdownListOnChange);
        }
    }, 1500);
}