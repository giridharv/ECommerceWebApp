/**
 * Created by giridhar on 3/23/18.
 */
$(document).ready(function () {
    $('#homeScreen').bind('click',function()
    {
        window.location.replace("proj2.html");
    })
    fetchProductInfo();
    function fetchProductInfo()
    {
    var sku="";	
       if(localStorage.getItem('product'))
 	   {
 	     sku=localStorage.getItem('product');
 	    $.ajax( {
            url: "/ECommerceJava/fetchProductDetails",
            type: "GET",
            data:{sku:sku},
            success: function(response) {
             populateProductDetailFields(response);
},
            error: function(response) {
                alert(response.text);
            }
        }); 
 	   }
       else
    	   {
    	    alert("Invalid SKU");
    	    window.location ="proj2.html";
    	   }
    }
    
    $(document).on('click', "input.deleteFromCart", function() {
    	deleteFromCart(this.id.split('_')[1]);  
    });
    
    $(document).on('click', "input.increaseCartQty", function() {
    	addToCart(this.id.split('_')[1]);
    });
    
    function populateProductDetailFields(response)
    {
    	$('#productTitle').text(response[0].vendorName + " " +response[0].vendorModel);
    	$('#productImage').attr('src','html/'+response[0].image);
    	$('#productImage').css('width','50%');
    	$('#productImage').css('height','50%');
    	$('#prod_description').text(response[0].description);
    	var featuresArr = response[0].features.split(',');
    	var featuresList = '<ul>';
    	var sku=localStorage.getItem('product');
    	var cartObj = JSON.parse(localStorage.getItem('cartItems'));
    	var qty=0;
    	if(cartObj[sku])
    		{
    		 qty = cartObj[sku]["qty"];
    		}
    	 var dropDownElement =generateDropDown(response[0].quantity);
    	 var extraElements ='<span class="price" id="price">Price  :$'+response[0].retail+'</span><br /><br /><br />'+'<span class="textForQty" id=\"qtyText_'+response[0].sku+'\">Quantity in Cart</span><br /><br />'+dropDownElement;
 		 $('#productExtras').html(extraElements);
 		 $('#dropDownSelect').val(qty).change();
    	 listenerForChange();	 
    	for(var feature in featuresArr)
    		{
    		  featuresList+= '<li>'+featuresArr[feature]+'</li>';
    		}
    	featuresList+='</ul>';
    	$(featuresList).appendTo($('#productFeatures'));
    	updateCurrentCartCountValue();
    }
    
    function generateDropDown(qty)
    {
    	var dropDownElement="";
    	dropDownElement+='<div class="form-group" id="dropDownDiv"><select class="form-control" id="dropDownSelect">';
    	for(var i=0;i<=qty;i++)
    		{
    		dropDownElement+='<option value=\"'+i+'\"'+'>'+i+'</option>';
    		}
    	return dropDownElement;
    }
    
    function listenerForChange()
    {
    	$('#dropDownSelect').on('change',function()
    			{
        	      var cartObj = JSON.parse(localStorage.getItem('cartItems'));
        	      var sku =localStorage.getItem('product');
        	      cartObj[sku] ={};
        	      cartObj[sku]["qty"]=parseInt($('#dropDownSelect').val()); 
            	  localStorage.setItem('cartItems',JSON.stringify(cartObj));
            	  updateCurrentCartCountValue();
    			})
    }
    function updateCurrentCartCountValue()
    {
    	var counter=0;
    	var cartObj = JSON.parse(localStorage.getItem('cartItems'));
    	for(var key in cartObj)
    		{
    		  if(cartObj.hasOwnProperty(key))
    			  {
    			    counter += cartObj[key]["qty"];
    			  }
    		}
    	 $('#cartQuantity').text(counter);
    }
    $('#cart').bind('click',function() {
    	window.location="cart.html";
    	return false;
    });

    
    
})