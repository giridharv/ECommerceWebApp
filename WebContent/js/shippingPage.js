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
//	$('#submitOrder').prop('disabled',true);
	$('#submitOrder').prop('disabled',false);
	fillOrderSummary();
    $('#addressTitleBarShipping').bind('click',function()
    		{
    	     
    	     if($('#shippingForm').is(':visible'))
    	    	 {
    	    	 $('#addressTitleBarShipping').show();
    	    	 $('#shippingForm').slideToggle('slow');
    	    	 }
    	    if( $('#addressTitleBarShipping').is(':visible'))
    	    	{
    	    	$('#addressTitleBarShipping').hide();
    	    	$('#shippingForm').slideToggle('slow');
    	    	}
    	     
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
    	     if(validateCardInfo())
    	    	 {
    	  if(!$('#shippingForm').is(':visible'))
    		  {
//    		  $('#addressTitleBarShipping').hide()
//    	      $('#addressTitleBarShipping').css('background-color','#FFFFFF');
// 	  	      $('#addressTitleBarShipping').css('pointer-events','auto');
    		  $('#shippingForm').slideToggle('slow');
    		  } 
           	     //$('#shippingForm').slideToggle('slow');
          	 	 $('#cardInfo').css('background-color','#FFF');
          	 	 $('#cardInfo').css('pointer-events','auto');
          	     $('#cardInfo').slideToggle('slow');
           	 	 $('#creditCardForm').slideToggle('slow');
           	 	 fillShippingDetails();
           	 	 changeEditShipping(true);
           	 	 $('#submitOrder').prop('disabled',false);	 
    	    	 }
       	   }  
      else
    	  {
    	     if(validateCardInfo())
    	    	 {
    	    	 	$('#cardInfo').css('background-color','#FFF');
    	    	 	$('#cardInfo').css('pointer-events','auto');
    	    	 	$('#cardInfo').slideToggle('slow');
    	    	 	$('#creditCardForm').slideToggle('slow');
    	    	 	if($('#shippingForm').is(':visible'))
    	    	 	{
    	    	 		$('#addressTitleBarShipping').css('background-color','#FFFFFF');
            	  	    $('#addressTitleBarShipping').css('pointer-events','auto');
    	    	 		$('#addressTitleBarShipping').hide();
    	    	 		
    	    	 	}
    	    	 	else
    	    	 		{
    	    	 		$('#addressTitleBarShipping').css('background-color','#FFFFFF');
            	  	    $('#addressTitleBarShipping').css('pointer-events','auto');
    	    	 		$('#addressTitleBarShipping').hide();
    	    	 		$('#shippingForm').slideToggle('slow');
    	    	 		}
    	    	 	
    	    	 	clearShippingDetails();	 
              	 	changeEditShipping(false);
    	    	 }
    	     
    	  }
    });
    
    $('#cardInfo').bind('click',function()
    		{
    	     $('#cardInfo').hide();
    	     $('#creditCardForm').slideToggle('slow');
    		})
    $('#submitOrder').bind('click',function()
    		{
    	//if(checkForDataBillingForm()&& checkForDataShippingForm()&& validateCardInfo())
    		//{
    		$('#submitOrder').prop('disabled',false);
    		createOrder();
    	//	}  		
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
    	if(!$('#checkInputForBillingAddress').is(':checked'))
    		{
    			if(checkForDataShippingForm())
    			{
	        	 $('#shippingForm').slideToggle('slow');
  	        	 $('#addressTitleBarShipping').show();
  	        	 $('#addressTitleBarShipping').css('background-color','#FFF');
	    	  	 $('#addressTitleBarShipping').css('pointer-events','auto');    		
    			}
    		}
  })
  
  function createOrder()
	    {
			var cartObj = JSON.parse(localStorage.getItem('cartItems'));
	        $.ajax( {
	            url: "/ECommerceJava/createOrderRequest",
	            type: "GET",
	            contentType: "application/json; charset=utf-8",
	            data:{cartObj:JSON.stringify(cartObj)},
	            success: function(response) {
	            	window.location="orderSummary.html";
	            },
	            error: function(response) {
	                alert(response.text);
	            }
	        });
	    }
  
  
  
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
    		 $('#err_msg_billingZipcode').show();
             $('#err_msg_billingZipcode').text("Zipcode format 12345 or 12345-1234");
             $('#err_msg_billingZipcode').css('color','orange');
             $('#err_msg_billingZipcode').css('fontSize','15px');
    		 }
    	 if(!validatePhoneNumber($('#shipFormPhoneNumber').val()))
    	 {
    		 flag=false;
    		 $('#err_msg_billingPhone').show();
             $('#err_msg_billingPhone').text("Phone number format 2221113333");
             $('#err_msg_billingPhone').css('color','orange');
             $('#err_msg_billingPhone').css('fontSize','15px');
    	 }
    	 return flag;
    	 
    }
    function changeEditShipping(flag)
    {
    	if(flag)
    		{
    		$('#shipFormStreetAddress').prop('readonly',true);
        	$('#shipFormApartmentNumber').prop('readonly',true);
        	$('#shipFormCity').prop('readonly',true)
        	$('#shipFormState').prop('disabled',true);
        	$('#shipFormZipcode').prop('readonly',true);
        	$('#shipFormPhoneNumber').prop('readonly',true);
        	$('#proceedToBilling').prop('disabled',true);
        	}
    	else
    		{
    		$('#shipFormStreetAddress').prop('readonly',false);
        	$('#shipFormApartmentNumber').prop('readonly',false);
        	$('#shipFormCity').prop('readonly',false)
        	$('#shipFormState').prop('disabled',false);
        	$('#shipFormZipcode').prop('readonly',false);
        	$('#shipFormPhoneNumber').prop('readonly',false);
        	$('#proceedToBilling').prop('disabled',false);

    		}
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

    function validateCVV(cvv)
    {
    	var regex =/^[0-9]{3}$/;
    	return regex.test(cvv)
    }
    function validateCardInfo()
    {
    	var flag=true;
    //visa=Up to 19 digits,mastercard=16 digits.,amex=15 digits,discover=16 digits       
    	
	    $('#err_msg_cardHolderName').hide();
	    $('#err_msg_cardNumber').hide();
	    $('#err_msg_cardMonth').hide();
	    $('#err_msg_cardYear').hide();
	    $('#err_msg_cardCVV').hide();
	    
    	if($('#billingCardNumber').val().length < 15 || $('#billingCardNumber').val().length > 19)
    		{
    		flag=false;
    		$('#err_msg_cardNumber').show();
            $('#err_msg_cardNumber').text("Please enter valid card number!");
            $('#err_msg_cardNumber').css('color','orange');
            $('#err_msg_cardNumber').css('fontSize','15px');
    		}
    	if(!$('#billingCardHolderName').val() || $.trim($('#billingCardHolderName').val()) == '')
    		{
    		flag=false;
    		$('#err_msg_cardHolderName').show();
            $('#err_msg_cardHolderName').text("CardHolder name required!");
            $('#err_msg_cardHolderName').css('color','orange');
            $('#err_msg_cardHolderName').css('fontSize','15px');
    		}
    	if(!$('#billingCardMonth').val())
    		{
    		flag=false;
    		$('#err_msg_cardMonth').show();
            $('#err_msg_cardMonth').text("Expiry Month required!");
            $('#err_msg_cardMonth').css('color','orange');
            $('#err_msg_cardMonth').css('fontSize','15px');
    		}
    	if($('#billingCardMonth').val() < 1 || $('#billingCardMonth').val()>12)
		{
    		flag=false;
    		$('#err_msg_cardMonth').show();
    		$('#err_msg_cardMonth').text("Please enter between 1-12!");
    		$('#err_msg_cardMonth').css('color','orange');
    		$('#err_msg_cardMonth').css('fontSize','15px');
		}
    	if(!$('#billingCardYear').val())
		{
    		flag=false;
    		$('#err_msg_cardYear').show();
    		$('#err_msg_cardYear').text("Expiry Year required!");
    		$('#err_msg_cardYear').css('color','orange');
    		$('#err_msg_cardYear').css('fontSize','15px');
		}
    	if($('#billingCardYear').val()< 2018)
		{
    		flag=false;
    		$('#err_msg_cardYear').show();
    		$('#err_msg_cardYear').text("Expiry date beyond or 2018");
    		$('#err_msg_cardYear').css('color','orange');
    		$('#err_msg_cardYear').css('fontSize','15px');
		}
    	if(!$('#billingCardCVV').val())
		{
    		flag=false;
    		$('#err_msg_cardCVV').show();
    		$('#err_msg_cardCVV').text("CVV required!");
    		$('#err_msg_cardCVV').css('color','orange');
    		$('#err_msg_cardCVV').css('fontSize','15px');
		}
    	if(!validateCVV($('#billingCardCVV').val()))
		{
    		flag=false;
    		$('#err_msg_cardCVV').show();
    		$('#err_msg_cardCVV').text("Accepted CVV format 345");
    		$('#err_msg_cardCVV').css('color','orange');
    		$('#err_msg_cardCVV').css('fontSize','15px');
		}
    	return flag;
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
  
    function fillOrderSummary()
    {
	    var cartObj = JSON.parse(localStorage.getItem('cartItems'));
        var qty=0;
	    for(var key in cartObj)
        	 {
        	   qty+=cartObj[key]["qty"]
        	 }
    	var totalPrice =localStorage.getItem("totalCartCost");
    	var salesTax = (7.75 * totalPrice)/100;
    	salesTax=salesTax.toFixed(2)
    	$('#sp_tax').text('$' +salesTax);
    	$('#sp_Total').text('$' +totalPrice);
        var total = parseFloat(totalPrice)+ parseFloat(salesTax) + parseFloat(5.00);
        total=parseFloat(total).toFixed(2);
    	$('#sp_orderTotal').text('$' +parseFloat(total).toFixed(2));
        $('#sp_cartItemQty').text(qty)
    	$('#sp_shippingCharge').text('$5.00')
    	localStorage.setItem('totalCartCost',parseFloat(total).toFixed(2));
    }
    $('#cancelOrder').bind('click',function()
    		{
    	       window.location="proj2.html";
    	       localStorage.removeItem('totalCartCost');
    		})
})

//https://www.cybersource.com/developers/getting_started/test_and_manage/best_practices/card_type_id/ for credit cards and their length information