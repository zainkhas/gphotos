import React, { useState, useEffect } from "react";
import { log } from "../../common/Common";
import { URL_DATA } from "../../config";
import useApi from "../../hooks/useApi";
import { ImageList, ImageListItem } from "@mui/material";

const Photos = ({ width, height }) => {
  const [photos, setPhotos] = useState([]);

  const { getAllPhotos } = useApi();

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

  useEffect(() => {
    getPhotos();
  }, []);

  return (
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
  );
};

export default Photos;
