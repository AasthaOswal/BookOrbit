const {addToFav,getFav, removeFromFav}=require('../controllers/favouriteController');
const express=require('express');
const router=express.Router();
const {authenticateToken}=require('../middlewares/userAuth');


router.get("/",authenticateToken,getFav);
router.post("/:bookid",authenticateToken,addToFav);
router.delete("/:bookid",authenticateToken,removeFromFav);

module.exports=router;

