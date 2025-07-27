import { useState,useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import SimpleLoader from "../Loader/SimpleLoader";

const AddBook=()=>{
    const BACKEND = import.meta.env.VITE_BACKEND_URL;
    
    const categories = ["Romance", "Self-Help", "Finance", "Sci-Fi", "Thriller", "Biography"];
    const navigate=useNavigate();

    

    const [formData,setFormData]=useState({
        title:"",
        author:"",
        category:"",
        desc:"",
        language:"",
        bookImageUrl:"",
        price:null,
    });

    const [isSubmitting,setIsSubmitting]=useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const handleChange=(e)=>{
        let {name,value}=e.target;
        //  convert the price to a number because when you retrieve any input value from an HTML form using e.target.value, it's always a string by default — even if the input type is number.
        if (name === "price") {
            value = Number(value);
        }
        setFormData({...formData,[name]:value});
    }

    const handleSubmit=async (e)=>{
        
         e.preventDefault();
        
        if(formData.title==="" ||formData.author===""||formData.category===""||formData.desc===""||formData.language===""||formData.bookImageUrl==="" || formData.price<=0 ){
            return toast.error("All fields are compulsory And price should be greater than 0.")
        }

        if (typeof formData.price !== 'number' || isNaN(formData.price) || formData.price <= 0) {
            return toast.error( "Price must be a number greater than 0" );
        }

        if(!validator.isURL(formData.bookImageUrl.trim())){
            return toast.error("Book Image URL is not valid.");
        }

        // console.log(formData);
        try{
            setIsSubmitting(true);
            const response=await axios.post(`${BACKEND}/api/v1/books/`,formData,{withCredentials:true});
            // console.log(response);
            toast.success(response.data.message);
            setFormData({
                title:"",
                author:"",
                category:"",
                desc:"",
                language:"",
                bookImageUrl:"",
                price:null,
            });
            navigate("/profile/manage-books");

        }catch(error){
            // console.log(error);
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }
    };

    return (
        
            <div className="flex flex-col  sm:pr-12 md:px-12 w-full    items-center h-full mx-auto ">
                
                <form className="w-full xl:w-10/12 flex flex-col justify-around h-full px-6 sm:px-12 py-8 bg-zinc-800 border-[0.8px] border-zinc-500 rounded-2xl"> 
                    <h2 className="text-white text-2xl mb-8  text-center ">Add Book</h2>
                    
                        
                        <div className="flex flex-col flex-grow flex-shrink mb-2">
                            <label className="p-2" htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" placeholder="Title" className="p-2 rounded-xl outline-none border-[0.8px] border-zinc-500 hover:border-amber-100 focus:border-amber-100" value={formData.title} onChange={handleChange} required/>
                        </div>
                        <div className="flex flex-col flex-grow flex-shrink mb-2">
                            <label className="p-2" htmlFor="author">Author</label>
                            <input type="text" id="author" name="author" placeholder="Author" className="p-2 rounded-xl outline-none border-[0.8px] border-zinc-500 hover:border-amber-100 focus:border-amber-100" value={formData.author} onChange={handleChange} required/>
                        </div>
                        <div className="flex flex-col flex-grow flex-shrink flex-wrap sm:flex-row sm:items-center sm:gap-4 mb-2">
                            <div className="flex flex-col flex-grow flex-shrink sm:flex-grow">
                            <label className="p-2" htmlFor="price">Price</label>
                            <input type="number" id="price" name="price" placeholder="Price" className="p-2 rounded-xl outline-none border-[0.8px] border-zinc-500 hover:border-amber-100 focus:border-amber-100" value={formData.price} onChange={handleChange} required onWheel={(e) => e.target.blur()} min={0}/>
                            </div>
                            <div className="flex flex-col flex-grow flex-shrink sm:flex-grow">
                                <label className="p-2" htmlFor="language">Language</label>
                                <input type="text" id="language" name="language" placeholder="Language" className="p-2 rounded-xl outline-none border-[0.8px] border-zinc-500 hover:border-amber-100 focus:border-amber-100" value={formData.language} onChange={handleChange} required/>
                            </div>
                        </div>
                        <div className="flex flex-col flex-grow flex-shrink mb-2">
                            <label className="p-2" htmlFor="bookImageUrl">Book Image Url</label>
                            <input type="text" id="bookImageUrl" name="bookImageUrl" placeholder="Book Image Url" className="p-2 rounded-xl outline-none border-[0.8px] border-zinc-500 hover:border-amber-100 focus:border-amber-100" value={formData.bookImageUrl} onChange={handleChange} required/>
                        </div>
                        <div className="flex flex-col flex-grow flex-shrink mb-2">
                            <label className="p-2" htmlFor="desc">Description</label>
                            <textarea name="desc" id="desc" rows="5" className="p-2 rounded-xl outline-none border-[0.8px] border-zinc-500 hover:border-amber-100 focus:border-amber-100" value={formData.desc} onChange={handleChange} required></textarea>
                        </div>
                        <div className="flex flex-col flex-grow flex-shrink sm:flex-grow mb-2">
                            <label className="p-2" htmlFor="category">Category</label>
                            <div className="flex flex-wrap flex-grow flex-shrink gap-3">
                            {categories.map((cat) => (
                                <span
                                key={cat}
                                onClick={() => setFormData({ ...formData, category: cat })}
                                className={`px-2 py-1 rounded-xl border-[0.5px] cursor-pointer ${
                                    formData.category === cat
                                    ? "bg-amber-100 text-black border-[0.5px] border-amber-100"
                                    : "bg-zinc-900 text-white border-zinc-500 hover:bg-zinc-800 hover:border-amber-100 hover:text-amber-100"
                                }`}
                                >
                                {cat}
                                </span>
                            ))}
                            </div>
                        </div>

                        {isSubmitting===false && <button className="mx-auto px-4 py-2 m-2 border-[0.8px] rounded-xl w-fit text-center border-white active:scale-95 hover:border-amber-100 hover:text-amber-100  hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:border-amber-100 active:text-amber-100  active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)]  cursor-pointer transition-all duration-200 ease-in-out mt-8" onClick={handleSubmit} disabled={isSubmitting}>Add Book</button>}

                        {isSubmitting===true && <div className="mx-auto h-auto w-full">
                            <p className="text-red-300 text-xl text-center  text-semibold mb-2">Please wait while we are processing the form.</p>
                            <SimpleLoader/>
                        </div>}
                        
                         

                    
                
                </form>
            </div>
    )
}

export default AddBook;