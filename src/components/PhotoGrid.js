import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Gallery from "react-grid-gallery";
import Lightbox from "./lightbox/LightBox";

const PhotoGrid = ({ photos }) => {
  const styles = useStyles();
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

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
  contentWrapper: {
    minHeight: 360,
  },
});

export default PhotoGrid;
