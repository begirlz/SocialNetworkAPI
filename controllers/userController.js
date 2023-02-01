const { User, Thought } = require('../models');

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // get user by ID
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with request ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with request ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete a user by ID
  // deleteUser(req, res) {
  //   User.findOneAndDelete(
  //     { _id: req.params.userId }
  //   )
  //     .then((user) =>
  //       !user
  //         ? res.status(404).json({ message: "No user with request ID" })
  //         : res.json(user)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },

  // delete a user and associated thought
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with request ID' })
          : Thought.deleteMany({ _id: { $in: user.thought } })
      )
      .then(() => res.json({ message: 'User and associated thought are deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  // add a new friend to user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with request ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //delete a friend from user's friend list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
          !user
            ? res.status(404).json({ message: "No user with request ID" })
            : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },  
  
};

