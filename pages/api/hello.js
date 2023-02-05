// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import pool  from "../../db"

export default async function handler(req, res) {
  pool.query('select id, title,body from posts limit 5', (error, results) => {
    if (error) {
      throw error
    }
    // console.log(results.rows)
    res.status(200).send(results.rows)
  })
}
