import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoHeart } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { BiCart } from "react-icons/bi";
import {toast} from 'react-toastify'


const BookCard = ({ bookDetail,favourite,setRefreshFav, manageBook,setRefreshManageBook, refreshmanageBook, home, userFavBooks, allBooks }) => {

    const BACKEND = import.meta.env.VITE_BACKEND_URL;

    const navigate=useNavigate();

    const [fav,setFav]=useState(true);

    const isLoggedIn=localStorage.getItem("isLoggedIn");

    

    const headers={
        bookid:bookDetail._id,
    }

    useEffect(()=>{

        if(userFavBooks && userFavBooks.includes(bookDetail._id)){
            setFav(true);
        }else{
            setFav(false);
        }

    },[bookDetail._id, userFavBooks]);


    const handleRemoveFav=async ()=>{
        try{
            const response=await axios.delete(`${BACKEND}/api/v1/favourites/${bookDetail._id}`, {withCredentials:true});
            if (typeof setRefreshFav === 'function') {
                setRefreshFav((prev) => !prev);
            }
            setFav(false);
            return toast.success(response.data.message);
            
        }catch(error){
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }
    }

    const handleDeleteBook=async ()=>{
        try{
            const response=await axios.delete(`${BACKEND}/api/v1/books/${bookDetail._id}`,{withCredentials:true});
            setRefreshManageBook((prev)=>!prev);
            return toast.success(response.data.message);
        }catch(error){
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }
    };

    const addToFav=async ()=>{
        try{
            if(!isLoggedIn){
                return toast.error("Please Login to add in favourites.");
            }
            const response=await axios.post(`${BACKEND}/api/v1/favourites/${bookDetail._id}`,{}, {withCredentials:true} );
            setFav(true);
            return toast.success(response.data.message);
        }catch(error){
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }
    }



    const handleEdit=()=>{
        navigate(`/profile/edit-book/${bookDetail._id}`);
    };

    

    const addToCart=async ()=>{
        if(!isLoggedIn){
            return toast.error("Please Login to Add to Cart.");
        }
        try{
            const response=await axios.post(`${BACKEND}/api/v1/cart/${bookDetail._id}`,{},{headers,withCredentials:true});
            return toast.success(response.data.message);
        }catch(error){
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }
    }


    return (
        <div className="book-card  rounded-2xl  border-[0.8px] border-zinc-500 hover:border-amber-100 active:border-amber-100  px-2 pt-8 pb-4 m-4 flex flex-col bg-zinc-800 items-center gap-2 text-white overflow-hidden transition-all duration-200 ease-in-out" >
            <Link to={`/view-book-details/${bookDetail._id}` }  className="active:scale-95">
            <div className="flex items-center justify-center px-4 "  >
                {/* v-4 */}
                <img src={bookDetail.bookImageUrl} alt={bookDetail.title} className=" rounded-2xl aspect-[3/4] w-[18vh] min-w-[110px] max-w-[180px] max-h-[240px]"/>
                {/* v-3 */}
                {/* <img src={bookDetail.bookImageUrl} alt={bookDetail.title} className="max-[450px]:shadow-[0_16px_60px_3px_rgba(253,230,138,0.4)] shadow-[0_16px_80px_3px_rgba(253,230,138,0.4)]  rounded-2xl  w-[20vh] sm:w-[20vh]  md:w-[20vh]  lg:w-[20vh] aspect-[3/4]  min-[200px]:min-w-[150px]"/> */}
                {/* v-2 */}
                {/* <img src={bookDetail.bookImageUrl} alt={bookDetail.title} className="max-[450px]:shadow-[0_16px_60px_3px_rgba(253,230,138,0.4)] shadow-[0_16px_80px_3px_rgba(253,230,138,0.4)]  rounded-2xl h-[30vh] w-[20vh] sm:w-[20vh] sm:h-[30vh] md:w-[20vh] md:h-[30vh] lg:w-[20vh] lg:h-[30vh] max-h-[250px]"/> */}
                {/* v-1 */}
                {/* <img src={bookDetail.bookImageUrl} alt={bookDetail.title} className="max-[450px]:shadow-[0_16px_60px_3px_rgba(253,230,138,0.4)] shadow-[0_16px_80px_3px_rgba(253,230,138,0.4)]  rounded-2xl  w-[20vh] sm:w-[25vh]  lg:w-[30vh] aspect-[3/4] "/> */}
            </div>
            <div className="flex flex-col items-center px-2 py-2">
                <h2 className="text-center text-wrap sm:text-xl font-semibold max-h-[56px] truncate line-clamp-2">{bookDetail.title}</h2>
                <p className="text-center text-zinc-200  italic">{bookDetail.author}</p>
            </div>
            {/* <div className="flex flex-col items-center justify-center text-center px-2">
                <p className="line-clamp-2 md:line-clamp-3 text-pretty px-12 lg:px-4  text-zinc-300">{bookDetail.desc}</p>
            </div> */}
            <div className="flex flex-row justify-center gap-x-8 w-full flex-wrap px-2">
                <p className=" text-amber-100 font-semibold italic">₹{bookDetail.price}</p>
                <p className="italic">{bookDetail.category}</p>
            </div>
            </Link>

            { home && <div className="flex flex-row flex-wrap w-full items-center justify-center  gap-y-2 gap-x-5 px-4">
                <button className=" text-4xl text-center active:scale-95 hover:text-amber-100 cursor-pointer hover:font-bold w-fit transition-all duration-200  ease-in-out hover:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] active:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] text-amber-100" onClick={()=>{fav? handleRemoveFav():addToFav()}}>{fav? <IoHeart className="text-amber-100"/> : <IoHeartOutline/>}</button>
                <button className="text-4xl  text-center  hover:text-amber-100 active:text-amber-100 active:scale-95 cursor-pointer w-fit transition-all duration-200  ease-in-out hover:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] active:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] text-amber-100" onClick={addToCart}><BiCart /></button>
            </div> }

            {allBooks && <div className="flex flex-row flex-wrap w-full items-center justify-center  gap-y-2 gap-x-5 px-4">
                <button className="text-4xl text-center active:scale-95 hover:text-amber-100 cursor-pointer hover:font-bold w-fit transition-all duration-200  ease-in-out hover:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] active:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] text-amber-100" onClick={()=>{fav? handleRemoveFav():addToFav()}}>{fav? <IoHeart className="text-amber-100"/> : <IoHeartOutline/>}</button>
                <button className="text-4xl  text-center  hover:text-amber-100 active:text-amber-100 active:scale-95 cursor-pointer w-fit transition-all duration-200  ease-in-out hover:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] active:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] text-amber-100" onClick={addToCart}><BiCart className="" /></button>
            </div> }

            {favourite && <div className="flex flex-row flex-wrap w-full gap-y-2 gap-x-5  px-4 items-center justify-center ">
                <button className="text-4xl  text-center  hover:text-amber-100 active:text-amber-100 active:scale-95 cursor-pointer w-fit transition-all duration-200  ease-in-out hover:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] active:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] text-amber-100" onClick={handleRemoveFav}>{fav? <IoHeart className="" />: <IoHeartOutline/>}</button>
                <button className="text-4xl  text-center  hover:text-amber-100 active:text-amber-100 active:scale-95 cursor-pointer w-fit transition-all duration-200  ease-in-out hover:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] active:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] text-amber-100" onClick={addToCart}><BiCart /></button> 
            </div> }

            {manageBook && <div className="flex flex-row flex-wrap items-center justify-center  gap-6 mt-2 px-4">
                
                <button className="border-amber-100 border-[0.8px] px-2 py-2 rounded-xl hover:shadow-[0px_0px_6px_rgba(253,230,138,0.5)] active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:scale-95 transition-all duration-200 ease-in-out cursor-pointer" onClick={handleDeleteBook}>
                    <RiDeleteBinLine className="p-0 m-0  text-amber-100 hover:text-amber-100 active:text-amber-100" />
                   
                </button>
                <button className="border-amber-100 border-[0.8px] px-2 py-2 rounded-xl hover:shadow-[0px_0px_6px_rgba(253,230,138,0.5)] active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:scale-95 transition-all duration-200 ease-in-out cursor-pointer" onClick={handleEdit}>
                    
                    <FiEdit2 className="p-0 m-0  text-amber-100  hover:text-amber-100 active:text-amber-100" />
                    
                </button>
                
            </div> }
            <Link to={`/view-book-details/${bookDetail._id}`} className="mt-2 text-amber-100 underline hover:font-semibold active:font-semibold active:scale-95 ">View Details</Link>
        </div>

    );
};

export default BookCard;

