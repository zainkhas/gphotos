import React, { useEffect, useState } from "react";
import Gallery from "react-grid-gallery";
import { createUseStyles } from "react-jss";
import Lightbox from "../../components/lightbox/LightBox";
import { useSelector } from "react-redux";
import usePhotos from "../../hooks/usePhotos";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const photosList = useSelector((state) => state.photos.photos);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { getPhotos } = usePhotos();
  const styles = useStyles();

  useEffect(() => {
    setPhotos(JSON.parse(JSON.stringify(photosList)));
  }, [photosList]);

  const onClickThumbnail = (index) => {
    setPhotoIndex(index);
    setIsLightBoxOpen(true);
  };

  const closeLightBox = () => setIsLightBoxOpen(false);

  const onPrevious = () =>
    setPhotoIndex(
      (prevIndex) => (prevIndex + photos.length - 1) % photos.length
    );

  const onNext = () =>
    setPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);

  useEffect(() => {
    getPhotos();
  }, []);

  if (photos?.length === 0) {
    return <div className={styles.empty}></div>;
  }

  return (
    <div className={styles.contentWrapper}>
      <Gallery
        images={photos}
        enableLightbox={false}
        onClickThumbnail={onClickThumbnail}
      />

      <Lightbox
        isOpen={isLightBoxOpen}
        onClose={closeLightBox}
        currentImage={photos[photoIndex]}
        nextSrc={photos[(photoIndex + 1) % photos.length].src}
        prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].src}
        onPrevious={onPrevious}
        onNext={onNext}
        index={photoIndex}
      />
    </div>
  );
};

const useStyles = createUseStyles({
  empty: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentWrapper: {
    background: "#fff",
    minHeight: 360,
  },
});

export default Photos;
