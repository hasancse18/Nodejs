const jwt = require('jsonwebtoken')

const jwtAuthenMiddleware = (req,res,next)=>{
    
    //has authorization or not
    const authorization = req.headers.authorization
    if(!authorization){
        return res.status(404).json({error: 'Token Not Found'})
    }
    
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(404).json({error: 'Unauthorized'})

    }
    try {
        //verify
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next();
    } catch (error) {
        console.error(error);
        res.status(404).json({error: 'Invalid Token'})
    }
}

const generateToken = (userData)=>{
    return jwt.sign({userData},process.env.JWT_SECRET,{expiresIn: 3000});
}

module.exports = {jwtAuthenMiddleware,generateToken}