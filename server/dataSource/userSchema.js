import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "please enter a valid email"]
    },
    password:{
        type: String,
        required: true,
        minlength: [ 7, "Minimum password length is 7 charecters"]
    }
})

const User = mongoose.model("User", UserSchema, "Users");

export default User;