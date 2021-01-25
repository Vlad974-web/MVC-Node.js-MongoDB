// POST
const Post = require('../database/models/Article')           // Une variable sur un modèle Article

// Route index.hbs
module.exports = async (req, res) => {       // Quand URL lancé et bien la requête il va synchroniser avec ces bases do donées

    const meliodas = await Post.find({}).lean()     // await Post.find({}) ça permet d'attendre le retour de la requête, donc il permet d'afficher le contenu qui dans collections

    res.render('index', {meliodas})
}