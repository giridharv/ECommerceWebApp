/**
 * Created by giridhar on 3/17/18.
 */
var skuQuantityJsonObject={};
var filterSelectionObj={
		brand:[],
		category:[],
		availability:[],
		price:[]
};
$(document).ready(function(){
    
	if(localStorage.getItem('searchCriteria'))
		{
		$('#searchBar').val(localStorage.getItem('searchCriteria'));
		searchProducts();
		}
	else
		{
		fetchProducts();
		}
    initialiseCart();
    initialiseProductForDisplay();   
    function initialiseCart()
    {
    	if(JSON.parse(localStorage.getItem('cartItems')==null))
    	{
    	var cartItems={};
    	localStorage.setItem('cartItems',JSON.stringify(cartItems));
        $('#cartQuantity').text(0);
    	}
    	else
    		{
    		updateCurrentCartCountValue();
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
    	$('#productsDiv').empty();
    	if(response.length==0)
    		{
    		console.log("Hello")
    		handleEmptyFilterResponse();
    		}
    	else
    		{
    	    for(var i=0;i<response.length;i++)
        	{
        	 var availability = availabilityMessage(response[i].quantity);
        	 var elem = '<div class ="card" id =\"'+response[i].sku+'\">' + '<div class="cont_card" id =\"'+response[i].sku+'\"><img src ="html/'+ response[i].image+'" /></div>' + '<br /><br />'+ '<div><input type ="button" class="addToCart" id =\"btnAddToCart_'+response[i].sku+'\" value ="Add To Cart"/>'+'<div class="toggleButtons" id = \"toggleDiv_'+response[i].sku+'\"><input type="image" class="deleteFromCart" src="html/icons8-trash-50%20(1)%20(1).png" id=\"deleteFromCart_'+response[i].sku+'\"/><span class="counterSpan" id=\"counterSpan_'+response[i].sku+'\"></span><input type="image" class="increaseCartQty" src="html/icons8-add-50%20(1).png" id=\"addToCart_'+response[i].sku+'\"/></div></div>&nbsp;'+ 
        	 '<div class="cont_card" id =\"'+response[i].sku+'\"><div><span class="price" id="price">$'+response[i].retail+'</span></div>' + '<div> &nbsp;<span class="manf_id" id="manf_id">'+response[i].vendorName + " " +response[i].vendorModel+'</span></div>'+
        	 '<div>&nbsp;<span class="availabilitySpan" id=\"availabilitySpan_'+response[i].sku+'\">'+availability.availMessage+'</span></div></div></div>';
        	 $(elem).appendTo($('#productsDiv'));
             $('#availabilitySpan_'+response[i].sku).css('color',availability.messageColor);
             $('#toggleDiv_'+response[i].sku).hide();
             skuQuantityJsonObject[response[i].sku] = response[i].quantity;
             initialiseButtonState(response[i].sku,response[i].quantity);
        	}		
    		}
    
    }

    
    function initialiseButtonState(sku,serverQty)
    {
    	var cartObj = JSON.parse(localStorage.getItem('cartItems'));
    	if(serverQty<=0)
    		{
  	         $('#btnAddToCart_'+sku).prop('disabled',true);
    		}
    	if(cartObj[sku])
    		{
    		var qty = cartObj[sku]["qty"];
    		if(qty==0)
    			{
    			console.log(qty)
    			$('#toggleDiv_'+sku).hide();
    			$('#btnAddToCart_'+sku).show();
    			}
    		else
    			{
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
    	   	}
    	    else
    	    {
    	    	var localQty =qty+1;
    	    	cartObj[sku]["qty"] = localQty;
    	    	$('#counterSpan_'+sku).text(localQty + ' item(s) selected');
        	    localStorage.setItem('cartItems',JSON.stringify(cartObj));
        	    updateCurrentCartCountValue();
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
  	      updateCurrentCartCountValue();
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
	      $('#cartQuantity').text(localStorageQty);
    	  localStorage.setItem('cartItems',JSON.stringify(cartObj));
    	  updateCurrentCartCountValue();
    	  $('#toggleDiv_'+sku).hide(); 
    	  $('#btnAddToCart_'+sku).show();
    	  }
      else
    	  {
    	  localStorageQty = localStorageQty-1;
    	  cartObj[sku]["qty"] = localStorageQty;
    	  localStorage.setItem('cartItems',JSON.stringify(cartObj));
    	  updateCurrentCartCountValue();
    	  $('#counterSpan_'+sku).text(localStorageQty + ' item(s) selected');
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
    
    $(document).on('click', ".cont_card", function() {
    	localStorage.setItem('product',this.id);
    	window.location="productPage.html";
    });  
    
    $(document).on('click', "input.deleteFromCart", function() {
    	deleteFromCart(this.id.split('_')[1]);  
    });
    
    $(document).on('click', "input.increaseCartQty", function() {
    	addToCart(this.id.split('_')[1]);
    });
    $('#cart').bind('click',function() {
    	window.location="cart.html";
    	return false;
    });
    $(document).on('change','input.brandCheckBoxGroup',function(){	
    	updateFilterSelectionBrandObj('brand','.brandCheckBoxGroup');
    });
    $(document).on('change','input.categoryCheckBoxGroup',function(){	
    	updateFilterSelectionBrandObj('category','.categoryCheckBoxGroup');
    });
    $(document).on('change','input.availabilityCheckBoxGroup',function(){	
    	updateFilterSelectionBrandObj('availability','.availabilityCheckBoxGroup');
    });
    $(document).on('change','input.sortCheckBoxGroup',function(){	
    	updateFilterSelectionBrandObj('price','.sortCheckBoxGroup');
    });
   
    function updateFilterSelectionBrandObj(filterArr,checkBoxClass)
    {
    	var unselected="";
    	$(checkBoxClass).each(function(){
    		 if ($(this).is(':checked')) {
    			 var compResult= $.inArray($(this).val(),filterSelectionObj[filterArr]);
   		         if(compResult<0)filterSelectionObj[filterArr].push($(this).val());    			 
             } else 
            	 {
            	   unselected+= $(this).val() +",";
            	 }
    	});
    	var arr = unselected.split(',');
    	 for(var j=0;j<filterSelectionObj[filterArr].length;j++)
    		 {
    			for(var i=0;i<arr.length-1;i++)
        		{
        			 {
        			   if(arr[i] ===filterSelectionObj[filterArr][j])
        				   {
        				   filterSelectionObj[filterArr].splice(j,1);
        				   }
        			 }
        		}		 
    		 }
    	 fetchProductsWithFilter();
    	 console.log(filterSelectionObj)
    }
    function fetchProductsWithFilter()
    {
    	$.ajax( {
            url: "/ECommerceJava/fetchProductsWithFilter",
            type: "GET",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data:{filterObj:JSON.stringify(filterSelectionObj)},
            success: function(response) {
            	displayProduct(response);
            },
            error: function(response) {
            	console.log("error" +response.text);

            }
        });
    }
    function handleEmptyFilterResponse()
    {
    	console.log("Here")
    	var elem ='<br /><br /><br /><br /><h4 id="emptyResponse">Sorry, your search yielded no result.Please try other filters</h4>';
    	$('#productsDiv').html(elem)
    }
    function availabilityMessage(qty)
    {
    	var availability={
    			"availMessage":{},
    			"messageColor":{}
    	};
    	if(qty<=0)
    		{
    		availability.availMessage   = "Coming Soon";
    		availability.messageColor ="red";
    		}
    	else
    		{
  		  availability.availMessage = "In Stock";
		  availability.messageColor ="green";
    		}
    	return availability;
    }
    
    $('#searchBar').bind('click',function () {
        $('#searchBar').attr('placeholder','');
    });
    $('#searchBar').keydown(function (event) {
    	if(event.keyCode ==13)
    		{
    		  event.preventDefault();
    		  localStorage.setItem('searchCriteria',$('#searchBar').val());
    		  searchProducts();
    		}
      	
    });
    		  function searchProducts()
    		  {
    			  if(!localStorage.getItem('searchCriteria'))
    				  {
    				  fetchProducts();
    				  }
    			  else
    				  {
    				  
        			  $.ajax( {
        				url: "/ECommerceJava/search",
        	            type: "GET",
        	            dataType : "json",
        	            contentType: "application/json; charset=utf-8",
        	            data:{filter:localStorage.getItem('searchCriteria')},
        	            success: function(response) {
        	            	displayProduct(response);
        	            },
        	            error: function(response) {
        	            	console.log("error" +response.text);
        	            }
        	        });
 
    				  }
    			      		}
  
    $('#searchBar').on('blur',function () {
        if($('#searchBar').val() == '')
        {
            $('#searchBar').attr('placeholder','Search');
        }
    });
    
    $('#comp_logo').bind('click',function()
    		{
    	      window.location="proj2.html";
    		})
})
