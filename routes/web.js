const express = require('express');
const router = express.Router();
const FrontController = require('../controllers/FrontController');
const ContactController = require('../controllers/ContactController');
const checkUserAuth = require('../middleware/auth')

router.get('/', FrontController.home)
router.get('/login', FrontController.login)
<<<<<<< HEAD
router.get('/dashboard', FrontController.dashboard)
router.get('/policy', FrontController.policy)
=======
router.get('/dashboard',checkUserAuth, FrontController.dashboard)
>>>>>>> 9bb4d5ee09926f133a8255ee92605f18027f5dcf

router.post('/userinsert', FrontController.userinsert)
router.post('/verifyLogin', FrontController.verifyLogin)
router.post('/updateProfile',checkUserAuth ,FrontController.updateProfile)
router.post('/changePassword',checkUserAuth ,FrontController.changePassword)
router.get('/logOut',FrontController.logOut)

router.post('/contactUs',ContactController.contactUs)

module.exports = router;