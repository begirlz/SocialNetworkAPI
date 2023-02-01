const { User, Thought } = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // get thought by ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
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
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id }},
                    // { $addToSet: { thoughts: req.body }},
                    { runValidators: true, new: true }
                );
            })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: "Thought created without user ID" })
                    : res.json(user)
            })
            .catch((err) => res.status(500).json(err));
    },

    // update thought with ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No thought with request ID" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

      //delete thought with ID
      deleteThought(req, res) {
        Thought.findOneAndDelete(
          { _id: req.params.thoughtId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No thought with request ID" })
              : res.json({ message: "Thought deleted" })
          )
          .catch((err) => res.status(500).json(err));
      },

      //add reaction
      addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId},
          { $addToSet: { reactions: req.params.reactionId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No user with request ID" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

      //delete reaction from thought's
      deleteReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId},
          { $addToSet: { reactions: req.params.reactionId } },
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