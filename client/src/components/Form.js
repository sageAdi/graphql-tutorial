import React, { useState } from "react";
import { CREATE_ANIME } from "../Graphql/Mutation";
import { useMutation } from "@apollo/client";

function Form() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [writerId, setWriterId] = useState("");

  const [addAnime, { error }] = useMutation(CREATE_ANIME);

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
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "genre") {
      setGenre(e.target.value);
    } else {
      setWriterId(e.target.value);
    }
  };
  return (
    <div>
      <form
        onSubmit={AddAnime}
      >
        <label>
          Name:
          <input type="text" name="name" onChange={handleOnChange} />
        </label>
        <label>
          Genre:
          <input type="text" name="genre" onChange={handleOnChange} />
        </label>
        <label>
          Writer:
          <select name="writer" onChange={handleOnChange}>
            <option value="606fdbe03a8e4616accc3049">sageAdi</option>
            <option value="606fdc14b4423641281cfa72">Aditya</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
