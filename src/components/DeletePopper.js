import React from "react";
import {
  Popper,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import { useSpring, animated } from "react-spring/web.cjs";
import { createUseStyles } from "react-jss";

import { log } from "../common/Common";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const DeletePopper = ({ open, anchorEl, onCancelClick, onTrashClick }) => {
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "spring-popper" : undefined;
  const styles = useStyles();

  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      transition
      className={styles.root}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Card className={styles.card}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Are you sure you want to remove this Photo?
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                className={styles.buttonsStack}
              >
                <Button variant="text" onClick={onCancelClick}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={onTrashClick}>
                  Move to Trash
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Fade>
      )}
    </Popper>
  );
};

const useStyles = createUseStyles({
  root: {
    zIndex: 9999,
  },
  card: {
    marginRight: 20,
    maxWidth: 350,
    paddingTop: 10,
  },
  buttonsStack: {
    justifyContent: "end",
    paddingTop: 10,
  },
});

export default DeletePopper;
