const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test2',
  password: process.env.PASSWORD,
  port: 5432,
})

export default pool