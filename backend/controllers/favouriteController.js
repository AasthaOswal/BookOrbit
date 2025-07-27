const User=require('../models/user');
const Book=require('../models/book');
require('dotenv').config();
const isDev = process.env.NODE_ENV === 'development';

const addToFav=async (req,res)=>{
    try{
        const userId=req.user.id;
        const bookId=req.params.bookid;

        const userData=await User.findById(userId);

        const bookData=await Book.findById(bookId);

        if(!userData){
            return res.status(404).json({message:"User not Found."});
        }

        if(!bookData){
            return res.status(404).json({message:"Book not Found."});
        }

        const isBookInFav=userData.favourite.includes(bookId);

        if(isBookInFav){
            return res.status(200).json({message:"Book already in Favourites!."});
        }

        await User.findByIdAndUpdate(userId,{$push:{favourite:bookId}},{new:true});
        return res.status(200).json({message:"Book added to Favourites!."});

    }catch (error) {
        console.error("Add To Fav Error: ", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

const removeFromFav=async (req,res)=>{
    try{
        const userId=req.user.id;
        const bookId=req.params.bookid;

        const userData=await User.findById(userId);

        const bookData=await Book.findById(bookId);

        if(!userData){
            return res.status(404).json({message:"User not Found."});
        }

        if(!bookData){
            return res.status(404).json({message:"Book not Found."});
        }

        const isBookInFav=userData.favourite.includes(bookId);

        if(!isBookInFav){
            return res.status(200).json({message:"Book not in Favourites, hence can't delete."});
        }

        await User.findByIdAndUpdate(userId,{$pull:{favourite:bookId}},{new:true});
        return res.status(200).json({message:"Book removed from Favourites!."});

    }catch (error) {
        console.error("Remove From Fav Error: ", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

const getFav=async (req,res)=>{
    try{
        const userId=req.user.id;

        const userData=await User.findById(userId).populate("favourite");

        if(!userData){
            return res.status(404).json({message:"User not Found."});
        }

        const favBooks=userData.favourite;

        return res.status(200).json({message:"Fav Books Fetch successful.", favouriteData:favBooks });
    }catch(error){
        console.error("Get Fav Error: ", error);
        return res.status(500).json({message:"Internal Server Error"});
    }



}

module.exports={addToFav,getFav,removeFromFav};