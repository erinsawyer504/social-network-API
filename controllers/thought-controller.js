const { Thought, User } = require('../models');

//TODO api/thoughts
    //TODO GET to get all thouths - getThoughts
    //TODO GET to get a single thought by its _id - getThoughtById
    //TODO POST to create a new thought (dont forget to push the created thought's _id to the associated user's thoughts array field)
    //TODO createThought
    //TODO put to update a thought by its _id  updateThought
    //TODO DELETE to remove a thought by it's _id deleteThought

//TODO /api/thoughts/:thoughtId/reactions
    //TODO post to create a reaction stored in a single thoughts reaction array field  addReaction
    //TODO DELETE to pull and remove a reaction by the raction's reaction Id value  deleteReaction

module.exports = {
    // Get all Thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))          
        .catch((err) => res.status(500).json(err));
    },

    // Get a single Thought by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
        )
    .catch((err) => res.status(500).json(err));
},

    // create a new Thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((Thought) => res.json(Thought))
        .catch((err) => res.status(500).json(err));
    },

    //Update a Thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that id' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
        },
    

    // Delete a Thought and remove from the user
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => {
            if (!thought) {
            return res.status(404).json({ message: 'That Thought does not exist' });
            }
            return User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
            );
        })
        .then((user) => {
            if (!user) {
            return res.status(404).json({
                message: 'Thought deleted, but no users found',
            });
            }
            return res.json({ message: 'Thought successfully deleted!' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    // Create a reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
        )
        .then((thought) => {
            if (!thought) {
            return res
                .status(404)
                .json({ message: 'No Thought found with that ID' });
            }
            return res.json(thought);
        })
        .catch((err) => res.status(500).json(err));
    },


    // Find a reaction by ID and delete
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
        )
        .then((thought) => {
            if (!thought) {
            return res
                .status(404)
                .json({ message: 'No Thought found with that ID' });
            }
            return res.json(thought);
        })
        .catch((err) => res.status(500).json(err));
    },
    };
    