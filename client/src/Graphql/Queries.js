import { gql } from "@apollo/client";

export const LOAD_ANIMES = gql`
  query {
    animes {
      name
      id
    }
  }
`;
export const LOAD_ANIME = gql`
  query($id: ID!) {
    anime(id: $id) {
      name
      id
      genre
      writer {
        name
      }
    }
  }
`;
export const LOAD_WRITERS = gql`
  query {
    writers {
      name
      age
      id
    }
  }
`;
export const LOAD_WRITER = gql`
  query($id: ID!) {
    writer(id: $id) {
      name
      id
      age
      anime{
        name
        id
      }
    }
  }
`;
