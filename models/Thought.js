const { Schema, model } = require("mongoose");

const moment = require("moment");

const reactionSchema = require("./Reaction")

const thoughSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
})

const Thought = model("thought", thoughSchema);

module.exports = Thought;