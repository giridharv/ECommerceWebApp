/**
 * Created by giridhar on 3/15/18.
 */

$(document).ready(function () {
	$('#addressTitleBar').hide();
	$('#creditCardForm').hide();
	$('#shippingForm').hide();
	$('#billingAddressTitleBar').hide();
	$('#cardInfo').show();
	$('#cardInfo').css('background-color','#CCCCCC');
	$('#cardInfo').css('pointer-events','none');
	$('#addressTitleBarShipping').css('background-color','#CCCCCC');
	$('#addressTitleBarShipping').css('pointer-events','none');
	$('#submitOrder').prop('disabled',true);
    $('#submitOrder').css('background-color','grey');
    
    $('#addressTitleBarShipping').bind('click',function()
    		{
    	     $('#addressTitleBarShipping').hide();
    	     $('#shippingForm').slideToggle('slow');
    		});
    		
    $('#billingAddressTitleBar').bind('click',function()
    		{
    	     $('#billingAddressTitleBar').hide();
    	     $('#billingForm').slideToggle('slow');
    		})		
    		
    $('#cardDetailsBtn').bind('click',function()
  	{
      if($('#checkInputForBillingAddress').is(':checked'))
    	   {
 	         $('#addressTitleBarShipping').show	();
   	         $('#addressTitleBarShipping').css('background-color','#FFFFFF');
	  	     $('#addressTitleBarShipping').css('pointer-events','auto');
       	     //$('#shippingForm').slideToggle('slow');
      	 	 $('#cardInfo').css('background-color','#FFF');
      	 	 $('#cardInfo').css('pointer-events','auto');
      	     $('#cardInfo').slideToggle('slow');
       	 	 $('#creditCardForm').slideToggle('slow');
       	 	 fillShippingDetails();
       	   }  
      else
    	  {
    	     $('#cardInfo').css('background-color','#FFF');
       	 	 $('#cardInfo').css('pointer-events','auto');
      	     $('#cardInfo').slideToggle('slow');
       	 	 $('#creditCardForm').slideToggle('slow');
 	         $('#addressTitleBarShipping').hide();
       	 	 $('#shippingForm').slideToggle('slow');
       	 	 clearShippingDetails();
    	  }
    });
    
    $('#cardInfo').bind('click',function()
    		{
    	     $('#cardInfo').hide();
    	     $('#creditCardForm').slideToggle('slow');
    		})
    $('#submitOrder').bind('click',function()
    		{
    	    fetchOrder();
    		});
    		
    $('#billingAddressBtn').bind('click',function()
    		{
    	    	if(checkForDataBillingForm())
    	    		{
    	    		  $('#billingForm').slideToggle('slow');
    	    	      $('#billingAddressTitleBar').show();
    	    	      $('#creditCardForm').show();
    	    	      $('#cardInfo').hide();
    	    	      $('#addressTitleBarShipping').show();
    	    	      $('#addressTitleBarShipping').css('background-color','#CCCCCC');
    	    	  	  $('#addressTitleBarShipping').css('pointer-events','none');
    	    		}
    		});
    $('#proceedToBilling').bind('click',function()
    		{
  	        	 $('#shippingForm').slideToggle('slow');
  	        	 $('#addressTitleBarShipping').show();
  	        	 $('#addressTitleBarShipping').css('background-color','#FFF');
	    	  	 $('#addressTitleBarShipping').css('pointer-events','auto');
  
    		})
    function validateZipCode(zipcode)
    {
    	var regExp = /^[0-9]{5}(-[0-9]{4})?$/;
    	return regExp.test(zipcode);	
    }
    function validatePhoneNumber(number)
    {
    	var regExp = /^[0-9]{10}$/;
    	return regExp.test(number)
    }
    
    function checkForDataBillingForm()
    {
    	 var flag=true;
    	 $('#err_msg_billingaddrLine1').hide();
    	 $('#err_msg_billingCity').hide();
    	 $('#err_msg_billingFormState').hide();
    	 $('#err_msg_billingZipcode').hide();
    	 $('#err_msg_billingPhone').hide();
    	 
    	 if(!$('#billingFormStreetAddress').val())
    		 {
    		 flag=false;
    		 $('#err_msg_billingaddrLine1').show();
             $('#err_msg_billingaddrLine1').text("Address field required!");
             $('#err_msg_billingaddrLine1').css('color','orange');
             $('#err_msg_billingaddrLine1').css('fontSize','15px');
    		 }
    	 
    	 if(!$('#billingFormCity').val())
    		{
    		 flag=false;
    		 $('#err_msg_billingCity').show();
             $('#err_msg_billingCity').text("Please enter city!");
             $('#err_msg_billingCity').css('color','orange');
             $('#err_msg_billingCity').css('fontSize','15px');
    		} 
    	 if($('#billingFormState').val()==0)
    		 {
    		 flag=false;
    		 $('#err_msg_billingFormState').show();
             $('#err_msg_billingFormState').text("Please select a state!");
             $('#err_msg_billingFormState').css('color','orange');
             $('#err_msg_billingFormState').css('fontSize','15px');
    		 }
    	 if(!$('#billingFormZipcode').val())
    		 {
    		 flag=false;
    		 $('#err_msg_billingZipcode').show();
             $('#err_msg_billingZipcode').text("Zipcode required!");
             $('#err_msg_billingZipcode').css('color','orange');
             $('#err_msg_billingZipcode').css('fontSize','15px');
    		 }
    	 if(!$('#billingFormPhoneNumber').val())
    		 {
    		 flag=false;
    		 $('#err_msg_billingPhone').show();
             $('#err_msg_billingPhone').text("Phone number required!");
             $('#err_msg_billingPhone').css('color','orange');
             $('#err_msg_billingPhone').css('fontSize','15px');
    		 }

    	 if(!validateZipCode($('#billingFormZipcode').val()))
    		 {
    		 flag=false;
    		 $('#err_msg_billingZipcode').show();
             $('#err_msg_billingZipcode').text("Zipcode format 12345 or 12345-1234");
             $('#err_msg_billingZipcode').css('color','orange');
             $('#err_msg_billingZipcode').css('fontSize','15px');
    		 }
    	 if(!validatePhoneNumber($('#billingFormPhoneNumber').val()))
    	 {
    		 flag=false;
    		 $('#err_msg_billingPhone').show();
             $('#err_msg_billingPhone').text("Phone number format 2221113333");
             $('#err_msg_billingPhone').css('color','orange');
             $('#err_msg_billingPhone').css('fontSize','15px');
    	 }
    	 return flag;
    	 
    }
    function fillShippingDetails()
    {
    	var streetAddress=$('#billingFormStreetAddress').val();
    	var apartmentDetails =$('#billingFormApartmentNumber').val();
    	var city = $('#billingFormCity').val();
    	var state = $('#billingFormState').val();
    	var zipcode = $('#billingFormZipcode').val();
    	var phoneNumber = $('#billingFormPhoneNumber').val();
    	$('#shipFormStreetAddress').val(streetAddress);
    	$('#shipFormApartmentNumber').val(apartmentDetails);
    	$('#shipFormCity').val(city);
    	$('#shipFormState').val(state).change();
    	$('#shipFormZipcode').val(zipcode);
    	$('#shipFormPhoneNumber').val(phoneNumber);
    }
    function clearShippingDetails()
    {
    	$('#shipFormStreetAddress').val('');
    	$('#shipFormApartmentNumber').val('');
    	$('#shipFormCity').val('');
    	$('#shipFormState').val(0).change();
    	$('#shipFormZipcode').val('');
    	$('#shipFormPhoneNumber').val('');
    }
    function validateCardInfo()
    {
    //visa=Up to 19 digits,mastercard=16 digits.,amex=15 digits,discover=16 digits
        
    	var creditCardNumber = $('#billingCardNumber').val();
    }
    
    function checkForDataShippingForm()
    {
    	 var flag=true;
    	 $('#err_msg_shippingaddrLine1').hide();
    	 $('#err_msg_shippingCity').hide();
    	 $('#err_msg_shippingFormState').hide();
    	 $('#err_msg_shippingZipcode').hide();
    	 $('#err_msg_shippingPhone').hide();
    	 
    	 if(!$('#shipFormStreetAddress').val())
    		 {
    		 flag=false;
    		 $('#err_msg_shippingaddrLine1').show();
             $('#err_msg_shippingaddrLine1').text("Address field required!");
             $('#err_msg_shippingaddrLine1').css('color','orange');
             $('#err_msg_shippingaddrLine1').css('fontSize','15px');
    		 }
    	 
    	 if(!$('#shipFormCity').val())
    		{
    		 flag=false;
    		 $('#err_msg_shippingCity').show();
             $('#err_msg_shippingCity').text("Please enter city!");
             $('#err_msg_shippingCity').css('color','orange');
             $('#err_msg_shippingCity').css('fontSize','15px');
    		} 
    	 if($('#shipFormState').val()==0)
    		 {
    		 flag=false;
    		 $('#err_msg_shippingFormState').show();
             $('#err_msg_shippingFormState').text("Please select a state!");
             $('#err_msg_shippingFormState').css('color','orange');
             $('#err_msg_shippingFormState').css('fontSize','15px');
    		 }
    	 if(!$('#shipFormZipcode').val())
    		 {
    		 flag=false;
    		 $('#err_msg_shippingZipcode').show();
             $('#err_msg_shippingZipcode').text("Zipcode required!");
             $('#err_msg_shippingZipcode').css('color','orange');
             $('#err_msg_shippingZipcode').css('fontSize','15px');
    		 }
    	 if(!$('#shipFormPhoneNumber').val())
    		 {
    		 flag=false;
    		 $('#err_msg_shippingPhone').show();
             $('#err_msg_shippingPhone').text("Phone number required!");
             $('#err_msg_shippingPhone').css('color','orange');
             $('#err_msg_shippingPhone').css('fontSize','15px');
    		 }

    	 if(!validateZipCode($('#shipFormZipcode').val()))
    		 {
    		 flag=false;
    		 $('#err_msg_shippingZipcode').show();
             $('#err_msg_shippingZipcode').text("Zipcode format 12345 or 12345-1234");
             $('#err_msg_shippingZipcode').css('color','orange');
             $('#err_msg_shippingZipcode').css('fontSize','15px');
    		 }
    	 if(!validatePhoneNumber($('#shipFormPhoneNumber').val()))
    	 {
    		 flag=false;
    		 $('#err_msg_shippingPhone').show();
             $('#err_msg_shippingPhone').text("Phone number format 2221113333");
             $('#err_msg_shippingPhone').css('color','orange');
             $('#err_msg_shippingPhone').css('fontSize','15px');
    	 }
    	 
    }
  
    		
})

//https://www.cybersource.com/developers/getting_started/test_and_manage/best_practices/card_type_id/ for credit cards and their length information