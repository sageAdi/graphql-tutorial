import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_WRITERS } from "../../Graphql/Queries";
import AddWriter from "./AddWriter";
import Select from "react-select";

function WriterPage(props) {
  const [writers, setWriters] = useState([]);
  const { data } = useQuery(LOAD_WRITERS, {
    variables: { id: props.id },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setWriters(data.writers);
    }
  }, [data]);

  const handleOnChange = (selectedValue) => {
    props.setId(selectedValue.value);
  };
  const oprions = [];
  writers.map((writer) =>
    oprions.push({ value: writer.id, label: writer.name })
  );
  return (
    <div className="container-fluid mt-2">
      <div>
        <Select onChange={handleOnChange} options={oprions} />
      </div>
      <AddWriter />
    </div>
  );
}

export default WriterPage;
