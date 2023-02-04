const { User, Thought} = require("../models")

module.exports = {
    // get all thoughts
    getThoughts( req,res) {
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err))
    },

    // get single thought
    getSingleThought(req,res) {
        Thought.findOne(
            {_id: req.params.thoughtId}
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({ message: "no thought with this id"})
                : res.json(thought)
        })
        .catch( (err) => res.status(500).json(err))
    },

    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId},
                { $addToSet: {thoughts: thought._id}},
                { new: true}
            )
        })
        .then((user) => {
            !user
            ? res.status(404).json({message: 'Application created, but found no user with that ID',})
            : res.json(user)
        })
        .catch((err) => res.status(500).json(err))
    },
    // delete a thought
    deleteThought(req,res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then((thought) => {
            !thought
                ? res.status(404).json({ message: "no thought with this id"})
                : res.json(thought)
        })
        .catch( (err) => res.status(500).json(err))
    },

    // update a Thought
    updateThought(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body},
            { new: true }
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({ message: "no thought with this id"})
                : res.json(thought)
        })
        .catch( (err) => res.status(500).json(err))
    },

    // create a reaction stored in a single thought
    createReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: { reactions: req.body}},
            { new: true},
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({ message: "no thought with this id"})
                : res.json(thought)
        })
        .catch( (err) => res.status(500).json(err))
    },

    // delete a reaction 
    deleteCreation(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: { reactions: { reactionId: req.params.reactionId}}}
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({ message: "no thought with this id"})
                : res.json(thought)
        })
        .catch( (err) => res.status(500).json(err))
    }
}   
