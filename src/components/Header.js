import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { theme } from "../theme/white_header_theme";
import { createUseStyles } from "react-jss";

const Header = ({ title, onBack }) => {
  const history = useHistory();
  const styles = useStyles();

  const onBackClick = () => {
    history.goBack();
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="relative" className={styles.appbar} elevation={0}>
        <Toolbar>
          <IconButton aria-label="back" onClick={onBack ? onBack : onBackClick}>
            <ArrowBack className={styles.headerIcon} />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

const useStyles = createUseStyles({
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
