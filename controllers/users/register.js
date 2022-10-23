const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const User = require('../../models/user');
const { RequestError } = require('../../helpers');

const register = async (req, res, next) => {
    try {
        const { email, password, subscription } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw RequestError(409, '"Email in use"');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const urlAvatar = gravatar.url(email);
        const newUser = await User.create({ email, password: hashPassword, subscription, avatarURL: urlAvatar });
        
        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
                avatarURL: newUser.avatarURL
        }})
        
    } catch (error) {
        next(error);
    }
 };

module.exports = register;