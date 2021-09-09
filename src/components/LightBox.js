import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Modal from "react-modal";
import { ArrowLeftOutlined, InfoCircleOutlined } from "@ant-design/icons";

const LightBox = ({ isOpen, onOpen, onClose }) => {
  const styles = useStyles();
  const [infoOpen, setInfoOpen] = useState(false);

  const toggleInfo = () => setInfoOpen((prev) => !prev);

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onOpen}
      onRequestClose={onClose}
      className="LightBoxModal"
      overlayClassName="LightBoxOverlay"
    >
      <div className={styles.modalContainer}>
        <div className={styles.viewPort}>
          <div className={styles.header}>
            <ArrowLeftOutlined
              className={styles.headerIcon}
              onClick={onClose}
            />
            <div className={styles.headerMenu}>
              <InfoCircleOutlined
                className={styles.headerIcon}
                onClick={toggleInfo}
              />
            </div>
          </div>
          <div className={styles.imageContainer}></div>
        </div>
        {infoOpen && <div className={styles.info}></div>}
      </div>
    </Modal>
  );
};

const useStyles = createUseStyles({
  header: {
    display: "flex",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerMenu: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
  },
  headerIcon: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    display: "flex",
    flex: 1,
    height: "100%",
  },
  viewPort: {
    display: "flex",
    flex: 2,
    flexDirection: "column",
  },
  info: {
    display: "flex",
    flex: 1,
    backgroundColor: "#FFF",
  },
  imageContainer: {
    display: "flex",
    flex: 1,
  },
});

export default LightBox;
