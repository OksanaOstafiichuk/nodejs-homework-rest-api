const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

const User = require('../../models/user');
const { RequestError, sendMail, createEmail } = require('../../helpers');

const register = async (req, res, next) => {
    try {
        const { email, password, subscription } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw RequestError(409, '"Email in use"');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const urlAvatar = gravatar.url(email);
        const verificationToken = uuidv4();
        const newUser = await User.create({ email, password: hashPassword, subscription, avatarURL: urlAvatar, verificationToken });

        const mail = createEmail(email, verificationToken);
        await sendMail(mail);

        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
                avatarURL: newUser.avatarURL,
                verificationToken: newUser.verificationToken,
        }})
        
    } catch (error) {
        next(error);
    }
 };

module.exports = register;