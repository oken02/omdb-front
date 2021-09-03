import { Box, Input } from "@material-ui/core";
import React from "react";

const SearchInput = ({ change }) => {
  return (
    <div>
      <Box mb={5}>
        <Input
          onChange={change}
          placeholder="Search a movie"
          fullWidth
          inputProps={{ "aria-label": "Search a movie", type: "search" }}
        />
      </Box>
    </div>
  );
};

export default SearchInput;
