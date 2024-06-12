const express = require('express');
const FrontController = require('../controllers/FrontController');
const router = express.Router();

router.get('/', FrontController.home)
router.get('/login', FrontController.login)


module.exports = router;