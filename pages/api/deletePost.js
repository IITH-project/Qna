import pool  from "../../db"

export const config = {
  api: {
    externalResolver: true,
  },
}

import checkUser from "@/middleware/checktoken"
const handler=(req, res)=> {
  if(req.method=='POST'){
    // console.log(req.query.id)
    let query = "delete from posts where id=$1"
    pool.query(query,[req.query.id] ,(error, results) => {
      if (error) {
        throw error
      }
      // console.log('successfully inserted')
      res.status(200).send("done")
    })
  }
  else{
    res.send({error:true,message:"this method is not allowed"})
  }
}

export default checkUser(handler)