const router = require("express").Router()
const verifyToken = require("./verifyToken")
const User = require("../model/User")
const Book = require("../model/Books");

// match URL http://localhost:4001/api/books
router.get('/', async (req, res) => {
	try {
		const books = await Book.find({})
		console.log(books.length)
		if (books.length === 0) res.status(200).json({ "msg": "there are no books" });
		else
			res.status(200).json(books);
	} catch (err) {
		console.log(err);
	}
});

// match URL http://localhost:4001/api/books/:id
router.get('/:id', async function (req, res) {
	try {
		const book = await Book.findById(req.params.id)
		// console.log(book)
		if (book === null) res.status(404).json({ "msg": "there is no book ID:" + req.params.id });
		else
			res.status(200).json(book);
	} catch (err) {
		console.log(err);
	}
});

// match URL http://localhost:4001/api/books
router.post("/", verifyToken, async (req, res) => {
	try {
		userInfo = await User.findById({ _id: req.user._id })
		userInfo.password = undefined
		const { title } = req.body;
		const book = await Book.create({
			title
		});

		res.status(201).json({ "msg": `user ${userInfo.email} created book id: ${book._id}` });
	} catch (err) {
		console.log(err);
	}
});

// match URL http://localhost:4001/api/books/:id
router.delete("/:id", verifyToken, async (req, res) => {
	try {
		// await Book.findByIdAndDelete({ _id: req.params.id })
		// res.status(200).json({ "msg": "Book ID:" + req.params.id + " is deleted" });

		// or

		let book = await Book.countDocuments({ _id: req.params.id })
		if (book === 1) {
			await Book.findByIdAndDelete({ _id: req.params.id })
			res.status(200).json({ "msg": "Book ID:" + req.params.id + " is deleted" });
		} else {
			res.status(200).json({ "msg": "Book ID:" + req.params.id + " doesnot exist" });
		}
	} catch (err) {
		console.log(err);
	}
})

module.exports = router