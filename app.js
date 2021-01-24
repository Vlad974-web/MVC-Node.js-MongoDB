const express = require('express')
const exphbs  = require('express-handlebars')
const mongoose = require('mongoose')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const Handlebars = require("handlebars")
const MomentHandler = require("handlebars.moment")
MomentHandler.registerHelpers(Handlebars)
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')

// Controller pour les articles --------------------------------------
const articleAddController = require('./controllers/articleAdd')
const homePage = require('./controllers/homePage')
const articleSingleController = require('./controllers/articleSingle')
const articlePostController = require('./controllers/articlePost')
const contactPageController = require('./controllers/contactPage')

// Controller pour user -------------------------------
const userCreate = require('./controllers/userCreate')
const userRegister = require('./controllers/userRegister')
const userLogin = require('./controllers/userLogin')

const app = express()

// Body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// express-fileupload
app.use(fileupload())

app.use(express.static('public'));

// Handlebars
app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs', handlebars: allowInsecurePrototypeAccess(Handlebars)}))
app.set('view engine', 'hbs');

// Middleware
const articleValidPost = require('./middleware/articleValidPost')
app.use('/articles/post', articleValidPost)

// MongoDB (mongoose)
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true})

// Toutes les routes hbs 
// Route contact.hbs----------------------
app.get('/contact', contactPageController)

// Route--------------
app.get('/', homePage)

// Route add.hbs Articles--------------------
app.get('/articles/add', articleAddController)

// Route articles.hbs---------------------------
app.get('/articles/:id', articleSingleController)

// Route POST------------------------------------
app.post('/articles/post', articlePostController)





// Toutes les routes users
// Route userCreate ---------------------
app.get('/user/create', userCreate)
app.post('/user/register', userRegister)

// Route login ------------------
app.get('/user/login', userLogin)



const port = 3000
app.listen(port, () => {
    console.log(`ecoute Vlad, le port 3000, lancè à : ${new Date().toLocaleString()}, bon courage pour les codes!`);
})