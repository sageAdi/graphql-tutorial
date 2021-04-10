import { gql } from "@apollo/client";

export const CREATE_ANIME = gql`
  mutation AddAnime($name: String!, $genre: String!, $writerId: String!) {
    addAnime(name: $name, genre: $genre, writerId: $writerId) {
      name
      id
    }
  }
`;
export const CREATE_WRITER = gql`
  mutation AddWriter($name: String!, $age: String!) {
    addWriter(name: $name, age: $age) {
      name
    }
  }
`;
