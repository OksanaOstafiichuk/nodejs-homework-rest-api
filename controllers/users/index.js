const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const currentUser = require('./currentUser');
const updateBySubscription = require('./updateBySubscription');
const updateByAvatar = require('./updateByAvatar');

module.exports = {
    register,
    login,
    logout,
    currentUser,
    updateBySubscription,
    updateByAvatar,
}