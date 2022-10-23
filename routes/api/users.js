const express = require('express');

const { register, login, logout, currentUser, updateBySubscription, updateByAvatar } = require('../../controllers/users');
const { validateBody, authenticate, upload } = require('../../middlewares');
const {registerSchema, loginSchema, updateBySubscriptionSchema} = require('../../schemas/users')

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/logout', authenticate, logout);
router.get('/current', authenticate, currentUser);
router.patch('/', authenticate, validateBody(updateBySubscriptionSchema), updateBySubscription);
router.patch('/avatars', authenticate, upload.single('avatars'), updateByAvatar);

module.exports = router;