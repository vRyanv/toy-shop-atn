const model = require('../model/Model')

class PageController{
    dashboard(req, res){
        res.redirect('/product')
    }

    login(req, res){
        res.render('login/login.ejs')
    }

    logout(req, res){
        res.cookie('user_token', '')
        res.redirect('/login')
    }

    page404(req, res){
        res.render('404.ejs')
    }

    getCreateShop(req, res){
        res.render('createShop.ejs')
    }

}

module.exports = new PageController