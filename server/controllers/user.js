const User = require('../models/user');

const userController = {
    getAll: async (req, res, next) => {
        const user = await User.find();
        res.status(200).json({
            message: 'get all users',
            user: user
        });
    },
    getUserById:  (req, res, next) => {
        const { id } = req.params;
        User
        .findById({ _id: id })
        .then(data => {
            if (data) {
            res.status(200).json({
                message: `get user by id: ${id}`,
                data
            })} else {
                res.status(400).json({
                    message: 'user not found!'
                });
            }
        })
        .catch(error => {
            res.status(400).json({
                message: "User not found"
            })
        }); 
    },
    createUser: (req, res, next) => {
        const { firstname, lastname, roomname } = req.body;
        const user = new User ({
            firstname,
            lastname,
            roomname
        });
        user.save()
        .then(data => {
            res.status(200).json({
                status: true,
                message: `a new user ${firstname} enetered in room ${roomname}`,
                info: data
            })
        })
        .catch(error => res.status(400).json({message: 'internal server error!'}));
        
    },
    deleteUser : (req, res, next) => {
        const { id } = req.params;
        User.remove({ _id: id})
        .then(data => {
            res.status(201).json({
                message: `User deleted of Id: ${id}`,
                data
            });
        })
        .catch(err => {
            res.status(400).json({
                message: "User cannot be deleted"
            })
        });
    }
}
module.exports = userController;