const express = require('express');
const router = express.Router();
const apiRoute = require('./api');
const dataController = require('../controllers/api/v1/datacontroller');

router.use('/', dataController.AllData);
router.use('/api', apiRoute);

module.exports = router;
