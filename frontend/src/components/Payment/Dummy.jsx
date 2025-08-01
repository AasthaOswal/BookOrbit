import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiAlertTriangle } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";
import SimpleLoader from "../Loader/SimpleLoader";




const Dummy=({refreshCart , setRefreshCart, cart, setCart, cartItems, totalCost, setStep})=>{

  const BACKEND = import.meta.env.VITE_BACKEND_URL;

  const [isSubmitting,setIsSubmitting]=useState(false);

    const navigate=useNavigate();
    
    const handleSubmit = async () => {
      setIsSubmitting(true);
      if (!cartItems || cartItems.length === 0 || totalCost <= 0) {
        setIsSubmitting(false);
        return toast.error("Your cart is empty or total cost is invalid.");
      }

      try {
        const promise = axios.post(`${BACKEND}/api/v1/orders`,{ cartItems, totalCost },{ withCredentials: true });

        toast.promise(promise, {
          pending: "Almost done! Please wait...",
        });

        const response = await promise;

        if (response.status === 200) {
          setIsSubmitting(false);
          toast.success("Order Placed Successfully!");
          navigate("/profile/view-orders");

          await axios.put(
            `${BACKEND}/api/v1/cart/clear`,
            {},
            { withCredentials: true }
          );
        } else {
          setIsSubmitting(false);
          toast.error("Failed to place order. Try again later.");
        }
      } catch (error) {
        setIsSubmitting(false);
        toast.error("Something went wrong while placing the order.");
      }
    };


    return (
        <div className="w-fit h-fit flex flex-col items-center justify-center gap-4  border-[0.8px] border-zinc-500 px-8 py-8 rounded-2xl bg-zinc-800">
            

          <p className="text-justify sm:text-center font-medium ">
            <span><FiAlertTriangle className="inline text-yellow-400 mr-1" /></span> This is a <span className="text-amber-300 font-semibold">dummy payment simulation</span> designed for demonstration purposes. No actual payment is processed.
          </p>
          <p className="text-justify sm:text-center ">
            Clicking <span className="font-semibold text-green-300">"Go Ahead"</span> will <span className="italic font-semibold">confirm your order</span> and simulate successful payment. You'll be redirected to view your order.
          </p>
          <p className="text-justify sm:text-center">
            If you'd like to <span className=" italic font-semibold">modify your cart or cancel,</span>  click <span className="font-semibold text-red-300">"Go Back"</span> to return to the cart page.
          </p>


            {isSubmitting===false && <div className="flex items-center justify-center gap-4 flex-wrap w-full mt-4">
                <button className="flex items-center justify-center  gap-x-1 px-2 py-1 border-red-300 border-[0.8px] rounded-xl active:scale-95 hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] cursor-pointer transition-all duration-200 ease text-red-300"  onClick={()=>setStep("cart")}>  <span className="p-1"><FaArrowLeftLong/></span>Go Back</button>

                <button className="flex items-center justify-center  gap-x-1 px-2 py-1 border-green-300 border-[0.8px] rounded-xl active:scale-95 hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] cursor-pointer transition-all duration-200 ease text-green-300" onClick={handleSubmit}>Go Ahead <span className="p-1"><FaArrowRightLong/></span> </button>
            </div>}

            {isSubmitting===true && <div className="mx-auto mt-4 h-auto w-full">
                <p className="text-red-300 text-xl text-center px-4 sm:px-8 text-wrap  text-semibold mb-2">Please wait while we are processing the form.</p>
                <SimpleLoader/>
            </div>} 
            
        </div>
    );
};


export default Dummy;