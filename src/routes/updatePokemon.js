const { ValidationError, UniqueConstraintError } = require("sequelize")
const { Pokemon } = require("../db/sequelize-db")


module.exports = (app) => {
    app.put('/api/pokemons/:pk', (req, resp ) => {
        const pk = req.params.pk
        Pokemon.update(req.body ,{
            where:{pk: pk}
        })
        .then( _ => {
            return Pokemon.findByPk(pk)
            .then( (pokemon) => {
                if (pokemon == null ){
                    const message = `Pokemon with ${pokemon.pk} not found...`
                    var timestamp = new Date()
                    resp.status(404).json({message, timestamp})
                }
                const message = `Le pokemon ${pokemon.name} a ete mis a jour avec success`
                resp.json({message, data:pokemon})
            })
            /*.catch((err) => {
                console.warn(err)
                const message = `an error occured when trying to get the pokemon`
                const timestamp = new Date()
                return resp.status(500).json({message, timestamp})
            })*/
        })
        .catch((err) => {
            /**
             * check if it s a validation error
             */
            if( err instanceof ValidationError ){
                resp.status(400).json({message:err.message , data: err} )
            }

            /**
             * check if it unique constraint error
             */
            if(err instanceof UniqueConstraintError ) {
                resp.status(400).json({message:err.message, data:err})
            }
            const message = `Oupss, error to update pokemon ${pokemon}`
            const timestamp = new Date()
            resp.status(500).json({message, timestamp})
        })
    })
}