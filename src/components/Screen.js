import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";

const Screen = ({ children, title }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 0 }}>
      <Header title={title} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Screen;
