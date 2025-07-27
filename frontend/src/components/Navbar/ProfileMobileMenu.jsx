import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const  ProfileMobileMenu=({userDetails, HandleMobileNav})=>{

     const BACKEND = import.meta.env.VITE_BACKEND_URL;

    const role=localStorage.getItem("role");
    const navigate = useNavigate();


    const handleLogOut = async () => {
    try {
        const response = await axios.post(`${BACKEND}/api/v1/users/logout`, {}, { withCredentials: true });

        
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('role');

        HandleMobileNav();
        navigate("/");  
        return toast.success(response.data.message);
    } catch (error) {
        return toast.error("Error Occured, Please Check Internet or Try Again Later.");
    }
};


    return (
        <div className='flex flex-col items-center justify-around gap-4 py-4  h-full w-full'>
            <div className="flex flex-row items-center justify-center gap-x-2 flex-wrap flex-grow">
                <img src={'/avatarImg.svg'} alt="" className='h-10 w-10 '/>
                <p className="text-amber-100 font-bold text-xl italic">{userDetails?.username}</p>
            </div>

            <div className='profile-links flex flex-col justify-around items-center flex-grow gap-2 text-center'>
                <Link to="/all-books" className='text-center active:font-semibold active:text-amber-100 active:scale-95 transition-all duration-200  ease-in-out' 
                onClick={()=>HandleMobileNav()}>All-Books</Link>
                <Link to="/profile/favourites" className='text-center active:font-semibold active:text-amber-100 active:scale-95 transition-all duration-200  ease-in-out' onClick={()=>HandleMobileNav()}>Your Favourites</Link>
                <Link to="/profile/view-orders" className='text-center active:font-semibold active:text-amber-100 active:scale-95 transition-all duration-200  ease-in-out' onClick={()=>HandleMobileNav()}>Your Orders</Link>
                <Link to="/profile/request-book" className='text-center active:font-semibold active:text-amber-100 active:scale-95 transition-all duration-200  ease-in-out' onClick={()=>HandleMobileNav()}>Request A Book</Link>
                <Link to="/profile/view-requests" className='text-center active:font-semibold active:text-amber-100 active:scale-95 transition-all duration-200  ease-in-out' onClick={()=>HandleMobileNav()} >Your Requests</Link>
                <Link to="/profile/settings" className='text-center active:font-semibold active:text-amber-100 active:scale-95 transition-all duration-200  ease-in-out' onClick={()=>HandleMobileNav()}>Settings</Link>

                {role==="admin" && <>
                    <Link to="/profile/add-book" className='text-center active:font-semibold active:text-amber-100 active:scale-95 transition-all duration-200  ease-in-out' onClick={()=>HandleMobileNav()}>Add A Book</Link>
                    <Link to="/profile/manage-books" className='text-center active:font-semibold active:text-amber-100 active:scale-95 transition-all duration-200  ease-in-out' onClick={()=>HandleMobileNav()}>Manage Books</Link>
                    <Link to="/profile/all-requests" className='text-center active:font-semibold active:text-amber-100 active:scale-95 transition-all duration-200  ease-in-out' onClick={()=>HandleMobileNav()}>All Requests</Link>
                    <Link to="/profile/all-orders" className='text-center active:font-semibold active:text-amber-100 active:scale-95 transition-all duration-200  ease-in-out' onClick={()=>HandleMobileNav()}>All Orders</Link>
                    
        
                    {/* <Link to="/profile/view-requests" className='text-center active:text-amber-100 active:scale-95' onClick={()=>HandleMobileNav()} >Requested Books</Link> */}
                </>}
                
            </div>

            <div className='flex-grow flex flex-col items-center justify-center'>
                <button onClick={handleLogOut} className='px-4 py-1 m-2 border-[0.8px] border-white active:scale-95 hover:border-amber-100 hover:text-amber-100 rounded-xl w-fit text-center hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] flex items-center justify-center gap-x-2 cursor-pointer active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:border-amber-100 active:text-amber-100 transition-all duration-200 ease-in-out'>
                    <span className='hover:text-amber-100 active:text-amber-100'><MdLogout/></span>
                    <span className='hover:text-amber-100 active:text-amber-100'>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default ProfileMobileMenu;