import pool  from "../../db"


export default async function handler(req, res) {
    const d = new Date('2022-02-6 17:00:00') ;
    let a = [1,8,0,0,0,0,'strange','Palm Bay,FL','','','i love doctor strange',d,d]
    // console.log(:)
    let query = "insert into users values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)"
    pool.query(query,a ,(error, results) => {
      if (error) {
        throw error
      }
      console.log('successfully inserted')
      res.status(200).send("inserted succesfully")
    })
  }