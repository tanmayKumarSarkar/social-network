const {Client}  = require('pg')

const pgClient = new Client({
  user: process.env.db_user,
  host: process.env.db_host,
  database: process.env.database,
  password: process.env.db_pwd,
  port: process.env.db_port,
})

module.exports = pgClient