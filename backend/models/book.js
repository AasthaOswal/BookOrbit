const mongoose =require('mongoose');
const User     = require('./user');
const Order    = require('./order');

const bookSchema= new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required:true,
    },
    bookImageUrl:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
        enum:["Romance","Self-Help", "Finance", "Sci-Fi", "Thriller", "Biography"],
    },

},{timestamps:true});



async function cleanupBook(next) {
  // Find the book being deleted
  const book = this instanceof mongoose.Query
    ? await this.model.findOne(this.getFilter())
    : this;

  if (book) {
    // 1) remove it from every user's cart & favourites
    await User.updateMany(
      {},
      { $pull: { cart: book._id, favourite: book._id } }
    );

    // 2) pull this book from all orders
    await Order.updateMany(
      { 'bookArray.bookId': book._id },
      { $pull: { bookArray: { bookId: book._id } } }
    );

    // 3) delete any orders that now have an empty bookArray
    await Order.deleteMany({ bookArray: { $size: 0 } });
  }

  next();
}
// Attach to all delete entry points:
bookSchema.pre('findOneAndDelete', cleanupBook);
bookSchema.pre('deleteOne',        { document: false, query: true }, cleanupBook);
bookSchema.pre('deleteMany',       cleanupBook);
bookSchema.pre('remove',           cleanupBook);


module.exports=mongoose.model("Book",bookSchema);