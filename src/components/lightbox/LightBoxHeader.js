import React, { useState } from "react";
import {
  ArrowBack,
  InfoOutlined,
  DeleteOutlined as DeleteIcon,
} from "@mui/icons-material";
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import { createUseStyles } from "react-jss";

import DeletePopper from "../DeletePopper";

const LightBoxHeader = ({ onClose, toggleInfo, onDelete }) => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const onCancelTrashClick = () => setOpen(false);
  const onTrashClick = () => {
    setOpen(false);
    onDelete();
    onClose();
  };

  return (
    <Toolbar className={styles.toolbar}>
      <IconButton aria-label="back" onClick={onClose}>
        <ArrowBack className={styles.headerIcon} />
      </IconButton>

      <div className={styles.headerMenu}>
        <Tooltip title="Info">
          <IconButton aria-label="info" onClick={toggleInfo}>
            <InfoOutlined className={styles.headerIcon} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={handleClick}>
            <DeleteIcon className={styles.headerIcon} />
          </IconButton>
        </Tooltip>
        <DeletePopper
          open={open}
          anchorEl={anchorEl}
          onCancelClick={onCancelTrashClick}
          onTrashClick={onTrashClick}
        />
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
