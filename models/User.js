const { Schema, model } = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {}
    }
)

const User = model("user", userSchema);

module.exports = User;