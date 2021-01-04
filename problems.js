'use strict'

const {Model} = require('objection')

class Problems extends Model {
    static get tableName(){
        return 'problems'
    }

    static get relationMappings() {
        const users = require('./users')

        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: users,
                join: {
                    from: 'problems.userId',
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = Problems