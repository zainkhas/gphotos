import React, { useRef, useState } from "react";
import { Alert, Box } from "@mui/material";
import Drawer, { DRAWER_WIDTH } from "./Drawer";
import MainHeader from "./MainHeader";
import { createUseStyles } from "react-jss";
import Photos from "../photos/Photos";
import { useHistory } from "react-router-dom";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import useApi from "../../hooks/useApi";
import { log } from "../../common/Common";
import useSnackBar from "../../hooks/useSnackBar";

const HomeContent = ({ tabIndex }) => {
  const ref = useRef(null);
  const styles = useStyles();

  if (tabIndex === 0) {
    return (
      <div ref={ref} className={styles.homeContent}>
        <Photos />
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
  const { SnackBarAlert, snackBarSuccess, snackBarError } = useSnackBar();

  const { deleteAll } = useApi();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onDeletePress = () => setOpenDeleteConfirmDialog(true);

  const closeDeleteDialog = () => setOpenDeleteConfirmDialog(false);

  const onDeleteConfirm = async () => {
    setDeleting(true);
    try {
      let res = await deleteAll();
      log("deleteAll response: ", res);
      setDeleting(false);
      closeDeleteDialog();
      snackBarSuccess("All data deleted!");
    } catch (error) {
      log("Error deleteAll: ", error);
      setDeleting(false);
      closeDeleteDialog();
      snackBarError("Oops! Could not delete the data!");
    }
  };

  const onUploadClick = () => history.push("/upload");

  const onSearch = () => {};
  const onMenuChange = (index) => setTabIndex(index);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 0 }}>
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        <HomeContent tabIndex={tabIndex} />
        <DeleteConfirmDialog
          open={openDeleteConfirmDialog}
          onClose={closeDeleteDialog}
          onConfirm={onDeleteConfirm}
          loading={deleting}
        />
        <SnackBarAlert />
      </Box>
    </Box>
  );
};

const useStyles = createUseStyles({
  homeContent: {
    marginLeft: DRAWER_WIDTH,
  },
});

export default Home;
