// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import pool  from "../../db"
import checkUser from "@/middleware/checktoken"
import jwt from 'jsonwebtoken'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

export const config = {
    api: {
      externalResolver: true,
    },
  }
  
const handler= async (req,res)=>{
    if(req.method=='POST'){
        const {email,password}=req.body
        
        pool.query('select display_name,profile_image_url from users where id= $1',[email], async (error, results) => {
            if (error) {
              throw error
            }
            if(results.rows.length==1){
                let token= jwt.sign(email,process.env.SECRET_KEY)
                setCookie('auth-token', token, { req, res });
                console.log(getCookie('auth-token',{req,res}))
                res.status(200).send(results.rows)
            }
            else{
                res.json({error:true,message:"it has no result"})
            } 
          })
    }
    else{
        res.status(400).json({error:"this method is not allowed"})
    }
}
export default handler

