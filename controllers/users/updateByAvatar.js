const fs = require('fs/promises');
const path = require('path');

const User = require('../../models/user');
const { RequestError } = require('../../helpers');

const updateByAvatar = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { path: tmpDir, originalname } = req.file;
        const extension = originalname.split('.').pop();
        const filename = `${_id}.${extension}`;
        const uploadDir = path.join(__dirname, '../../', 'public', 'avatars');
        const uploadPath = path.join(uploadDir, filename);

        await fs.rename(tmpDir, uploadPath);
        const avatarURL = path.join('avatars', filename);
        const user = await User.findByIdAndUpdate(_id, { avatarURL });
        
        if (!user) {
            throw RequestError(401, "Not authorized");
        }

        res.json({
            avatarURL: user.avatarURL,
        })

    } catch (error) {
        await fs.unlink(req.file.path);
        return next(error); 
    }
 }

module.exports = updateByAvatar;