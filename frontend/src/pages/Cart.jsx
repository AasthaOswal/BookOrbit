import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { toast } from "react-toastify";
import SimpleLoader from "../components/Loader/SimpleLoader";
import Dummy from "../components/Payment/Dummy";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion"





const Cart=()=>{

    const BACKEND = import.meta.env.VITE_BACKEND_URL;

    const [cart,setCart]=useState();
    const [refreshCart,setRefreshCart]=useState(false);
    const [totalCost, setTotalCost]=useState(0);
    const [isLoading,setIsLoading]=useState(true);
    const [isError,setIsError]=useState(false);
    const [totalBooks,setTotalBooks]=useState(0);
    const [showDummyModal, setShowDummyModal] = useState(false);
    const [step, setStep] = useState("cart"); 


    const navigate=useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);
    

    const getCart=async ()=>{
        try{
            const response=await axios.get(`${BACKEND}/api/v1/cart/`, {withCredentials:true});
            // setCart(response.data.cartData);
            const cartWithQuantity=response.data.cartData.map((item)=>({...item, quantity:1}));
            // console.log(cartWithQuantity);
            setCart(cartWithQuantity);
            setIsLoading(false);
        }catch(error){
            // console.log(error);
            setIsError(true);
            return toast.error("Error Occured, Please Check Internet or Try Again Later.");
            
        }
    }

    const calculateTotalCost = () => {
        if(cart){
            return cart.reduce((total, item) => total + item.price * item.quantity, 0);
        }
        return 0;
    };

    const calculatetotalBooks=()=>{
        if(cart){
            return cart.reduce((totalBooks,item)=>totalBooks+item.quantity,0);
        }
        return 0;
    };

    useEffect(() => {
        if (cart) {
            setTotalCost(calculateTotalCost());
            setTotalBooks(calculatetotalBooks());
        }
    }, [cart]);

    const prepareCartItems = () => {
        if(cart){
            return cart.map(item => ({
                bookId: item._id,
                quantity: item.quantity
            }));
        }
        return [];
    };






    const handleDelete=async (bookid)=>{
    
        const promise=axios.delete(`${BACKEND}/api/v1/cart/${bookid}`,{withCredentials:true});
            
        toast.promise(promise, {pending: "Almost done! Please wait...",})
            .then((response) => {
                setRefreshCart(!refreshCart);
                toast.success(response.data.message);     
            })
            .catch((error) => {
                toast.error("Error Occured, Please Check Internet or Try Again Later.");
            }
        );

        
    }

    const incQuantity=(i,qty)=>{
        if(qty>=4){
            return toast.error("You can order up to 4 units");
        }

        const updatedCart=[...cart];
        updatedCart[i].quantity=qty+1;
        setCart(updatedCart);
    }
    const decQuantity=(i,qty)=>{
        if(qty===1 ){
            return toast.error("You must select at least 1 item.");
        }
        
        const updatedCart=[...cart];
        updatedCart[i].quantity=qty-1;
        setCart(updatedCart);
        
    }

    useEffect(()=>{
        getCart();
        setTotalBooks(calculatetotalBooks());
    },[]);

    useEffect(()=>{
        getCart();
        
    },[refreshCart]);

    

    return (
        <div className="relative bg-zinc-900 text-white px-6 sm:px-12 py-12  min-h-screen w-full flex flex-col  items-center">
            
            {step==="cart" && isError && <div className="text-red-300">Some Error Occured. Please Check Your Internet Connection or Try Again Later....</div> }

            

            {/* PayNow For Mobile */}
            {step==="cart" && cart && cart.length>0 && totalCost && <motion.div className="lg:hidden px-8 py-8 border-[0.8px] border-zinc-500 rounded-2xl flex flex-col w-fit h-fit gap-4 items-center bg-zinc-800 mb-12">
                <p className="text-center">Total Books: <span className="font-semibold">{totalBooks}</span></p>
                <p className="text-center">Total Cost: <span className="text-center text-xl text-amber-100 font-semibold">₹{totalCost}</span></p>
                
                <button
                    onClick={() => setStep("payment")}
                    className="mt-2  w-fit font-semibold text-black bg-amber-100 px-4 py-2 rounded-2xl hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:scale-95 transition-all duration-200 ease-in-out cursor-pointer"
                >
                    Proceed to Pay
                </button>

                <p className="italic text-zinc-400 text-sm mt-2 text-center">Payment is simulated. No actual money is charged.</p>
            </motion.div>}
            

            
            <h1 className=" mb-12 text-center text-2xl md:text-3xl font-semibold text-amber-100">Your Cart</h1>
            
            {step==="cart" && cart && cart.length===0 && <div className="flex flex-row flex-wrap gap-8 h-full w-full items-center justify-center">
                <h2 className="text-xl">Empty Cart</h2>
                <img src="/emptyCart.svg" className=" w-1/3 h-1/3 sm:w-1/5 sm:h-1/5 opacity-80" alt="" />
            </div> }

            {step==="cart" && isLoading && !isError && <div className="h-full w-full flex justify-center items-center"><SimpleLoader/></div>  }


            {/* entire cart for both mobile and larger screens */}
            {step==="cart" && cart && cart.length>0 && <motion.div className="cart-wrapper h-full w-full lg:flex" initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}>
                <div className="mb-12 w-full sm:w-11/12 mx-auto">
                {cart.map((item,i)=> <div key={i} className="flex h-auto w-full mb-12 lg:w-11/12  justify-around items-center gap-x-4 flex-wrap border-[0.8px] border-amber-100 py-2 px-2 rounded-2xl ">
                    <div className="w-2/12 h-2/12 sm:w-1/12 sm:h-1/12 m-4 ">
                        <img className="rounded-xl " src={item.bookImageUrl} alt="" />
                    </div>
                    <div className="flex flex-col flex-grow  w-2/12 sm:w-1/12 md:w-[30px] ">
                        <p className="truncate text-center">{item.title} </p>
                        <p className="text-amber-100 text-center truncate">₹{item.price}</p>
                        <p className="text-zinc-400 italic text-center truncate">{item.author}</p>
                    </div>
                    <div className="m-4 flex justify-center items-center flex-grow" onClick={()=>handleDelete(item._id)}>
                        <RiDeleteBin6Line  className="active:scale-95 active:text-amber-100 hover:text-amber-100 cursor-pointer"/>
                    </div>
                    
                    
                    <div className="flex flex-row justify-center items-center m-4 flex-grow">
                        {/* SubTotal */}
                        <div className=" flex flex-col sm:m-4 flex-grow">
                            <span className="text-center">Subtotal: </span>
                            <span className="text-center">₹{item.quantity * item.price}</span>
                        </div>
                        {/* Quantity */}
                        <div className="flex flex-col justify-between items-center py-2 px-4 flex-grow">
                            <p className=" text-center mb-1">Quantity</p>
                            <div className="flex items-center border-[0.5px] border-amber-100 rounded flex-grow cursor-pointer">
                                <div className="px-2 active:scale-90" onClick={()=>{decQuantity(i,item.quantity)}}><FaMinus /></div>
                                <p className=" border-r-amber-100 border-l-amber-100 border-r-[0.5px] border-l-[0.5px] px-2">{item.quantity}</p>
                                <div className="px-2 active:scale-90" onClick={()=>{incQuantity(i,item.quantity)}}><FaPlus /></div>
                            </div>
                        </div>
                    </div>
                    
                        
                </div>)}
                </div>

                {/* PayNow For Larger Screens */}
                {cart && totalCost && <div className="hidden lg:flex flex-col items-center gap-4 px-4 py-4 border-[0.8px] border-zinc-500 rounded-2xl bg-zinc-800 w-fit h-fit">
                    <p>Total Books: <span className="font-semibold">{totalBooks}</span></p>
                    <p className="text-xl font-semibold text-amber-100">₹{totalCost}</p>
                    
                    <button
                        onClick={() => setStep("payment")}
                        className="mt-2 w-fit text-sm text-black bg-amber-100 hover:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] active:shadow-[0px_0px_8px_rgba(253,230,138,0.5)] px-4 py-2 rounded-xl font-semibold cursor-pointer active:scale-95 transition-all duration-200 ease-in-out"
                    >
                        Proceed to Pay
                    </button>

                    <p className="italic text-zinc-400 text-sm text-center mt-1">Payment is simulated. No actual money is charged.</p>
                </div>}
            </motion.div> }

            {step === "payment" && (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                {/* Payment UI here */}

                        {step === "payment" && (
            <Dummy refreshCart={refreshCart} setRefreshCart={setRefreshCart} cart={cart} setCart={setCart} cartItems={prepareCartItems()} totalCost={calculateTotalCost()}  setStep={setStep}/>
            )}
            </motion.div>
            )}


        </div>
    )
}

export default Cart;