'use strict';

const Knex = require('knex');
const knexConfig = require('./knexfile')
const {Model} = require('objection')
const Problems = require('./problems')

const knex = Knex(knexConfig);
Model.knex(knex)

module.exports.hello = async event => {
  try{
    const newProblem = JSON.parse(event.Records[0].body);
    const problems = await Problems.query().whereBetween('lat', [newProblem.lat-0.01, newProblem.lat+0.01])
                      .andWhereBetween('long', [newProblem.long-0.01, newProblem.long+0.01])
                      .andWhere('typeId', newProblem.typeId);

    if(problems.length === 0)
    {
      await Problems.query().insertGraph(newProblem)
      return;
    }

    problems.forEach(async problem => {
      const eucldDist = Math.sqrt(Math.pow(newProblem.lat - problem.lat) + Math.pow(newProblem.long - problem.long));
      if(eucldDist>=0.000405) //50m
      {
        await Problems.query().insertGraph(newProblem)
        console.log("Message handled successfully!")
      }
    })
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
  }catch(err){
    console.log(err);
    process.exit(1);
  }
};
