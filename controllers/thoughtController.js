const { User, Thought } = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // get thought by ID
    getSingleUser(req, res) {
        Thought.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with request ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // create new thought with user
    createThought(req, res) {
        Thought.create(reg.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: "No user ID" })
                    : res.json(thought)
            })
            .catch((err) => res.status(500).json(err));
    }


};