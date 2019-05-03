const express= require('express')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const {typeDefs, resolvers,mocks} = require('./schema')

require('dotenv').config({path:'./db/.env'})
require('./db/setup')
var https = require('https')
var fs = require('fs')

const app = express()
const server = new ApolloServer({ typeDefs , resolvers, mocks:false })
server.applyMiddleware({app})


const PORT=process.env.PORT || 3300

var certOptions = {
       key: fs.readFileSync('./certs/server.key'),
       cert: fs.readFileSync('./certs/server.cert')
}

// var certOptions = {
//   key: fs.readFileSync('./ssl-cert-prod/server.key'),
//   cert: fs.readFileSync('./ssl-cert-prod/server.crt')
// }
// var certOptions = {
//   key: fs.readFileSync('./sslcert/server.key'),
//   cert: fs.readFileSync('./sslcert/server.crt')
// }

app.listen(PORT, () => {
     console.log(`🚀 Server Running at http://localhost:${PORT}${server.graphqlPath}`)
})

// https.createServer(certOptions, app).listen(3300,()=>{`🚀 Server Running at https://localhost:${PORT}${server.graphqlPath}`})
   