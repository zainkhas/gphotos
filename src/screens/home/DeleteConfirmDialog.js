import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import useThemeStyles from "../../hooks/useThemeStyles";
import { LoadingButton } from "@mui/lab";

const DeleteConfirmDialog = ({ open, onClose, onConfirm, loading }) => {
  const styles = useStyles();
  return (
    <Dialog onClose={onClose} open={open} disableEscapeKeyDown>
      <DialogTitle>Delete All Photos?</DialogTitle>
      <DialogContent>
        Are you sure you want to delete all Photos and their data?
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton
          loading={loading}
          onClick={onConfirm}
          className={styles.confirmButton}
        >
          Yes, I'm sure
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = () =>
  useThemeStyles((theme) => ({
    confirmButton: {
      color: theme.palette.error.main,
    },
  }));

export default DeleteConfirmDialog;
