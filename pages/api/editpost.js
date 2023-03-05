import pool  from "../../db"


export default async function handler(req, res) {
    let a = [req.body.title,req.body.body,req.body.tags,req.body.id]
    console.log(req.body.tags)
    let query = "update posts set title=$1,body=$2,tags=$3 where id=$4"
    pool.query(query,a ,(error, results) => {
      if (error) {
        throw error
      }
      console.log('successfully inserted')
      res.status(200).send("inserted succesfully")
    })
  }