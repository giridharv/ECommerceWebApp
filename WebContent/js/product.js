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
    
    function populateProductDetailFields(response)
    {
    	console.log(response[0]);
    	$('#productTitle').text(response[0].vendorName + " " +response[0].vendorModel);
    	$('#productImage').attr('src','html/'+response[0].image);
    	$('#productImage').css('width','100%');
    	$('#productImage').css('height','100%');
    	$('#prod_description').text(response[0].description);
    	var featuresArr = response[0].features.split(',');
    	var featuresList = '<ul>';
    	for(var feature in featuresArr)
    		{
    		  featuresList+= '<li>'+featuresArr[feature]+'</li>';
    		}
    	featuresList+='</ul>';
    	$(featuresList).appendTo($('#productFeatures'));
    	console.log(featuresList);
    }
})