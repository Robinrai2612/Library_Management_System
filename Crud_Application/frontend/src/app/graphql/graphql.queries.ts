import { gql } from 'apollo-angular';

export const LIST_BOOK = gql`
  query {
    books {
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

export const GET_BOOK = gql`
  query book($id: ID!) {
    book(id: $id) {
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
