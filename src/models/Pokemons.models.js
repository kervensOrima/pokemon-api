const pokemonTypes = ['Eau', 'Feu', 'Electric', 'Poison', 'Insecte', 'Vol', 'Fée' , 'Normal' , 'Plante']


module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemons', {
        pk: {
            type:DataTypes.INTEGER ,
            primaryKey:true ,
            autoIncrement: true
        } ,
        name: {
          type:DataTypes.STRING ,
          allowNull: false ,
          unique: {
            msg: 'pokemon name is already taken'
          },
          validate: {
            notNull:{
              msg: "name is required"
            } ,
            len: {
              args: [[2, 50]] ,
              msg:'name must be more than 2 characters and less than 50'
            }
          }
        } ,
        cp: {
          type: DataTypes.INTEGER ,
          allowNull: false ,
          validate: {
            min:{msg:'min number 0', args: [0]},
            max:{msg:'max number 100', args: [100]},
            isInt:{ msg: 'cp must be an integer'} ,
          }
        } ,
        hp: {
          type: DataTypes.INTEGER,
          allowNull: false ,
          validate: {
            min:{msg: 'min number 0', args:[0]},
            max:{msg:'max number 999', args:[999]},
            isInt:{ msg:'hp is invalid' }
          }
        } ,
        pictures: {
            type: DataTypes.STRING,
            allowNull: false ,
            validate: {
              notNull: { msg: 'pictures required'} ,
              notEmpty: { msg: 'picture cannot be empty'} ,
              isUrl: { msg: 'pictures must be an url'}
            }
        },
        types: {
            type: DataTypes.STRING ,
            allowNull: false ,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
              this.setDataValue('types', types.join())
            },
            validate: {
              isNull: {msg: 'type is required'} ,

              isTypeValid(values) {
                if(!values) {
                  throw new Error('Type of pokemon required')
                }
                if(values.split(',').length > 3) {
                  throw new Error('Types must have less than 3 characters')
                }

                values.split(',').forEach(element => {
                  if(!pokemonTypes.includes(element)) {
                    throw new Error(`${element} pokemon type is invalid...`)
                  }
                });
              }
            } ,
        }
    },
    {
      timestamp: true ,
      createdAt: 'created_at',
      updatedAt: true
    }
    )
}