/*$(document).on('pagebeforeshow', '#update_case', function(){    	
	
	$('input[type="text"]').each(function()
	{ 
		this.value = $(this).attr('title');
		$(this).addClass('text-label');
	 
		$(this).focus(function(){
			if(this.value == $(this).attr('title')) {
				this.value = '';
				$(this).removeClass('text-label');
			}
		});
	 
		$(this).blur(function(){
			if(this.value == '') {
				this.value = $(this).attr('title');
				$(this).addClass('text-label');
			}
		});
	});
	
	$('textarea').each(function()
	{ 
		this.value = $(this).attr('title');
		$(this).addClass('text-label');
	 
		$(this).focus(function(){
			if(this.value == $(this).attr('title')) {
				this.value = '';
				$(this).removeClass('text-label');
			}
		});
	 
		$(this).blur(function(){
			if(this.value == '') {
				this.value = $(this).attr('title');
				$(this).addClass('text-label');
			}
		});
	});
});*/


$(document).on('click', '#add_note', function(){ 	
			var CaseID = decodeURIComponent($.urlParam('ID'));	
			$.mobile.changePage('update_case.html?ID='+CaseID, {
						changeHash: true,
						dataUrl: "",    //the url fragment that will be displayed for the test.html page
						transition: "pop"  //if not specified used the default one or the one defined in the default settings
						});
			
			

	  
});	

$(document).on('click', '#submit_addnote', function() { // catch the form's submit event
	
	var CaseID = decodeURIComponent($.urlParam('ID'));	
	var subject = trim($('#subject').val());
	var comment = trim($('#comment').val());
	
	var contactID = sessionStorage.getItem("contactID");
	var error = '';
	
	if(subject == 'Subject' || comment == 'Comment' || subject == '' || comment == '')
	{
		error += 'Please fill all necessary fields\n';
	}
	
	if(error == '')
	{
		
		if(subject.length > 0 && comment.length > 0)
		{
			$('#popupLogin').popup("close");	
			$("body").addClass('ui-disabled');
			$.ajax({url: global_url + 'ajaxfiles/add_comment.php',
				//data:{action : 'login', formData : $('#check-user').serialize()}, // Convert a form to a JSON string representation
				data:{CaseID : CaseID, contactID : contactID,  subject : subject, comment : comment}, 
				type: 'post',
				dataType: 'json',	                   
				async: true,
				beforeSend: function() {
					// This callback function will trigger before data is sent
					//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
					//$.mobile.loading( 'show' );
					$.mobile.loading( "show", {	text: "Updating Case",textVisible: true,theme: "a",html: ""});
				},
				complete: function() {
					$.mobile.loading( 'hide' );		
					$("body").removeClass('ui-disabled');		
				},
				success: function (result) {                							
						resultObject.formSubmitionResult = result;
						if(result.ret == true)
						{
							//$("#locator").dialog("close");
							//$('.ui-dialog').dialog('close');
							$('#summary').html(result.summary);					
							do_alert(0, 'Case updated Successfully');
							
						}
						
				},
				error: function (request,error) {
					// This callback function will trigger on unsuccessful action                
					alert('Network error has occurred please try again!');
				}
			});
		}
	}
	else
	{
		alert(error);
	}
});

/// Before it was pageinit
$(document).on('pageshow', '#case_detail', function(){ 

	$('input[type="text"]').each(function()
	{ 
		this.value = $(this).attr('title');
		$(this).addClass('text-label');
	 
		$(this).focus(function(){
			if(this.value == $(this).attr('title')) {
				this.value = '';
				$(this).removeClass('text-label');
			}
		});
	 
		$(this).blur(function(){
			if(this.value == '') {
				this.value = $(this).attr('title');
				$(this).addClass('text-label');
			}
		});
	});
	
	$('textarea').each(function()
	{ 
		this.value = $(this).attr('title');
		$(this).addClass('text-label');
	 
		$(this).focus(function(){
			if(this.value == $(this).attr('title')) {
				this.value = '';
				$(this).removeClass('text-label');
			}
		});
	 
		$(this).blur(function(){
			if(this.value == '') {
				this.value = $(this).attr('title');
				$(this).addClass('text-label');
			}
		});
	});

	var clientID = sessionStorage.getItem("clientID");
	var CaseID = decodeURIComponent($.urlParam('ID'));
	var From = $.urlParam('From');
	$('.case_id').html(CaseID);
	
	//Do not use below as for Add new case transition used pageload
	//$("body").addClass('ui-disabled');
	$.ajax({url: global_url+'ajaxfiles/case_detail.php',
			
		data:{clientID : clientID, CaseID : CaseID}, 
		type: 'get',                   
		async: true,
		dataType: 'json',	 
		beforeSend: function() {
			// This callback function will trigger before data is sent
			//$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
			
			//$.mobile.loading( "show", {text: "Loading Please wait",textVisible: true,theme: "a",html: ""});
			
		},
		complete: function() {
			$.mobile.loading( 'hide' );
			//$("body").removeClass('ui-disabled');
		},
		success: function (result) {									
			
			var result_html = '';
			if(result.ret == true)
			{
				
				if(From == 'new')
				{
					do_alert(0, 'Case logged successfully.');
				}
				
				result_html += '<tr><td><b>Case ID : </b></td><td>'+ result.id +'</td></tr><tr><td><b>Status : </b></td><td>'+ result.status +'</td></tr><tr><td><b>Case Name : </b></td><td>'+ result.subject +'</td></tr><tr><td><b>Created By : </b></td><td>'+ result.created_by +'</td></tr><tr><td><b>Created Date : </b></td><td>'+ result.created_date +'</td></tr><tr><td><b>Owner : </b></td><td>'+ result.owner +'</td></tr><tr><td><b>Case Type : </b></td><td>'+ result.case_type +'</td></tr><tr><td><b>Contract : </b></td><td>'+ result.contract +'</td></tr><tr><td><b>Description : </b></td><td>'+ result.desc +'</td></tr>';
				
				$('#summary').html(result.summary);
				$( "table#case_detail_table tbody" )
				
				.html( result_html )
				
				.closest( "table#case_detail_table" )
				.table( "refresh" );
				
				/*$('#detail_tbody').html(result_html);				
				$( "case_detail_table" ).table( "refresh" );*/
				
			}
			
			
            // Trigger if the new injected markup contain links or buttons that need to be enhanced
            //.trigger( "create" );
			
		},
		error: function (request,error) {
			// This callback function will trigger on unsuccessful action                
			alert('Network error has occurred please try again!');
		}
	});  
});

var resultObject = {
    formSubmitionResult : null  
}