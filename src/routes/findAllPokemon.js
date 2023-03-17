const {Pokemon} = require('../db/sequelize-db')
const { Op } = require('sequelize')

module.exports = (app) => {


    app.get('/api/pokemons/', (request, response) => {
        Pokemon.findAll()
        .then(pokemons=> {
            const message = 'La liste des pokemons'
            response.json({message, data: pokemons})
        })
        .catch( (err) => {

            const message =`La liste n'a pas pu etre récupérer, Ressayer dans quelque instant`
            response.status(500).json({message, data: err})
        })
    })


    
    
    app.get('/api/pokemons/tri/' , (req, res) => {

        const qr_name = req.query.name ?? ''
        const qr_limit = parseInt(req.query.size) ?? 18
        const qr_page = parseInt(req.query.page) ?? 1

        Pokemon.findAll({
            /* where : {     without any operarors
                name:`${qr_name}`
            } */

            /**
             * with operators
             * 
             */
            where: {
                [Op.or]: {
                    name: {
                        [Op.eq]: `${qr_name}`
                    },
                    name: {
                      [Op.like] : `%${qr_name}%`
                    } ,
                }
            } ,
            offset: qr_page,
            limit: qr_limit ,
            order: [
                ['name', 'DESC'] ,
                ['cp', 'ASC'] ,
                ['hp', 'ASC']
            ]
        })
        .then( pokemons => {
            //console.log(pokemons.toJSON())
            const message = `La liste des pokemon trouve`
            return res.json({message:message, data: pokemons})
        })
        .catch(err => {
            const message = `Error loading pokemon list...`
            return res.status(500).json({message: message, timestamp: new Date(), code:500, error: err})
        })
        
    })


    app.get('/api/pokemons/tri/page/', (req, resp) => {
        const qr_name  = req.query.name ?? ''
        const qr_page = req.query.page ?? 1
        const qr_size = req.query.size ?? 18

        Pokemon.findAndCountAll({
            where : {
              name: {
                [Op.like] :`%${qr_name}%`
              }
            } ,
            offset: qr_page ,
            limit: qr_size, 
            order: [
                ['name', 'ASC'] ,
                ['hp', 'ASC'] ,
                ['cp', 'ASC'] ,
            ] ,
        })
        .then( ({count , rows} )=> {
            return resp.json({
                message: `${count} pokemon find in the database` ,
                data: rows ,
                code: 200
            })
        })
        .catch(err => {
            const message = `Erreur loading pokemon by page`
            return resp.status(500).json({message:message, timestamp:new Date(), code:500})
        })
    })


}