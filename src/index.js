const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')
const resolvers = require('./resolvers')
const config = require("./config/default.json");

const app = express()
const port = process.env.PORT || config.server_port

app.use('/graphiql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`server up on port ${port}`)
})
