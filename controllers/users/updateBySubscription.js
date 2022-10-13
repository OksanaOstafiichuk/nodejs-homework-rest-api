const User = require('../../models/user');

const updateBySubscription = async (req, res, next) => {
    try {
        const { subscription } = req.body;
        const { _id } = req.user;
        const user = await User.findByIdAndUpdate(_id, { subscription });

        res.json({ subscription: user.subscription })        
    } catch (error) {
        next(error)
    }
 }

module.exports = updateBySubscription;