// import { useEffect, useState } from "react";
// import axios from "axios";
// // add feature jaha par kisi bhi book-card pe click karne se book-details khule

// const OrderHistory=()=>{

//     const [orders,setOrders]=useState();

//     useEffect(()=>{
//         const getOrder=async ()=>{
//             const response=await axios.get("http://localhost:5000/api/v1/order/get-user-order",{withCredentials:true});
//             console.log(response.data.orderData);
//             setOrders(response.data.orderData)
//         }

//         getOrder();
//     },[]);



//     return (
//         <div className="text-white px-6">
//             <h1 className="px-2 py-2 text-2xl">My Orders</h1>
//             <div className="">
//                 { orders && orders.map((item,i)=><div key={i} className="order-card p-2 border-[0.5px] border-white hover:border-amber-100 mt-2 px-2 py-2 rounded-xl">
//                     <div className="flex items-center justify-center mb-4 gap-4 px-2">
//                         <p>Date: {item.createdAt.slice(0,10) } </p>
//                         <p className="text-amber-100">Total: ₹{item.totalCost}</p>
//                     </div>
//                     <div className="book-container">
//                         {/* <div className="flex justify-between items-center gap-2"> */}
//                         <div className="grid grid-cols-4 justify-items-center place-items-center p-2  gap-2">
//                             <p className="truncate max-w-[15vw] sm:max-w-24 md:max-w-[16vw]">Book</p>
//                             <p className="truncate max-w-[15vw] sm:max-w-24 md:max-w-[20vw] justify-self-start sm:justify-self-center">Details</p>
//                             <p className="truncate max-w-[15vw] sm:max-w-24 md:max-w-[20vw]">Qty</p>
//                             <p className="truncate max-w-[15vw] sm:max-w-24 md:max-w-[20vw]">SubTotal</p>
//                         </div>
//                         {item.bookArray && item.bookArray.map((book,i)=> <div key={i} className="book-card  gap-4">
//                             {/* <div className="flex justify-between p-2 gap-2"> */}
//                             <div className="grid grid-cols-4 justify-items-center place-items-center p-2 gap-2">
//                                 <div className="me-2"><img src={book.bookId.bookImageUrl} className="h-[40px] w-[30px] rounded" alt="" /></div>
//                                 <div className="md:flex md:flex-col md:items-center md:justify-center">
//                                     <p className="truncate max-w-[20vw] md:max-w-full text-center sm:max-w-16 justify-self-start">{book.bookId.title}</p>
//                                     <p className="">₹{book.bookId.price}</p>
//                                 </div>
//                                 <div className=" justify-self-center "><p>{book.quantity} </p></div>
//                                 <div><p>{book.quantity * book.bookId.price} </p></div>
//                             </div>
//                             <div className="p-[0.5px] bg-zinc-800"></div>

                            
//                         </div>
//                     )}
                    
//                     </div>
                    
//                 </div>)}
//             </div>
//         </div>
//     )
// }

// export default OrderHistory;