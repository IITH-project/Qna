
import pool  from "../../db"
import checkUser from "@/middleware/checktoken"
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';


const handler= async (req,res)=>{
    // let auth= getCookie('auth-token')
    //     console.log(auth)
    console.log(req.user_id)
    res.status(400).json({success:"verified"})
}
export default checkUser(handler)