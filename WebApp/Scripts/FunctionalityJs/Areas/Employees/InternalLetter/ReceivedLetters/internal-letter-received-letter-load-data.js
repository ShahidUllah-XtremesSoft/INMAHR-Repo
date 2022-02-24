
$(function () {
    
    //Load partial views
    $("#divInternalLetterInOutboxPartialView").load("/InternalLetter/InboxPartialView",
        { inputJSON: '' }
    );
    $('#btnLetterInboxTab').click(function () {
        $(this).removeClass('btn-dark').addClass('btn-primary');
        $('#btnLetterOutboxTab').removeClass('btn-primary').addClass('btn-dark');
        
        //Load partial view
         $("#divInternalLetterInOutboxPartialView").load("/InternalLetter/InboxPartialView",
        { inputJSON: ''}
    );
    });
    //$('#btnLetterOutboxTab').click(function () {
    //    $(this).removeClass('btn-dark').addClass('btn-primary');
    //    $('#btnLetterInboxTab').removeClass('btn-primary').addClass('btn-dark');
        
    //    $("#divInternalLetterInOutboxPartialView").load("/InternalLetter/OutboxPartialView",
    //        { inputJSON: 'Test' }
    //    );
    //});

    
 
});