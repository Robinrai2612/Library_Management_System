import { gql } from 'apollo-angular';

export const ADD_BOOK = gql`
  mutation addBook(
    $isbn: String!
    $title: String!
    $author: String!
    $description: String!
    $published_year: Int!
    $publisher: String!
  ) {
    addBook(
      isbn: $isbn
      title: $title
      author: $author
      description: $description
      published_year: $published_year
      publisher: $publisher
    ) {
      _id
      isbn
      title
      author
      description
      published_year
      publisher
      updated_date
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation updateBook(
    $id: ID!
    $isbn: String!
    $title: String!
    $author: String!
    $description: String!
    $published_year: Int!
    $publisher: String!
  ) {
    updateBook(
      id: $id
      isbn: $isbn
      title: $title
      author: $author
      description: $description
      published_year: $published_year
      publisher: $publisher
    ) {
      _id
      isbn
      title
      author
      description
      published_year
      publisher
      updated_date
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation removeBook($id: ID!) {
    removeBook(id: $id) {
      _id
    }
  }
`;
