import pool  from "../../db"

export const config = {
  api: {
    externalResolver: true,
  },
}

export default async function handler(req, res) {
  if(req.method=='GET'){
    let a = req.query.search
    // console.log("in api "+a)
    let query = `select id,title,body,tags,accepted_answer_id,score,view_count,answer_count,comment_count,owner_display_name,creation_date from posts where id=$1 or parent_id=$1  order by creation_date`
    pool.query(query,[a], (error, results) => {
      if (error) {
        throw error
      }
      // console.log(results.rows.length)
      res.status(200).send(results.rows)
    })
  }
  else{
    res.send({error:true,message:"this method is not allow"})
  }
}