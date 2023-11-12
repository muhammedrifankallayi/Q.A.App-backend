const mongoose = require("mongoose");


const QA = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    followup:{
        type:String
    },

category:{
type:String,
default:"non"
},

    date:{
        type:Date,
        default:new Date()
    },
    user:{
type:String,
ref:"users",
required:true
    },
    answers:{
        type:Array
    },
    likes:{
        type:Array
    }
})

module.exports = mongoose.model("QA",QA)