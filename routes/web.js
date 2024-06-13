const express = require('express');
const FrontController = require('../controllers/FrontController');
const router = express.Router();

router.get('/', FrontController.home)
router.get('/login', FrontController.login)
router.get('/dashboard', FrontController.dashboard)
router.get('/policy', FrontController.policy)


module.exports = router;