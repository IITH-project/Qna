import pool  from "../../db"


export default async function handler(req, res) {
    let a = req.body.id
    let query = `with post_id(id) as(
        select id from posts),
         valid_posts(id) as(
            select related_post_id from post_links where post_id = $1 and related_post_id in (select * from post_id))
         select body from posts where id in (select * from valid_posts)
        `
    pool.query(query,[a], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows.length)

      res.status(200).send(results.rows)
    })
  }