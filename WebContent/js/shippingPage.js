/**
 * Created by giridhar on 3/15/18.
 */

$(document).ready(function () {
    if($('#checkInputForBillingAddress').change(function () {
            if(this.checked)
            {
                $('#billingForm').hide();
            }
            else
            {
                $('#billingForm').show();
            }
        }));
    $('#submitOrder').prop('disabled',true);
    $('#submitOrder').css('background-color','grey');
})