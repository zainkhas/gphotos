import React, { useEffect, useRef, useState } from "react";
import Screen from "../../components/Screen";
import useApi from "../../hooks/useApi";
import { log } from "../../common/Common";
import Uploader from "../../components/uploader/Uploader";
import useFaceApi from "../../hooks/useFaceApi";
import useDynamicRefs from "use-dynamic-refs";

const Upload = () => {
  const { uploadPhotos } = useApi();
  const [progress, setProgress] = useState({});
  const { loadModels, detectFaces } = useFaceApi();
  const [getRef, setRef] = useDynamicRefs();
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const initialize = async () => {
    await loadModels();
    setModelsLoaded(true);
  };

  useEffect(() => {
    initialize();
  }, []);

  const onRefUpdate = (imageRefs) => {
    console.log("===== imageRefs.current.length: ", imageRefs);
  };

  const drawRect = (ctx, info, style = {}) => {
    const { x, y, w, h } = info;
    const { borderColor = "black", borderWidth = 1 } = style;

    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  };

  const onDrop = async (droppedFiles) => {
    for (let i = 0; i < droppedFiles.length; i++) {
      try {
        let file = droppedFiles[i];
        // let detectedFaces = await detectFaces(getRef(file.name).current);
        // console.log("detectedFaces: ", detectedFaces);

        // let descriptors = [];
        // detectedFaces?.map((face) => {
        //   descriptors.push(face?.descriptor);
        // });

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
      {modelsLoaded && (
        <Uploader onDrop={onDrop} progress={progress} setRef={setRef} />
      )}
    </Screen>
  );
};

export default Upload;
