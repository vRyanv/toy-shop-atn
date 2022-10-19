const model = require('../model/Model')

class PageController{
    home(req, res){
        res.render('home.ejs')
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

    gallery(req, res){
        model.getGallery().then((result) => {
            res.render('gallery.ejs', {proList: result})
        })
    }

    searchProForCust(req, res){
        let proName = req.params.name
        model.searchProForCust(proName).then((result) => {
            if(result.length !== 0){
                res.send({status:200, proList: result})
            } else {
                res.send({status:400, mess: 'Not found product'})
            }

        })
    }

}

module.exports = new PageController