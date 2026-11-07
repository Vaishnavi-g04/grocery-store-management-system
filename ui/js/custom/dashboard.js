
$(function () {
    // Get all orders
    $.get(orderListApiUrl, function (response) {
        if (response) {
            var table = '';
            var totalCost = 0;

            $.each(response, function(index, order) {
                totalCost += parseFloat(order.total);

                table += '<tr>' +
                    '<td>' + order.datetime + '</td>' +
                    '<td>' + order.order_id + '</td>' +
                    '<td>' + order.customer_name + '</td>' +
                    '<td>' + parseFloat(order.total).toFixed(2) + ' Rs</td>' +
                    '<td><button type="button" class="btn btn-sm btn-info view-order" data-id="' + order.order_id + '">View</button></td>' +
                    '</tr>';
            });

            table += '<tr><td colspan="3" style="text-align: end"><b>Total</b></td><td><b>' +
                totalCost.toFixed(2) + ' Rs</b></td><td></td></tr>';

            $("#ordersTable").find('tbody').empty().html(table);
        }
    });
});


// View Order Details
$(document).on("click", ".view-order", function (event) {

    event.preventDefault();

    var orderId = $(this).data("id");

    $.get(orderDetailsApiUrl, { order_id: orderId }, function (response) {

        var table = '';

        $.each(response, function(index, item) {

            table += '<tr>' +
                '<td>' + item.product_name + '</td>' +
                '<td>' + item.quantity + '</td>' +
                '<td>' + parseFloat(item.price_per_unit).toFixed(2) + ' Rs</td>' +
                '<td>' + parseFloat(item.total_price).toFixed(2) + ' Rs</td>' +
                '</tr>';

        });

        $("#orderDetailsTable").html(table);

        $("#userProfileModal").modal("show");

    });
});
