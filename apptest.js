const mongoose = require('mongoose')
const Article = require('./database/models/Article')

mongoose.connect('mongodb://localhost:27017/blog-test')

/*Article.findByIdAndUpdate("600817a8f75d2e2e5d932976",           // Cette méthode nous permets, de changer notre title etc...
    { title: 'Naruto' }, (error, post) => {
    console.log(error, post);
})*/

/*Article.findById("600820b492680d330a1b6fe7", (error, articles) => {     // afficher notre _id
    console.log(error, articles);
})*/

/*Article.find({                          // Affiche moi dans la contenue collections qu'elle est la collections (argument: articles)
    content: "Critique sur l'animer"
}, (error, articles) => {
    console.log(error, articles);
})*/

/*Article.create({                          // La méthode .create() va permettre d'ajouter du contenu dans le Shema Article.js
    title: "The Seven Deadly Sins",             // Une chaine de caractère.
    intro: "Avis sur le film",
    content: "Critique sur l'animer",
}, (error, post) => {                     // (post) -> il va poster dans la base de donnée.
    console.log(error, post);
}
)*/