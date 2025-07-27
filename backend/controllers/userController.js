const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const validator=require('validator');



//sign-up route-post request
const signup=async (req,res)=>{
    try{
        const username=req.body.username.trim();
        const password=req.body.password.trim();
        const email=req.body.email.trim();
        const address=req.body.address.trim();
        const pincode=req.body.pincode.trim();
        const contactNumber=req.body.contactNumber.trim();

        if (!username || !password || !email || !address || !pincode || !contactNumber) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUsername=await User.findOne({username});
        if(existingUsername ){
            return res.status(400).json({message:"Username already taken. Please choose another."});
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"This email is already registered."});
        }

        if (typeof username !== 'string' || username.length < 5 || username.length > 15 || !validator.isAlphanumeric(username)) {
            return res.status(400).json({ message: "Username must be between 5 to 15 characters long and can only contain letters and numbers (no special characters)." });
        }

        
        if (typeof password !== 'string' || password.length < 6 || password.length > 11 || !validator.isAlphanumeric(password)) {
        return res.status(400).json({ message: "Password must be between 6 to 11 characters long and can only contain letters and numbers (no special characters)." });
        }

        
        if(!validator.isEmail(email)){
            return res.status(400).json({ message: "Invalid Email." });
        }

        if (!validator.isMobilePhone(contactNumber, 'en-IN')) {
            return res.status(400).json({ message: "Invalid Indian phone number." });
        }

        if(!validator.isPostalCode(pincode, 'IN')){
            return res.status(400).json({ message: "Invalid pincode." });
        }


        if(address===""){
            return res.status(400).json({ message: "Address cannot be empty." });
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=new User({username,password:hashedPassword,email,address,pincode,contactNumber});

        await newUser.save();

        return res.status(200).json({message:"Sign-up Successful!"});

    }catch(error){
        console.error("Signup Error:", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};


const login=async (req,res)=>{
    try{
        const username=req.body.username.trim();
        const password=req.body.password.trim();

        
        if (typeof username !== 'string' || username.length < 5 || username.length > 15 || !validator.isAlphanumeric(username)) {
            return res.status(400).json({ message: "Username must be between 5 to 15 characters long and can only contain letters and numbers (no special characters)." });
        }

        
        if (typeof password !== 'string' || password.length < 6 || password.length > 11 || !validator.isAlphanumeric(password)) {
        return res.status(400).json({ message: "Password must be between 6 to 11 characters long and can only contain letters and numbers (no special characters)." });
        }

        const existingUser=await User.findOne({username});
        if(!existingUser){
            return res.status(400).json({message:"Invalid Credentials."});
        }

        const isMatch=await bcrypt.compare(password,existingUser.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        
        const token = jwt.sign(
            { id: existingUser._id, username: existingUser.username, role: existingUser.role },
            process.env.JWT_SECRET ,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "Lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({id:existingUser._id,role:existingUser.role,message:"Login Successful!"});


    }catch(error){
        console.error("Login error: ",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};




//logout route
const logout= async (req,res)=>{
    try{
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV === "production",
        });
        return res.status(200).json({ message: "Logged out successfully" });
    }catch(error){
        console.error("Logout Error: ", error);
        return res.status(500).json({message:"Internal Server Error. Please Try Again Later."});
    }
}

//get-user-info
const getUserInfo=async (req,res)=>{
    try{
        let userId=req.user.id;
        const userDetails=await User.findById(userId);

        if(!userDetails){
            return res.status(400).json({message:"User does not exist."});
        }

        return res.status(200).json({userData:userDetails,message:"User details GET request successful."});
    }catch(error){
        console.error("Get User Info: " ,error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}


const updateAddress=async (req,res)=>{
    try{
        let userId=req.user.id;
        let {updatedAddress}=req.body;

        const updatedUser=await User.findByIdAndUpdate(userId,{address:updatedAddress},{new:true});

        if(!updatedUser){
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Address updated"});
    }catch(error){
        console.error("Update Address Error: ",error);
        return res.status(500).json({ message: "Internal Server Error" });
    }


}

module.exports={signup,login,logout,getUserInfo,updateAddress};