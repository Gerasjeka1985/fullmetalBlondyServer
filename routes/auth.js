const Router = require("express");
const router = new Router();
const userController = require('../controllers/auth');

//register
//http://localhost:9200/api/auth/register
router.post('/register', userController.registration)

//login
//http://localhost:9200/api/auth/login
router.post('/login', userController.login)

//get me
//http://localhost:9200/api/auth/me
router.get('/me', userController.getMe)

module.exports = router;
//delete