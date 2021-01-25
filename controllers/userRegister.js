const User = require('../database/models/User')         // On a récupérer notre chemin

module.exports = (req, res) => {
    User.create(                                        // Middleware, on utilise la méthode create qui va récupérer
        req.body, (err, diana) => {                     // Les requetes qui sont dans le body

            if(err) {

                const registerError = Object.keys(err.errors).map(key => err.errors[key].message)

                req.flash('registerError', registerError)           // On peut l'utiliser à n'importe quelle moment de notre code

                req.flash('data', req.body)                         // On va tout récupérer, ce que l'utilisateur va saisir

                return res.redirect('/user/create')                 // Si il y a une erreur, tu me redireges à la faute où tu étais.
            }

            res.redirect('/')                                       // Et quand tu as finis, retourne sur la page d'accueil.
        }
    )
}