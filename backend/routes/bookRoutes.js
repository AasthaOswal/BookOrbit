const express = require("express");
const router = express.Router();
const { getAllBooks, addBook, updateBook, deleteBook, getBookById, getRecentBooks,getBooks, addBookRequests, getBookRequests } = require("../controllers/bookController");
const {authenticateToken}=require('../middlewares/userAuth');


router.get("/", getBooks);
router.post("/", authenticateToken,addBook);
router.put("/:id",authenticateToken,updateBook);   
router.delete("/:id",authenticateToken,deleteBook);
router.get("/recent", getRecentBooks);

router.post("/requests",authenticateToken,addBookRequests);
router.get("/requests",authenticateToken,getBookRequests);

router.get("/:id",getBookById);



module.exports = router;