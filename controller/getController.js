const moment = require("moment");
const Book = require("../models/Book");
const getBooks = async (req, res) => {
  Book.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getBooksByQuery = async (req, res) => {
  const { query } = req.query;
  const { skip } = req.query;
  let skipnum = (parseInt(skip) - 1) * 10;
  try {
    if (query.includes("-") && query.length == 10) {
      console.log("if");
      let today = moment(query, "YYYY-MM-DD");
      console.log(today);
      // start today
      var start = moment(today).startOf("day");
      // end today
      var end = moment(today).endOf("day");

      const book = await Book.find({
        publishedDate: { $gte: start, $lte: end },
      })
        .skip(skipnum)
        .limit(10)
        .sort("publishedDate");
      console.log(book);
      const count = await Book.countDocuments({
        publishedDate: { $gte: start, $lte: end },
      })
        .skip(skipnum)
        .limit(10)
        .sort("publishedDate");
      res.status(200).json({ book, count });
    } else {
      console.log("else");
      const book = await Book.find({
        $or: [
          // { $text: { $search: query } },
          // // { author: `/${query}/i` },
          // { author: query },
          // { subject: query },

          { title: { $regex: query, $options: "i" } },
          { author: { $regex: query, $options: "i" } },
          { subject: { $regex: query, $options: "i" } },
        ],
      })
        .skip(skipnum)
        .limit(10)
        .sort("publishedDate");
      const count = await Book.countDocuments({
        $or: [
          // { $text: { $search: query } },
          // // { author: `/${query}/i` },
          // { author: query },
          // { subject: query },

          { title: { $regex: query, $options: "i" } },
          { author: { $regex: query, $options: "i" } },
          { subject: { $regex: query, $options: "i" } },
        ],
      });
      res.status(200).json({ book, count });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  Book.find({ _id: id })
    .populate("image")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getBooks,
  getBooksByQuery,
  getBookById,
};
