const authentication = require('../middleware/authentication')
const pageController = require('../app/controller/PageController')
function route(app)
{
    app.get('/', (req, res, next) => pageController.dashboard(req,res))
    app.get('/login', (req, res, next) => pageController.login(req, res))
    //404
    app.get('*', )
}

module.exports = route