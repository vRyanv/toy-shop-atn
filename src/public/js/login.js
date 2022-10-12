$(document).ready(function (){
    $('.login-form').submit(function (e){
        e.preventDefault()
        handleLogin()
    })

    function handleLogin(){
        const username = $('#txt_username').val()
        const password = $('#txt_pass').val()
        $.ajax({
            url: $('.login-form').attr('action'),
            type: $('.login-form').attr('method'),
            data: {username, password},
            beforeSend: animation(),
            success: function (data){
                if(data.status === 200){
                    if(data.shopId === null){
                        location.href = '/create-shop'
                    } else {
                        location.href = '/'
                    }
                } else {
                    animation()
                    $('.error-login').show()
                }
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

    $('input').click(function (){
        $('.error-login').hide()
    })
})
