var productPriceObj={};
$(document).ready(function()
		{
	      init();
	      function init()
	    {
	     	var skuList=[];
	    	var cartObj = JSON.parse(localStorage.getItem('cartItems'));
		    for(var key in cartObj)
			 {
			   if(cartObj[key]["qty"]!=0)
				{
				skuList.push(key);	
				}
		}
		
		if(skuList.length==0)
		{
		  window.location="proj2.html";
	    }
		else
			{
			 fetchProducts(skuList);	
			}
			
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
        	      var cartObj = JSON.parse(localStorage.getItem('cartItems'));
	              for(var i=0;i<response.length;i++)
	          	{
	         	     		var elem = '<br /><div class ="card " id =\"card_'+response[i].sku+'\">' + '<div class="img-card" id =\"img-card_'+response[i].sku+'\"><span class="productTitle" id=\"productTitle_'+response[i].sku+'\">'+response[i].vendorName + " " +response[i].vendorModel+"&nbsp;"+'</span>'+'<span class="quantityClass">'+cartObj[response[i].sku]["qty"]+'</span>' +'<span class="priceField" id=\"priceField_'+response[i].sku+'\"></span>&nbsp;&nbsp;'+'</div><br />' + 
	         	     		'</div><br />';
	         	     		$(elem).appendTo($('#orderDetails')); 
	         	     		var price= calculateProductRetail(cartObj[response[i].sku]["qty"],response[i].retail);
	         	     		$('#priceField_'+response[i].sku).text('$'+ price)
	         	     		productPriceObj[response[i].sku] = price;
	      		}
	              calculateTotalAmount();
	              localStorage.removeItem('cartItems');
	              localStorage.removeItem('totalCartCost');
	      }     
	  	function calculateProductRetail(qty,retail)
		{
			return (qty*retail).toFixed(2);  
		}
	      
	  	function calculateTotalAmount()
	  	{
	  		var total =localStorage.getItem('totalCartCost');
	  		$('#priceTotal').text("$  " + parseFloat(total).toFixed(2))
	  	}
	      
	      
	      
})