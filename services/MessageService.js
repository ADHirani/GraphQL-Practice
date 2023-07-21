const mySql = require("../config/db");
const pubsub = require("../config/pubsub");
const uuid = require("uuid").v4;

const createMessage = async (arg) => {
  return await new Promise((resolve, reject) => {
    const query = "INSERT INTO message(id,sender,message) VALUES(?,?,?)";
    const messageId = uuid();
    mySql.query(
      query,
      [messageId, arg.messageData.sender, arg.messageData.message],
      (err, data) => {
        if (err) {
          reject(err);
          throw new Error(err);
        } else {
          mySql.query(
            "SELECT * FROM message WHERE message.id=?",
            messageId,
            (err, result) => {
              if (err) {
                reject(err);
                throw new Error(er);
              } else {
                pubsub.publish("MESSAGE_CREATED", {
                  receiveMessage: result[0]
                });
                resolve(result[0]);
              }
            }
          );
        }
      }
    );
  });
};

module.exports = {
  createMessage,
};