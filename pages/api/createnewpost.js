import pool  from "../../db"


export default async function handler(req, res) {
    const d = new Date('2022-02-6 17:00:00') ;
    let a = [0,1,,1,,0,,0,0,0,'','','new post','<comment>','CC BY-SA 2.5','do you like comics?',0,d,,,,d]

    let query = "insert into posts values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)"

    pool.query(query,a,(error, results) => {
      if (error) {
        throw error
      }
      console.log('successfully inserted')
      res.status(200).send("yo")
    })
  }