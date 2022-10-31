const User = require('../../models/user');
const { RequestError, sendMail, createEmail } = require('../../helpers');

const resendVerify = async (req, res, next) => {
try {
    const { email } = req.body;
    const user = User.findOne(email);
    if (!user) {
        throw RequestError(400, 'Verification has already been passed');
    }

    const mail = createEmail(email, user.verificationToken);
    await sendMail(mail);

    res.json({
        message: 'Verification email sent'
    })

} catch (error) {
    next(error);
}
}

module.exports = resendVerify;