import pool  from "../../db"


export default async function handler(req, res) {
    let a = req.query.search
    console.log("in api "+a)
    let query = `select * from posts where parent_id = $1 order by creation_date`
    pool.query(query,[a], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows.length)

      res.status(200).send(results.rows)
    })
  }