$(document).ready(function (){
    const appGallery = {
        addEventListener: function (){
            $('#btn_search_product').click(function (){
                appGallery.searchPro($('#txt_search_pro').val())
            })
        },
        searchPro: function (proName){
            console.log(proName)
            if(proName.trim() !== ''){
                $.ajax({
                    url: '/search-pro-client/'+proName,
                    type: 'GET',
                    beforeSend: appGallery.animation(),
                    success: function (data){
                        if(data.status === 200){
                            appGallery.renderProList(data.proList)
                        } else {
                            appGallery.animation()
                            alert(data.mess)
                        }
                    },
                    error: function (){
                        appGallery.animation()
                        alert('something wrong!')
                    }
                })
            }
        },
        renderProList: function (proList){
                var proListHTML = ''
            for (let i=0; i < proList.length;i++){
                let proHTML = `<div class="col-sm-6 col-md-4 col-lg-3">
          <div class="box">
            <a>
              <div class="img-box">
                <img src="/images/${proList[i].pro_image}" alt="">
              </div>
              <div class="detail-box">
                <a id="pro_name">
                  ${ proList[i].pro_name }
                </a>
                <h6 id="cate_name">
                  Category: ${proList[i].cate_name}
                </h6>
                <h6 id="sup_name">
                  Supplier: ${ proList[i].sup_name }
                </h6>
                <h6 id="shop_name">
                  Shop: ${ proList[i].shop_name }
                </h6>
                <h6 id="quantity">
                  Quantity: ${ proList[i].quantity}
                </h6>
              </div>
            </a>
          </div>
        </div>`
                proListHTML += proHTML
            }

            $('#body_pro_list').empty()
            $('#body_pro_list').append(proListHTML)
            appGallery.animation()
        },
        animation: function (){
            if($('.overplay-animation').css('display') === 'none')
            {
                $('.overplay-animation').css('display', 'block')
            }
            else
            {
                $('.overplay-animation').css('display', 'none')
            }
        },
        run: function (){
            appGallery.addEventListener()
        }
    }
    appGallery.run()
})