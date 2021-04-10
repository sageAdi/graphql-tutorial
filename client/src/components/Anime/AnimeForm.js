import React, { useEffect, useState } from "react";
import { CREATE_ANIME } from "../../Graphql/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { LOAD_WRITERS } from "../../Graphql/Queries";
import Select from "react-select";

function AnimeForm() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [writerId, setWriterId] = useState("");
  const [writers, setWriters] = useState([]);

  const [addAnime, { error }] = useMutation(CREATE_ANIME);
  const { data } = useQuery(LOAD_WRITERS);

  useEffect(() => {
    if (data) {
      setWriters(data.writers);
    }
  }, [data]);
  const AddAnime = (e) => {
    e.preventDefault();
    addAnime({
      variables: {
        name: name,
        genre: genre,
        writerId: writerId,
      },
    });
    if (error) {
      console.log("Error : " + error);
    }
  };

  const handleOnChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "genre") {
      setGenre(e.target.value);
    }
  };
  const handleSelect = (selectedValue) => {
    setWriterId(selectedValue.value);
  };
  const options = [];
  writers.map((writer) =>
    options.push({ value: writer.id, label: writer.name })
  );

  return (
    <div>
      <form onSubmit={AddAnime}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={handleOnChange}
            className="form-control"
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            onChange={handleOnChange}
            className="form-control"
          />
        </label>
        <label>
          Writer:
          <Select name="writerId" onChange={handleSelect} options={options} />
        </label>
        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AnimeForm;
