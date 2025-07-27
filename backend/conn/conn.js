const mongoose=require('mongoose');
require('dotenv').config();


const url=process.env.MONGO_URL;

const conn=async ()=> {
    try{
        await mongoose.connect(url);
        console.log("Connected to Db");
    }catch(error){
        console.error(error);
        setTimeout(conn, 5000);
    }
};


module.exports = conn;



