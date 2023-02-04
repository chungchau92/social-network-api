const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought",
                id: false
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }

)

userSchema.virtual("friendCount").get(function() {
    return this.friends.length;
})

userSchema.path("email").validate(function(email) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(email)
})

const User = model("user", userSchema);

module.exports = User;