import pool  from "../../db"
export const config = {
  api: {
    externalResolver: true,
  },
}

export default async function handler(req, res) {
  if(req.method=='GET'){
    let a = req.body.post_id
    let query = `select * from comments where post_id = $1`
    pool.query(query,[a], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(results.rows)
    })
  }
  else{
    res.send({error:true,message:"this method is not allow"})
  }
}