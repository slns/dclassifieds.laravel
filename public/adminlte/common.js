$(document).ready(function(){
    $('.need_confirm').click(function(){
        if(!confirm('Are you sure, you want to do that?')){
            return false;
        }
    });

    $(".chosen_select").chosen({'no_results_text' : 'No results', 'width' : '100%', 'allow_single_deselect': true, 'search_contains':true});

    /**
     * ad edit
     */
    $('#category_id').change(function(){
        show_ad_fields($(this));
    });
    show_ad_fields($('#category_id'));

    $('#car_brand_id').change(function(){
        var car_brand_id = $(this).val();
        var token = $('input[name=_token]').val();

        if(car_brand_id > 0){
            $.ajax({
                url: __AX_GET_CAR_MODELS,
                headers: {'X-CSRF-TOKEN': token},
                type: 'POST',
                data: {'car_brand_id': car_brand_id},
                dataType: "json",
                beforeSend: function() {
                    $('#car_model_loader').show();
                },
                success: function( data ) {
                    $('#car_model_loader').hide();
                    if(data.code == 200){
                        var option = '';
                        $.each(data.info, function( index, value ) {
                            option += '<option value="'+ index + '">' + value + '</option>';
                        });

                        $('#car_model_id')
                            .find('option')
                            .remove()
                            .end()
                            .append(option);
                        $('#car_model_id').prop('disabled', false);
                        $('#car_model_id').trigger("chosen:updated");
                    } else {
                        $('#car_model_id')
                            .find('option')
                            .remove();
                        $('#car_model_id').prop('disabled', true);
                        $('#car_model_id').trigger("chosen:updated");

                    }
                }
            });
        } else {
            $('#car_model_id')
                .find('option')
                .remove()
                .end()
                .append('<option value="0">Select Car Model</option>');
            $('#car_model_id').prop('disabled', true);
            $('#car_model_id').trigger("chosen:updated");
        }
    });

    $('#ad_price_type_1').keydown(function(){
        $('#price_radio').prop("checked", true);
    });
    $('#ad_price_type_4').keydown(function(){
        $('#price_radio_type_4').prop("checked", true);
    });

    $('#ad_price_type_5').keydown(function(){
        $('#price_radio_type_5').prop("checked", true);
    });

    $('#ad_price_type_6').keydown(function(){
        $('#price_radio_type_6').prop("checked", true);
    });
});

//show ad publish fields on category change and document ready
function show_ad_fields(_this)
{
    var data_type = $(_this).find('option:selected').data('type');
    if(data_type != undefined) {
        $('.common_fields_container').hide();
        if (data_type == null) {
            data_type = 0;
        } else {
            $('#type_' + data_type).show();
        }
        $('#category_type').val(data_type);
    }
}