/**
 * Created by giridhar on 3/17/18.
 */
var skuQuantityJsonObject={};
$(document).ready(function(){
    fetchProducts();
    initialiseCart();
    initialiseProductForDisplay();
    $('#cartQuantity').text(0);
    function initialiseCart()
    {
    	if(JSON.parse(localStorage.getItem('cartItems')==null))
    	{
    	var cartItems={};
    	localStorage.setItem('cartItems',JSON.stringify(cartItems));
    	}
    }
    function initialiseProductForDisplay()
    {
    	if(localStorage.getItem('product'))
    	{
    		localStorage.removeItem('product');
   		}
    }
    function fetchProducts()
    {
        $.ajax( {
            url: "/ECommerceJava/fetchProducts",
            type: "GET",
            processData: false,
            contentType: false,
            success: function(response) {
            	displayProduct(response);
            },
            error: function(response) {
                alert(response.text);
            }
        });
    }
    function displayProduct(response)
    {
    	
        for(var i=0;i<response.length;i++)
        	{
        	 var availability = availabilityMessage(response[i].quantity);
        	 var elem = '<div class ="card" id =\"'+response[i].sku+'\">' + '<img src ="html/'+ response[i].image+'" />' + '<br /><br />'+ '<div><input type ="button" class="addToCart" id =\"btnAddToCart_'+response[i].sku+'\" value ="Add To Cart"/>'+'<div class="toggleButtons" id = \"toggleDiv_'+response[i].sku+'\"><input type="image" class="deleteFromCart" src="html/icons8-trash-50%20(1)%20(1).png" id=\"deleteFromCart_'+response[i].sku+'\"/><span class="counterSpan" id=\"counterSpan_'+response[i].sku+'\"></span><input type="image" class="increaseCartQty" src="html/icons8-add-50%20(1).png" id=\"addToCart_'+response[i].sku+'\"/></div></div>&nbsp;'+ 
        	 '<div><span class="price" id="price">$'+response[i].retail+'</span></div>' + '<div> &nbsp;<span class="manf_id" id="manf_id">'+response[i].vendorName + " " +response[i].vendorModel+'</span></div>'+
        	 '<div>&nbsp;<span class="availabilitySpan" id=\"availabilitySpan_'+response[i].sku+'\">'+availability.availMessage+'</span></div><br />';
        	 $(elem).appendTo($('#productsDiv'));
             $('.availabilitySpan').css('color',availability.messageColor);
             $('#toggleDiv_'+response[i].sku).hide();
             skuQuantityJsonObject[response[i].sku] = response[i].quantity;
             initialiseButtonState(response[i].sku);
        	}
    }

    
    function initialiseButtonState(sku)
    {
    	var cartObj = JSON.parse(localStorage.getItem('cartItems'));
    	if(cartObj[sku])
    		{
    		var qty = cartObj[sku]["qty"];
    	    var databaseQty =skuQuantityJsonObject[sku];
    		$('#btnAddToCart_'+sku).hide();
    		$('#toggleDiv_'+sku).show(); 
    		if(qty==databaseQty)
    			{
    			 $('#addToCart_'+sku).attr('src','html/icons8-add-50_1_20x20(grey).png');
       	         $('#addToCart_'+sku).prop('disabled',true);
    			}
        	$('#counterSpan_'+sku).text(qty + ' item(s) selected');
    		}    	
    }
    
    $(document).on('click', "input.addToCart", function() {
    	addToCart(this.id.split('_')[1]);
    	$(this).hide();  	
    	$('#toggleDiv_'+this.id.split('_')[1]).show(); 
    	$('#counterSpan_'+this.id.split('_')[1]).text('1' + ' item(s) selected');
    });
    
    function addToCart(sku)
    {
      var cartObj = JSON.parse(localStorage.getItem('cartItems')); 
      if(cartObj[sku])
    	  {
    	    var qty = cartObj[sku]["qty"];
    	    var databaseQty =skuQuantityJsonObject[sku];
    	    if(qty == databaseQty)
    	    {
    	      $('#addToCart_'+sku).attr('src','html/icons8-add-50_1_20x20(grey).png');
    	      $('#addToCart_'+sku).prop('disabled',true);
    	      var availability = availabilityMessage(0);
//    	      $('#availabilitySpan_'+sku).text(availability.availMessage);
//    	      $('#availabilitySpan_'+sku).css('color',availability.messageColor);
    	   	}
    	    else
    	    {
    	    	var localQty =qty+1;
    	    	cartObj[sku]["qty"] = localQty;
    	    	$('#counterSpan_'+sku).text(localQty + ' item(s) selected');
        	    localStorage.setItem('cartItems',JSON.stringify(cartObj));
        	    if(localQty+1>databaseQty)
        	    	{
        	    	$('#addToCart_'+sku).attr('src','html/icons8-add-50_1_20x20(grey).png');
          	        $('#addToCart_'+sku).prop('disabled',true);
        	    	}
    	   	}
    	  }
      else
    	  {
    	  cartObj[sku] ={};
    	  cartObj[sku]["qty"] = 1;
    	  localStorage.setItem('cartItems',JSON.stringify(cartObj));
    	  }
    }
    function deleteFromCart(sku)
    {
      $('#addToCart_'+sku).prop('disabled',false);
	  $('#addToCart_'+sku).attr('src','html/icons8-add-50%20(1).png')	
      var cartObj = JSON.parse(localStorage.getItem('cartItems')); 
      var localStorageQty = cartObj[sku]["qty"];
      if((localStorageQty-1) == 0 )
    	  {
    	  localStorage.removeItem(sku);
    	  delete cartObj[sku];
    	  localStorage.setItem('cartItems',JSON.stringify(cartObj));
    	  $('#toggleDiv_'+sku).hide(); 
    	  $('#btnAddToCart_'+sku).show();
    	  }
      else
    	  {
    	  localStorageQty = localStorageQty-1;
    	  cartObj[sku]["qty"] = localStorageQty
    	  localStorage.setItem('cartItems',JSON.stringify(cartObj));
    	  $('#counterSpan_'+sku).text(localStorageQty + ' item(s) selected');
    	  }	
    }
    
    $(document).on('click', ".card", function() {
    	localStorage.setItem('product',this.id);
    	window.location="productPage.html";
    });  
    
    $(document).on('click', "input.deleteFromCart", function() {
    	deleteFromCart(this.id.split('_')[1]);  
    });
    
    $(document).on('click', "input.increaseCartQty", function() {
    	addToCart(this.id.split('_')[1]);
    });
 
    function availabilityMessage(qty)
    {
    	var availability={};
    	if(qty>0)
    		{
    		  availability.availMessage = "In Stock";
    		  availability.messageColor ="green";
    		}
    	else
    		{
    		availability.availMessage   = "Coming Soon";
    		availability.messageColor ="red";
    		}
    	return availability;
    }
    
    $('#searchBar').bind('click',function () {
        $('#searchBar').attr('placeholder','');
    });
    
    $('#searchBar').on('blur',function () {
        if($('#searchBar').val() == '')
        {
            $('#searchBar').attr('placeholder','Search');
        }
    });
})
