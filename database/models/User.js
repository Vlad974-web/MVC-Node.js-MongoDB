const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

UserShema.pre('save', function (next) {
    const user = this

    bcrypt.hash(user.password, 10, (err, encrypted) => {

        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model('User', UserShema)