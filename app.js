const express = require('express')
const exphbs  = require('express-handlebars')
const mongoose = require('mongoose')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const Handlebars = require("handlebars")
const MomentHandler = require("handlebars.moment")
MomentHandler.registerHelpers(Handlebars)
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')             // Elle va se connecter dans la basse de donnée
const connectFlash = require('connect-flash')           // Pour aficher les eurrors sur demande.
const {stripTags} = require('./helpers/hbs')

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
const userLoginAuth = require('./controllers/userLoginAuth')
const userLogout = require('./controllers/userLogout')

const app = express()

// MongoDB (mongoose) -------------------------------------------------------------------------------
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true})

// Connect-flash ------
app.use(connectFlash())

// connect-mongo
const mongoStore = MongoStore(expressSession)

// express-session ------
app.use(expressSession({
    secret: 'Securité',
    name: 'biscuit',
    saveUninitialized: true,            // ça veut dire sauvegarde ce qui n'est pas initialiser, en gros l'utilasateur accepte les cookies oui ou non.
    resave: false,                      // Si il est acctivé est bien ça va quand même enregistrer les informations les cookies, même ne sont pas modifier

    store: new mongoStore(
        {mongooseConnection: mongoose.connection}
    )
}))

// Body-parser ---------------------------------
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// express-fileupload
app.use(fileupload())

const auth = require('./middleware/auth')
const redirectAuthSucess = require('./middleware/redirectAuthSucess')

app.use(express.static('public'));

// Handlebars -----------------------------------------------------------------------------------------------------------
app.engine('hbs', exphbs({defaultLayout: 'main', helpers: {stripTags: stripTags}, extname: 'hbs', handlebars: allowInsecurePrototypeAccess(Handlebars)}))
app.set('view engine', 'hbs');

// Pour déconnecté
app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId

    next()
})

// Middleware ---------------------------------------------------
const articleValidPost = require('./middleware/articleValidPost')
app.use('/articles/post', articleValidPost)
app.use('/articles/add', auth)




// Toutes les routes hbs 
// Route contact.hbs----------------------
app.get('/contact', contactPageController)

// Route--------------
app.get('/', homePage)

// Route add.hbs Articles--------------------
app.get('/articles/add', auth, articleAddController)

// Route articles.hbs---------------------------
app.get('/articles/:id', articleSingleController)

// Route POST------------------------------------
app.post('/articles/post', auth, articleValidPost, articlePostController)





// Toutes les routes users
// Route userCreate -----------------------------------
app.get('/user/create', redirectAuthSucess, userCreate)
app.post('/user/register', userRegister)

// Route login --------------------------------------
app.get('/user/login', redirectAuthSucess, userLogin)

// Route userLoginAuth ---------------------------------------
app.post('/user/loginAuth', redirectAuthSucess, userLoginAuth)

// Route userLogout ---------------
app.get('/user/logout', userLogout)





// Route error404.hbs
app.use( (req, res) => {
    res.render('error404')
})



const port = 3000
app.listen(port, () => {
    console.log(`ecoute Vlad, le port 3000, lancè à : ${new Date().toLocaleString()}, bon courage pour les codes!`);
})