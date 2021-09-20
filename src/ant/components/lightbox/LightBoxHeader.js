import React from "react";
import { ArrowLeftOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { createUseStyles } from "react-jss";

const LightBoxHeader = ({ onClose, toggleInfo }) => {
  const styles = useStyles();
  return (
    <div className={styles.header}>
      <ArrowLeftOutlined className={styles.headerIcon} onClick={onClose} />
      <div className={styles.headerMenu}>
        <InfoCircleOutlined
          className={styles.headerIcon}
          onClick={toggleInfo}
        />
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    display: "flex",
    zIndex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    height: "72px",
    alignItems: "center",
  },
  headerIcon: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerMenu: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default LightBoxHeader;
