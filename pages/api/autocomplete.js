import pool  from "../../db"

export default async function handler(req, res) {
    let a=req.body.name
    let value=req.body.value
    let query= value=='1'? (`select id,display_name from users where display_name ~* '${a}' LIMIT 10;`):(`select tag_name from tags where tag_name ~* '${a}' LIMIT 10`)
     
    try {
      pool.query(query, (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(results.rows)
      })
    } catch (error) {
      res.status(400).send("some error")
    }
  
}