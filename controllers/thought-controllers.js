const { Thought, User } = require("../models");

const thoughtController = {

       getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "No thought with this ID" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    allThoughts(req, res) {
        Thought.find()
        .sort({ createdAt: -1 })
        .then((dbThoughtData) => {
          res.json(dbThoughtData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "No thought with this ID" });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },
    removeThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "No thoughtwith ID" });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },
     addThought({ body }, res) {
        console.log(body);
        Thought.create(body)
          .then((thoughtData) => {
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: thoughtData._id } },
              { new: true }
            );
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "not user with this ID" });
              return;
            }
            res.json({ message: 'Thought created!' });
          })
          .catch((err) => res.json(err));
      },
    addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions: body } },
        { new: true }
      )
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "No thought with this id" });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId}, { $pull: { reactions: req.params.reactionId }}, { new: true })
         .then(dbThoughtData => {
             if (!dbThoughtData) {
                 res.status(404).json({ message: 'No thought with this id!'});
                 return;
             }
             res.json(dbThoughtData);
         })
         .catch(err => res.status(404).json(err));
     }
  };
  
  module.exports = thoughtController;
