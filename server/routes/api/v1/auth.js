const express = require('express');
const router = express.Router();
const auth_controller = require('../../../controllers/api/v1/auth_controller');
const passportJWT = require('../../../config/jwt');

router.post('/sign-in', auth_controller.signIn);
router.post('/sign-up', auth_controller.signUp);
router.post(
	'/authenticate-user',
	passportJWT.authenticate('jwt', { session: false }),
	auth_controller.authenticateUser
);

module.exports = router;
