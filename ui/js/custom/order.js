
var productPrices = {};

$(function () {
    // Get products from API
    $.get(productListApiUrl, function (response) {
        productPrices = {};

        if (response) {
            var options = '<option value="">--Select--</option>';

            $.each(response, function(index, product) {
                options += '<option value="' + product.product_id + '">' +
                    product.name + '</option>';

                productPrices[product.product_id] = product.price_per_unit;
            });

            $(".product-box").find("select").empty().html(options);
        }
    });
});


// Calculate discount and grand total
function updateOrderTotal() {

    var subtotal = 0;

    $(".product-box-extra .product-total").each(function () {
        var itemTotal = parseFloat($(this).val()) || 0;
        subtotal += itemTotal;
    });

    var discountType = $("#discountType").val();
    var discountValue = parseFloat($("#discountValue").val()) || 0;

    var discountAmount = 0;

    if (discountType === "percentage") {
        discountAmount = subtotal * discountValue / 100;
    } else {
        discountAmount = discountValue;
    }

    // Discount cannot exceed the subtotal
    discountAmount = Math.min(discountAmount, subtotal);

    var grandTotal = subtotal - discountAmount;

    $("#discountAmount").val(discountAmount.toFixed(2));
    $("#product_grand_total").val(grandTotal.toFixed(2));
}


// Add More button
$("#addMoreButton").click(function () {

    var row = $(".product-box").html();

    $(".product-box-extra").append(row);

    $(".product-box-extra .remove-row").last().removeClass('hideit');

    $(".product-box-extra .product-price").last().val('0.0');

    $(".product-box-extra .product-qty").last().val('1');

    $(".product-box-extra .product-total").last().val('0.0');

    updateOrderTotal();
});


// Remove product row
$(document).on("click", ".remove-row", function (){
    $(this).closest('.row').remove();

    updateOrderTotal();
});


// Product selection
$(document).on("change", ".cart-product", function (){

    var product_id = $(this).val();
    var price = productPrices[product_id];

    $(this).closest('.row').find('#product_price').val(price || 0);

    calculateValue();

    updateOrderTotal();
});


// Quantity change
$(document).on("change", ".product-qty", function (e){

    calculateValue();

    updateOrderTotal();
});


// Update total when item total is manually changed
$(document).on("input", ".product-total", function () {

    updateOrderTotal();
});


// Update total when discount type or value changes
$(document).on("change input", "#discountType, #discountValue", function () {

    updateOrderTotal();
});


// Save Order
$("#saveOrder").on("click", function(){

    var customerName = $("#customerName").val().trim();

    // Validate customer name
    if (customerName === "") {
        alert("Please enter customer name");
        $("#customerName").focus();
        return;
    }

    // Check whether at least one product is added
    var productRows = $(".product-box-extra .product-item");

    if (productRows.length === 0) {
        alert("Please add at least one product");
        return;
    }

    var isValid = true;

    // Validate product and quantity in every row
    productRows.each(function() {

        var product = $(this).find(".cart-product").val();
        var quantity = $(this).find(".product-qty").val();

        if (product === "" || product === null) {
            alert("Please select a valid product");
            $(this).find(".cart-product").focus();
            isValid = false;
            return false;
        }

        if (quantity === "" || parseFloat(quantity) <= 0 || !isFinite(quantity)) {
            alert("Please enter a valid quantity greater than zero");
            $(this).find(".product-qty").focus();
            isValid = false;
            return false;
        }

    });

    if (!isValid) {
        return;
    }

    // Validate discount
    var discountValue = parseFloat($("#discountValue").val());

    if (!isFinite(discountValue) || discountValue < 0) {
        alert("Please enter a valid discount");
        $("#discountValue").focus();
        return;
    }

    if ($("#discountType").val() === "percentage" && discountValue > 100) {
        alert("Percentage discount cannot exceed 100%");
        $("#discountValue").focus();
        return;
    }

    // Calculate final discounted total before saving
    updateOrderTotal();

    // Prepare order data
    var formData = $("form").serializeArray();

    var requestPayload = {
        customer_name: customerName,
        grand_total: null,
        order_details: []
    };

    for (var i = 0; i < formData.length; ++i) {

        var element = formData[i];

        var lastElement = null;

        switch(element.name) {

            case 'product_grand_total':
                requestPayload.grand_total = element.value;
                break;

            case 'product':
                requestPayload.order_details.push({
                    product_id: element.value,
                    quantity: null,
                    total_price: null
                });
                break;

            case 'qty':
                lastElement = requestPayload.order_details[
                    requestPayload.order_details.length - 1
                ];

                lastElement.quantity = element.value;
                break;

            case 'item_total':
                lastElement = requestPayload.order_details[
                    requestPayload.order_details.length - 1
                ];

                lastElement.total_price = element.value;
                break;
        }
    }

    callApi("POST", orderSaveApiUrl, {
        'data': JSON.stringify(requestPayload)
    });

});
