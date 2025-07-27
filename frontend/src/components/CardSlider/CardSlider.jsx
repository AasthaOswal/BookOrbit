import { useState,useEffect } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import BookCard from "../BookCard/BookCard";
const CardSlider=({Books,home,userFavBooks})=>{
    
        const [currentIndex,setCurrentIndex]=useState(0);
        const goToPrev=()=>{
        if(currentIndex===0){
            setCurrentIndex(Books.length-1);
        }else{
            setCurrentIndex((prev)=>prev-1);
        }

    }

    const goToNext=()=>{
        if(currentIndex===Books.length-1){
            setCurrentIndex(0);
        }else{
            setCurrentIndex((prev)=>prev+1);
        }

    }

    const goToSlide=(goToIndex)=>{
        setCurrentIndex(goToIndex);
    }
    return <>
        <div className="flex flex-col justify-center items-center w-full md:w-9/12 lg:w-8/12 mx-auto">
            <div className="slider-container w-full  flex items-center justify-center  gap-2 sm:gap-4">
                <span className="prev-button text-2xl cursor-pointer hover:text-amber-100 active:text-amber-100  active:scale-95" onClick={goToPrev}><FaArrowAltCircleLeft /></span>
                <div className="slide w-11/12 lg:w-4/5 ">
                    {Books && Books.length>0 && <BookCard key={currentIndex} bookDetail={Books[currentIndex]} home={home} userFavBooks={userFavBooks}  />}
                </div>
                <span className="next-button text-2xl cursor-pointer hover:text-amber-100 active:text-amber-100  active:scale-95" onClick={goToNext} ><FaArrowAltCircleRight /></span>
            </div>

            {/* Navigation Dots */}
            <div className="flex gap-2">
                { Books && Books.length>0 && Books.map((book,i)=>{
                    return <GoDotFill key={i} className={i===currentIndex? "hover:scale-110 text-2xl cursor-pointer active:scale-95 text-amber-200" : "hover:text-amber-100 hover:scale-110 active:text-amber-100 text-2xl cursor-pointer active:scale-95"} onClick={()=>goToSlide(i)}/>
                })}
            </div>
        </div>
    </>
}

export default CardSlider;



