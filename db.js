const Pool = require('pg').Pool
const pool = new Pool({
  user: 'karthik',
  host: 'localhost',
  database: 'mydev',
  password: process.env.PASSWORD,
  port: 5432,
})

export default pool