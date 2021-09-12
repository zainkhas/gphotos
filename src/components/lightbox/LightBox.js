import React, { useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import Modal from "react-modal";
import LightBoxControls from "./LightBoxControls";
import LightBoxHeader from "./LightBoxHeader";

const LightBox = ({
  isOpen,
  onOpen,
  onClose,
  currentImage,
  onNext,
  onPrevious,
}) => {
  const styles = useStyles();
  const [infoOpen, setInfoOpen] = useState(false);
  const infoPanel = useRef(null);
  const viewPort = useRef(null);

  const toggleInfo = () => {
    if (infoOpen) {
      infoPanel.current.style.width = "0";
      viewPort.current.style.marginRight = "0";
      setInfoOpen(false);
    } else {
      console.log("infoPanel: ", infoPanel.current);
      infoPanel.current.style.width = "360px";
      viewPort.current.style.marginRight = "360px";
      setInfoOpen(true);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onOpen}
      onRequestClose={onClose}
      className="LightBoxModal"
      overlayClassName="LightBoxOverlay"
    >
      <div className={styles.modalContainer}>
        <div ref={viewPort} className={styles.viewPort}>
          <LightBoxHeader onClose={onClose} toggleInfo={toggleInfo} />
          <div className={styles.imageContainer}>
            <img src={currentImage.src} alt="Main" className={styles.image} />
          </div>
          <LightBoxControls onLeftClick={onPrevious} onRightClick={onNext} />
        </div>
        <div ref={infoPanel} className={styles.info}></div>
      </div>
    </Modal>
  );
};

const useStyles = createUseStyles({
  modalContainer: {
    display: "flex",
    flex: 1,
    height: "100%",
  },
  viewPort: {
    display: "flex",
    flex: 2,
    flexDirection: "column",
    transition: "margin-right .5s",
  },
  info: {
    position: "fixed",
    top: 0,
    right: 0,
    width: 0,
    height: "100%",
    backgroundColor: "#FFF",
    transition: "0.5s",
  },
  imageContainer: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
    justifyContent: "center",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    userSelect: "none",
    objectFit: "contain",
  },
});

export default LightBox;
