import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdLogout } from "react-icons/md";
import { toast } from 'react-toastify';

const Sidebar=()=>{

    const BACKEND = import.meta.env.VITE_BACKEND_URL;

    const navigate=useNavigate();

    const [sidebar,setSidebar]=useState(false);

    const role=localStorage.getItem("role");

    const [ProfileMobileNav,setProfileMobileNav]=useState(false);

    const [userDetails,setUserDetails]=useState();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const HandleProfileMobileNav=()=>{
        setProfileMobileNav((prev)=>!prev);
        setSidebar((prev)=>!prev);
    }

    const getUserDetails=async ()=>{
        try {
            const response=await axios.get(`${BACKEND}/api/v1/users/me`, {withCredentials:true});
            // console.log(response);
            setUserDetails(response.data.userData);
        // console.log(userDetails);
        } catch (error) {
            // console.log(error)
        }
    }

    useEffect(()=>{
        getUserDetails();
    },[]);


    const handleLogOut=async ()=>{
        
        const promise=axios.post(`${BACKEND}/api/v1/users/logout`,{},{withCredentials:true});
            
        toast.promise(promise, {pending: "Almost done! Please wait...",})
            .then((response) => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem("role");
                navigate("/");
                toast.success(response.data.message);     
            })
            .catch((error) => {
                toast.error("Error Occured, Please Check Internet or Try Again Later.");
            }
        );
    };
    

    

    return (
        <div className='flex-shrink-0 md:w-[190px] lg:w-[240px] 2xl:w-[280px] md:leading-5 lg:leading-[1.6rem]'>
        
           
                
            {/* larger screen sidebar */}
            <div className= " hidden md:flex h-auto flex-col items-center bg-zinc-800 w-full rounded-2xl py-4 px-2" >
                <div className='flex gap-1 items-center justify-center py-2 '>
                    {/* <CiUser /> */}
                    <p className='py-2'>{userDetails?.username}</p>
                </div> 
                <img src={'/avatarImg.svg'} alt="" className='w-1/2 '/>

                <div className='profile-links flex flex-col gap-4 px-3 py-4 items-center '>
                    <Link to="/profile/favourites" className='hover:text-amber-100 active:font-semibold  text-center hover:font-semibold active:scale-95 active:text-amber-100 transition-all duration-200  ease-in-out'>
                        <div className='flex gap-1 items-center justify-center'>
                            {/* <CiHeart/> */}
                            <p>Your Favourites</p>
                        </div>
                    </Link>

                    <Link to="/profile/view-orders" className='hover:text-amber-100 text-center hover:font-semibold active:scale-95 active:text-amber-100 active:font-semibold  transition-all duration-200  ease-in-out'>
                        <div className='flex gap-1 items-center justify-center'> 
                            {/* <CiViewList/> */}
                            <p>Your Orders</p>
                        </div>
                    </Link>
                    
                    <Link to="/profile/request-book" className='hover:text-amber-100 text-center hover:font-semibold active:scale-95 active:text-amber-100 active:font-semibold  transition-all duration-200  ease-in-out'>
                        <div className='flex gap-1 items-center justify-center'>
                            {/* <CiSettings/> */}
                            <p>Request A Book</p>
                        </div>
                    </Link>
                    <Link to="/profile/view-requests" className='hover:text-amber-100 text-center hover:font-semibold active:scale-95 active:text-amber-100 active:font-semibold  transition-all duration-200  ease-in-out'>
                        <div className='flex gap-1 items-center justify-center'>
                            {/* <CiSettings/> */}
                            <p>Your Requests</p>
                        </div>
                    </Link>
                    <Link to="/profile/settings" className='hover:text-amber-100 text-center hover:font-semibold active:scale-95 active:text-amber-100 active:font-semibold  transition-all duration-200  ease-in-out'>
                        <div className='flex gap-1 items-center justify-center'>
                            {/* <CiSettings/> */}
                            <p>Settings</p>
                        </div> 
                    </Link>
                    

                    {role==="admin" && <><Link to="/profile/add-book" className='hover:text-amber-100 text-center hover:font-semibold active:scale-95 active:text-amber-100 active:font-semibold  transition-all duration-200  ease-in-out'>
                        <div className='flex gap-1 items-center justify-center'>
                            {/* <IoIosAdd/> */}
                            <p>Add A Book</p>
                        </div>
                    </Link>
                    
                    
                    
                    <Link to="/profile/manage-books" className='hover:text-amber-100 text-center hover:font-semibold active:scale-95 active:text-amber-100 active:font-semibold  transition-all duration-200  ease-in-out'>
                        <div className='flex gap-1 items-center justify-center'>
                            {/* {<CiEdit/> } */}
                            <p>Manage Books</p>
                        </div>
                    </Link>
                   

                    <Link to="/profile/all-requests" className='hover:text-amber-100 text-center hover:font-semibold active:scale-95 active:text-amber-100 active:font-semibold  transition-all duration-200  ease-in-out'>
                        <div className='flex gap-1 items-center justify-center'>
                            <p>All Requests</p>
                        </div>
                    </Link>

                    <Link to="/profile/all-orders" className='hover:text-amber-100 text-center hover:font-semibold active:scale-95 active:text-amber-100 active:font-semibold  transition-all duration-200  ease-in-out'>
                        <div className='flex gap-1 items-center justify-center'>
                            <p>All Orders</p>
                        </div>
                    </Link>
                    
                    </>}

                </div>

                <button onClick={handleLogOut} className='px-4 py-1 m-2 border-[0.8px] border-white active:scale-95 hover:border-amber-100 hover:text-amber-100 rounded-xl w-fit text-center hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] flex items-center justify-center gap-x-2 cursor-pointer active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:border-amber-100 active:text-amber-100 transition-all duration-200 ease-in-out'>
                    <span className='hover:text-amber-100 active:text-amber-100'><MdLogout/></span>
                    <span className='hover:text-amber-100 active:text-amber-100'>Logout</span>
                </button>
            </div>
            
        </div>
        
    )
}

export default Sidebar;




