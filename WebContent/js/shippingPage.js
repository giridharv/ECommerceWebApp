/**
 * Created by giridhar on 3/15/18.
 */

$(document).ready(function () {
	$('#addressTitleBar').hide();
	$('#creditCardForm').hide();
	$('#billingForm').hide();
	$('#cardInfo').css('background-color','#CCCCCC');
	$('#cardInfo').css('pointer-events','none');
    $('#submitOrder').prop('disabled',true);
    $('#submitOrder').css('background-color','grey');
    $('#proceedToBilling').bind('click',function()
    		{
    		  $('#shippingForm').fadeOut('5000');
    	      var elem ='<div class="form-body"><span>Billing Information</span><img src="html/showMore.png" id="toggleDivInfo"></div>';
    	      $('#addressTitleBar').html(elem);
    	      $('#addressTitleBar').show();
    	      $('#creditCardForm').show();
    	      $('#cardInfo').hide();

    		})
    $('#addressTitleBar').bind('click',function()
    		{
    	     $('#addressTitleBar').hide();
    	     $('#shippingForm').fadeIn('5000');
    		})
    $('#cardDetailsBtn').bind('click',function()
  	{
      if($('#checkInputForBillingAddress').is(':checked'))
    	   {
       	     $('#billingForm').fadeOut('slow');
      	 	 $('#cardInfo').css('background-color','#FFF');
      	 	$('#cardInfo').css('pointer-events','auto');
      	     $('#cardInfo').fadeIn('slow');
       	 	 $('#creditCardForm').fadeOut('slow');
       	   }  
      else
    	  {
    	     $('#billingForm').fadeIn('slow');
    	     $('#cardInfo').css('background-color','#FFF');
      	     $('#cardInfo').fadeIn('slow');
       	 	 $('#creditCardForm').fadeOut('slow');

    	  }
    });
    
    $('#cardInfo').bind('click',function()
    		{
    	     $('#cardInfo').hide();
    	     $('#creditCardForm').fadeIn('5000');
    		})
    		
})