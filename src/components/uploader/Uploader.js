import React, { useState, useEffect, useRef } from "react";
import useFiles from "../../hooks/useFiles";
import Lottie from "react-lottie";
import { Typography } from "@mui/material";
import useThemeStyles from "../../hooks/useThemeStyles";
import UploadThumbnail from "./UploadThumbnail";

const Uploader = ({ onDrop, maxFiles = 100, progress, setRef }) => {
  const [over, setover] = useState(false);
  const [files, setfiles] = useFiles({ maxFiles });
  const $input = useRef(null);
  const styles = useStyles();
  const uploadAnimation = require("../../assets/upload_animation.json");

  const onClick = () => $input.current.click();

  useEffect(() => {
    if (onDrop) {
      onDrop(files);
    }
  }, [files]);

  const onDropFile = (e) => {
    e.preventDefault();
    e.persist();

    setfiles(e.dataTransfer.files);
    setover(false);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setover(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setover(false);
  };

  const onChange = (e) => setfiles(e.target.files);

  return (
    <>
      <div
        onClick={onClick}
        onDrop={onDropFile}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={
          over ? `${styles.uploadContainer} over` : styles.uploadOverlay
        }
      >
        {over && (
          <div>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: uploadAnimation,
              }}
              height={200}
              width={200}
            />

            <Typography
              variant="h5"
              gutterBottom
              component="div"
              className={styles.dropMessage}
            >
              Drop files here to upload
            </Typography>
          </div>
        )}
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={$input}
          onChange={onChange}
          multiple={maxFiles > 1}
        />
      </div>
      <div className={styles.images}>
        {files.map((file, index) => (
          <UploadThumbnail
            key={file.name}
            file={file}
            progress={progress}
            imageRef={setRef(file.name)}
            canvasRef={setRef("canvas_" + file.name)}
          />
        ))}
      </div>
    </>
  );
};

const useStyles = () =>
  useThemeStyles((theme) => ({
    uploadOverlay: {
      width: "100%",
      height: "100%",
      position: "absolute",
    },
    uploadContainer: {
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&.over": {
        backgroundColor: "#FFFFFF",
        "& h2": {
          color: "white",
        },
      },
      "& h2": {
        transition: "0.2s color",
        textAlign: "center",
      },
    },
    dropMessage: {
      textAlign: "center",
    },
    images: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: 20,
    },
  }));

export default Uploader;
