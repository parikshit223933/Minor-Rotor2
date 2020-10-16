const express = require('express');
const router = express.Router();
const home_controller = require('../controllers/api/v1/home_controller');

router.get('/', home_controller.home);

module.exports = router;
