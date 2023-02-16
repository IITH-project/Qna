
import jwt from 'jsonwebtoken'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
const checkUser= handler => async (req,res)=>{
    // console.log(req.headers['auth-token'])
    // if(req.headers){
    //     return handler(req,res);
    // }
    // else{
    //     res.status(200).json({ error: "Incorrect Crediental" })
    // }


    const token=getCookie('auth-token', { req, res });
    console.log("from token"+token)
    if(!token){
        res.send({error:'please authenticate first'})
    }

    try {
    const data =await jwt.verify(token,process.env.SECRET_KEY);
    console.log(data)
    req.user_id=data
    handler(req,res)
} catch (error) {
    res.send({error:'please authenticate first'})
}
}
export default checkUser;