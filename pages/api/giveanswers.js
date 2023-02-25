import pool  from "../../db"


export const config = {
  api: {
    externalResolver: true,
  },
}
export default async function handler(req, res) {
  if(req.method=='GET'){
    let a = req.body.id
    let query = `select * from posts where id in (select accepted_answer_id from posts where id = $1) union select * from posts where parent_id = $2`
    pool.query(query,[a,a], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows.length)

      res.status(200).send(results.rows)
    })
  }
  else{
    res.send({error:true,message:"this method is not allow"})
  }
}