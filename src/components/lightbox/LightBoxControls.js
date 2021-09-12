import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { createUseStyles } from "react-jss";

const LightBoxControls = () => {
  const styles = useStyles();
  return (
    <div className={styles.controls}>
      <div className={styles.slideIconContainer}>
        <div className={styles.iconContainer}>
          <LeftOutlined className={styles.icon} />
        </div>
      </div>
      <div
        className={
          styles.slideIconContainer + " " + styles.slideIconContainerRight
        }
      >
        <div className={styles.iconContainer}>
          <RightOutlined className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  controls: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "space-between",
    display: "flex",
  },
  slideIconContainer: {
    height: "100%",
    width: "20%",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  slideIconContainerRight: {
    justifyContent: "flex-end",
  },
  iconContainer: {
    padding: 15,
    margin: 15,
    backgroundColor: "#242424",
    borderRadius: 50,
  },
  icon: {
    color: "#FFF",
    fontSize: 25,
  },
});

export default LightBoxControls;
