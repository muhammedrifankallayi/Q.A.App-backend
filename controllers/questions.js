
const QAs = require("../model/questionModel")

const saveQuestion = async(req,res)=>{
    try {
console.log("savequesion working");
        const {title,followup,category} = req.body.form
 
        const qaModel = new QAs({
            title:title,
            followup:followup,
            category:category,
            user:req.user
        })
        await qaModel.save().then(()=>{
            res.status(200).send({success:true})
        })

    } catch (error) {
        console.log(error.message);
    }
}


const getAllQA = async(req,res)=>{
    try {
    
const data = await QAs.find()

res.status(200).send(data)


    } catch (error) {
        console.log(error.message);
    }
}

const userQas = async(req,res)=>{
    try {
        
     const userId = req.user
console.log("userQas");
const data = await  QAs.find({user:userId})
res.status(200).send({data,success:true})
    } catch (error) {
        console.log(error.message , "userQas   ");
    }
}

module.exports = {
    saveQuestion,
    getAllQA,
    userQas
}