const express = require('express');

const { register, login } = require('../../controllers/users');
const { validateBody } = require('../../middlewares');
const {registerSchema, loginSchema} = require('../../schemas/users')

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.get('/login', validateBody(loginSchema), login);

module.exports = router;