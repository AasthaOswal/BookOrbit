import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import SearchBar from "../AllBooks/SearchBar";
import { useSearchParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { MdOutlineExplore } from "react-icons/md";




const Hero=()=>{
    const navigate=useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchBooks, setSearchBooks] = useState([]);
    const [total, setTotal] = useState(0);

    
    return (
        <>
        <div className="w-full h-auto flex flex-col items-center justify-center md:hidden">
            <div className=" flex items-center justify-center  ">
                <img src="./books2.png" alt="book_image" className=" w-2/3 "/>
            </div>
            <div className="flex flex-col items-center justify-center mt-8 gap-4">
                <h1 className=" text-amber-100 font-semibold text-center  text-3xl ">Discover Your Next Favorite Book!</h1>
                <p className="text-center  ">Explore a wide range of books, save your favourites, and order with ease — all in one place.</p>

                {/* search Feature */}
                <div className="flex flex-row items-center w-full justify-center mt-4">
                    <SearchBar searchParams={searchParams} setSearchParams={setSearchParams} heroComponent={true} />
                </div>


                
                <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                    <button className="flex  items-center justify-center  gap-x-2 px-4 py-2 border-zinc-500  hover:bg-zinc-800 active:bg-zinc-800  border-[0.8px] hover:border-amber-100 active:border-amber-100 rounded-2xl active:scale-95 active:text-amber-100 hover:text-amber-100 cursor-pointer transition-all duration-300 ease-in-out " >
                        <span className="text-xl"><MdOutlineExplore/></span>
                        <span>All-Books</span>
                    </button> 
                    <span className="flex items-center text-amber-100 justify-center  gap-x-2 px-4 py-2 border-amber-100 border-[0.8px] rounded-2xl active:scale-95 hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] cursor-pointer transition-all duration-200 ease font-semibold">
                        <span className="text-amber-100 ">Signup</span>
                        <span><FaArrowRightLong className="text-xl text-amber-100" /></span>
                    </span>

                </div>

                
            </div>
            
        </div>
        <p className="text-sm text-center text-zinc-400 mt-8 w-full md:hidden">
                Powered by free-tier services. You might notice slight delays — thanks for your patience and support!
        </p>

        <div className="w-full h-auto  hidden md:flex flex-row items-center justify-between xl:justify-around  gap-x-12">
            
            <div className="flex flex-col items-center justify-center  gap-4 ">

                <h1 className="text-amber-100 font-semibold text-center text-xl  lg:text-3xl ">Discover Your Next Favorite Book!</h1>
                <p className="text-center mb-4">Explore a wide range of books, save your favourites, and order with ease — all in one place.</p>


                {/* search Feature */}
                <SearchBar searchParams={searchParams} setSearchParams={setSearchParams} heroComponent={true} />
                
                
                

                
                
                <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                    <button className="flex  items-center justify-center  gap-x-2 px-4 py-2 border-zinc-500  hover:bg-zinc-800 active:bg-zinc-800  border-[0.8px] hover:border-amber-100 active:border-amber-100 rounded-2xl active:scale-95 active:text-amber-100 hover:text-amber-100 cursor-pointer transition-all duration-300 ease-in-out " >
                        <span className="text-xl"><MdOutlineExplore/></span>
                        <span>All-Books</span>
                    </button> 
                    <span className="flex items-center text-amber-100 justify-center  gap-x-2 px-4 py-2 border-amber-100 border-[0.8px] rounded-2xl active:scale-95 hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] cursor-pointer transition-all duration-200 ease font-semibold">
                        <span className="text-amber-100 ">Signup</span>
                        <span><FaArrowRightLong className="text-xl text-amber-100" /></span>
                    </span>


                </div>

                
                
            </div>

            {/* <div className=" flex items-center justify-end py-2 px-2 mt-4 w-2/5 md:w-1/2 ">
                
            </div> */}

            <img src="/books2.png" alt="book_image" className="w-1/2 md:w-2/5 lg:w-[35%] xl:w-4/12 2xl:w-3/12 aspect-square "/>
            
        </div>

        <p className="text-sm text-center text-zinc-400 mt-8 w-full hidden md:block">
            Powered by free-tier services. You might notice slight delays — thanks for your patience and support!
        </p>
        </>
    )
}

export default Hero;