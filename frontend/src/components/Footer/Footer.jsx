import { Link, useNavigate } from "react-router-dom";
import { IoIosLink } from "react-icons/io";
import { GiInfo } from "react-icons/gi";
import { IoBuildOutline } from "react-icons/io5";
import { SiMongodb } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { FaNode } from "react-icons/fa";



const Footer=()=>{


  const isLoggedIn=localStorage.getItem("isLoggedIn");

  const navigate=useNavigate();


    return (
        <footer className="bg-zinc-900 text-zinc-400 px-6 sm:px-12  py-12  mt-12  border-t-[0.5px] border-zinc-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row flex-wrap justify-around items-start gap-8">
    
          {/* Quick Links */}
            <div className="w-full sm:w-fit">
              <h4 className="text-amber-100  font-semibold mb-3 text-center flex justify-center items-center gap-x-2"><span><IoIosLink/></span> Quick Links</h4>
                <div className="flex flex-col gap-2 text-center text-white text-sm">

                  
                  <button className="hover:font-semibold hover:text-amber-100 active:text-amber-100 active:font-semibold active:scale-95 transition-all duration-200 ease-in-out cursor-pointer" onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })}>
                    Home
                  </button>
                  

                  <Link to="/all-books">
                    <button className="hover:font-semibold hover:text-amber-100 active:text-amber-100 active:font-semibold active:scale-95 transition-all duration-200 ease-in-out cursor-pointer">
                      Browse Books
                    </button>
                  </Link>

                  {isLoggedIn === "true" && (
                    <Link to="/cart">
                      <button className="hover:font-semibold hover:text-amber-100 active:text-amber-100 active:font-semibold active:scale-95 transition-all duration-200 ease-in-out cursor-pointer">
                        Cart
                      </button>
                    </Link>
                  )}

                  {!isLoggedIn && (
                    <>
                      <Link to="/login">
                        <button className="hover:font-semibold hover:text-amber-100 active:text-amber-100 active:font-semibold active:scale-95 transition-all duration-200 ease-in-out cursor-pointer">
                          Login
                        </button>
                      </Link>

                      <Link to="/signup">
                        <button className="hover:font-semibold hover:text-amber-100 active:text-amber-100 active:font-semibold active:scale-95 transition-all duration-200 ease-in-out cursor-pointer">
                          Signup
                        </button>
                      </Link>
                    </>
                  )}
                </div>
            </div>

            {/* About */}
            <div className="w-full sm:max-w-[30%] ">
              <h4 className="text-amber-100 font-semibold mb-3 text-center   flex items-center justify-center gap-x-2"><span><GiInfo/></span> About BookOrbit</h4>
              <p className="text-center sm:text-justify text-white text-sm">
                BookOrbit is your trusted digital space to explore a wide range of books, save your favourites, and order with ease — all in one place.
              </p>
            </div>

            {/* Creator or Note */}
            <div className="w-full sm:max-w-[30%] sm:w-fit text-center">
              <h4 className="text-amber-100 font-semibold mb-3 flex justify-center items-center gap-x-2">
                <span><IoBuildOutline /></span> Built With
              </h4>
              <ul className="text-white text-sm space-y-2 ">
                <li className="flex justify-center items-center gap-x-2"><span><SiMongodb/></span> MongoDB</li>
                <li className="flex justify-center items-center gap-x-2"><span><SiExpress/></span> Express</li>
                <li className="flex justify-center items-center gap-x-2"><span><SiReact/></span> React</li>
                <li className="flex justify-center items-center gap-x-2"><span><FaNode/></span> Nodejs</li>
              </ul>
            </div>
          </div>

          <div className="mt-10  pt-6 text-center text-amber-100">
            &copy; {new Date().getFullYear()} BookOrbit. All rights reserved.
          </div>
        </footer>

    )
}

export default Footer;