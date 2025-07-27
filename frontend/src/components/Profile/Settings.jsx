import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import SimpleLoader from "../Loader/SimpleLoader";


const Settings=()=>{

    const BACKEND = import.meta.env.VITE_BACKEND_URL;

    const [userInfo,setUserInfo]=useState();
    const [updatedAddress,setUpdatedAddress]=useState();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const getUserInfo=async ()=>{
        try {
            const response=await axios.get(`${BACKEND}/api/v1/users/me`, {withCredentials:true} );
            // console.log(response.data.userData);
            setUserInfo(response.data.userData);
        } catch (error) {
            // console.log(error);
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }
    }

    useEffect(()=>{
        getUserInfo();
    },[]);

    const handleUpdateAddress=async ()=>{
        const promise=axios.put(`${BACKEND}/api/v1/users/me/address`,{updatedAddress},{withCredentials:true});
        
        toast.promise(promise, {pending: "Almost done! Please wait...",})
            .then((response) => {
                toast.success(response.data.message);     
            })
            .catch((error) => {
                toast.error("Error Occured, Please Check Internet or Try Again Later.");
            }
        );
    }

    const handleChange=(e)=>{
        setUpdatedAddress(e.target.value);
    }


    return (
        <div className="w-full min-h-screen bg-zinc-900 text-white  flex flex-col items-center sm:pr-12 md:px-12 ">
           
            {!userInfo && <SimpleLoader/> }
            
            {userInfo && <div className="flex flex-col w-full sm:w-11/12 lg:w-9/12 bg-zinc-800  rounded-2xl items-center h-auto border-[0.8px] border-zinc-500 px-6 sm:px-12 py-8">
                <p className="text-2xl text-center mb-8">Update Address</p>
                <p className="text-center mb-2">Username: {userInfo.username} </p>
                <p className="text-center mb-2">Email: {userInfo.email}</p>
                <div className="flex flex-col w-11/12  ">
                    <label htmlFor="address" className="text-center pb-4">Address:</label>
                    {/*  */}
                    <textarea name="address" id="address"   value={updatedAddress} onChange={handleChange} className="border-[0.8px] border-zinc-500 outline-none focus:border-amber-100 rounded-xl h-[40vh] p-2 sm:h-auto block" rows="8">
                        {userInfo.address}
                    </textarea>
                    
                </div>
                <button className="px-4 py-2 border-[0.8px] border-white active:scale-95 hover:border-amber-100 hover:text-amber-100 rounded-xl w-fit  cursor-pointer hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:border-amber-100 active:text-amber-100 active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] transition-all duration-200  ease-in-out mt-12" onClick={()=>handleUpdateAddress()}>Change Address</button>

            </div>}
                
            
        </div>
    )
}

export default Settings;