const express=require('express');
const router=express.Router();
const {authenticateToken}=require('../middlewares/userAuth');
const {signup,login,logout,getUserInfo,updateAddress}=require('../controllers/userController');


router.post("/signup",signup);
router.post("/login",login);

// GET ---> POST
router.post("/logout",authenticateToken,logout);

// /get-user-info ---> /me
router.get("/me",authenticateToken,getUserInfo);

// /update-address ----> /me/address
router.put("/me/address",authenticateToken,updateAddress);

router.get("/check-auth", authenticateToken, (req, res) => {
    return res.status(200).json({isLoggedIn:true,role:req.user.role,message:"User Authenticated"});
});


module.exports=router;