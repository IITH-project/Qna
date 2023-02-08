import pool  from "../../db"


export default async function handler(req, res) {
    let a = req.body.name
    let query = `select tag_name from tags where tag_name ~* '${a}'`
    pool.query(query, (error, results) => {
      if (error) {
        throw error
      }
      // console.log(results.rows)
      res.status(200).send(results.rows)
    })
  }