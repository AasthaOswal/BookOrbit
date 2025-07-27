const User=require('../models/user');
const Book=require('../models/book');


const addToCart=async (req,res)=>{
    try{
        const userId=req.user.id;
        const bookId=req.params.bookid;
        
        const userData=await User.findById(userId);

        if(!userData){
            return res.status(404).json({message:"User not exist"});
        }

        const bookData=await Book.findById(bookId);
        if(!bookData){
            return res.status(404).json({message:"Book Not Found"});
        }

        const isAlreadyInCart=userData.cart.includes(bookId);

        if(isAlreadyInCart){
            return res.status(200).json({message:"Book Already In Cart"});
        }
        

        await User.findByIdAndUpdate(userId,{$push:{cart:bookId}},{new:true});
        return res.status(200).json({message: "Book Added to cart!"});
        
    }catch(error){
        console.error("Add to cart error: ", error);
        return res.status(500).json({ message: "Internal Server Errorasd" });
    }

}

const removeFromCart=async (req,res)=>{
    try{
        const bookId=req.params.bookid;
        const userId=req.user.id;

        const userData=await User.findById(userId);

        if(!userData){
            return res.status(404).json({message:"User not exist"});
        }

        const bookData=await Book.findById(bookId);

        if(!bookData){
            return res.status(404).json({message:"Book Not Found"});
        }

        const isBookIncart=userData.cart.includes(bookId);

        if(!isBookIncart){
            return res.status(400).json({message:"Book Not In Cart, Hence cannot be deleted."})
        }

        await User.findByIdAndUpdate(userId,{$pull:{cart:bookId}},{new:true});
        return res.status(200).json({message: "Book removed from cart!"});

    }catch(error){
        console.error("Remove From Cart Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}

const getCart=async (req,res)=>{

    try{
        const userId=req.user.id;

        const userData=await User.findById(userId).populate("cart");

        if(!userData){
            return res.status(404).json({message:"User not exist"});
        }

        const cart=userData.cart;

        return res.status(200).json({message:"cart fetch successfull", cartData:cart});
    }catch(error){
        console.error("Get Cart Error: ",error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    

}


const clearCart=async (req,res)=>{
    try{
        const userId=req.user.id;

        const userData=await User.findById(userId).populate("cart");

        if(!userData){
            return res.status(404).json({message:"User not exist"});
        }

        const cart=userData.cart;

        if(!cart){
            return res.status(400).json({message:"No Cart Exists."});
        }

        userData.cart=[];

        await userData.save();

        return res.status(200).json({message:"Cart CLear Successful"});

    }catch(error){
        console.error("Clear cart error: ",error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
        
};

module.exports={addToCart,removeFromCart,getCart, clearCart};