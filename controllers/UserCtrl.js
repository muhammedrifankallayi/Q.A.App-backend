const Users = require("../model/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
const secrect = require("../configs/Secret")
dotenv.config()
var otp 
function generateOTP(){
    const num = "1234567890"
    var otp = ''
    for(let i =0 ;i<6 ; i++){
        otp += num[Math.floor(Math.random()*10)]
    }
    return otp
}


function sendotpToMail(Email) {
   otp = generateOTP()
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });
    const mailOptions = {
        from: 'esample157@gmail.com',
        to: Email,
        subject: 'Your OTP code',
        text: `Your OTP code is ${otp}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent: ${info.response} otp ${otp}`);
            return otp
        }
    });
}





const userRegister = async(req,res)=>{
    try {
        
    const email = req.body.email
    const username = req.body.username
    const password =  await bcrypt.hash(req.body.password,10)
   console.log(req.headers);
    const NEWUSER = new Users({
        username:username,
        email:email,
        password:password
    })
    await NEWUSER.save()
    res.status(200).send({message:"user registration success"})
    } catch (error) {
        console.log(error.message);
    }finally{
   console.log("its finnally");
    }
}


const UserLogin  = async(req,res)=>{
    try {
        
  const email = req.body.email
  const password = req.body.password

  const user = await Users.findOne({email:email})
if(user){
     const isPassword = await bcrypt.compare(password,user.password)
     if(isPassword){

console.log("login successful");
        const accessToken = jwt.sign({ userId: user._id }, secrect.userAccesstoken, { expiresIn: '30d' });
        res.status(200).send({accessToken})
     }else{
        res.status(400).send({message:"incorrect password"})
     }
}else{
    res.status(401).send({message:"User not found"})
}


    } catch (error) {
        console.log(error.message);
    }
}


const sentOtp = async(req,res)=>{
    try {
        const email = req.body.email
        console.log(email);
        const user  = await Users.findOne({email:email})
        if(!user){
            return res.status(401).send({message:"user not found "})
        }
        await sendotpToMail(email)
        if(!otp){
            return res.status(400).send({message:"Oops ,something went wrong "})
        }
        res.status(200).send({otp})
    } catch (error) {
        console.log(error.message);
    }
}

const verifyemail = async(req,res)=>{
    try {
        const email = req.body.email
        await Users.findOneAndUpdate({email:email},{$set:{isVerified:true}}).then(()=>{res.status(200).send({message:"Email verified successfull"})})
        .catch((err)=>{
            res.status(400).send({message:"verication failed",err})
        })
    } catch (error) {
        console.log(error.message);
    }
}

const resetPassword = async(req,res)=>{
    try {
        
const email = req.body.email
const newPassword = req.body.password
console.log(req.body);
console.log("koii");
const HashedPassword = await bcrypt.hash(newPassword,10) ; 
await Users.findOneAndUpdate({email:email},{$set:{password:HashedPassword}}).then(()=>{
    res.status(200).json({message:"Password updated successfull"})

})
.catch((err)=>{
  res.status(500).send({message:"failed to update",err})
})



    } catch (error) {
        console.log(error.message);
    }
}

const getUsers = async(req,res)=>{
    try {
        console.log("grt users");
   const data = await Users.find()

   res.status(200).send({data})

    } catch (error) {
        console.log(error.message);
    }
}

const uploadImg = async(req,res)=>{
    try {
   
        const file = req.file.filename;
        console.log(file);
        const user  =  req.user
        if(file){
            await Users.findOneAndUpdate({_id:user},{$set:{image:file}})
        }
            res.status(200).send({message:"upload success",success:true})
   
   

    } catch (error) {
        console.log(error.message);
    }
}

const getUserDetails = async(req,res)=>{
    try {
        const user = req.user

        const userData = await Users.findOne({_id:user})

        res.status(200).send({data:userData})

    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    UserLogin,
    userRegister,
    sentOtp,
    verifyemail,
    resetPassword,
    getUsers,
    uploadImg,
    getUserDetails
}