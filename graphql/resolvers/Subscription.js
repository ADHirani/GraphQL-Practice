const { subscribe } = require("graphql");
const pubsub = require("../../config/pubsub");


module.exports = {
  receiveMessage: {
    subscribe: () => pubsub.asyncIterator("MESSAGE_CREATED"),
  },
};
