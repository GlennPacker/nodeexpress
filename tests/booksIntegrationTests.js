require("should");

const request = require("supertest");
const mongoose = require("mongoose");

process.env.Env = "Test";

const app = require("../app.js");
const Book = mongoose.model("Book");
const agent = request.agent(app);

describe("Book Crud Test", () => {
  it("should allow a book to be created and return read and have _id", done => {
    // arrange
    const bookPost = {
      title: "title",
      author: "athor",
      genre: "Fiction"
    };
    // Act - Assert
    agent
      .post("/api/books")
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        results.body.should.have.property("_id");
        results.body.should.have.property("read");
        results.body.read.should.equal(false);
        done();
      });
  });

  afterEach(done => {
    Book.deleteMany({}).exec();
    done();
  });

  after(done => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
