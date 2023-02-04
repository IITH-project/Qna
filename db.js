const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test1',
  password: 'suraj',
  port: 5432,
})

export default pool