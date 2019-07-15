const should = require("should");
const sinon = require("sinon");
const bookController = require("../controllers/bookController");

describe("book controller tests:", () => {
  describe("post", () => {
    it("should not allow an empty title on post", () => {
      // Arrange
      const Book = function(book) {
        this.save = () => {};
      };

      const req = {
        body: {
          author: "auth"
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      // Act
      const controller = bookController(Book);
      controller.post(req, res);

      // Assert
      res.status
        .calledWith(400)
        .should.equal(true, `bad status ${res.status.args[0][0]}`);
      res.send.calledWith("Title is required").should.equal(true);
    });
  });
});
