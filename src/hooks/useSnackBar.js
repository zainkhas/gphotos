import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { forwardRef, useState } from "react";

const useSnackBar = () => {
  const [snackBar, setSnackBar] = useState({
    open: false,
    text: "",
    type: "info",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar({
      open: false,
      text: "",
      type: "info",
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

  const snackBarSuccess = (text) => {
    setSnackBar({
      open: true,
      text,
      type: "success",
    });
  };

  const snackBarError = (text) => {
    setSnackBar({
      open: true,
      text,
      type: "error",
    });
  };

  const snackBarWarning = (text) => {
    setSnackBar({
      open: true,
      text,
      type: "warning",
    });
  };

  const snackBarInfo = (text) => {
    setSnackBar({
      open: true,
      text,
      type: "info",
    });
  };

  return {
    SnackBarAlert,
    snackBarSuccess,
    snackBarError,
    snackBarWarning,
    snackBarInfo,
  };
};

export default useSnackBar;
