const express = require('express');
const router = express.Router();
const state_controller = require('../../../controllers/api/v1/state_controller');
const passportJWT = require('../../../config/jwt');

router.post('/get-state-names', state_controller.getStateNamesForAppliance);
router.post(
	'/change-state',
	passportJWT.authenticate('jwt', { session: false }),
	state_controller.changeState
);
router.post(
	'/get-current-state',
	passportJWT.authenticate('jwt', { session: false }),
	state_controller.getCurrentState
);
router.post(
	'/select-appliances',
	passportJWT.authenticate('jwt', { session: false }),
	state_controller.selectAppliances
);
module.exports = router;
