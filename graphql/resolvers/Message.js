const mySql = require("../../config/db")

module.exports = {
    senderData: async (msg) => {
        return await new Promise((resolve,reject) => {
            const query = "SELECT * FROM employee WHERE id=?"
            mySql.query(query, msg.sender, (err, data) => {
                if (err) {
                    reject(err)
                    throw new Error(err)
                } else {
                    resolve(data[0])
                }
            })
        })
    }
}