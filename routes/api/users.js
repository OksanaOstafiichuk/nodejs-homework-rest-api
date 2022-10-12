const express = require('express');

const { register } = require('../../controllers/users');
const { validateBody } = require('../../middlewares');
const {registerSchema} = require('../../schemas/users')

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

module.exports = router;