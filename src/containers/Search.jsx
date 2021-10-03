import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Movies from "../components/Movies";
import SearchInput from "../components/SearchInput";

const Search = () => {
  const [query, setQuery] = useState("");

  const [movies, setMovies] = useState(null);

  const change = ({ target: { value } }) => {
    setQuery(value);
  };

  useEffect(() => {
    let cancelled = false;
    const search = async () => {
      if (query.length >= 3) {
        setMovies(null);

        const { data } = await axios.get(
          "https://www.omdbapi.com/?apikey=b9efff26&s=" + query,
          {}
        );

        if (!cancelled) {
          if (data.Response == "True") {
            setMovies(data.Search);
          } else {
            setMovies([]);
          }
        }
      } else {
        setMovies(null);
      }
    };

    search();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div>
      <SearchInput change={change} />

      {query.length < 3 && (
        <Alert style={{ justifyContent: "center" }} severity="info">
          <strong>Intenta buscar algo</strong>
        </Alert>
      )}

      {/* {!movies && query.length >= 3 && <h2>LOADING MATCHES</h2>} */}

      {movies && <Movies movies={movies} />}
    </div>
  );
};

export default Search;
