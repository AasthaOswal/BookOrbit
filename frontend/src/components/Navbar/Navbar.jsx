import { Link, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { BiCart } from "react-icons/bi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProfileMobileMenu from "./ProfileMobileMenu";
import axios from "axios";
import { motion } from "framer-motion";
import { MdLogin } from "react-icons/md";
import { GiSpotedFlower } from "react-icons/gi";


const Navbar=()=>{

    const BACKEND = import.meta.env.VITE_BACKEND_URL;

    const [MobileNav,setMobileNav]=useState(false);

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const [userDetails,setUserDetails]=useState();
    
    const getUserDetails=async ()=>{
        try {
            const response=await axios.get(`${BACKEND}/api/v1/users/me`, {withCredentials:true});
            // console.log(response);
            setUserDetails(response.data.userData);
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getUserDetails();
    },[isLoggedIn]);

    const navigate=useNavigate();

    const HandleMobileNav=()=>{
        setMobileNav(!MobileNav)
    }

    

    const role = localStorage.getItem("role");




    
    return (
        <>
            <div className="larger-screen-navbar hidden md:flex w-full h-16 bg-zinc-800 px-12  text-white flex-row items-center justify-between sticky top-0 z-10 shadow-[0_4px_12px_rgba(253,230,138,0.25)] ">
                <Link to="/" className="font-semibold  transition-all duration-200 ease-in-out cursor-pointer  text-amber-100 active:scale-95 hover:drop-shadow-[0_0px_8px_rgba(253,230,138,0.25)] active:drop-shadow-[0_0px_8px_rgba(253,230,138,0.25)]">
                    <div className="logo flex items-center justify-center gap-2">
                        <img src="/bookLogo.png" className="h-10 w-10" alt="" />
                      
                        <span className="text-2xl ">BookOrbit</span>
                    </div>
                </Link>
                
                <div className="links-larger-screens flex flex-row items-center justify-center gap-4">
                    {/* <Link to="/" className="hover:text-amber-100">Home</Link> */}
                    <Link to="/all-books" className="hover:text-amber-100 hover:font-semibold  active:text-amber-100 active:font-semibold active:scale-95 transition-all duration-200 ease-in-out cursor-pointer ">All-Books</Link>
                    {isLoggedIn? 
                        <> 
                            <Link to="/profile" className=" hover:font-semibold hover:text-amber-100 active:text-amber-100 active:font-semibold active:scale-95 transition-all duration-200 ease-in-out cursor-pointer ">
                            {role === "user" ? "Profile" : <></>}
                            {role ==="admin" ? "Admin Profile" : <></>}
                            </Link>
                        </> 
                        : 
                        <>
                            <Link to="/login" className=" hover:font-semibold hover:text-amber-100 active:text-amber-100 active:font-semibold active:scale-95 transition-all duration-200 ease-in-out cursor-pointer">Login</Link>
                            <Link to="/signup" className=" hover:font-semibold hover:text-amber-100 active:text-amber-100 active:font-semibold active:scale-95 transition-all duration-200 ease-in-out cursor-pointer">Signup</Link>
                        </>
                    }
                    <span className=" hover:font-semibold hover:text-amber-100 active:text-amber-100 active:font-semibold active:scale-95 transition-all duration-200 ease-in-out cursor-pointer"  onClick={() => {
                        if (!isLoggedIn) {
                        toast.error("Please login to access cart.");
                        } else {
                        navigate("/cart");
                        }
                    }}>
                        <span className="flex items-center justify-center text-amber-100  gap-x-1 px-2 py-1 border-amber-100 border-[0.8px] rounded-xl active:scale-95 hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] cursor-pointer transition-all duration-200 ease ">
                            <span className="text-xl text-amber-100"><BiCart/></span>
                            <span className="text-amber-100">Cart</span>
                        </span>
                    </span>
                </div>
                
            </div>

            {/* <div className="hidden sm:block border-[0.3px] border-y-zinc-700"></div> */}
            <div className="mobile-navbar w-full h-16 md:hidden bg-zinc-800  px-6 py-2 text-white flex flex-row items-center justify-between sticky top-0 z-[70] shadow-[0_4px_12px_rgba(253,230,138,0.25)]">
                <Link to="/" className="font-semibold text-amber-100  active:scale-95 transition-all duration-100 ease-in-out cursor-pointer hover:drop-shadow-[0_0px_16px_rgba(253,230,138,0.25)] active:drop-shadow-[0_0px_16px_rgba(253,230,138,0.25)]">
                <div className="logo flex items-center gap-2">
                    <img src="/bookLogo.png" className="h-6 w-6" alt="" />
                    <span className="text-xl ">BookOrbit</span>
                </div>
                </Link>
                
                <div className="links-smaller-screens md:hidden flex gap-x-3 justify-center items-center " >
                    <span className=" hover:font-semibold hover:text-amber-100 active:text-amber-100 active:font-semibold active:scale-95 transition-all duration-200 ease-in-out cursor-pointer"  onClick={() => {
                        if (!isLoggedIn) {
                        return toast.error("Please login to access cart.");
                        } else {
                        navigate("/cart");
                        }
                    }}>
                        <span className="flex items-center justify-center  gap-x-1 px-2 py-1 border-amber-100 border-[0.8px] rounded-xl active:scale-95 hover:shadow-[0px_0px_16px_rgba(253,230,138,0.5)] active:shadow-[0px_0px_16px_rgba(253,230,138,0.5)] cursor-pointer transition-all duration-100 ease-in-out  ">
                            <span className="text-xl text-amber-100"><BiCart/></span>
                            <span className="text-amber-100">Cart</span>
                        </span>
                    </span>
                    <IoIosMenu className="active:text-amber-100 active:scale-95 text-3xl font-bold" onClick={HandleMobileNav}/>
                    
                </div>
            </div>
            {/* <div className="border-[0.3px] border-y-zinc-700"></div> */}
            {MobileNav && 
                <motion.div className=" bg-zinc-800  overflow-auto md:hidden fixed top-[56px] right-0 text-white flex flex-col justify-around items-center gap-4 w-full h-[calc(100dvh-64px)] z-60 overflow-y-auto mt-2"  initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}>
                    {/* <hr className="w-full border-amber-100 border-1 opacity-10" /> */}
                    {/* <Link to="/" className="px-4 hover:text-amber-100">Home</Link> */}
                    {/* <div className="h-[0.5px] w-full bg-zinc-500"></div> */}
                    {/* <Link to="/all-books" className="px-4 hover:text-amber-100">All-Books</Link> */}
                    

                    {isLoggedIn? 
                        <> 
                        {userDetails && <ProfileMobileMenu userDetails={userDetails} HandleMobileNav={HandleMobileNav} />}
                        {/* <Link to="/profile" className="px-4 hover:text-amber-100">
                            {role === "user" ? "Profile" : <></>}
                            {role ==="admin" ? "Admin Profile" : <></>}
                        </Link> */}
                        
                        </> 
                        : 
                        // <div className="w-full flex flex-col items-center justify-center gap-y-6">
                        //     <Link to="/all-books" className="px-4 hover:text-amber-100" onClick={HandleMobileNav} >All-Books</Link>
                        //     <Link to="/login" className="px-4  hover:text-amber-100" onClick={HandleMobileNav} >Login</Link>
                        //     <Link to="/signup" className="px-4 hover:text-amber-100" onClick={HandleMobileNav} >Signup</Link>
                        // </div>
                        <div className="w-full h-full flex flex-col justify-around items-center py-6 text-center">
                            {/* Welcome Message */}
                            <div className="text-amber-100 text-lg italic flex justify-center items-center gap-x-2 text-center hover:font-semibold hover:text-amber-100 active:text-amber-100 active:font-semibold active:scale-95 transition-all duration-200 ease-in-out cursor-pointer">
                                <span><GiSpotedFlower className="text-amber-100"/></span> Welcome to BookOrbit !
                            </div>

                            {/* Nav Links */}
                            <div className="flex flex-col gap-4">
                                <Link to="/all-books" className="hover:font-semibold hover:text-amber-100 active:text-amber-100 active:font-semibold active:scale-95 transition-all duration-200 ease-in-out cursor-pointer" onClick={HandleMobileNav}>All-Books</Link>
                                <Link to="/login" className="hover:font-semibold hover:text-amber-100 active:text-amber-100 active:font-semibold active:scale-95 transition-all duration-200 ease-in-out cursor-pointer" onClick={HandleMobileNav}>Login</Link>
                                <Link to="/signup" className="hover:font-semibold hover:text-amber-100 active:text-amber-100 active:font-semibold active:scale-95 transition-all duration-200 ease-in-out cursor-pointer" onClick={HandleMobileNav}>Signup</Link>
                            </div>

                            {/* Tagline or Footer */}
                            <p className=" text-white text-center italic flex flex-wrap justify-center items-center gap-x-2">
                                <span><MdLogin className="text-xl"/></span>
                                Please <span className="text-amber-100 font-semibold">login/signup</span> <span>to access all features.</span>
                            </p>
                        </div>

                    }


                </motion.div> 
            }
            {/* <div className="sm:hidden border-[0.1px] border-zinc-700"></div> */}

        </>
    )
}

export default Navbar;