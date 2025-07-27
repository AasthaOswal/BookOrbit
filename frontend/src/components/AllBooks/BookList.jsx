import BookCard from "../BookCard/BookCard";
import { useState,useEffect } from "react";

const BookList=({allBooks,userFavBooks, booksData})=>{
    const [currentPage,setCurrentPage]=useState(1);
    const [bookCardsPerPage,setBookCardsPerPage]=useState(6);
    const [currentBooks,setCurrentBooks]=useState();
    const [pages,setPages]=useState(0);

    
    



    useEffect(() => {
        const lastIndexOnPage = currentPage * bookCardsPerPage;
        const firstIndexOnPage = lastIndexOnPage - bookCardsPerPage;
        setCurrentBooks(booksData.slice(firstIndexOnPage, lastIndexOnPage));
        const totalBooks=booksData.length;
        const totalPages=Math.ceil(totalBooks/bookCardsPerPage);
        setPages(totalPages);
    }, [currentPage, bookCardsPerPage, booksData]);

    return (
        <div className=" book-card-container grid  grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4 ">
            { currentBooks && currentBooks.map((book,i)=> <BookCard bookDetail={book} key={i} userFavBooks={userFavBooks} allBooks={allBooks}/>) }
            
            {/* div for page numbers */}
            <div>

            </div>
        </div>
    );
};

export default BookList;