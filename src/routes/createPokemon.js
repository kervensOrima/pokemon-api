const { ValidationError, UniqueConstraintError } = require("sequelize")
const { Pokemon } = require("../db/sequelize-db")


module.exports = (app) => {

    app.post('/api/pokemons/', (request, response) => {
        Pokemon.create(request.body)
        .then( pokemon => {
            const message = `${pokemon.name} has been created successfully`
            response.json({message, data: pokemon})
        })
        .catch( err => {
            /**
             * validation error
             */
            if(err instanceof ValidationError) {
                response.status(400).json({message: err.message , data: err})
            }

            /**
             * check if the error is an sql error contraint
             */
            if(err instanceof UniqueConstraintError ) {
                response.status(400).json({message: err.message , data: err})
            }
            const message = `Error when trying to create pokemon : ${err.message}`
            const timestamp = new Date().toString()
            response.status(500).json({message, timestamp})
        })
    })
}