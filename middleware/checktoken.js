
import jwt from 'jsonwebtoken'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
const checkUser= handler => async (req,res)=>{

    const token=getCookie('auth-token', { req, res });
    // console.log("from token"+token)
    if(!token){
       return res.send({error:true,message:'please authenticate first'})
    }

    try {
    const data =await jwt.verify(token,process.env.SECRET_KEY);
    console.log(data)
    req.user_id=data
    handler(req,res)
} catch (error) {
    res.send({error:true,message:'please authenticate first'})
}
}
export default checkUser;