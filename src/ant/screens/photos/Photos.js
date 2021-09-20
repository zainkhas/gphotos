import React, { useEffect, useState } from "react";
import { log } from "../../common/Common";
import useApi from "../../hooks/useApi";
import Gallery from "react-grid-gallery";
import { URL_DATA } from "../../config";
import { Empty } from "antd";
import { createUseStyles } from "react-jss";
import Lightbox from "../../components/lightbox/LightBox";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { getAllPhotos } = useApi();
  const styles = useStyles();

  const transformData = (data) => {
    let finalArr = data?.map((img) => ({
      src: URL_DATA + "/public/uploads/" + img.name,
      thumbnail: URL_DATA + "/public/thumb/thumb_" + img.name,
      thumbnailWidth: 250,
      thumbnailHeight: 250,
      metaData: img?.metaData != "" ? JSON.parse(img.metaData) : null,
      ...img,
    }));

    log("Transformed: ", finalArr);
    return finalArr;
  };

  const getPhotos = async () => {
    try {
      let res = await getAllPhotos();

      log("Photos: ", res);
      setPhotos(transformData(res));
    } catch (error) {
      log("Error getPhotos: ", error);
    }
  };

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
    return (
      <div className={styles.empty}>
        <Empty description={"No Photos uploaded yet!"} />
      </div>
    );
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