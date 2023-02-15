const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydb',
  password: process.env.PASSWORD,
  port: 5432,
})

export default pool