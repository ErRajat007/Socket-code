const mongoose =require('mongoose');

const users = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    role: { type: String, required: true, default: 'User' },
    deviceId  : { type : String, default : '' },
    fcmToken : { type : String, default : '' },
})

const userModel = mongoose.model('users',users)
module.exports= userModel