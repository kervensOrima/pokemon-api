
/**
 * Module to install
 * nodemon : dev tools to refresh our work space
 * express : the api rest framework for javascritp
 * body-parser : to get access with the request body
 * morgan : for middlewares
 * sequelize : ORM 
 * mariadb: for the connection to the database
 */
const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize-db')

const app = express()
const PORT = 3000


/**
 * middleware using
 */
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())
  //.use(express.json())


/**
 * init the database
 */
sequelize.initDB()



/**
 * Here our features point and init db has been start
 */
require('./src/routes/findAllPokemon')(app)
require('./src/routes/findByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)


/**
 * Pour la gestion des routes inconnues dans notre applications
 */

app.use(({res}) => {
  const message = `Impossible de trouver la ressouce que vous avez démandée, vous pouvez essayer une autre URL`
  return res.status(404).json({message})
})

/**
 * start the server
 */
app.listen(PORT, () => {
    console.warn(`Pokemon api has been started in : http://localhost:${PORT}`)
})