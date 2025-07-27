import { useEffect} from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import { Routes, Route, useNavigate } from "react-router-dom"
import ViewBookDetails from './pages/ViewBookDetails'
import Favourite from './components/Profile/Favourite'
import Settings from './components/Profile/Settings'
import axios from 'axios';
import ViewOrders from './components/Profile/ViewOrders'
import AddBook from './components/Profile/AddBook'
import AllBooks from './pages/AllBooks'
import NetworkWrapper from './pages/NetworkWrapper'
import ViewRequests from './components/Profile/ViewRequests'
import RequestBook from './components/Profile/RequestBook'
import Cart from './pages/Cart'
import { FaArrowAltCircleUp } from "react-icons/fa";
import Login from './pages/Login'
import ManageBook from './components/Profile/ManageBook'
import Dummy from './components/Payment/Dummy'
import EditBook from './components/Profile/EditBook'
import { toast } from 'react-toastify'




function App() {
  const navigate=useNavigate();

  const BACKEND = import.meta.env.VITE_BACKEND_URL;


  const role=localStorage.getItem("role");
  const isLoggedIn=localStorage.getItem("isLoggedIn");


  useEffect(() => {
    const checkAuth = async () => {
        try {
            const res = await axios.get(`${BACKEND}/api/v1/users/check-auth`, {
                withCredentials: true,
            });

            localStorage.setItem("role", res.data.role);
            localStorage.setItem("isLoggedIn", "true");

        } catch (err) {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("role");
            await axios.post(`${BACKEND}/api/v1/users/logout`, {}, { withCredentials: true });
            toast.error("Session expired or invalid. Please login again.");
            navigate("/login");
            return toast.error("Session expired or invalid. Please login again.");
        }
    };
    checkAuth();
  }, []);
  


  return (
    <div className='min-h-screen flex flex-col m-0 p-0 bg-zinc-900'>
      <NetworkWrapper>
      <Navbar/>
      <div className='overflow-y-auto h-auto flex-1  '>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/all-books" element={<AllBooks/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>}>
            {isLoggedIn && isLoggedIn==="true" && <>
              <Route index element={<Favourite/>} />
              <Route path="favourites" element={<Favourite />} />
              <Route path="view-orders" key="onlyUserOrders" element={<ViewOrders/>} />
              <Route path="settings" element={<Settings/>} />
              <Route path='request-book' element={<RequestBook/>} />
              <Route path='view-requests' key="onlyUser" element={<ViewRequests/>} />
            </>}
            
            {role && role === "admin" && <>
              <Route path="add-book" element={<AddBook/>} />
              <Route path="manage-books" element={<ManageBook/>} />
              <Route path="edit-book/:id" element={ < EditBook /> } />
              <Route path="all-requests" element={<ViewRequests key="all" allRequests={true} /> } />
              <Route path="all-orders" element={<ViewOrders key="allOrders" allOrders={true} />} />
            </>}
          </Route>
          {isLoggedIn && isLoggedIn === "true" && <Route path="/cart" element= { <Cart/> } /> }
          <Route path="/view-book-details/:id" element={<ViewBookDetails/>} />
          {isLoggedIn && isLoggedIn==="true" && <Route path="/place-order" element={<Dummy/>} /> }
        </Routes>
        <Footer/>
      </div>
      </NetworkWrapper>
      <button onClick={()=>{
          window.scrollTo({top: 0, behavior: 'smooth'})
        }}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 text-white bg-zinc-500 text-2xl border-[0.8px] border-zinc-500 p-2 hover:border-amber-100 hover:text-amber-100 rounded-xl hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] cursor-pointer transition-all duration-200 ease-in-out active:border-amber-100 active:text-amber-100 active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:scale-95"
        title="Back to Top"
      >
        <FaArrowAltCircleUp className='text-white hover:text-amber-100 active:text-amber-100'/>
      </button>

    </div>
  )
}

export default App
