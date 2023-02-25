import pool  from "../../db"

import checkUser from "@/middleware/checktoken"
export const config = {
  api: {
    externalResolver: true,
  },
}

const handler=async (req, res)=> {
  if(req.method=='POST'){
    let post_id = req.body.post_id
    // console.log("aaklha"+req.user_id)
    let user_id = req.user_id
    let a = [post_id,user_id,0,'CC BY-SA 4.0','',req.body.comment]
    // console.log(:)
    let query = "insert into comments(post_id,user_id,score,content_license,user_display_name,text,creation_date) values ($1,$2,$3,$4,$5,$6,CURRENT_TIMESTAMP) RETURNING *"
    pool.query(query,a ,(error, results) => {
      if (error) {
        throw error
      }
      console.log('successfully inserted')
      res.status(200).send(results.rows)
    })
  }
  else{
    res.send({error:true,message:"this method is not allow"})
  }
}
  export default checkUser(handler)
