const jwt  = require("jsonwebtoken")
const secrect = require("../configs/Secret")



const tokenvalidator = async(req,res,next)=>{
    try {
        const token = req.headers['authorization'].split(' ')[1]
        const data = jwt.verify(token,secrect.userAccesstoken)

        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (data.exp > currentTimestamp) {
            req.user = data.userId
            console.log(data,"token");
           next()
        } else {
            console.log("tokenexpired",data.exp);
           res.status(401).send({success:false,jwt:false,message:"token expired"})
        }


    } catch (error) {
        console.log(error.message,"auth");
        res.status(401).send({success:false,jwt:false,message:"token expired"})
    }
}

module.exports = {
    tokenvalidator
}