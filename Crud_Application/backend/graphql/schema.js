var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLDate = require("graphql-date");
var BookModel = require("../models/Book");

var bookType = new GraphQLObjectType({
  name: "book",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      isbn: {
        type: GraphQLString,
      },
      title: {
        type: GraphQLString,
      },
      author: {
        type: GraphQLString,
      },
      description: {
        type: GraphQLString,
      },
      published_year: {
        type: GraphQLInt,
      },
      publisher: {
        type: GraphQLString,
      },
      updated_date: {
        type: GraphQLDate,
      },
    };
  },
});


//QUERY

var queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      books: {
        type: new GraphQLList(bookType),
        resolve: function () {
          console.log("books");
          const books = BookModel.find().exec();

          if (!books) {
            throw new Error("Error");
          }
          return books;
        },
      },
      book: {
        type: bookType,
        args: {
          id: {
            type: GraphQLID,
          },
        },
        resolve: function (root, params) {
          const bookDetails = BookModel.findById(params.id).exec();
          if (!bookDetails) {
            throw new Error("Error");
          }
          return bookDetails;
        },
      },
    };
  },
});

//MUTATIONS

var mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      addBook: {
        type: bookType,
        args: {
          isbn: {
            type: new GraphQLNonNull(GraphQLString),
          },
          title: {
            type: new GraphQLNonNull(GraphQLString),
          },
          author: {
            type: new GraphQLNonNull(GraphQLString),
          },
          description: {
            type: new GraphQLNonNull(GraphQLString),
          },
          published_year: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          publisher: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: function (root, params) {
          const bookModel = new BookModel(params);
          const newBook = bookModel.save();
          if (!newBook) {
            throw new Error("Error");
          }
          return newBook;
        },
      },

      updateBook: {
        type: bookType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
          },
          isbn: {
            type: GraphQLString,
          },
          title: {
            type: GraphQLString,
          },
          author: {
            type: GraphQLString,
          },
          description: {
            type: GraphQLString,
          },
          published_year: {
            type: GraphQLInt,
          },
          publisher: {
            type: GraphQLString,
          },
        },
        resolve(root, params) {
          return BookModel.findByIdAndUpdate(
            params.id,
            {
              $set: {
                title: params.title,
                author: params.author,
                description: params.description,
                isbn: params.isbn,
                publisher: params.publisher,
                published_year: params.published_year,
              },
            },
            { new: true }
          );
        },
      },

      removeBook: {
        type: bookType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
          },
        },
        resolve(root, params) {
          const remBook = BookModel.findByIdAndRemove(params.id).exec();
          if (!remBook) {
            throw new Error("Error");
          }
          return remBook;
        },
      },
    };
  },
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
