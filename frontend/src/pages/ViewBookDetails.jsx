import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { GrLanguage } from "react-icons/gr";
import { CiShoppingCart } from "react-icons/ci";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import axios from "axios";
import {toast} from "react-toastify"
import SimpleLoader from "../components/Loader/SimpleLoader";
import { BiCart } from "react-icons/bi";



const ViewBookDetails=()=>{

    const BACKEND = import.meta.env.VITE_BACKEND_URL;

    const { id } = useParams();

    const [bookDetails,setBookDetails]=useState();

    const [userFavBooks,setuserFavBooks]=useState();
    const [isFav,setIsFav]=useState(false);

    const isLoggedIn=localStorage.getItem("isLoggedIn");
    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const getBookDetails=async ()=>{
        try{
            const response=await axios.get(`${BACKEND}/api/v1/books/${id}`);
            // console.log(response.data.bookData);
            setBookDetails(response.data.bookData);
        }catch(error){
            // console.log(error);
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }
    }
    const getUserDetails=async ()=>{
        try{
            const response=await axios.get(`${BACKEND}/api/v1/users/me`,{withCredentials:true});
            // console.log(response.data.userData.favourite);
            setuserFavBooks(response.data.userData.favourite);
        }catch(error){
            // console.log(error);
        }
    }

    useEffect(()=>{
        getUserDetails();
        getBookDetails();
    },[]);

    useEffect(()=>{
        if (bookDetails && userFavBooks) {
            if(userFavBooks.includes(bookDetails._id)){
                setIsFav(true);
            } else {
                setIsFav(false);
            }
        }
    }, [bookDetails, userFavBooks]);


    const headers={
        bookid:id,
    }

    const addToCart=async ()=>{
        if(!isLoggedIn){
            return toast.error("Please Log in to add in cart.");
        }
        const promise=axios.post(`${BACKEND}/api/v1/cart/${bookDetails._id}`,{},{headers,withCredentials:true});
            
        
        toast.promise(promise, {pending: "Almost done! Please wait...",})
            .then((response) => {
                toast.success(response.data.message);     
            })
            .catch((error) => {
                toast.error("Error Occured, Please Check Internet or Try Again Later.");
            }
        );
    }

    const addToFav=async ()=>{
        if(!isLoggedIn){
            return toast.error("Please Log in to add in favourites.");
        }
       
        const promise=axios.post(`${BACKEND}/api/v1/favourites/${id}`,{}, {headers,withCredentials:true} );
        
        toast.promise(promise, {pending: "Almost done! Please wait...",})
            .then((response) => {
                setIsFav(true);
                toast.success(response.data.message);     
            })
            .catch((error) => {
                toast.error("Error Occured, Please Check Internet or Try Again Later.");
            }
        );
    }

    const handleRemoveFav=async ()=>{
        
        const promise=axios.delete(`${BACKEND}/api/v1/favourites/${bookDetails._id}`, {withCredentials:true});
            
        toast.promise(promise, {pending: "Almost done! Please wait...",})
            .then((response) => {
                setIsFav(false);
                toast.success(response.data.message);     
            })
            .catch((error) => {
                toast.error("Error Occured, Please Check Internet or Try Again Later.");
            }
        );
        
    }

    return (
        <>
        {!bookDetails && <><div className="h-screen w-screen"><SimpleLoader/></div></> }
        {bookDetails && (
            <div className="py-12 px-6 sm:px-12 flex flex-col lg:flex-row min-h-screen bg-zinc-900 text-white justify-center items-center gap-12 text-center"> 
            <div className="bg-zinc-800 rounded-2xl py-8 sm:mb-0 flex flex-col justify-center items-center  overflow-hidden">
                <img src={bookDetails.bookImageUrl} className=" w-3/4 rounded-2xl" alt="" />
            </div>
            <div className="flex flex-col justify-center items-center w-full  lg:w-3/5 " >
                <h2 className="text-2xl  md:text-3xl w-11/12  xl:text-4xl text-bold">{bookDetails.title} </h2>
                <p className="italic text-zinc-300 mt-2">{bookDetails.author} </p>
                <div className="flex flex-row items-center justify-center w-11/12 flex-wrap gap-x-4 gap-y-2 mb-4 mt-8">

                    <div className="flex items-center justify-center gap-x-8 flex-wrap w-full">
                        <button className="vsible sm:hidden text-5xl text-center active:scale-95 hover:text-amber-100 cursor-pointer hover:font-bold w-fit transition-all duration-200  ease-in-out hover:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] active:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] text-amber-100" onClick={()=>{isFav? handleRemoveFav():addToFav()}}>{isFav? <IoHeart className="text-amber-100"/> : <IoHeartOutline/>}</button>
                        <button className="vsible sm:hidden text-5xl  text-center  hover:text-amber-100 active:text-amber-100 active:scale-95 cursor-pointer w-fit transition-all duration-200  ease-in-out hover:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] active:drop-shadow-[0_2px_6px_rgba(253,230,138,0.5)] text-amber-100" onClick={addToCart}><BiCart className="" /></button>
                    </div>
                
                    {isFav ? 
                        <button className="hidden sm:flex text-center  justify-center items-center mt-4 border-[0.8px] border-white px-4 py-2 rounded-2xl  active:scale-95   cursor-pointer transition-all duration-200 ease-in-out hover:bg-zinc-800 hover:text-amber-100 hover:border-amber-100 active:bg-zinc-800 active:text-amber-100 active:border-amber-100 font-semibold" onClick={handleRemoveFav}>
                            <IoHeart className="text-2xl"/>
                            <p>Already In Favourites</p>
                            
                        </button>
                        
                        : 
                        <button className="hidden sm:flex text-center  justify-center items-center mt-4 border-[0.8px] border-white px-4 py-2 rounded-2xl  active:scale-95   cursor-pointer transition-all duration-200 ease-in-out hover:bg-zinc-800 hover:text-amber-100 hover:border-amber-100 active:bg-zinc-800 active:text-amber-100 active:border-amber-100 font-semibold" onClick={addToFav}>
                            <div className="cursor-pointer flex gap-2 items-center" >
                                <IoHeartOutline className="text-2xl "/>
                                <p>Add To Favourites</p>
                            </div>
                        </button>
                    }
                    <button className=" hidden sm:flex text-center  justify-center items-center mt-4 border-[0.8px] border-white px-4 py-2 rounded-2xl  active:scale-95   cursor-pointer transition-all duration-200 ease-in-out hover:bg-zinc-800 hover:text-amber-100 hover:border-amber-100 active:bg-zinc-800 active:text-amber-100 active:border-amber-100 font-semibold" onClick={addToCart}>
                        <div className="cursor-pointer flex gap-2 items-center" >
                            <CiShoppingCart className="text-2xl " />
                            <p>Add to Cart</p>
                        </div>
                    </button>
                </div>
                <div className="mb-4 mt-4 flex flex-row flex-wrap  justify-around md:justify-center gap-x-4  sm:gap-x-8 gap-y-4 items-center  w-full border-amber-100">
                    <p className="flex flex-row items-center gap-2"><GrLanguage /> {bookDetails.language} </p>
                    <p className="flex flex-row text-amber-100 font-semibold">₹{bookDetails.price} </p>
                    <p className="flex flex-row items-center gap-2 italic"><BiCategory /> {bookDetails.category} </p>
                </div>
                <p className="text-justify mb-4 w-full sm:w-11/12 ">{bookDetails.desc} </p>
                
            </div>
        </div>
        )}
        </>
    )
}

export default ViewBookDetails;