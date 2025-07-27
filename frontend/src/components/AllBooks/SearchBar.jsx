import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SearchBar = ({ searchParams, setSearchParams,heroComponent, isReset }) => {
    const [inputValue, setInputValue] = useState(searchParams.get("query") || "");
    const navigate=useNavigate();

    useEffect(() => {
        if (isReset===true) {
            setInputValue("");
            searchParams.delete("query");
            setSearchParams(searchParams);
        }
    }, [isReset]);

    
    const handleSearch = () => {
        if (inputValue.trim()) {
            searchParams.set("query", inputValue.trim());
        } else {
            searchParams.delete("query");
        }
        setSearchParams(searchParams);

        if (heroComponent) {
            navigate(`/all-books?query=${inputValue.trim()}`);
        }
    };

    // dynamic search?
    const handleChange=(e)=>{
        const value=e.target.value;
        setInputValue(value);
        if (value.trim()) {
        searchParams.set("query", value.trim());
        } else {
        searchParams.delete("query");
        }
        setSearchParams(searchParams);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
        handleSearch();
        }
    };

    return (
        // <div className="flex w-11/12 md:w-3/4 lg:w-2/4 mx-auto  items-center justify-around flex-row gap-4 border-[0.5px] rounded-xl py-2 px-4  border-white-100 hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] hover:border-amber-100 hover:text-amber-100 active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:border-amber-100 active:text-amber-100">
        // <div className="w-11/12">
        //     <input
        //     type="text"
        //     placeholder="Search books or authors"
        //     className="w-full outline-none border-r-[0.5px] border-r-amber-100  bg-transparent"
        //     value={inputValue}
        //     onChange={handleChange}
        //     onKeyDown={handleKeyDown}
        //     />
        // </div>
        // <div
        //     className="w-1/12 p-0 m-0 flex items-center justify-center cursor-pointer"
        //     onClick={handleSearch}
        // >
        //     <IoMdSearch className="scale-125 text-amber-100 text-xl hover:text-zinc-300 active:scale-110" />
        // </div>
        // </div>

        
        // <div className="flex w-11/12 md:w-3/4 lg:w-2/4 mx-auto h-fit items-center justify-around flex-row gap-4 border-[0.5px] rounded-xl py-2 px-4  border-white-100 hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] hover:border-amber-100 hover:text-amber-100 active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:border-amber-100 active:text-amber-100 transition-all 2s ease-out ">
        
        // <input
        // type="text"
        // placeholder="Search books or authors"
        // className="w-11/12 h-full  focus:border-amber-100 focus:border-2 "
        // value={inputValue}
        // onChange={handleChange}
        // onKeyDown={handleKeyDown}
        // />
    
        // <div
        //     className="w-1/12 p-0 m-0 flex items-center justify-center cursor-pointer z-1"
        //     onClick={handleSearch}
        // >
        //     <IoMdSearch className=" scale-125 text-amber-100 text-xl hover:text-zinc-300 active:scale-110" />
        // </div>
        // </div>

        <div className="flex items-center w-full md:w-10/12 lg:w-3/5 mx-auto justify-center gap-x-2 ">
            <input
                type="text"
                placeholder="Search books or authors"
                className="w-11/12 h-full px-4 py-2  rounded-xl outline-none  border-[0.8px] border-amber-100 focus:shadow-[0px_0px_6px_rgba(253,230,138,0.5)] hover:shadow-[0px_0px_6px_rgba(253,230,138,0.5)]  transition-all duration-200 ease-in-out"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <span className="border-amber-100 border-[0.8px] px-2 py-2 rounded-xl hover:shadow-[0px_0px_6px_rgba(253,230,138,0.5)] active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:scale-95 transition-all duration-200 ease-in-out cursor-pointer">
                <IoMdSearch onClick={handleSearch} className="p-0 m-0  text-amber-100 text-xl " />
            </span>
        </div>
    );
};

export default SearchBar;
