import pool  from "../../db"

import checkUser from "@/middleware/checktoken"
const handler=async (req, res)=> {
    // console.log("aaklha"+req.user_id)
    let a = req.user_id
    // console.log(:)
    let query = "select * from posts where owner_user_id = $1 order by creation_date"
    pool.query(query,[a] ,(error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(results.rows)
    })
  }
  export default checkUser(handler)
