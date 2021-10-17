import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

const Header = ({ title, onBack }) => {
  const history = useHistory();
  const styles = useStyles();

  const onBackClick = () => {
    history.goBack();
  };

  return (
    <AppBar position="relative" className={styles.appbar}>
      <Toolbar>
        <IconButton aria-label="back" onClick={onBack ? onBack : onBackClick}>
          <ArrowBack className={styles.headerIcon} />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles({
  headerIcon: {
    fontSize: 25,
  },
  appbar: {
    boxShadow: "none",
    border: "1px solid #d8d8d8",
    zIndex: 1201,
  },
});

export default Header;
