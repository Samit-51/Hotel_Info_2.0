const { Router } = require('express');
const router = Router();
const UserAuthController = require('../Controllers/UserAuthController.js');

router.post('/signin',  UserAuthController.signIn_post);
router.post('/login',  UserAuthController.logIn_post);
module.exports = router;