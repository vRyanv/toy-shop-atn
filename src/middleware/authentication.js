const database = require('../database/connect')
const jwt = require('jsonwebtoken')
const tokenKey = '1234567'
const tokenName = 'user_token'

class Authentication
{
    checkLogin(req, res)
    {
        let username = req.body.username
        let pass = req.body.password
        database.query(`select * from users where username = '${username}' and password = '${pass}'`)
            .then(result => {
                if (result.rowCount > 0)
                {
                    res.cookie(tokenName,jwt.sign({
                        userId:result.rows[0].user_id,
                        userRole: result.rows[0].role
                    }, tokenKey))
                    res.send({status:200, role: 'admin'})
                }
                else
                {
                    res.send({status:400})
                }
            })
    }

    checkCookieAdmin(req, res, next)
    {
        try{
            let token = req.cookies.__token_user
            let decode = jwt.verify(token, tokenKey)
            req.userId = decode.userId
            req.userRole = decode.userRole
            if(req.userRole === '0')
            {
                res.render('admin/authFail.ejs')
            }
            next()
        }catch (error){
            res.render('admin/authFail.ejs')
        }
    }

    checkCookieCustomer(req, res, next)
    {
        try{
            let token = req.cookies.__token_user
            let decode = jwt.verify(token, tokenKey)
            req.userId = decode.userId
            req.login = true
            next()
        }catch (error){
            req.login = false
            next()
        }
    }

}

module.exports = new Authentication