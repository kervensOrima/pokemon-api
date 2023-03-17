const { Pokemon } = require("../db/sequelize-db")


module.exports = (app) => {
  
    /**
     * endpoint
     */
    app.get('/api/pokemons/:pk/' , (request, response) => {
        Pokemon.findByPk(request.params.pk)
        .then( pokemon => {
            if(pokemon === null ) {
                const message =`Pokemon with id : ${request.params.pk} is not available`
                response.status(404).json({message})
            }
            const message = `Le pokemon avec le pk : ${request.params.pk}`
            response.json({message, data: pokemon})
        })
        .catch(err => {
            const message = `Une erreur interne s'est produit lors de l'execution`
            timestamp = new Date().toString()
            response.status(500).json({message,timestamp })
        })
    })
}