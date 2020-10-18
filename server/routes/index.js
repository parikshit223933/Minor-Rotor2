const express = require('express');
const router = express.Router();
const auth_router = require('./auth');
const state_router = require('./state');

router.use('/auth', auth_router);
router.use('/state', state_router);

module.exports = router;
