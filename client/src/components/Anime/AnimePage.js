import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_ANIMES } from "../../Graphql/Queries";
import AddAnime from "../Anime/AddAnime";
import Select from "react-select";

function AnimePage(props) {
  const [animes, setAnimes] = useState([]);
  const { data } = useQuery(LOAD_ANIMES, {
    variables: { id: props.id },
  });

  useEffect(() => {
    if (data) {
      console.log(data.animes);
      setAnimes(data.animes);
    }
  }, [data]);

  const handleOnChange = (selectedOption) => {
    props.setId(selectedOption.value);
  };
  const options = [];
  animes.map((anime) => options.push({ value: anime.id, label: anime.name }));
  return (
    <div className="container-fluid mt-2">
      <Select onChange={handleOnChange} options={options} />
      <AddAnime />
    </div>
  );
}

export default AnimePage;
