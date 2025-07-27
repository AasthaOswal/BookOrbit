import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard/BookCard";
import SearchBar from "../components/AllBooks/SearchBar";
import Filters from "../components/AllBooks/Filters";
import SortMenu from "../components/AllBooks/SortMenu";
import SimpleLoader from "../components/Loader/SimpleLoader";
import { toast } from "react-toastify";
import { FaArrowRightLong } from "react-icons/fa6";



const AllBooks=()=>{

    const BACKEND = import.meta.env.VITE_BACKEND_URL;

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchBooks, setSearchBooks] = useState();
   
    const [allBooks,setAllBooks]=useState();
    const [userFav,setUserFav]=useState();
    const [isReset,setIsReset]=useState(false);
    const [responseMsg,setResponseMsg]=useState();

    const navigate=useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);
    

    

    const handleGenreClick=()=>{
        setShowFilter((prev)=>!prev);
    };

    const handleSortClick=()=>{
        setShowSort((prev)=>!prev);
        // if(!showSort){
        //     setShowSort(true);
        // }
    };


    const handleReset = () => {
        setIsReset(true);
        searchParams.delete("query"); 
        searchParams.delete("category"); // Remove category param
        searchParams.delete("sort");     // If you also have sort param, remove it too (optional)
        setSearchParams(searchParams);   // Update URL Params
        setTimeout(() => setIsReset(false), 100);

    };

    const getUserDetails=async ()=>{
        try {
            const response=await axios.get(`${BACKEND}/api/v1/users/me`, {withCredentials:true});
        // console.log(response.data.userData.favourite);
            setUserFav(response.data.userData.favourite);
        // console.log(userDetails);
        } catch (error) {
            
        }
    }

    // to get details of favourite books
    useEffect(()=>{

        getUserDetails();
    },[]);



    const fetchBooks = async () => {
        try {
            setResponseMsg(""); // clear old message
            const queryString = searchParams.toString();
            const res = await axios.get(`${BACKEND}/api/v1/books/?${queryString}`);
            // console.log(res);
            

            setSearchBooks(res.data.books || []);  // Ensure fallback value
            if (res.data.message) {
                setResponseMsg(res.data.message);
            }
        } catch (error) {
            // console.error("Error fetching books:", error);
            setSearchBooks([]); // prevent infinite loader
            setResponseMsg(error.response?.data?.message);
            return toast.error("Error Occured, Please Check your input or Try Again Later.");
        }
    };

    useEffect(() => {
        fetchBooks();
        // console.log("searchParams changed:", searchParams.toString());
    }, [searchParams]);

    const handleGoToRequestBook=()=>{
        const isLoggedIn=localStorage.getItem("isLoggedIn");
        if(!isLoggedIn){
            return toast.error("Please Login To Request Book.");
        }else if(isLoggedIn === "true"){
            navigate("/profile/request-book");
        }else{
            return toast.error("Error Occured, Please Check Internet Or Try Again Later.");
        }
    }

    return (
        <div className="bg-zinc-900 text-white flex justify-center min-h-screen px-6  sm:px-12 py-12">
            
            <div className="w-full">
                <div className="flex gap-2 items-center justify-center w-full ">
                    
                </div>
                <SearchBar searchParams={searchParams} setSearchParams={setSearchParams} isReset={isReset} />

                <div className="filters-wrapper flex justify-center items-center m-4 gap-4 flex-wrap">
                    <Filters searchParams={searchParams} setSearchParams={setSearchParams} isReset={isReset} />
                    <SortMenu searchParams={searchParams} setSearchParams={setSearchParams} isReset={isReset}  />
                    <button className="border-[0.8px] border-zinc-500 hover:border-amber-100 hover:text-amber-100 hover:bg-zinc-800 px-2 py-1 rounded-xl cursor-pointer active:border-amber-100 active:text-amber-100 active:bg-zinc-800 active:scale-95 transition-all duration-200 ease-in-out" onClick={handleReset}>Reset Filters</button>
                </div>

                {searchBooks === undefined && <><SimpleLoader/></>}

                {searchBooks && searchBooks.length===0 && <div className=" px-12 py-6 rounded-2xl w-fit flex flex-col justify-center gap-4 items-center mx-auto mt-12 ">
                    {responseMsg && <p className="text-center text-red-300">{responseMsg}</p> }
                    { <p className="text-center text-amber-100">Book Not Found? Click below to request your desired book.</p> }
                    <button className="flex items-center justify-center w-fit gap-x-4 px-4 py-2 rounded-2xl border-[0.8px] border-zinc-500 bg-zinc-900 hover:border-amber-100 hover:text-amber-100 hover:bg-zinc-800 cursor-pointer  active:border-amber-100 active:text-amber-100 active:bg-zinc-800 active:scale-95 transition-all duration-200 ease-in-out" onClick={handleGoToRequestBook}> <span>Request Book</span> <FaArrowRightLong/> </button>
                </div> }

                
                {searchBooks && searchBooks.length>0 && <>
                    <h1 className="text-center text-3xl mt-12 mb-4">Books</h1>
                    <div className=" book-card-container grid max-[560px]:grid-cols-1  grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 gap-4 ">
                        
                        { searchBooks.map((book,i)=> <BookCard bookDetail={book} key={i} userFavBooks={userFav} allBooks={true}/>) }
                    </div>
                </>}
            </div>
        </div>
    )
}

export default AllBooks;