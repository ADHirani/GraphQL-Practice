const mysql = require("mysql")

const mySql = mysql.createConnection({
    database: "graphql",
    password: "",
    host: "localhost",
    user: "root"
})

module.exports =  mySql