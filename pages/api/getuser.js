import pool  from "../../db"

import checkUser from "@/middleware/checktoken"
const handler=(req, res)=>{
    let a = req.user_id
    let query = `select * from users where id = $1 `
    pool.query(query,[a], (error, results) => {
      if (error) {
        throw error
      }

      res.status(200).send(results.rows)
    })
  }

  export default checkUser(handler)