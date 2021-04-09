import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_ANIME } from "../Graphql/Queries";
function Anime() {
  const [animes, setAnimes] = useState([]);
  const { error, loading, data } = useQuery(LOAD_ANIME);

  useEffect(() => {
    if (data) {
      console.log(data.animes);
      setAnimes(data.animes);
    }
  }, [data]);
  return (
    <div>
      <ul>
        {animes.map((anime) => (
          <li key={anime.id}>{anime.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Anime;
