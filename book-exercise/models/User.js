import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash:{
        type: String,
        required: true
    },
    age: Number,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

const User = mongoose.model('User', userSchema)
export default User