import pool  from "../../db"

import checkUser from "@/middleware/checktoken"
const handler=(req, res)=> {
    let parent_id = req.body.id
    let user = req.user_id
    let post =  2
    let a = [user,post,0,parent_id,'CC BY-SA 4.0',req.body.post]
    // console.log(:)
    let query = "insert into posts(owner_user_id,post_type_id,score,parent_id,content_license,body,creation_date) values ($1,$2,$3,$4,$5,$6,CURRENT_TIMESTAMP) RETURNING *"
    pool.query(query,a,(error, results) => {
      if (error) {
        throw error
      }
      console.log('successfully inserted')
      res.status(200).send(results.rows)
    })
  }

 export default checkUser(handler)