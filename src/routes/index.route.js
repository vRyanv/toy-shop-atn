const authentication = require('../middleware/authentication')
const pageController = require('../app/controller/PageController')
const actionController = require('../app/controller/ActionController')
const upload = require('../middleware/saveImage')

function route(app)
{
    //default
    app.get('/', pageController.dashboard)

    //login
    app.get('/login', pageController.login)
    app.post('/handle-login', authentication.checkLogin)
    app.get('/logout', pageController.logout)

    //shop
    app.get('/create-shop', authentication.checkCookieAdmin, pageController.getCreateShop)
    app.post('/handle-create-shop', authentication.handleCreateShop)

    //product
    app.get('/product', authentication.checkCookieAdmin, actionController.viewPro)
    app.post('/product-add', authentication.checkCookieAdmin,  upload.single('proImage'), actionController.createPro)
    app.delete('/product-delete', authentication.checkCookieAdmin, actionController.deletePro)
    app.get('/product-find/:name', authentication.checkCookieAdmin, actionController.findPro)

    //category
    app.get('/category', authentication.checkCookieAdmin, actionController.viewCate)
    app.post('/category-add', authentication.checkCookieAdmin, actionController.createCate)

    //supplier
    app.get('/supplier', authentication.checkCookieAdmin, actionController.viewSup)
    app.post('/supplier-add', authentication.checkCookieAdmin, actionController.createSup)

    //404
    app.get('*', pageController.page404)
}

module.exports = route