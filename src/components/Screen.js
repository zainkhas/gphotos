import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import { createUseStyles } from "react-jss";

const Screen = ({ children, title }) => {
  const styles = useStyles();
  return (
    <Box className={styles.box}>
      <Header title={title} />
      <Box component="main" className={styles.content}>
        {children}
      </Box>
    </Box>
  );
};

const useStyles = createUseStyles({
  box: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
  content: {
    flexGrow: 1,
    flexDirection: "column",
  },
});

export default Screen;
