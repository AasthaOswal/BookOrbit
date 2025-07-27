import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const SortMenu = ({ searchParams, setSearchParams, isReset }) => {

    const [showSort,setShowSort]=useState(false);
    
    const handleSort = (sort) => {
        if(isReset){
            searchParams.delete("sort");
            setShowSort((prev)=>!prev);
        }
        if (sort) {
        searchParams.set("sort", sort);
        setShowSort(false);
        } else {
        searchParams.delete("sort");
        setShowSort(false);
        }
        setSearchParams(searchParams);
        setShowSort(false);
    };

    const selectedSort = searchParams.get("sort") || "";

    const handleShowSort=()=>{
        setShowSort((prev)=>!prev);
    };



    return (
        
        <div className="flex items-center cursor-pointer relative w-fit h-fit " id="sort-button" >
            <div className={showSort? " absolute top-7 -left-7 sm:left-[-100px]  sm:w-[300px]":"hidden"}>
                <div className="sort-component bg-zinc-800 flex flex-col justify-center items-center px-8 py-4 rounded-2xl mt-4">
                    <h2 className="text-center text-wrap mb-2">Sort By Price</h2>
                    <div className="flex flex-wrap justify-center items-center text-center gap-3">
                        <button
                        onClick={() => handleSort("")}
                        className={`px-2 py-1 rounded-xl border text-wrap  transition ${
                            selectedSort === ""
                            ? "bg-amber-100 text-black border-none"
                            : "bg-zinc-900 text-white border-[0.5px] border-zinc-600 hover:text-amber-100 hover:bg-zinc-800 hover:border-amber-100"
                        }`}
                        >
                        Default
                        </button>

                        <button
                        onClick={() => handleSort("price_asc")}
                        className={`px-2 py-1 rounded-xl border text-wrap  transition ${
                            selectedSort === "price_asc"
                            ? "bg-amber-100 text-black border-none"
                            : "bg-zinc-900 text-white border-[0.5px] border-zinc-600 hover:text-amber-100 hover:bg-zinc-800 hover:border-amber-100"
                        }`}
                        >
                        Low to High
                        </button>

                        <button
                        onClick={() => handleSort("price_desc")}
                        className={`px-2 py-1 rounded-xl border text-wrap  transition ${
                            selectedSort === "price_desc"
                            ? "bg-amber-100 text-black border-none"
                            : "bg-zinc-900 text-white border-[0.5px] border-zinc-600 hover:text-amber-100 hover:bg-zinc-800 hover:border-amber-100"
                        }`}
                        >
                        High to Low
                        </button>
                    </div>
                    </div>

            </div>
            <div className="flex items-center gap-2  relative w-fit h-fit border-[0.8px] border-zinc-500 hover:border-amber-100 hover:text-amber-100 hover:bg-zinc-800  rounded-xl cursor-pointer active:border-amber-100 active:text-amber-100 active:bg-zinc-800 active:scale-95 transition-all duration-200 ease-in-out px-2 py-1" onClick={handleShowSort}>
                <span>Sort</span>
                <span><MdKeyboardArrowDown/></span>
            </div>
        </div>

        
    );
};

export default SortMenu;
