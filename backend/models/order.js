const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    bookArray:[
        {
            bookId:{
                type:mongoose.Types.ObjectId,
                ref:"Book",
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
                default:1,
            }
        }
    ],
    totalCost:{
        type:Number,
        required:true,
        default:0,
    },
    status:{
        type:String,
        default:"Order Placed",
        enum:["Order Placed", "Out For Delivery", "Delivered"],
    },
    
},{timestamps:true});




// Cleanup function to remove this order's reference from its user
async function cleanupOrder(next) {
  const order = this instanceof mongoose.Query
    ? await this.model.findOne(this.getFilter())
    : this;

  if (order) {
    const User = mongoose.model('User');
    await User.updateOne(
      { _id: order.userId },
      { $pull: { order: order._id } }
    );
  }
  next();
}


// Attach to all delete entry‑points
orderSchema.pre('findOneAndDelete', cleanupOrder);
orderSchema.pre('deleteOne',        { document: false, query: true }, cleanupOrder);
orderSchema.pre('deleteMany',       cleanupOrder);
orderSchema.pre('remove',           cleanupOrder);


module.exports=mongoose.model("Order",orderSchema);