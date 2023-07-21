const mySql = require("../../config/db");

module.exports = {
  reporting_person: async (emp) => {
    return await new Promise((resolve, reject) => {
      mySql.query(
        "SELECT * FROM employee WHERE id=?",
        emp.reporting_to,
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data[0]);
          }
        }
      );
    });
  },
  sent_messages: async (emp) => {
    return await new Promise((resolve, reject) => {
      mySql.query("SELECT * from message WHERE sender=?", emp.id, (err, data) => {
        if (err) {
          reject(err)
          throw new Error(err)
        } else {
          resolve(data)
        }
      })
    })
  }
};