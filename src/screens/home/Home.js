import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import Drawer, { DRAWER_WIDTH } from "./Drawer";
import MainHeader from "./MainHeader";
import { createUseStyles } from "react-jss";
import Photos from "../photos/Photos";
import { Router, useHistory, Switch, Route } from "react-router-dom";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import useApi from "../../hooks/useApi";
import { log } from "../../common/Common";
import useSnackBar from "../../hooks/useSnackBar";
import { useDispatch } from "react-redux";
import { updatePhotos } from "../../store/photosReducer";
import { DRAWER_TABS } from "./DRAWER_TABS";
import Trash from "../trash/Trash";
import useThemeStyles from "../../hooks/useThemeStyles";

const HomeContent = ({ tabIndex }) => {
  const ref = useRef(null);
  const styles = useStyles();

  if (tabIndex === DRAWER_TABS.PHOTOS) {
    return (
      <div ref={ref} className={styles.homeContent}>
        <Photos />
      </div>
    );
  } else if (tabIndex === DRAWER_TABS.TRASH) {
    return (
      <div ref={ref} className={styles.homeContent}>
        <Trash />
      </div>
    );
  }
  return <div className={styles.homeContent}>Empty</div>;
};

const Home = ({ window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);
  const history = useHistory();
  const [deleting, setDeleting] = useState(false);
  const { SnackBar } = useSnackBar();
  const dispatch = useDispatch();
  const styles = useStyles();

  const { deleteAll } = useApi();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onDeletePress = () => setOpenDeleteConfirmDialog(true);

  const closeDeleteDialog = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenDeleteConfirmDialog(false);
    }
  };

  const onDeleteConfirm = async () => {
    setDeleting(true);
    try {
      let res = await deleteAll();
      log("deleteAll response: ", res);
      setDeleting(false);
      closeDeleteDialog();
      dispatch(updatePhotos([]));
      SnackBar.success("All data deleted!");
    } catch (error) {
      log("Error deleteAll: ", error);
      setDeleting(false);
      closeDeleteDialog();
      SnackBar.error("Oops! Could not delete the data!");
    }
  };

  const onUploadClick = () => history.push("/upload");

  const onSearch = () => {};
  const onMenuChange = (index) => {
    switch (index) {
      case DRAWER_TABS.TRASH:
        history.push("/trash");
        break;

      default:
        history.push("/");
        break;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        flex: 1,
        minHeight: "100vh",
      }}
    >
      <MainHeader
        handleDrawerToggle={handleDrawerToggle}
        onDeletePress={onDeletePress}
        onUploadClick={onUploadClick}
        onSearch={onSearch}
      />
      <Drawer
        container={container}
        open={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        onMenuChange={onMenuChange}
      />
      <Box component="main">
        {/* <HomeContent tabIndex={tabIndex} /> */}
        <Box className={styles.container}>
          <Switch>
            <Route path="/trash">
              <Trash />
            </Route>
            <Route path="/">
              <Photos />
            </Route>
          </Switch>
          <DeleteConfirmDialog
            open={openDeleteConfirmDialog}
            onClose={closeDeleteDialog}
            onConfirm={onDeleteConfirm}
            loading={deleting}
          />
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = () =>
  useThemeStyles((theme) => {
    console.log("Theme: ", theme);
    return {
      homeContent: {
        marginLeft: DRAWER_WIDTH,
      },
      container: {
        position: "relative",
        display: "block",
        marginLeft: "240px",
        [theme.breakpoints.only("xs")]: {
          marginLeft: "0px",
        },
      },
    };
  });

export default Home;
