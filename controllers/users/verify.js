const User = require('../../models/user');
const { RequestError } = require('../../helpers');

const verify = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = User.findOne({verificationToken});

        if (!user) {
            throw RequestError(404, 'User not found');
        }

        await User.findByIdAndUpdate(user._id, {verificationToken: null, verify: true})

        res.json({message: 'Verification successful'});

    } catch (error) {
        next(error);
    }
 }

module.exports = verify;