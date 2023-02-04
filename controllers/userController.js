const { User, Thought } = require("../models");

module.exports = {
    // get all users
    getUsers(req,res) {
        User.find()
        .populate({ path: "thoughts", select: "-__v"})
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },

    // get single user
    getSingleUser(req,res) {
        User.findOne({_id: req.params.userId})
        .populate({ path: "thoughts", select: "-__v"})
        .then((user) => {
            !user
                ? res.status(404).json({ message: "No user with this id" })
                : res.json(user)
        })
        .catch ((err) => res.status(500).json(err));
    },

    // create user
    createUser(req,res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // delete user
    deleteUser(req,res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((user) => {
            !user
                ? res.status(404).json({ message: "No user with this id" })
                : Thought.deleteMany({ _id: { $in: user.thoughts}})
        })
        .then(() => res.json({ message: "User and thoughts deleted"}))
        .catch ((err) => res.status(500).json(err))
    },

    // update user
    updateUser(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }    
        )
        .then((user) => {
            !user
                ? res.status(404).json({ message: "no user with this id" })
                : res.json(user)
        })
        .catch((err) => res.status(500).json(err))

    },
    // add a new friend to user's friend list
    addFriend(req,res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $push: { friends: req.params.friendId }},
            { new: true},
        )
        .then((friend) => {
            !friend
                ? res.status(404).json({ message: "no data with this id"})
                : res.json(friend)
        })
        .catch((err) => res.status(500).json(err))
    },
    //  delete a friend from user's friend list
    deleteFriend(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true },
        )
        .then((friend) => {
            !friend
                ? res.status(404).json({ message: "no data with this id"})
                : res.json(friend)
        })
        .catch((err) => res.status(500).json(err))
    }
}