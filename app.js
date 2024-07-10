require('dotenv').config()

const express = require('express')
const productsRouter = require('./src/routers/products.router')
const authRouter = require('./src/routers/auth.router')
const usersRouter = require('./src/routers/users.router')
const categoriesRouter = require('./src/routers/categories.router')
const indexRouter = require('./src/routers/index.router')
const indexCategoriesRouter = require('./src/routers/indexCategories.router')
const carritoRouter = require('./src/routers/carrito.router')

const app = express()

const PORT = process.env.PORT

app.use(express.static( 'public' ))

app.set( 'views', './src/views' )
app.set( 'view engine', 'ejs' )

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'ingenieria informatica' }));
require('./src/config/passport')(app)

/*app.get('/', (req, res) => {
    //res.send('Hello world from express')
    res.render('index',{
        title: "Esto viene desde app.js"
    })
})*/

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/categories', indexCategoriesRouter)
app.use('/admin/products', productsRouter)
app.use('/admin/users', usersRouter)
app.use('/admin/categories', categoriesRouter)
app.use('/ShoppingCar', carritoRouter)



app.listen(PORT, ()=> {
    console.log(`${process.env.APP_NAME} is running 
    on port: ${PORT}`)
})

