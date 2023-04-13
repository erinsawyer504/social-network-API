const router = require('express').Router();

// Importing controller functions
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

// route:  /api/users
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// route:  /api/users/:userid
router
    .route('/:userid')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//TODO route: /api/users/:userId/friends/:friendId


module.exports = router; 