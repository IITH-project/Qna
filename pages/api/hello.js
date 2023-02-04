// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import pool  from "../../db"

export default async function handler(req, res) {
  pool.query('select * from posts Limit 3', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}
