const bcrypt = require('bcrypt')
const User = require('../database/models/User')

module.exports = (req, res) => {

    const { email, password } = req.body            // On récupere des informations de email et password
    User.findOne({email}, (err, user) => {          // On demande d'aller chercher dans la base de donnée si il ya bien deux variables (email et password)
        if (user) {

            bcrypt.compare(password, user.password, (err, code) => {            // user.password, il va comparer le password si il est correcte.

                if (code) {
                    res.redirecte('/')
                } else {
                    res.redirecte('/user/login')
                }
            })
        } else {
            return res.redirecte('/user/login')
        }
    })
}