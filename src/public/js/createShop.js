$(document).ready(function (){
    $('.create-shop-form').submit(function (e){
        e.preventDefault()
        handleCreateShop()
    })

    function handleCreateShop(){
        const shopName = $('#txt_shop_name').val()
        const address = $('#txt_address').val()
        $.ajax({
            url: $('.create-shop-form').attr('action'),
            type: $('.create-shop-form').attr('method'),
            data: {shopName, address},
            beforeSend: animation(),
            success: function (data){
                if(data.status === 200){
                    location.href = '/'
                } else {
                    animation()
                    alert('Something wrong! ' + data.mess)
                }
            },
            error: function (){
                animation()
                alert('Something wrong!')
            }
        })
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

})
