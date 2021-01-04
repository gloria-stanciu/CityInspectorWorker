'use strict'

const {Model} = require('objection')

class Users extends Model{
    static get tableName(){
        return 'users'
    }

    static get relationMappings(){
        const problems = require('./problems')
        const transactions = require('./transactions')

        return {
            problems: {
                relation: Model.HasManyRelation,
                modelClass: problems,
                join: {
                    from: 'users.id',
                    to: 'problems.user_id'
                },
            },
            transactions: {
                relation: Model.HasManyRelation,
                modelClass: transactions,
                join: {
                    from: 'users.id',
                    to: 'transactions.user_id'
                },
            },
        }
    }
}

module.exports = Users