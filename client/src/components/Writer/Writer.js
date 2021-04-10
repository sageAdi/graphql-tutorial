import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_WRITER } from "../../Graphql/Queries";
function Writer(props) {
  const [writer, setWriter] = useState();
  const { data } = useQuery(LOAD_WRITER, {
    variables: { id: props.id },
  });

  useEffect(() => {
    if (data) {
      setWriter(data.writer);
    }
  }, [data]);
  return (
    <>
      {writer ? (
        <div className="card text-dark bg-warning mb-3 mt-3">
          <div className="card-body">
            <h5 className="card-title">{writer.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Description</h6>
            <p className="card-text">
              <strong>Age : </strong>
              {writer.age}
            </p>
            <strong>Work : </strong>
            <ul>
              {writer.anime.map((anime) => (
                <li key={anime.id}>{anime.name}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Writer;
