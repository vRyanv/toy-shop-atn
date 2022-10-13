const authentication = require('../middleware/authentication')
const pageController = require('../app/controller/PageController')
const actionController = require('../app/controller/ActionController')
const upload = require('../middleware/saveImage')

function route(app)
{
    //default
    app.get('/', (req, res) => pageController.dashboard(res))

    //login
    app.get('/login', (req, res) => pageController.login(req, res))
    app.post('/handle-login', (req, res) => authentication.checkLogin(req, res))
    app.get('/logout', (req, res) => pageController.logout(req, res))

    //shop
    app.get('/create-shop', (req, res, next) => authentication.checkCookieAdmin(req, res, next),(req, res) => pageController.getCreateShop(req, res))
    app.post('/handle-create-shop', (req, res) => authentication.handleCreateShop(req, res))

    //product
    app.get('/product', (req, res, next) => authentication.checkCookieAdmin(req, res, next), (req, res) => actionController.viewPro(req, res))
    app.post('/product-add', (req, res, next) => authentication.checkCookieAdmin(req, res, next),  upload.single('proImage'), (req, res) => actionController.createPro(req,res))
    app.delete('/product-delete', (req, res, next) => authentication.checkCookieAdmin(req, res, next), (req, res) => actionController.deletePro(req,res))
    app.get('/product-find/:name', (req, res, next) => authentication.checkCookieAdmin(req, res, next), (req, res) => actionController.findPro(req,res))

    //category
    app.get('/category', (req, res, next) => authentication.checkCookieAdmin(req, res, next),(req, res) => actionController.viewCate(res))
    app.post('/category-add', (req, res, next) => authentication.checkCookieAdmin(req, res, next),(req, res) => actionController.createCate(req,res))

    //supplier
    app.get('/supplier', (req, res, next) => authentication.checkCookieAdmin(req, res, next),(req, res) => actionController.viewSup(req,res))
    app.post('/supplier-add', (req, res, next) => authentication.checkCookieAdmin(req, res, next),(req, res) => actionController.createSup(req,res))

    //404
    app.get('*', (req, res) => pageController.page404(res))
}

module.exports = route