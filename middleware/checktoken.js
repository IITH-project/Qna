
import jwt from 'jsonwebtoken'
const checkUser= handler => async (req,res)=>{
    // console.log(req.headers['auth-token'])
    // if(req.headers){
    //     return handler(req,res);
    // }
    // else{
    //     res.status(200).json({ error: "Incorrect Crediental" })
    // }


    const token=req.headers['auth-token'];
    if(!token){
        res.send({error:'please authenticate first'})
    }

    try {
    const data =jwt.verify(token,process.env.SECRET_KEY);
    handler(req,res)
} catch (error) {
    res.send({error:'please authenticate first'})
}
}
export default checkUser;