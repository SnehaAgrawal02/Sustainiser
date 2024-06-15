const express = require('express');
const router = express.Router();
const FrontController = require('../controllers/FrontController');
const ContactController = require('../controllers/ContactController');
const PolicyController = require('../controllers/PolicyController');
const checkUserAuth = require('../middleware/auth');

router.get('/', FrontController.home)
router.get('/login', FrontController.login)

router.get('/charts', FrontController.chart)



router.get('/api/data', FrontController.chartData)

router.get('/challenge',FrontController.challenge)

router.get('/policy', FrontController.policy)
router.post('/addPolicy', PolicyController.addPolicy)
router.post('/addComment', PolicyController.addComment)
router.get('/narratives',FrontController.narratives)

router.get('/dashboard',checkUserAuth, FrontController.dashboard)

router.post('/userinsert', FrontController.userinsert)
router.post('/verifyLogin', FrontController.verifyLogin)
router.post('/updateProfile',checkUserAuth ,FrontController.updateProfile)
router.post('/changePassword',checkUserAuth ,FrontController.changePassword)
router.get('/logOut',FrontController.logOut)

router.post('/contactUs',ContactController.contactUs)

module.exports = router;