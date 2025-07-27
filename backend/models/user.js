const mongoose=require('mongoose');
const BookRequest=require('./bookRequest');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
        enum: ["user","admin"],
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
        required:true,
    },
    pincode:{
        type:Number,
        required:true,
    },
    contactNumber:{
        type:Number,
        required:true,
    },
    cart:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        }
    ],
    favourite:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        }
    ],
    order:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        }
    ],

},{timestamps:true});



// cleanup function to remove a user’s BookRequests and Orders
async function cleanupUser(next) {
  // figure out which user is being deleted
  const user = this instanceof mongoose.Query
    ? await this.model.findOne(this.getFilter())
    : this;

  if (user) {
    await BookRequest.deleteMany({ userId: user._id });

    // resolve Order model at runtime to avoid circular import
    const Order = mongoose.model('Order');
    await Order.deleteMany({ userId: user._id });
  }
  next();
}

// Attach to all delete entry points:
userSchema.pre('findOneAndDelete', cleanupUser);
userSchema.pre('deleteOne',      { document: false, query: true }, cleanupUser);
userSchema.pre('deleteMany',     cleanupUser);
userSchema.pre('remove',         cleanupUser);

module.exports=mongoose.model("User",userSchema);