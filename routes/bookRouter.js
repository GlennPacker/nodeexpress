const express = require("express");
const bookController = require("../controllers/bookController");

function routes(Book) {
  const bookRouter = express.Router();
  const controller = bookController(Book);

  bookRouter
    .route("/books")
    .post(controller.post)
    .get(controller.get);
  bookRouter.use("/books/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (!book) {
        return res.sendStatus(404);
      }
      req.book = book;
      return next();
    });
  });
  bookRouter
    .route("/books/:bookId")
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;

      book.save(err => {
        if (err) return res.send(err);
      });

      return res.json(book);
    })
    .patch((req, res) => {
      const { book } = req;

      Object.entries(req.body).forEach(item => {
        if (item[0] !== "_id") {
          book[item[0]] = item[1];
        }
      });

      book.save(err => {
        if (err) return res.send(err);
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove(err => {
        if (err) return res.send(err);
        return res.sendStatus(204);
      });
    });

  return bookRouter;
}

module.exports = routes;
