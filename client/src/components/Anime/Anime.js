import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_ANIME } from "../../Graphql/Queries";
function Anime(props) {
  const [anime, setAnime] = useState();
  const { data } = useQuery(LOAD_ANIME, {
    variables: { id: props.id },
  });

  useEffect(() => {
    if (data) {
      setAnime(data.anime);
    }
  }, [data]);
  return (
    <>
      {anime ? (
        <div className="card text-dark bg-warning mb-3 mt-3">
          <div className="card-body">
            <h5 className="card-title">{anime.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Description</h6>
            <p className="card-text"><strong>Genre : </strong>{anime.genre}</p>
            <p className="card-text"><strong>Writer : </strong>{anime.writer.name}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Anime;
