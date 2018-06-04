const express = require('express')
const expressGraphql = require('express-graphql')
const schema = require('./schema/schema.js')
const mongoose = require('mongoose')

const app = express();


mongoose.connect('mongodb://akira:soldier76@ds245680.mlab.com:45680/learn_graphql')
mongoose.connection.once('open', ()=> 
console.log('connected to database')
)

app.use('/graphql', expressGraphql({
    schema: schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
}) 