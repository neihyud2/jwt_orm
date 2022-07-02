const User = require('../models/user')

const userController = {
    // GET ALL USERS
    getAllUsers: async(req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    deleteUser: async(req, res) => {
        try {
            await User.destroy({
               where: { id: req.params.id }
            })
            res.status(200).json('Delete Success!')
        } catch(err) {
            res.status(500).json(err)
        }
    }
}

module.exports = userController