const jwt = require('jsonwebtoken')
const model = require("../app/model/Model");
const tokenKey = '1234567'
const tokenName = 'user_token'

class Authentication
{
    checkLogin(req, res)
    {
        let username = req.body.username
        let pass = req.body.password

        model.getUser(username, pass).then( (result) => {
                if (result.rowCount > 0) {
                    let cookieValue = jwt.sign({userId:result.rows[0].user_id, shopId:result.rows[0].shop_id}, tokenKey)
                    res.cookie(tokenName, cookieValue)
                    res.send({status:200, shopId:result.rows[0].shop_id})
                } else {
                    res.send({status:400})
                }
            })
    }

    checkCookieAdmin(req, res, next)
    {
        try{
            let token = req.cookies.user_token
            let decode = jwt.verify(token, tokenKey)
            req.userId = decode.userId
            req.shopId = decode.shopId
            if(req.shopId === null){
                res.render('createShop.ejs')
            } else {
                next()
            }
        }catch (error){
            res.render('authenFail.ejs')
        }
    }

    handleCreateShop(req, res){
        let token = req.cookies.user_token
        let decode = jwt.verify(token, tokenKey)
        req.userId = decode.userId

        let shopName = req.body.shopName
        let address = req.body.address
        const handle = async() => {
            const shop = await model.createShop(shopName, address)
            if(shop.length !== 0){
                let shopId = shop[0].shop_id
                const updateShopForAdmin = await model.updateShopForAdmin(shopId, req.userId)
                if(updateShopForAdmin !== 0){
                    res.cookie(tokenName,jwt.sign(
                        {
                            userId: req.userId,
                            shopId: shopId
                        },
                        tokenKey)
                    )
                    res.send({status:200, mess: 'create shop success'})
                } else {
                    res.send({status:400, mess: 'create shop fail'})
                }
            } else {
                res.send({status:400, mess: 'create shop fail'})
            }
        }
        handle()
    }
}

module.exports = new Authentication