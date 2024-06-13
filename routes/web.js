const express = require('express');
const router = express.Router();
const FrontController = require('../controllers/FrontController');
const ContactController = require('../controllers/ContactController');
const checkUserAuth = require('../middleware/auth')

router.get('/', FrontController.home)
router.get('/login', FrontController.login)

router.get('/challenge',FrontController.challenge)

router.get('/policy', FrontController.policy)

router.get('/dashboard',checkUserAuth, FrontController.dashboard)

router.post('/userinsert', FrontController.userinsert)
router.post('/verifyLogin', FrontController.verifyLogin)
router.post('/updateProfile',checkUserAuth ,FrontController.updateProfile)
router.post('/changePassword',checkUserAuth ,FrontController.changePassword)
router.get('/logOut',FrontController.logOut)

router.post('/contactUs',ContactController.contactUs)

module.exports = router;