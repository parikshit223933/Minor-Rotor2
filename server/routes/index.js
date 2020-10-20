const express=require('express');
const router = express.Router();
const apiRoute = require('./api');

router.use('/api', apiRoute);

module.exports = router;