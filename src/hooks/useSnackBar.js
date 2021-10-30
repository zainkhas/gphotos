import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SNACKBAR_TYPES } from "../constants/SNACKBAR_TYPES";
import { updateSnackBar } from "../store/appReducer";

const useSnackBar = () => {
  const dispatch = useDispatch();
  const snackBar = useSelector((state) => state.app.snackBar);
  const setSnackBar = (objSnackBar) => dispatch(updateSnackBar(objSnackBar));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar({
      open: false,
      text: "",
      type: SNACKBAR_TYPES.INFO,
    });
  };

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const SnackBarAlert = () => (
    <Snackbar
      open={snackBar.open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackBar.type}
        sx={{ width: "100%" }}
      >
        {snackBar.text}
      </Alert>
    </Snackbar>
  );

  const openSnackBar = (text, type) => {
    setSnackBar({
      open: true,
      text,
      type,
    });
  };

  const SnackBar = {
    info: (text) => openSnackBar(text, SNACKBAR_TYPES.INFO),
    success: (text) => openSnackBar(text, SNACKBAR_TYPES.SUCCESS),
    warning: (text) => openSnackBar(text, SNACKBAR_TYPES.WARNING),
    error: (text) => openSnackBar(text, SNACKBAR_TYPES.ERROR),
  };

  return {
    SnackBarAlert,
    SnackBar,
  };
};

export default useSnackBar;
