import pool  from "../../db"

export const config = {
  api: {
    externalResolver: true,
  },
}


export default async function handler(req, res) {
  if(req.method=='POST'){
    let account = Math.floor(1e6 + Math.random() * 9*1e6);
    // console.log(account)
    console.log(req.body.display_name)
    let a = [account,0,req.body.display_name]
    let query = "insert into users(id,reputation,display_name,creation_date,last_access_date) values ($1,$2,$3,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP ) RETURNING *"
    pool.query(query,a ,(error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(results.rows)
    })
  }
  else{
    res.send({error:true,message:"this method is not allowed"})
  }
}

