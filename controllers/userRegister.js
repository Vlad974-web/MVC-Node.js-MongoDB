const User = require('../database/models/User')         // On a récupérer notre chemin

module.exports = (req, res) => {
    User.create(                                        // Middleware, on utilise la méthode create qui va récupérer
        req.body, (err, diana) => {                     // Les requetes qui sont dans le body

            if(err) {
                return res.redirect('/user/create')     // Si il y a une erreur, tu me redireges à la faute où tu étais.
            }

            res.redirect('/')                           // Et quand tu as finis, retourne sur la page d'accueil.
        }
    )
}