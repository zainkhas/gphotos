import React, { useState } from "react";
import { styled, alpha, ThemeProvider } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  MenuItem,
  Menu,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  FileUpload as FileUploadIcon,
} from "@mui/icons-material";

import useThemeStyles from "../../hooks/useThemeStyles";
import { theme } from "../../theme/white_header_theme";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f7f7f7",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  display: "flex",
  flex: 1,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const MainHeader = ({
  handleDrawerToggle,
  onDeletePress,
  onUploadClick,
  onSearch,
}) => {
  const menuId = "primary-search-account-menu";
  const [anchorEl, setAnchorEl] = useState(null);
  const styles = useStyles();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onDeleteDataClick = () => {
    handleClose();
    onDeletePress();
  };

  console.log("styles: ", styles);

  //TODO Account circle and menu not showing in mobile
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" className={styles.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Photos
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            startIcon={<FileUploadIcon />}
            onClick={onUploadClick}
            className={styles.headerMenuIcon}
          >
            Upload
          </Button>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <SettingsIcon className={styles.icon} />
                Settings
              </MenuItem>
              <MenuItem onClick={onDeleteDataClick}>
                <DeleteIcon className={styles.icon} />
                Delete Data
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

const useStyles = () =>
  useThemeStyles((theme) => ({
    icon: {
      color: `${theme.palette.grey["700"]} !important`,
      paddingRight: 10,
    },
    headerMenuIcon: {
      color: `${theme.palette.grey["700"]} !important`,
    },
    appBar: {
      boxShadow: "none",
      border: "1px solid #d8d8d8",
      zIndex: 1201,
    },
  }));

export default MainHeader;
