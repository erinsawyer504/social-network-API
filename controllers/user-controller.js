const { User } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    // Get a user by id
    getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
        )
    .catch((err) => res.status(500).json(err));
},

  // Create a user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
    });
},
  // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : Thought.deleteMany({ username: user.username })
        )
        .then(() => res.json({ message: 'User and thoughts deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
//TODO /api/users
    //TODO get all users - getUsers
    //TODO get a single user by _id and populated thought and friend data - getUserById
    //TODO post a new user - createUser
    //TODO put to update user by its _id
    //TODO delete to remove user by its _id - deleteUser
    //TODO Bonus - remove a user's associated thoughts when deleted

//TODO /api/users/:userId/friends/:friendId
    //TODO post to add a new friend to a user's friend list
    //TODO delete to remove a friend from a user's friend list



};

// Exporting controller 
module.exports = userController; 