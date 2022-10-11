class PageController{

    dashboard(req, res){
        res.render('dashboard.ejs')
    }

    login(req, res){
        res.render('login.ejs')
    }
}

module.exports = new PageController