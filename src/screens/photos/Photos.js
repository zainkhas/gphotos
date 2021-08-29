import React, { useEffect, useState } from "react";
import { log } from "../../common/Common";
import useApi from "../../hooks/useApi";
import Gallery from "react-grid-gallery";
import { URL_DATA } from "../../config";
import { Empty } from "antd";
import { createUseStyles } from "react-jss";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const { getAllPhotos } = useApi();
  const styles = useStyles();

  const transformData = (data) => {
    let finalArr = [];

    data?.map((img) => {
      finalArr.push({
        src: URL_DATA + "/" + img.url,
        thumbnail: URL_DATA + "/thumb/thumb_" + img.fileName,
        thumbnailWidth: 250,
        thumbnailHeight: 250,
      });
    });

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

  if (photos?.length === 0) {
    return (
      <div className={styles.empty}>
        <Empty description={"No Photos uploaded yet!"} />
      </div>
    );
  }

  return (
    <div className={styles.contentWrapper}>
      <Gallery images={photos} />
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
