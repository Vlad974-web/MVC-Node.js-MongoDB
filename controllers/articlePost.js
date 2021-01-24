const path = require('path')

// POST
const Post = require('../database/models/Article')                                          // Une variable sur un modèle Article

module.exports = (req, res) => {                                                            // Quand on va demander cette requete post

    const { image } = req.files                                                             // On dit à expresse d'envoyer l'image dans notre dossier articlesImages
    const uploadFile = path.resolve(__dirname, '..', 'public/articlesImages', image.name)

    image.mv(uploadFile, (error) => {                                                       // ça nous permet de déplacer l'image dans notre dossier articlesImages
        Post.create(                                                                        // Et ça nous ajoute dans la base do donnée, grâce au bodyParser 
            {
                ...req.body,
                image: `/articlesImages/${image.name}`
            }
            ,(error, post) => {
            res.redirect('/')
        })
    })
}