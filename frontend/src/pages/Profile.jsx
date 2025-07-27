import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from '../components/Profile/Sidebar';
import { useEffect } from 'react';
const Profile=()=>{

    const navigate=useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    return (
        <div className="flex flex-1 flex-col md:flex-row w-full min-h-screen  profile-wrapper  bg-zinc-900 text-white px-6 py-12 pb-12 sm:pl-12 sm:pr-0 sm:py-12 ">
            <Sidebar/>
            <Outlet/>
        </div>
    )
}

export default Profile;