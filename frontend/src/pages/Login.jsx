import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import validator from "validator";
import SimpleLoader from "../components/Loader/SimpleLoader";

const Login2=()=>{

    const BACKEND = import.meta.env.VITE_BACKEND_URL;

    const [viewPassword,setviewPassword]=useState(false);

    const [isSubmitting,setIsSubmitting]=useState(false);

    const navigate=useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const [formData,setFormData]=useState({
        username:"",
        password:""
    });

    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setFormData({...formData, [name]:value});
    }

    const handleSubmit=async ()=>{
        setIsSubmitting(true);
        if(formData.username ==="" || formData.password===""){
            setIsSubmitting(false);
            return toast.error("All Fields are required");
        }
        if (formData.username.trim().length < 5 || formData.username.trim().length > 15 || !validator.isAlphanumeric(formData.username.trim())) {
            setIsSubmitting(false);
            return toast.error( "Username must be between 5 to 15 characters long and can only contain letters and numbers (no special characters)." );
        }

        
        if ( formData.password.trim().length < 6 || formData.password.trim().length > 11 || !validator.isAlphanumeric(formData.password.trim())) {
            setIsSubmitting(false);
            return toast.error( "Password must be between 6 to 11 characters long and can only contain letters and numbers (no special characters)." );
        }

        try{
            setIsSubmitting(true);
            const response=await axios.post(`${BACKEND}/api/v1/users/login`, formData, {withCredentials:true});
            // console.log(response.data.role);
            toast.success(response.data.message);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("isLoggedIn", "true");
            navigate("/all-books");
        }catch(error){
            if(error.response){
                setIsSubmitting(false);
                return toast.error(error.response.data.message);
            }else{
                // console.log(error);
                setIsSubmitting(false);
                return toast.error("Error Occured, Please Check Internet or Try Again Later.");
            }
        }
    };

    return <>

        <div className="w-full min-h-screen px-6 sm:px-12 py-12 ">
            <div className="flex flex-col py-12 flex-grow flex-shrink max-[400px]:w-full w-10/12 md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3 bg-zinc-800  rounded-xl items-center mx-auto  text-white border-zinc-500 border-[0.8px] ">
                <h2 className="text-white text-2xl mb-8 ">Login Form</h2>
                <form className="w-full" onSubmit={
                    (e) => {e.preventDefault() 
                            handleSubmit()
                    }} 
                >
                <div className="px-8 sm:px-16 w-full flex flex-col gap-y-4">

                    <div className="flex flex-col flex-grow flex-shrink mb-2">
                        <label className="p-2" htmlFor="username">Username</label>
                        <input type="text" minLength={5} maxLength={15} id="username" name="username" placeholder="Username" className="p-2 rounded-xl outline-none border-[0.8px]  border-zinc-500 focus:border-amber-100 text-white hover:border-amber-100 transition-all duration-200 ease-in-out" value={formData.username} onChange={handleChange} required/>
                        <div className="ps-1 pt-1 text-xs md:text-sm text-amber-100" >Please use 5-15 letters and numbers only.</div>
                    </div>
                    <div className="flex flex-col flex-grow flex-shrink mb-2 w-full">
                        <label className="p-2" htmlFor="password">Password</label>
                        <div className="flex w-full items-center justify-between gap-x-4 ">
                            <input type={viewPassword ? "text":"password"} minLength={6} maxLength={11} id="password" name="password" placeholder="Password" className="p-2 rounded-xl outline-none border-[0.8px] w-full  border-zinc-500 focus:border-amber-100 hover:border-amber-100 text-white transition-all duration-200 ease-in-out " value={formData.password} onChange={handleChange} required/>
                            <span className="text-2xl border-[0.8px] border-zinc-500 p-2 hover:border-amber-100 hover:text-amber-100 rounded-xl hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] cursor-pointer transition-all duration-200 ease-in-out active:scale-95 active:border-amber-100 active:text-amber-100  active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)]" onClick={()=>setviewPassword((prev)=>!prev)}>{viewPassword ? <IoMdEyeOff/>:<MdOutlineRemoveRedEye/>}</span>
                        </div>
                        <div className="ps-1 pt-1 text-xs md:text-sm text-amber-100" >Please use 6-11 letters and numbers only.</div>
                    </div>
                    


                </div>
                {isSubmitting===false && <>
                    <div className="flex justify-center">
                        <button className="px-4 py-2 mt-8 border-[0.8px] border-amber-100 active:scale-95 text-amber-100 rounded-2xl hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] cursor-pointer text-center transition-all duration-200 ease-in-out" type="submit">
                            Login
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-x-4 px-4 text-center mt-4">
                        <p className=" text-center text-wrap ">Don't have an account? <button className="text-amber-100 hover:font-semibold active:font-semibold active:scale-95  cursor-pointer underline " disabled={isSubmitting} onClick={()=>navigate("/signup")} >Signup </button>  </p>
                        
                    </div>
                </>}
                {isSubmitting===true && <div className="mx-auto mt-4 h-auto w-full">
                    <p className="text-red-300 text-xl text-center px-4 sm:px-8 text-wrap  text-semibold mb-2">Please wait while we are processing the form.</p>
                    <SimpleLoader/>
                </div>} 


                    
                </form>
            </div>
        </div>
    </>

};

export default Login2;