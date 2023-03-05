import pool  from "../../db"
<<<<<<< HEAD
import checkUser from "@/middleware/checktoken"
import jwt from 'jsonwebtoken'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

export default async function handler(req, res) {
  if(req.method=='POST'){
    let account = Math.floor(1e6 + Math.random() * 9*1e6);
    // console.log(account)
    console.log('hi')
    let a = [account,0,req.body.display_name]
    let query = "insert into users(account_id,reputation,display_name,creation_date,last_access_date) values ($1,$2,$3,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)"
=======

export const config = {
  api: {
    externalResolver: true,
  },
}

export default async function handler(req, res) {
  if(req.method=='POST'){
    const d = new Date('2022-02-6 17:00:00') ;

    let a = [8,0,0,0,0,'strange','Palm Bay,FL','','','i love doctor strange',d,d]
    // console.log(:)
    let query = "insert into users values ($2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)"
>>>>>>> karthik
    pool.query(query,a ,(error, results) => {
      if (error) {
        throw error
      }
      console.log('successfully inserted')
      res.status(200).send("inserted succesfully")
    })
  }
  else{
<<<<<<< HEAD
    res.send({error:true,message:"this method is not allowed"})
  }
}

=======
    res.send({error:true,message:"this method is not allow"})
  }
}
>>>>>>> karthik
