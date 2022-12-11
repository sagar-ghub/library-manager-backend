const Book = require("../models/Book");

const updateBook = async (req, res) => {
  const obj = req.body;

  const book = new Book({
    title: obj.title,
    author: obj.author,
    subject: obj.subject,

    publishedDate: obj.publishedDate,
  });

  try {
    await book.save();
    res.status(201).send(book);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.modules = { updateBook };
