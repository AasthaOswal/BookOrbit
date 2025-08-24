import { useState,useEffect } from "react";
import axios from 'axios';
import CardSlider from "../CardSlider/CardSlider";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import SimpleLoader from '../Loader/SimpleLoader'
import { toast } from "react-toastify";



const CategoryBooks2=()=>{

    const BACKEND = import.meta.env.VITE_BACKEND_URL;

    const [Books,setBooks]=useState([]);
    const [selfHelpBooks,setSelfHelpBooks]=useState();
    const [romaceBooks,setRomanceBooks]=useState();
    const [userFav,setUserFav]=useState();

    const navigate=useNavigate();

    const handleBooks=async ()=>{
        try {
            const response=await axios.get(`${BACKEND}/api/v1/books/recent`);
            setBooks(response.data.bookData);
        } catch (error) {
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }
    }

    useEffect(()=>{
        handleBooks();

    },[]);

    

    const getUserDetails=async ()=>{
        try {
            const response=await axios.get(`${BACKEND}/api/v1/users/me`, {withCredentials:true});
            setUserFav(response.data.userData.favourite);
        } catch (error) {
            // console.log(error);
        }
    }

    useEffect(()=>{
        getUserDetails();
    },[]);

    const getSelfHelpBooks=async ()=>{
        try {
            const response=await axios.get(`${BACKEND}/api/v1/books/?category=Self-Help`);
            setSelfHelpBooks(response.data.books);
        } catch (error) {
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }
    }

    const getRomanceBooks=async ()=>{
        try {
            const response=await axios.get(`${BACKEND}/api/v1/books/?category=Romance`);
            setRomanceBooks(response.data.books);
        } catch (error) {
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }
    }

    useEffect(()=>{
        getSelfHelpBooks();
        getRomanceBooks();
    },[]);

    

    

    return ( 
        <>
            <div className=" my-16 max-w-screen flex-col justify-center items-center">
                {/* <h2 className="text-xl text-center md:text-2xl font-bold mb-4 text-amber-100">Popular Genres</h2> */}
                
                {/* <div className="cards-container">
                    <div className="cards-wrapper">
                        {Books.slice(0, 4).map((book, i) => (
                        <BookCard key={i} bookDetail={book} home={true} userFavBooks={userFav}/>
                        ))}
                    </div>
                </div> */}
                
            
                <h1 className="text-xl text-center md:text-2xl font-bold my-4 text-white">
                    <div className="flex flex-wrap flex-grow sm:flex-row gap-x-2 text-center items-center justify-center mb-12">
                        <span className="text-center">Popular Genres: </span> 
                        <span className="text-amber-100 italic text-center">Romance Books</span>
                    </div>
                </h1>
                {!selfHelpBooks && <><SimpleLoader/></>  }
                {romaceBooks && romaceBooks.length===0 && <p  className="text-center">No Books Found</p> } 
                {romaceBooks && romaceBooks.length>0 && <>
                    <div className="w-full  flex flex-col md:flex-row items-center justify-between">
                        <CardSlider Books={romaceBooks} home={true} userFavBooks={userFav}/>
                        <div className="md:w-3/5 lg:w-4/5 xl:w-10/12 2xl:w-11/12 md:pl-10 flex flex-col justify-center gap-y-8 items-center mt-12 md:mt-0">
                            <p className="text-justify">Explore heartwarming tales of love, connection, and passion in this collection of Romance books. From timeless classics to modern love stories, these books are perfect for anyone who enjoys stories that tug at the heartstrings.</p>
                            <button className="flex  items-center justify-center  gap-x-2 px-4 py-2 border-zinc-500  hover:bg-zinc-800 active:bg-zinc-800  border-[0.8px] hover:border-amber-100 active:border-amber-100 rounded-2xl active:scale-95 active:text-amber-100 hover:text-amber-100 cursor-pointer transition-all duration-300 ease-in-out font-semibold" onClick={()=>navigate("/all-books?category=Romance")}>
                                <span>More Romance Books</span>
                                <span><FaArrowRightLong className="text-xl" /></span>
                                
                            </button> 
                        </div>
                    </div>
                </>}

                
                
                <h1 className="text-xl text-center md:text-2xl font-bold my-4 text-white">
                    <div className="flex flex-wrap flex-grow sm:flex-row gap-x-2 text-center items-center justify-center mb-12">
                        <span className="text-center">Popular Genres: </span> 
                        <span className="text-amber-100 italic text-center">Self-Help Books</span>
                    </div>
                </h1>
                {!selfHelpBooks && <><SimpleLoader/></>  }
                {selfHelpBooks && selfHelpBooks.length===0 && <p  className="text-center">No Books Found</p> }
                {selfHelpBooks && selfHelpBooks.length>0 && <>
                    <div className="w-full  flex flex-col-reverse md:flex-row items-center justify-between">
                        <div className="md:w-3/5 lg:w-4/5 xl:w-10/12 2xl:w-11/12 md:pr-10 flex flex-col justify-center gap-y-8 items-center mt-12 md:mt-0">
                            <p className="text-justify">Discover the power of personal growth and transformation with these inspiring Self-Help books. Whether you're looking to boost productivity, improve your mindset, or find motivation, these reads offer practical advice and proven strategies.</p>
                            <button className="flex  items-center justify-center  gap-x-2 px-4 py-2 border-zinc-500  hover:bg-zinc-800 active:bg-zinc-800  border-[0.8px] hover:border-amber-100 active:border-amber-100 rounded-2xl active:scale-95 active:text-amber-100 hover:text-amber-100 cursor-pointer transition-all duration-300 ease-in-out font-semibold" onClick={()=>navigate("/all-books?category=Self-Help")}>
                                <span>More Self-Help Books</span>
                                <span><FaArrowRightLong className="text-xl" /></span>
                                
                            </button> 
                        </div>
                        <CardSlider Books={selfHelpBooks} home={true} userFavBooks={userFav}/>
                    </div>
                </>  }
                

                
            
            </div>

        </>
    )
}

export default CategoryBooks2;