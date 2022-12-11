const Book = require("../models/Book");
const moment = require("moment");
const Image = require("../models/Image");
const formidable = require("formidable");
const fs = require("fs");
const addBooks = async (req, res) => {
  const obj = req.body;

  let today = moment();
  if (obj.publishedDate) {
    today = moment(obj.publishedDate, "YYYY-MM-DD");
  }
  const book = new Book({
    title: obj.title,
    author: obj.author,
    subject: obj.subject,

    publishedDate: today.toISOString(),
    image: obj.image,
  });

  try {
    await book.save();
    res.status(201).send(book);
  } catch (e) {
    res.status(400).send(e);
  }
};

const addImage = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, file) => {
      if (err) {
        console.log("Error parsing the files");
        return res.status(400).json({
          status: "Fail",
          message: "There was an error parsing the files",
          error: err,
        });
      }

      //Single file

      const file1 = file.file;
      console.log(file, file1);

      // creates a valid name by removing spaces
      // const fileName = encodeURIComponent(file1.name.replace(/\s/g, "-"));

      try {
        // renames the file in the directory
        // fs.renameSync(file.path, join(uploadFolder, fileName));
        const image = fs.readFileSync(file1.filepath, { encoding: "base64" });
        // console.log(image);
        const contentType = file1.mimetype;
        let newImage = new Image({
          image,
          contentType,
        });

        newImage = await newImage.save();
        res.json(newImage);
        // res.json({ file, file1 });
      } catch (err) {
        res.status(500).json({ err });
      }
    });
  } catch (err) {}
};

module.exports = { addBooks, addImage };
