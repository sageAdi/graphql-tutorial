import React, { useState } from "react";
import { CREATE_WRITER } from "../../Graphql/Mutation";
import { useMutation } from "@apollo/client";

function WriterForm() {
  const [name, setName] = useState();
  const [age, setAge] = useState();

  const [addWriter, { error }] = useMutation(CREATE_WRITER);

  const AddWriter = (e) => {
    e.preventDefault();
    addWriter({
      variables: {
        name: name,
        age: age,
      },
    });
    if (error) {
      console.log("Error : " + error);
    }
  };

  const handleOnChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "age") {
      setAge(e.target.value);
    }
  };
  return (
    <div>
      <form onSubmit={AddWriter}>
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
          Age:
          <input
            type="text"
            name="age"
            onChange={handleOnChange}
            className="form-control"
          />
        </label>
        <button className="btn btn-success" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default WriterForm;
