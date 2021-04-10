import "bootstrap/dist/css/bootstrap.min.css";
import AnimePage from "./components/Anime/AnimePage";
import Anime from "./components/Anime/Anime";
import "./App.css";
import { useState } from "react";
import WriterPage from "./components/Writer/WriterPage";
import Writer from "./components/Writer/Writer";

function App() {
  const [animeId, setAnimeId] = useState("");
  const [writerId, setWriterId] = useState("");
  const handleAnimeId = (val) => {
    setAnimeId(val);
  };
  const handleWriterId = (val) => {
    setWriterId(val);
  };
  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-8 align-self-center">
          <AnimePage setId={handleAnimeId} />
          <WriterPage setId={handleWriterId} />
        </div>
        <div className="col-4 bg-dark">
          <Anime id={animeId} />
          <Writer id={writerId} />
        </div>
      </div>
    </div>
  );
}

export default App;
