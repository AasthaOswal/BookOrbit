import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from '../BookCard/BookCard'
import SimpleLoader from "../Loader/SimpleLoader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Favourite=()=>{

    const BACKEND = import.meta.env.VITE_BACKEND_URL;

    const navigate=useNavigate();

    const [favBooks,setFavBooks]=useState();
    const [refreshFav,setRefreshFav]=useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const getFavBooks=async ()=>{
        try {
            const response=await axios.get(`${BACKEND}/api/v1/favourites/`, {withCredentials:true});
            setFavBooks(response.data.favouriteData);
        } catch (error) {
            // console.log(error);
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }
    };
    



    useEffect(()=>{
        getFavBooks();
    },[refreshFav]);

    const [userFav,setUserFav]=useState();

    const getUserDetails=async ()=>{
        try {
            const response=await axios.get(`${BACKEND}/api/v1/users/me`, {withCredentials:true});
            // console.log(response.data.userData.favourite);
            setUserFav(response.data.userData.favourite);
            // console.log(userDetails);
        } catch (error) {
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }
    }
    


    useEffect(()=>{
        getUserDetails();
    },[]);

    return (
        <div className="sm:pr-12 md:px-12 w-full">
            <h2 className="text-white text-2xl text-center mb-8">Favourites</h2>
            {!favBooks && <div className="h-full w-full"><SimpleLoader/></div> }
            {favBooks && favBooks.length === 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-center w-full text-center text-white gap-4 py-10">

                    <img src="/heartSVG.svg" alt="No favourites" className="w-28 h-28" />

                    <div className="w-fit h-auto flex flex-col justify-center items-center gap-y-4">
                        <h2 className="text-xl text-amber-100 font-semibold">No Favourites Yet</h2>
                        <p className="text-sm text-white italic text-justify">Add books to your favourites list.</p>

                        <button
                            className="flex items-center justify-center gap-x-2 px-4 py-2 border-zinc-500 hover:bg-zinc-800 active:bg-zinc-800 border-[0.8px] hover:border-amber-100 active:border-amber-100 rounded-2xl active:scale-95 active:text-amber-100 hover:text-amber-100 cursor-pointer transition-all duration-300 ease-in-out"
                            onClick={() => navigate("/all-books")}
                        >
                            <span>Browse Books</span>
                            <span className="text-xl">
                            <FaArrowRightLong />
                            </span>
                        </button>
                    </div>

                </div>
            )}

            <div className="grid max-[560px]:grid-cols-1 grid-cols-2   xl:grid-cols-3 2xl:grid-cols-4 ">
                
                { favBooks && favBooks.map((item,i)=><BookCard bookDetail={item} key={i} favourite={true} userFavBooks={userFav} setRefreshFav={setRefreshFav} /> )}
            </div>
        </div>
    )
}

export default Favourite;