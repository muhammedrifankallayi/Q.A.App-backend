const jwt = require("jsonwebtoken")
const secrect = require("../configs/Secret")

const refresh = async(req,res)=>{
    try {
      
        const token  = req.body.refreshToken
        const data = jwt.verify(token,secrect.userRefreshtoken)
        const accessToken = jwt.sign({ userId: data.userId}, secrect.userAccesstoken, { expiresIn: '15m' });
        res.status(200).send({token:accessToken})
    } catch (error) {
        console.log(error.message ,"refresh err");
        res.status(408).send({succes:false,message:"token expired please login again"})
    }
}



module.exports = refresh