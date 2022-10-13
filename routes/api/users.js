const express = require('express');

const { register, login, logout } = require('../../controllers/users');
const { validateBody, authenticate } = require('../../middlewares');
const {registerSchema, loginSchema} = require('../../schemas/users')

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/logout', authenticate, logout);

module.exports = router;