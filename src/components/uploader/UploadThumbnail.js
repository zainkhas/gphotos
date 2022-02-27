import { Box, LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";

const UploadThumbnail = ({ file, progress, imageRef, canvasRef }) => {
  const styles = useStyles();
  const [fileProgress, setFileProgress] = useState(0);

  useEffect(() => {
    if (progress) {
      if (file.name in progress) {
        setFileProgress(progress[file.name]);
      }
    }
  }, [progress]);

  return (
    <div className={styles.imageContainer}>
      <img
        ref={imageRef}
        key={file.name + "file"}
        src={file.preview}
        alt={file.name}
        className={styles.image}
        width={200}
        height={250}
      />
      <canvas
        ref={canvasRef}
        className={styles.overlay2}
        width={200}
        height={250}
      />
      {fileProgress < 100 && (
        <div className={styles.overlay}>
          <Box className={styles.progressContainer}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              className={styles.progressTextContainer}
            >
              {fileProgress > 0 ? `${fileProgress}%` : "Preparing..."}
            </Typography>
            <LinearProgress variant="determinate" value={fileProgress} />
          </Box>
        </div>
      )}
    </div>
  );
};

const useStyles = createUseStyles({
  imageContainer: {
    width: 200,
    height: 250,
    marginLeft: 10,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    width: 200,
    height: 250,
    backgroundColor: "#FFF",
    opacity: 0.7,
    zIndex: 1300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay2: {
    position: "absolute",
    width: 200,
    height: 250,
    zIndex: 1300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    width: "100%",
    marginLeft: 15,
    marginRight: 15,
  },
  progressTextContainer: {
    display: "flex",
    justifyContent: "center",
  },
});

export default UploadThumbnail;
