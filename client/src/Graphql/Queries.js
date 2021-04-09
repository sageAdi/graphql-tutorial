import { gql } from "@apollo/client";

export const LOAD_ANIME = gql`
  query {
    animes{
      name
      _id
    }
  }
`;
