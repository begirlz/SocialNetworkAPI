const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
} = require('../../controllers/userController');

// /api/users -> get all users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId -> get user by ID
router.route('/:userId').get(getSingleUser);



module.exports = router;
