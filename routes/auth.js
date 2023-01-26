const Router = require("express");
const router = new Router();
const userController = require('../controllers/auth');
const checkAuth = require("../middlewares/checkAuth");

//register
//http://localhost:9200/api/auth/register
router.post('/register', userController.registration)

//login
//http://localhost:9200/api/auth/login
router.post('/login', userController.login)

//get me
//http://localhost:9200/api/auth/me
router.get('/me', checkAuth, userController.getMe)

module.exports = router;
