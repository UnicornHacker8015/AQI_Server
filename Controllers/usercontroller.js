const User = require('../Models/user');

// Fetch user profile data
const getUser = async (req, res) => {
    try {
        const user = await User.findOne();
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// Create or update user profile data
const createOrUpdateUser = async (req, res) => {
    try {
        let user = await User.findOne();
        if (user) {
            user = await User.findByIdAndUpdate(user._id, req.body, { new: true });
        } else {
            user = new User(req.body);
            await user.save();
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete user profile data
const deleteUser = async (req, res) => {
    try {
        await User.deleteOne();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { getUser, createOrUpdateUser, deleteUser };
