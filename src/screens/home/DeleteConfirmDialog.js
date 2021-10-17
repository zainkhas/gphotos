import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import useThemeStyles from "../../hooks/useThemeStyles";

const DeleteConfirmDialog = ({ open, onClose, onConfirm }) => {
  const styles = useStyles();
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Delete All Photos?</DialogTitle>
      <DialogContent>
        Are you sure you want to delete all Photos and their data?
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onConfirm} className={styles.confirmButton}>
          Yes, I'm sure
        </Button>
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
