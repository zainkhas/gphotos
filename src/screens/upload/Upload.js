import React, { useState } from "react";
import Screen from "../../components/Screen";
import useApi from "../../hooks/useApi";
import { log } from "../../common/Common";
import Uploader from "../../components/uploader/Uploader";

const Upload = () => {
  const { uploadPhotos } = useApi();
  const [progress, setProgress] = useState({});

  const onDrop = async (droppedFiles) => {
    console.log("Dropped: ", droppedFiles);

    for (let i = 0; i < droppedFiles.length; i++) {
      try {
        let file = droppedFiles[i];
        let res = await uploadPhotos([file], (progress) => {
          let objProgress = { ...progress };
          objProgress[file.name] = progress;
          setProgress(objProgress);
        });
        log("File upload response: ", res);
      } catch (error) {
        log("Error uploading photos: ", error);
      }
    }
  };

  return (
    <Screen title={"Upload"}>
      <Uploader onDrop={onDrop} progress={progress} />
    </Screen>
  );
};

export default Upload;
