const axios = require("axios");
const redis = require("redis");
const {promisify} = require("util");
const config = require("../config/default.json");

const client = redis.createClient(config.redis_port);

const getAsync = promisify(client.get).bind(client);

const resolvers = {
  calculatePrice: async ({type, margin, exchangeRate}) => {
    try {
      var btcPrice, valueUSD, valueNGN;

      btcPrice = await getAsync("btcPrice");

      if(btcPrice) btcPrice = parseFloat(btcPrice)
      else {
        const response = await axios.get(config.coindesk_url);

        btcPrice = response.data.bpi.USD.rate_float;

        client.setex("btcPrice", 3600, btcPrice);
      }

      margin = margin / 100;

      if (type === "sell") valueUSD = btcPrice - margin;
      else valueUSD = btcPrice + margin;

      valueNGN = valueUSD / exchangeRate;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }

    return valueNGN;
  },
};

module.exports = resolvers;
