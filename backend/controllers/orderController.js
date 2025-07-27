const Order=require('../models/order');
require('dotenv').config();
const User=require('../models/user');

const createOrder = async (req, res) => {
  try {
    const userId    = req.user.id;
    const { cartItems, totalCost } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // 1) create the order
    const newOrder = await Order.create({
      userId,
      bookArray:cartItems,
      totalCost
    });

    // 2) add order reference to the User document
    await User.findByIdAndUpdate(
      userId,
      { $push: { order: newOrder._id } },
      { new: true }
    );

    return res.status(200).json({ message: 'Order placed successfully!', orderId: newOrder._id });
  } catch (err) {
    console.error('Error in createOrder:', err);
    return res.status(500).json({ message: 'Internal Server Error'});
  }
};


const getOrders=async (req,res)=>{
  try{
      const userId=req.user.id;

      const role=req.user.role;

      if(role==="admin"){
        const adminData = await User.findById(userId);

        if(!adminData){
            return res.status(403).json({message:"Unauthorized access- this is custom error"});
        }

        const allOrders=await Order.find().populate("userId").populate("bookArray.bookId").sort({createdAt:-1});

        return res.status(200).json({message:"Fetch orders for admin successful.", orderData: allOrders });
      }

      if(role==="user"){
        //path tells mongoose which field to populate
        const userData = await User.findById(userId).populate({
            path: "order", // populate order array inside User
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "bookArray.bookId", // inside each order, populate book details
            },
        });


        if(!userData){
          return res.status(404).json({message:"User not exist"});
        }
        return res.status(200).json({message:"Fetch user orders successful.", orderData: userData.order });
      }
  }catch(error){
      console.error('Error in getOrder:', error);
      return res.status(500).json({ message: "Internal Server Error"});
  }

};


const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        return res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
      console.error("Update Address Error: " ,error);
      return res.status(500).json({ message: "Failed to update order status"});
    }
};


module.exports={ getOrders,updateOrderStatus,createOrder};