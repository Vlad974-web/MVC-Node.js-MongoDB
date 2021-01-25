module.exports = (req, res) => {

    req.session.destroy(() => {             // Pour détruire la section

        res.redirect('/')                   // Après ça nous renvoie sur la page d'accueil.
    })
}