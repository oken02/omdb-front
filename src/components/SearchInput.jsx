import { Box, Input } from "@material-ui/core";
import React from "react";

const SearchInput = ({ change }) => {
  return (
    <div>
      <Box mb={5}>
        <Input
          onChange={ change }
          placeholder="Busca una película"
          fullWidth
          inputProps={{ "aria-label": "Busca una película", type: "search" }}
        />
      </Box>
    </div>
  );
};

export default SearchInput;
