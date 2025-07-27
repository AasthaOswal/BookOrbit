const Book = require("../models/book");
const BookRequest = require("../models/bookRequest");
const User = require("../models/user");
const validator = require("validator");

const getAllBooks = async (req, res) => {
	try {
		const response = await Book.find({});
		return res
			.status(200)
			.json({
				allBooks: response,
				message: "All Books GET request successful",
			});
	} catch (error) {
		console.error("get all books error: ", error);
		return res.status(500).json({ message: "All Books data GET successful. " });
	}
};

const getBooks = async (req, res) => {
	const { query, category, sort } = req.query;

	const filter = {};

	// 🔍 Search by title or author
	if (query) {
		filter.$or = [
			{ title: { $regex: query, $options: "i" } },
			{ author: { $regex: query, $options: "i" } },
		];
	}

	// 🎯 Filter by category
	if (category) {
		filter.category = category;
	}
    
	// 🔀 Sorting
	let sortOption = {};
    
    if (!sort) {
    sortOption = { createdAt: -1 }; // Default sort by latest
    } else if (sort === "price_asc") {
    sortOption = { price: 1 };
    } else if (sort === "price_desc") {
    sortOption = { price: -1 };
    }

	try {
		

		const books = await Book.find(filter)
			.sort(sortOption)

		if (books.length === 0 && query && category) {
			// Try removing query and search again with just category
			const fallbackBooks = await Book.find({ category });

			if (fallbackBooks.length > 0) {
				// Send back a special message and fallback books
				return res.json({
					message: `No results for "${query}" in "${category}" category. Showing all books in "${category}".`,
					books: fallbackBooks,
				});
			} else {
				// Still no books even in category
				return res.json({
					message: `No results for "${query}" in "${category}" category.`,
					books: [],
				});
			}
		}

		res.status(200).json({
			success: true,
			message: "No books found matching your search.",
			books,
		});
	} catch (error) {
		console.error("get books error: ",error);
		return res
			.status(500)
			.json({ success: false, message: "Error fetching books. Please check input or Try Again Later." });
	}
};

const addBook = async (req, res) => {
	if (req.user.role !== "admin") {
		return res.status(403).json({ message: "Access Denied" });
	}
	try {
		const title = req.body.title.trim();
		const desc = req.body.desc.trim();
		const price = Number(req.body.price);
		const author = req.body.author.trim();
		const language = req.body.language.trim();
		const bookImageUrl = req.body.bookImageUrl.trim();
		const category = req.body.category.trim();

		if (title === "" || desc === "" || author === "" || language === "" ||  bookImageUrl === "" || category === "") {
			return res.status(400).json({message: "All fields are required.Price should be greater than 0",});
		}

		if (typeof price !== "number" || isNaN(price) || price <= 0) {
			return res
				.status(400)
				.json({ message: "Price must be a number greater than 0" });
		}

		if (!validator.isURL(bookImageUrl)) {
			return res.status(400).json({ message: "Book Image URL is not valid." });
		}

		const newBook = new Book({
			title,
			desc,
			price,
			author,
			language,
			bookImageUrl,
			category,
		});
		const response = await newBook.save();
		res.status(200).json({ message: "Book added successfully!" });
	} catch (error) {
		console.error("Add Book Error: ",error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const updateBook = async (req, res) => {
	try {
		let bookId = req.params.id;
		let role = req.user.role;

		if (role !== "admin") {
			return res.status(403).json({ message: "User not authorized for admin controls." });
		}

		const title = req.body.title.trim();
		const desc = req.body.desc.trim();
		const price = Number(req.body.price);
		const author = req.body.author.trim();
		const language = req.body.language.trim();
		const bookImageUrl = req.body.bookImageUrl.trim();
		const category = req.body.category.trim();

		if (title === "" || desc === "" || author === "" || language === "" || bookImageUrl === "" || category === "") {
			return res.status(400).json({message: "All fields are required.Price should be greater than 0"});
		}

		if (typeof price !== "number" || isNaN(price) || price <= 0) {
			return res
				.status(400)
				.json({ message: "Price must be a number greater than 0" });
		}

		if (!validator.isURL(bookImageUrl)) {
			return res.status(400).json({ message: "Book Image URl is not valid." });
		}

		let updatedBook = await Book.findByIdAndUpdate(
			bookId,
			{ title, desc, price, author, language, bookImageUrl, category },
			{ new: true }
		);

		if (!updatedBook) {
			return res.status(404).json({ message: "Book not found" });
		}

		return res.status(200).json({ message: "Book updated" });
	} catch (error) {
		console.error("Update Book Error: ", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const deleteBook = async (req, res) => {
	try {
		let bookId = req.params.id;

		let role = req.user.role;

		if (role !== "admin") {
			return res.status(403).json({ message: "User not authorized for admin controls." });
		}

		const deletedBook = await Book.findByIdAndDelete(bookId);

		if (!deletedBook) {
			return res.status(404).json({ message: "Book not found" });
		}

		return res.status(200).json({ message: "Book deleted" });
	} catch (error) {
		console.error( "Delete Book Error: " ,error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

//get recent books
const getRecentBooks = async (req, res) => {
	try {
		const recentBooks = await Book.find().sort({ createdAt: -1 }).limit(4);

		if (recentBooks.length === 0) {
			return res.status(404).json({ message: "No recent books found." });
		}
		return res.status(200).json({ message: "Book found successfully.", bookData: recentBooks });
	} catch (error) {
		console.error( "Error From get Recent Books: " ,error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

//get book by id
const getBookById = async (req, res) => {
	try {
		let bookId = req.params.id;

		const bookInfo = await Book.findById(bookId);

		if (!bookInfo) {
			return res.status(404).json({ message: "Book not found" });
		}

		return res.status(200).json({ message: "Book found successfully.", bookData: bookInfo });
	} catch (error) {
		console.error( "Error From Get Book By Id: " ,error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const addBookRequests = async (req, res) => {
	try {
		const userId = req.user.id;

		const title = req.body.title;
		const language = req.body.language;
		const author = req.body.author;

		if (title === "" || language === "" || author === "") {
			return res.status(200).json({ message: "All Fields are required." });
		}

		const userData = await User.findById(userId);

		if (!userData) {
			return res.status(404).json({ message: "User not Found." });
		}

		const bookRequest = new BookRequest({
			userId: userId,
			title: title,
			language: language,
			author: author,
		});

		const response = await bookRequest.save();
		return res.status(200).json({ message: "Book Request sent." });

	} catch (error) {
		console.error( "Error From Add Book Requests: " ,error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const getBookRequests = async (req, res) => {
	try {
		const userId = req.user.id;

		let bookRequestData;

		if (req.user.role === "admin") {
			bookRequestData = await BookRequest.find().sort({createdAt:-1}).populate("userId");
		} else {
			bookRequestData = await BookRequest.find({ userId }).sort({createdAt:-1});
		}

		return res.status(200).json({bookRequestData: bookRequestData, message: "Book Requests fetched successfully!",});

	} catch (error) {
		console.error( "Error From Get Book Requests: " ,error);
		return res.status(500).json({ message: "Internal Server Errorsjhdf" });
	}
};

module.exports = {getAllBooks,addBook,updateBook,deleteBook,getBookById,getRecentBooks,getBooks,addBookRequests,getBookRequests,};
