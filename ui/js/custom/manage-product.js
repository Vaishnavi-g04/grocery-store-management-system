var productModal = $("#productModal");
    $(function () {

        //JSON data by API call
        $.get(productListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, product) {
                    table += '<tr data-id="'+ product.product_id +'" data-name="'+ product.name +'" data-unit="'+ product.uom_id +'" data-price="'+ product.price_per_unit +'">' +
                        '<td>'+ product.name +'</td>'+
                        '<td>'+ product.uom_name +'</td>'+
                        '<td>'+ product.price_per_unit +'</td>'+
                        '<td>' +
                            '<span class="btn btn-xs btn-primary edit-product">Edit</span> ' +
                            '<span class="btn btn-xs btn-danger delete-product">Delete</span>' +
                        '</td></tr>';
                });
                $("table").find('tbody').empty().html(table);
            }
        });
    });

    // Edit Product
    $(document).on("click", ".edit-product", function () {
        var tr = $(this).closest('tr');

        $("#id").val(tr.data('id'));
        $("#name").val(tr.data('name'));
        $("#price").val(tr.data('price'));

        productModal.data('editing-unit', tr.data('unit'));
        productModal.find('.modal-title').text('Edit Product');

        productModal.modal('show');
    });

    // Save Product
    // Save or Update Product
    $("#saveProduct").on("click", function () {

        var data = $("#productForm").serializeArray();

        var requestPayload = {
            product_id: null,
            product_name: null,
            uom_id: null,
            price_per_unit: null
        };

        for (var i = 0; i < data.length; ++i) {
            var element = data[i];

            switch (element.name) {
                case 'id':
                    requestPayload.product_id = element.value;
                    break;

                case 'name':
                    requestPayload.product_name = element.value;
                    break;

                case 'uoms':
                    requestPayload.uom_id = element.value;
                    break;

                case 'price':
                    requestPayload.price_per_unit = element.value;
                    break;
                }
            }

        var apiUrl = productSaveApiUrl;

        if (requestPayload.product_id != "0") {
            apiUrl = productUpdateApiUrl;
        }

        callApi("POST", apiUrl, {
            'data': JSON.stringify(requestPayload)
        });

    });    

    $(document).on("click", ".delete-product", function (){
        var tr = $(this).closest('tr');
        var data = {
            product_id : tr.data('id')
        };
        var isDelete = confirm("Are you sure to delete "+ tr.data('name') +" item?");
        if (isDelete) {
            callApi("POST", productDeleteApiUrl, data);
        }
    });

    productModal.on('hide.bs.modal', function(){
        $("#id").val('0');
        $("#name, #uoms, #price").val('');
        productModal.removeData('editing-unit');
        productModal.find('.modal-title').text('Add New Product');
    });

    productModal.on('show.bs.modal', function(){
        //JSON data by API call
        $.get(uomListApiUrl, function (response) {
            if(response) {
                var options = '<option value="">--Select--</option>';
                $.each(response, function(index, uom) {
                    options += '<option value="'+ uom.uom_id +'">'+ uom.uom_name +'</option>';
                });
                $("#uoms").empty().html(options);

                if ($("#id").val() !== "0") {
                    $("#uoms").val(String(productModal.data('editing-unit')));
                }
            }
        });
    });

    // Save New UOM
    $("#saveUOM").on("click", function () {

        var uomName = $("#uomName").val().trim();

        if (uomName === "") {
            alert("Please enter a unit name");
            return;
        }

        var requestPayload = {
            uom_name: uomName
        };

        callApi("POST", uomSaveApiUrl, {
            'data': JSON.stringify(requestPayload)
        });

    });