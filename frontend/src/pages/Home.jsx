import CategoryBooks from "../components/Home/CategoryBooks";
import Hero from "../components/Home/Hero";
import Contact from "../components/Home/Contact"; 
import { useEffect } from "react";

const Home=()=>{

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    return (
        <div className=" bg-zinc-900 w-full min-h-screen text-white px-6 sm:px-12 py-12 ">
            <Hero/>

            <CategoryBooks/>

            <Contact/>


        </div>
    )
}

export default Home;