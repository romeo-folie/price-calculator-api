const graphql = require("graphql");

const schema = graphql.buildSchema(`
  enum TradeType {
    buy
    sell
  }

  type Query {
    calculatePrice(type: TradeType!, margin: Float!, exchangeRate: Float!): Float!
  }
`);

module.exports = schema;
