const express = require('express');
const router = express.Router();
const state_controller = require('../../../controllers/api/v1/state_controller');

router.post('/get-state-names', state_controller.getStateNamesForAppliance);
router.post('/change-state', state_controller.changeState);
router.post('/get-current-state', state_controller.getCurrentState);

module.exports = router;
