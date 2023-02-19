import pool  from "../../db"


export default async function handler(req, res) {
    let a = [req.body.title,req.body.body,req.body.id]
    // console.log(:)
    let query = "update posts set title=$1,body=$2 where id=$3"
    pool.query(query,a ,(error, results) => {
      if (error) {
        throw error
      }
      console.log('successfully inserted')
      res.status(200).send("inserted succesfully")
    })
  }