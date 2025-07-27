import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";



const Filters = ({ searchParams, setSearchParams, isReset }) => {
const Catregories = ["Sci-Fi", "Romance", "Thriller", "Self-Help", "Biography"];

const [categorySelected,setCategorySelected]=useState(false);
const [showFilter,setShowFilter]=useState(false);

const handleCategory = (category) => {

    if(isReset){
        searchParams.delete("category");
        setShowFilter((prev)=>!prev);
    }
    
    if (category) {
    searchParams.set("category", category);
    
    
    } else {
    searchParams.delete("category");
    
    }
    setSearchParams(searchParams);
    setShowFilter(false);
};

const selectedCategory = searchParams.get("category") || "";

const handleShowFilter=()=>{
    setShowFilter((prev)=>!prev);
};




return (
    <div className="flex flex-col justify-center items-center cursor-pointer relative w-fit h-fit" id="genre-button" >
        <div className="flex items-center gap-2   w-fit h-fit border-[0.8px] border-zinc-500 hover:border-amber-100 hover:text-amber-100 hover:bg-zinc-800 px-2 py-1 rounded-xl cursor-pointer active:border-amber-100 active:text-amber-100 active:bg-zinc-800 active:scale-95 transition-all duration-200 ease-in-out" onClick={handleShowFilter}>
            <span>Genre</span>
            <span><MdKeyboardArrowDown/></span>
        </div>
        <div className={showFilter ? "absolute top-9 left-[-50px]  w-[200px] sm:w-[300px]":"hidden"}>
            <div className="filter-genre-component my-2 bg-zinc-800 flex flex-col justify-center items-center px-4 sm:px-8 py-4 rounded-2xl w-full mt-2">
                <h2 className="text-xl text-center text-wrap ">Category</h2>
                <div className="flex justify-center items-center flex-wrap gap-1 w-full">
                    {Catregories.map((g,i) => (
                        <div key={i} className="">
                        <input
                            id={`category${i}`}
                            type="radio"
                            name="category"
                            value={g}
                            checked={selectedCategory === g}
                            onChange={() => handleCategory(g)}
                            className=" appearance-none"
                        />
                        <label htmlFor={`category${i}`} className="ml-2">
                            <div className={`border-[0.5px] px-2 py-1 rounded-xl cursor-pointer transition-all duration-200 ease-in-out ${
                                    selectedCategory === g
                                    ? "bg-amber-100 text-black border-amber-100 border-[0.5px] px-2 py-1 rounded-xl cursor-pointer font-semibold"
                                    : "border-zinc-500 bg-zinc-900 hover:bg-zinc-800 hover:text-amber-100 hover:border-amber-100 active:bg-zinc-800 active:text-amber-100 active:border-amber-100 active:scale-95 px-2 py-1"
                                }`}
                                onClick={() => handleCategory(g)}>
                                {g}
                            </div>
                        </label>
                    </div>))}
                </div>
                <button
                    onClick={() => handleCategory("")}
                    className="border-[0.8px] border-zinc-500 hover:border-amber-100 hover:text-amber-100 hover:bg-zinc-800 px-2 py-1 rounded-xl cursor-pointer active:border-amber-100 active:text-amber-100 active:bg-zinc-800 active:scale-95 transition-all duration-200 ease-in-out mt-4 bg-zinc-900"
                    >
                    Reset
                </button>
            </div>
        </div>
       
    </div>
    
);
};

export default Filters;
