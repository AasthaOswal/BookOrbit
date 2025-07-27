const express=require('express');
const { authenticateToken } = require('../middlewares/userAuth');
const { getCart, addToCart, removeFromCart, clearCart } = require('../controllers/cartController');
const router=express.Router();


router.get("/",authenticateToken,getCart);
router.post("/:bookid",authenticateToken,addToCart);
router.delete('/:bookid',authenticateToken,removeFromCart);
router.put('/clear',authenticateToken,clearCart);

module.exports=router;