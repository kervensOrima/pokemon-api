const { Pokemon } = require("../db/sequelize-db")



module.exports = (app) => {
    app.delete('/api/pokeons/:pk/', (req, resp) => {
        const pk = req.params.pk
        Pokemon.findByPk(pk)
            .then(pokemon => {

                if(pokemon === undefined || pokemon === null ) {
                    const message =`Pokemon with pk ${pk} not found...`
                    const timestamp = new Date()
                    resp.status(404).json({message, timestamp})
                }

                const pokemonDeleted = pokemon

                return Pokemon.destroy({
                    where: { pk: pokemonDeleted.pk }
                })
                .then(_ => {
                        console.log('pokemon delete successfully')
                })
            })
            .catch(err => {
                const message = `Erroris occurred to delete the pokemon: ${err}`
                const timestamp = new Date()
                resp.status(500).json(message, timestamp)
            })
    })
}