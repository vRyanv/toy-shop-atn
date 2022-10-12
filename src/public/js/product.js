$(document).ready(function (){
    $('#pro_form').submit(function (e){
        e.preventDefault()
        if($('#pro_img').val() !== ''){
            handleCreatePro(this)
        } else {
            $('#lb_img').html('Image (require)')
            $('#lb_img').css('color','red')
        }
    })

    function handleCreatePro(_this){
        let productForm = new FormData(_this)

        $.ajax({
            url: $(_this).attr('action'),
            type: $(_this).attr('method'),
            data: productForm,
            beforeSend: animation(),
            cache:false,
            contentType: false,
            processData: false,
            success: function (data){
                if(data.status === 200){
                    location.href = '/product'
                } else {
                    animation()
                    alert('something wrong! add product fail')
                }
            },
            error: function (){
                animation()
                alert('something wrong! add product fail')
            }
        })
    }

    $('#btn_open_dialog_image').click(function (){
        $('#pro_img').click()
        $('#lb_img').html('Image')
        $('#lb_img').css('color','black')
    })

    $('#pro_img').change(function (){
        previewImage()
    })

    function previewImage(){
        document.getElementById("img_preview").src = '/images/demo-image.jpg';
        var imageReader = new FileReader();
        imageReader.readAsDataURL(document.getElementById("pro_img").files[0]);
        imageReader.onload = function (oFREvent) {
            document.getElementById("img_preview").src = oFREvent.target.result;
        };
    }

    function animation(){
        if($('.overplay-animation').css('display') == 'none')
        {
            $('.overplay-animation').css('display', 'block')
        }
        else
        {
            $('.overplay-animation').css('display', 'none')
        }
    }

    let proId = null
    $('.btn-delete-pro').click(function (){
        proId = $(this).data('pro-id')
        $('#btn_show_confirm_delete').click()
    })

    $('#btn_ok_delete').click(function (){
        $('.btn-close').click()
        $.ajax({
            url: 'product-delete',
            type: 'DELETE',
            data: {proId},
            beforeSend: animation(),
            success: function (data){
                if(data.status === 200){
                    location.href = '/product'
                } else {
                    animation()
                    alert('something wrong! delete product fail')
                }
            },
            error: function (){
                animation()
                alert('something wrong! delete product fail')
            }
        })
    })
})