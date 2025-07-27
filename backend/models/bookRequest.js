const mongoose =require('mongoose');

const bookRequestSchema= new mongoose.Schema({

    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required:true,
    },

},{timestamps:true});



module.exports=mongoose.model("BookRequest",bookRequestSchema);