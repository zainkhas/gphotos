import React from "react";
import { ArrowBack, InfoOutlined } from "@mui/icons-material";

import { IconButton, Toolbar } from "@mui/material";
import { createUseStyles } from "react-jss";

const LightBoxHeader = ({ onClose, toggleInfo }) => {
  const styles = useStyles();

  return (
    <Toolbar className={styles.toolbar}>
      <IconButton aria-label="back" onClick={onClose}>
        <ArrowBack className={styles.headerIcon} />
      </IconButton>

      <div className={styles.headerMenu}>
        <IconButton aria-label="info" onClick={toggleInfo}>
          <InfoOutlined className={styles.headerIcon} />
        </IconButton>
      </div>
    </Toolbar>
  );
};

const useStyles = createUseStyles({
  toolbar: {
    zIndex: 1200,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  headerIcon: {
    color: "#FFF",
    fontSize: 25,
  },
  headerMenu: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default LightBoxHeader;
