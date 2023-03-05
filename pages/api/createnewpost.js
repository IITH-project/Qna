import pool  from "../../db"

export const config = {
  api: {
    externalResolver: true,
  },
}
import checkUser from "@/middleware/checktoken"

export default async function handler(req, res) {
  if(req.method=='POST'){
    console.log("suraj")
    let string = req.body.tags
    let user = 2
    // console.log(string)
    let post =  1
    let a = [user,post,0,req.body.title,string,'CC BY-SA 4.0',req.body.body]
    // console.log(:)
    let query = "insert into posts(owner_user_id,post_type_id,score,title,tags,content_license,body,creation_date) values ($1,$2,$3,$4,$5,$6,$7,CURRENT_TIMESTAMP) RETURNING *"
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

