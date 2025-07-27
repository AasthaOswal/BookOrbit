import axios from "axios";
import { useState,useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
import SearchBar from "../AllBooks/SearchBar";
import Filters from "../AllBooks/Filters";
import SortMenu from "../AllBooks/SortMenu";
import SimpleLoader from "../Loader/SimpleLoader";
import { toast } from "react-toastify";

const ManageBook2=()=>{

    const BACKEND = import.meta.env.VITE_BACKEND_URL;

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchBooks, setSearchBooks] = useState();
    const [total, setTotal] = useState(0);
    const [allBooks,setAllBooks]=useState();
    const [userFav,setUserFav]=useState();
    const [isReset,setIsReset]=useState(false);
    const [refreshManageBook,setRefreshManageBook]=useState(false);

    

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);
    

    // too gett all books
    const handleAllBooks=async ()=>{
        try {
            const response=await axios.get(`${BACKEND}/api/v1/book/get-all-books`);
            setAllBooks(response.data.allBooks);
        } catch (error) {
            // console.log(error);

        }
    }


    useEffect(()=>{
        handleAllBooks();
    },[]);

    // useEffect(()=>{
    //     handleAllBooks();
    // },[allBooks]);

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
        setIsReset((prev)=>!prev);
        searchParams.delete("category"); // Remove category param
        searchParams.delete("sort");     // If you also have sort param, remove it too (optional)
        setSearchParams(searchParams);   // Update URL Params
    };

    const getUserDetails=async ()=>{
        try {
            const response=await axios.get(`${BACKEND}/api/v1/users/me`, {withCredentials:true});
            // console.log(response.data.userData.favourite);
            setUserFav(response.data.userData.favourite);
            // console.log(userDetails);
        } catch (error) {
            // console.log(error);
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }
    }

    // to get details of favourite books
    useEffect(()=>{
        getUserDetails();
    },[]);

    // books connected with the search query, and all-books too fetched from here
    const fetchBooks = async () => {
        try {
            const queryString = searchParams.toString();
            const res = await axios.get(
            `${BACKEND}/api/v1/books/?${queryString}`);
            // console.log(queryString);
            // console.log(res);
            setSearchBooks(res.data.books);
            setTotal(res.data.total);
        } catch (error) {
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }

    };

    useEffect(() => {
        fetchBooks();
    }, [searchParams]);

    useEffect(()=>{
        fetchBooks();
    },[]);

    useEffect(()=>{
        fetchBooks();
    },[refreshManageBook]);

    return (
        <div className="bg-zinc-900 text-white flex justify-center min-h-screen sm:pr-12 md:px-12 w-full   ">
            
            <div className="w-full">
                <div className="flex gap-2 items-center justify-center w-full ">
                    <h1 className="text-center text-2xl mb-8">Manage Books</h1>
                </div>
                <SearchBar searchParams={searchParams} setSearchParams={setSearchParams} />

                <div className="filters-wrapper flex justify-center items-center m-4 gap-4 flex-wrap">
                    <Filters searchParams={searchParams} setSearchParams={setSearchParams} isReset={isReset} />
                    <SortMenu searchParams={searchParams} setSearchParams={setSearchParams} isReset={isReset}  />
                    <button className="border-1 border-zinc-600 hover:border-amber-100 hover:text-amber-100 hover:bg-zinc-800 px-2 py-2 rounded-xl cursor-pointer" onClick={handleReset}>Reset Filters</button>
                </div>

                {!searchBooks && <><SimpleLoader/></>}

                {searchBooks && searchBooks.length===0 && <div className="bg-zinc-800 px-12 py-6 rounded-2xl w-fit flex flex-col justify-center items-center mx-auto">
                    <p>No Books Found</p>
                    <button className="px-4 py-2 rounded-2xl border-[0.8px] border-zinc-600 bg-zinc-900">Request Book</button>
                </div> }

                
                {searchBooks && searchBooks.length>0 && <>
                    <div className=" book-card-container mt-8 grid max-[560px]:grid-cols-1  grid-cols-2   xl:grid-cols-3 2xl:grid-cols-4  gap-4">
                        
                        { searchBooks.map((book,i)=> <BookCard bookDetail={book} key={i}  manageBook={true} refreshManageBook={refreshManageBook} setRefreshManageBook={setRefreshManageBook}/>) }
                    </div>
                </>}
            </div>
        </div>
    )
}

export default ManageBook2;