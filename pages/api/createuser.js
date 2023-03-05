import pool  from "../../db"
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
    pool.query(query,a ,(error, results) => {
      if (error) {
        throw error
      }
      console.log('successfully inserted')
      res.status(200).send("inserted succesfully")
    })
  }
  else{
    res.send({error:true,message:"this method is not allowed"})
  }
}

