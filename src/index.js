const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')
const resolvers = require('./resolvers')
const config = require("./config/default.json");

const app = express()

app.use('/graphiql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(config.server_port, () => {
  console.log(`server up on port ${config.server_port}`)
})
