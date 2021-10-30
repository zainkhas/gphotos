import React, { useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import Modal from "react-modal";
import LightBoxControls from "./LightBoxControls";
import LightBoxHeader from "./LightBoxHeader";
import PhotoInfo from "./PhotoInfo";

import usePhotos from "../../hooks/usePhotos";

const LightBox = ({
  isOpen,
  onClose,
  currentImage,
  onNext,
  onPrevious,
  index,
}) => {
  const styles = useStyles();
  const [infoOpen, setInfoOpen] = useState(false);
  const infoPanel = useRef(null);
  const viewPort = useRef(null);
  const mainDiv = useRef(null);
  const { trashPhoto } = usePhotos();

  const toggleInfo = () => {
    if (infoOpen) {
      infoPanel.current.style.width = "0";
      viewPort.current.style.marginRight = "0";
      setInfoOpen(false);
    } else {
      infoPanel.current.style.width = "360px";
      viewPort.current.style.marginRight = "360px";
      setInfoOpen(true);
    }
  };

  const onKeyDown = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        onPrevious();
        break;
      case "ArrowRight":
        onNext();
        break;
      default:
        console.log("Key pressed: ", event.key);
        break;
    }
  };

  const onOpen = () => {
    mainDiv.current.focus();
  };

  const onDelete = async () => {
    trashPhoto(currentImage?._id, index);
  };

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onOpen}
      onRequestClose={onClose}
      className="LightBoxModal"
      overlayClassName="LightBoxOverlay"
    >
      <div
        ref={mainDiv}
        className={styles.modalContainer}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div ref={viewPort} className={styles.viewPort}>
          <LightBoxHeader
            onClose={onClose}
            toggleInfo={toggleInfo}
            onDelete={onDelete}
          />
          <div className={styles.imageContainer}>
            <img src={currentImage.src} alt="Main" className={styles.image} />
          </div>
          <LightBoxControls onLeftClick={onPrevious} onRightClick={onNext} />
        </div>
        <div ref={infoPanel} className={styles.info}>
          <PhotoInfo image={currentImage} onClose={toggleInfo} />
        </div>
      </div>
    </Modal>
  );
};

const useStyles = createUseStyles({
  modalContainer: {
    display: "flex",
    flex: 1,
    height: "100%",
    "&:focus": {
      outline: "none",
    },
  },
  viewPort: {
    display: "flex",
    flex: 2,
    flexDirection: "column",
    transition: "margin-right .5s",
    position: "relative",
  },
  info: {
    position: "absolute",
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
