const jwt = require("jsonwebtoken")


const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader){
            const token = authHeader.split(" ")[1];  // to specify token and its index, theres a space after the Value Word "Bearer"
            jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
            if(err)  res.status(403).json("Token is not valid!");
            req.user = user  //if successfull
            next();   //leaves the function and go to the router
        })
    }else{
        return res.status(401).json("You are not authenticated")
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not authorized!");
        }
    })
}
const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not authorized!");
        }
    })
}
module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}
