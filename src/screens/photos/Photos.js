import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import usePhotos from "../../hooks/usePhotos";
import Rocket from "../../assets/Rocket.png";
import { Typography } from "@mui/material";
import PhotoGrid from "../../components/PhotoGrid";
import Gallery from "react-grid-gallery";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const photosList = useSelector((state) => state.photos.photos);
  const { getPhotos } = usePhotos();
  const styles = useStyles();

  useEffect(() => {
    setPhotos(JSON.parse(JSON.stringify(photosList)));
  }, [photosList]);

  useEffect(() => {
    getPhotos();
  }, []);

  if (photos?.length === 0) {
    return (
      <div className={styles.empty}>
        <img src={Rocket} alt={"NoPhotos"} className={styles.emptyImage} />
        <Typography variant="h6" gutterBottom component="div">
          No Photos added yet
        </Typography>
        <Typography variant="body1" gutterBottom>
          Upload some photos first to see them here
        </Typography>
      </div>
    );
  }

  return <PhotoGrid photos={photos} />;
};

const useStyles = createUseStyles({
  empty: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },

  emptyImage: {
    width: 200,
    height: 200,
  },
});

export default Photos;
