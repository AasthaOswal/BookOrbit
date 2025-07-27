import { useState,useEffect } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import SimpleLoader from "../Loader/SimpleLoader";
import { CiViewList } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";



const ViewOrders=({allOrders})=>{

    const BACKEND = import.meta.env.VITE_BACKEND_URL;
    
    const role=localStorage.getItem("role");

    const [orders,setOrders]=useState();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

   

    const getOrders=async ()=>{
        try {
            const response=await axios.get(`${BACKEND}/api/v1/orders`,{withCredentials:true});
            // console.log(response.data.orderData);
            if(role==="admin" ){
                if(allOrders){
                    setOrders(response.data.orderData);
                }else{
                    const onlyAdmin = response.data.orderData.filter((order) => order.userId?.role === "admin");
					// console.log("🟡 admin + !allRequests → SHOW ADMIN‑ONLY:", onlyAdmin.length);
					setOrders(onlyAdmin);
                }
            }else{
                setOrders(response.data.orderData);
            }
            
        } catch (error) {
            // console.log(error);
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }
    }

    
    useEffect(()=>{
        getOrders();
    },[]);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await axios.put(
                `${BACKEND}/api/v1/orders/${orderId}/status`,
                { status: newStatus },
                { withCredentials: true }
            );
            toast.success(response.data.message);

            // Refresh orders after status update
            const refreshedOrders = await axios.get(`${BACKEND}/api/v1/orders`, { withCredentials: true });
            setOrders(refreshedOrders.data.orderData);
        } catch (error) {
            // console.log(error);
            // console.log(error);
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
        }   
    };



    return (
        <div className="w-full sm:pr-12 md:px-12">
            <h2 className="text-white text-2xl text-center mb-8">View Orders</h2>
            <div className="w-full h-full" >

                {!orders && <><SimpleLoader/></> }

                {orders && orders.length === 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-center w-full text-center text-white gap-4 py-10">

                        <CiViewList className="w-28 h-28 text-amber-100" />

                        <div className="w-fit h-auto flex flex-col justify-center items-center gap-y-4">

                            <h2 className="text-xl text-amber-100 font-semibold">No Orders Yet</h2>
                            <p className="text-sm text-white italic">You haven't placed any orders yet.</p>

                            <button
                            className="flex items-center justify-center gap-x-2 px-4 py-2 border-zinc-500 hover:bg-zinc-800 active:bg-zinc-800 border-[0.8px] hover:border-amber-100 active:border-amber-100 rounded-2xl active:scale-95 active:text-amber-100 hover:text-amber-100 cursor-pointer transition-all duration-300 ease-in-out"
                            onClick={() => navigate("/profile/all-books")}
                            >
                            <span>Browse Books</span>
                            <span className="text-xl">
                                <FaArrowRightLong />
                            </span>
                            </button>
                        </div>

                    </div>
                )}


                { orders && orders.map((item,i)=><div key={i} className="order-card p-2 border-[0.5px] border-white hover:border-amber-100 px-2 py-2 rounded-2xl my-6 ">
                    <div className="flex flex-wrap items-center justify-center mb-4 gap-x-4 gap-y-4 sm:gap-y-2  lg:gap-x-8 px-2">
                        <p>Date: {item.createdAt.slice(0,10) } </p>
                        <p className="text-amber-100 font-semibold">Total: ₹{item.totalCost}</p>
                        {role && role === "admin" && <p className="italic">Username: <span className={`${role==="admin"?"text-amber-100":"text-white"}`}>{ item.userId.username}</span> </p>}
                        <p>Status: <span className={`${role==="admin"?"text-white": "text-amber-100"}`}>{item.status}</span></p>
                    </div>
                    {role && role=== "admin" && allOrders && <div className="flex gap-2 my-4 flex-wrap justify-center items-center">
                            {["Order Placed", "Out For Delivery", "Delivered"].map((statusOption) => (
                                <button
                                    key={statusOption}
                                    onClick={() => handleStatusUpdate(item._id, statusOption)}
                                    className={`px-2 py-1 rounded-xl border ${
                                        item.status === statusOption
                                            ? "bg-amber-100 text-black border-amber-100"
                                            : "bg-zinc-900 text-white border-zinc-500 hover:text-amber-100 hover:border-amber-100 hover:bg-zinc-800"
                                    }`}
                                >
                                    {statusOption}
                                </button>
                            ))}
                    </div>}
                    <div className="book-container">
                        {/* <div className="flex justify-between items-center gap-2"> */}
                        <div className="grid grid-cols-4 justify-items-center place-items-center p-2  gap-4">
                            <p className="truncate max-w-[15vw] sm:max-w-24 md:max-w-[16vw]">Book</p>
                            <p className="truncate max-w-[15vw] sm:max-w-24 md:max-w-[20vw] justify-self-center">Details</p>
                            <p className="truncate max-w-[15vw] sm:max-w-24 md:max-w-[20vw]">Qty</p>
                            <p className="truncate max-w-[15vw] sm:max-w-24 md:max-w-[20vw]">SubTotal</p>
                        </div>
                        {item.bookArray && item.bookArray.map((book,i)=> <div key={i} className="book-card  gap-4">
                            {/* <div className="flex justify-between p-2 gap-2"> */}
                            <div className="p-[0.5px] bg-zinc-800"></div>

                            <div className="grid grid-cols-4 justify-items-center place-items-center p-2 gap-2">
                                <div className="me-2"><img src={book.bookId.bookImageUrl} className="h-[40px] w-[30px] rounded" alt="" /></div>
                                <div className="flex flex-col items-center justify-center">
                                    <p className="truncate w-[15vw] md:max-w-full text-center  justify-self-start ">{book.bookId.title}</p>
                                    <p className="">₹{book.bookId.price}</p>
                                </div>
                                <div className=" justify-self-center "><p>{book.quantity} </p></div>
                                <div><p>{book.quantity * book.bookId.price} </p></div>
                            </div>
                            
                        </div>
                    )}

                    
                    </div>
                    
                </div>)}
            </div>
        </div>
    )
}

export default ViewOrders;