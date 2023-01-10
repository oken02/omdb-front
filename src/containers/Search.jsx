import { Box, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginAsModal from "../components/LoginAsModal";
import Movies from "../components/Movies";
import SearchInput from "../components/SearchInput";
import { showLoginModal } from "../store/interface.reducer";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (query.length >= 3) {
        if (!loading) setLoading(true);
        const { data } = await axios.get(
          "https://www.omdbapi.com/?apikey=b9efff26&s=" + query,
          {}
        );

        if (!cancelled) {
          setLoading(false);
          if (data.Response == "True") {
            setMovies(data.Search);
          } else {
            setMovies([]);
          }
        }
      } else {
        setMovies([]);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [query]);
  

  return (
    <div>
      <SearchInput change={(e) => setQuery(e.target.value)} />

      {query.length < 3 && (
        <Alert style={{ justifyContent: "center" }} severity="info">
          <strong>Intenta buscar algo</strong>
        </Alert>
      )}

      {!loading ? (
        <Movies movies={movies} mess={true} />
      ) : (
        <Box p={6} textAlign="center">
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default Search;
