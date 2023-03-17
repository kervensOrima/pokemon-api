const { Sequelize , DataTypes } = require("sequelize");
const PokemonModel = require('../models/Pokemons.models')

/**
 * sequelize object instance to connect to the database
 */
const sequelize = new Sequelize(
    'pokemon_db' ,
    'root' ,
    '' , {
        host:'127.0.0.1' ,
        dialect:'mariadb' ,
        logging:true
    }
)


/**
 * 
 * create all table here (Pokemon)
 */
const Pokemon = PokemonModel(sequelize, DataTypes)


/**
 * Create all the tables here
 * l'option force supprime et recreer la base de donnee a chaque fois util pour le deboguage
 */

const initDB = () => {
   return  sequelize.sync({force: false})
    .then( _ => console.log('tables has been created successfully'))
    .catch( err =>  console.error(err))
}


/**
 * export les modules
 */

module.exports = { initDB, Pokemon}



