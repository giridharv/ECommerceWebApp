var productPriceObj={};
$(document).ready(function(){
	init();
	function init()
	{
		var skuList=[];
		updateCurrentCartCountValue();
		var cartObj = JSON.parse(localStorage.getItem('cartItems'));
		for(var key in cartObj)
			{
			if(cartObj[key]["qty"]!=0)
				{
				console.log(cartObj[key]["qty"])
				skuList.push(key);	
				}
			
			}
		
		if(skuList.length==0)
		{
		  var displayElem = '<br /><br /><br /><br /><h3 id="emptyTextTag">Your cart is empty.<h3><br />'+'<span id="checkText">Check out our </span><a href="proj2.html" id="goToHomeScreen"> products</a>';
		  $('.headerDiv').hide();
		  $('#cartItemsDiv').css('border','none')
		  $('#cartItemsDiv').html(displayElem)
		  $('#placeOrder').hide();
	    }
		else
			{
			 fetchProducts(skuList);	
			}
			
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
	
	function fetchProducts(skuList)
    {
        $.ajax( {
            url: "/ECommerceJava/fetchProducts",
            type: "GET",
            data:{skuList:skuList},
            dataType : "json",
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
    	$('#cartItemsDiv').empty();
    	var cartObj = JSON.parse(localStorage.getItem('cartItems'));
            for(var i=0;i<response.length;i++)
        	{
       	     		var dropDownElement =generateDropDown(response[i].quantity,response[i].sku,response[i].retail);
       	     		var elem = '<div class ="card " id =\"card_'+response[i].sku+'\">' + '<div class="img-card" id =\"img-card_'+response[i].sku+'\"><img src ="html/'+ response[i].image+'" class="productImage" id=\"productImage_'+response[i].sku+'\"><span class="productTitle" id=\"productTitle_'+response[i].sku+'\">'+response[i].vendorName + " " +response[i].vendorModel+'</span><span class="priceField" id=\"priceField_'+response[i].sku+'\"></span>&nbsp;&nbsp;'+dropDownElement+'</div><br />' + 
       	     		'<div class="del_group"><input type="button" class="deleteItem" id=\"deleteFromCart_'+response[i].sku+'\" value="REMOVE">'+'</div></div><br />';
       	     		$('#productTitle_'+response[i].sku).text();
       	     		$(elem).appendTo($('#cartItemsDiv'));
       	     		$('#dropDownSelect_'+response[i].sku).val(cartObj[response[i].sku]["qty"]).change(); 
       	     		var price= calculateProductRetail(cartObj[response[i].sku]["qty"],response[i].retail);
       	     		$('#priceField_'+response[i].sku).text('$'+ price)
       	     		productPriceObj[response[i].sku] = response[i].retail;
    		}
    }
	function calculateProductRetail(qty,retail)
	{
		return qty*retail;  
	}
	$('#homeScreen').bind('click',function()
			{
		      window.location="proj2.html";
			});
	
	function generateDropDown(qty,sku,retail)
    {
    	var dropDownElement="";
    	dropDownElement+='<div class="form-group" id="dropDownDiv"><select class="form-control dropDownSelect" id=\"dropDownSelect_'+sku+'\">';
    	for(var i=0;i<=qty;i++)
    		{
    		dropDownElement+='<option value=\"'+i+'\"'+'>'+i+'</option>';
    		}
    	dropDownElement+='</select></div>'
    	return dropDownElement;
    }
	   $(document).on('click', ".dropDownSelect", function() {
  	      var cartObj = JSON.parse(localStorage.getItem('cartItems'));
	      var sku =this.id.split('_')[1];
	      cartObj[sku] ={};
	      cartObj[sku]["qty"]=parseInt($('#dropDownSelect_'+this.id.split('_')[1]).val()); 
    	  localStorage.setItem('cartItems',JSON.stringify(cartObj));
    	  updateCurrentCartCountValue();
    	  var price= calculateProductRetail(cartObj[sku]["qty"],productPriceObj[sku]);
	      $('#priceField_'+sku).text('$'+ price)
	    });
	   
	   $(document).on('click', ".deleteItem", function() {
	  	      var cartObj = JSON.parse(localStorage.getItem('cartItems'));
		      var sku =this.id.split('_')[1];
		      localStorage.removeItem(sku);
	    	  delete cartObj[sku];
	    	  localStorage.setItem('cartItems',JSON.stringify(cartObj));
	    	  updateCurrentCartCountValue();
	    	  $('#card_'+sku).hide();
	    	  init();
		    });
	   
	    $('#goShopping').bind('click',function()
	    		{
	    	      window.location="proj2.html"
	    		});
	    		
	   $(document).on('click', ".productImage", function() {
	    	localStorage.setItem('product',this.id.split('_')[1]);
	    	window.location="productPage.html";
	   });   		
	    
	    $(document).on('click', ".productTitle", function() {
	    	localStorage.setItem('product',this.id.split('_')[1]);
	    	window.location="productPage.html";
	   });   		
	     		
	    		
	   
	   
});