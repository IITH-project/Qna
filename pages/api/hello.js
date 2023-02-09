// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import pool  from "../../db"

export const config = {
  api: {
    externalResolver: true,
  },
}


export default async function handler(req, res) {
  try {
    let a=req.query.search
  let queryPost
  if(a=='h'){
    queryPost=`select id,owner_display_name,title,body from posts limit 5`
  }
  else{
    queryPost=`select id,owner_display_name,title,body from
    posts where owner_user_id=${a} Limit 5`
  }
  pool.query(queryPost, (error, results) => {
    if (error) {
      throw error
    }
    // console.log(results.rows)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=180000');
    res.status(200).send(results.rows)
  })
  } catch (error) {
    res.status(400).send("internal server error")
  }
}
