const bcrypt = require('bcryptjs');

const User = require('../../models/user');
const { RequestError } = require('../../helpers');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const comparePassword = await bcrypt.compare(password, user.password); 
        if (!user || !comparePassword) {
            throw RequestError(401, "Email or password is wrong")
        }

        res.json({
            token: "exampletoken",
            user: {
                email: user.email,
                subscription: user.subscription
            }
})

    } catch (error) {
        next(error);
    }
 }

module.exports = login;