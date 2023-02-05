
import pool  from "../../db"
import checkUser from "@/middleware/checktoken"
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';


const handler= async (req,res)=>{
    let auth= getCookie('auth-token', { req, res });
        console.log(auth)
    res.status(400).json({success:"verified"})
}
export default checkUser(handler)