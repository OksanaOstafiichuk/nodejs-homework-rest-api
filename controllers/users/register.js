const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const nanoid = require('nanoid');

const User = require('../../models/user');
const { RequestError, sendMail } = require('../../helpers');

const { BASE_URL } = process.env;

const register = async (req, res, next) => {
    try {
        const { email, password, subscription } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw RequestError(409, '"Email in use"');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const urlAvatar = gravatar.url(email);
        const verificationToken = nanoid();
        const newUser = await User.create({ email, password: hashPassword, subscription, avatarURL: urlAvatar, verificationToken });

        const mail = {
            to: email,
            subject: 'Let is verify your email',
            html: `<a target="_blank" href="${BASE_URL}/api/users/verify/:${verificationToken}">Verify email</a>`
        }
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