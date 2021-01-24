// POST
const Post = require('../database/models/Article')           // Une variable sur un modèle Article

// Route articles.hbs
module.exports =  async (req, res) => {
    const elizabeth = await Post.findById(req.params.id)
    res.render('articles', {elizabeth})
}