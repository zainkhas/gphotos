import React, { useEffect, useRef, useState } from "react";
import Screen from "../../components/Screen";
import useApi from "../../hooks/useApi";
import { log } from "../../common/Common";
import Uploader from "../../components/uploader/Uploader";
import useFaceApi from "../../hooks/useFaceApi";
import useDynamicRefs from "use-dynamic-refs";
import moment from "moment";
import { LABELLED_DESCRIPTORS } from "../../dummydata/DummyData";

const Upload = () => {
  const { uploadPhotos } = useApi();
  const [progress, setProgress] = useState({});
  const { loadModels, detectFaces, assignLabel, recognizeFace } = useFaceApi();
  const [getRef, setRef] = useDynamicRefs();
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const initialize = async () => {
    await loadModels();
    setModelsLoaded(true);
  };

  useEffect(() => {
    initialize();
  }, []);

  const drawRect = (ctx, info, style = {}) => {
    const { x, y, w, h } = info;
    const { borderColor = "black", borderWidth = 1 } = style;

    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  };

  const uploadPhoto = async (file) => {
    let res = await uploadPhotos([file], (progress) => {
      let objProgress = { ...progress };
      objProgress[file.name] = progress;
      setProgress(objProgress);
    });
    log("File upload response: ", res);
  };

  const onDrop = async (droppedFiles) => {
    for (let i = 0; i < droppedFiles.length; i++) {
      try {
        let descriptors = {};
        const file = droppedFiles[i];

        //STEP 1: Detect faces
        let detectedFaces = await detectFaces(getRef(file.name).current);
        console.log("detectedFaces: ", detectedFaces);

        //Recognize all the detected faces
        let unrecognizedFaces = [];

        for (let i = 0; i < detectedFaces.length; i++) {
          const face = detectedFaces[i];
          let res = await recognizeFace(face, JSON.parse(LABELLED_DESCRIPTORS));
          log("Label: ", res);
          log("Condition: ", res === "unknown");
          if (res === "unknown") {
            unrecognizedFaces.push(face);
          }
        }

        log("unrecognizedFaces: ", unrecognizedFaces);
        // STEP 2: Label the Faces
        unrecognizedFaces?.map((face) => {
          // descriptors.push(face?.descriptor);
          const label = moment().format("DDMMYYYYHHmmss");
          let labeledDescriptor = assignLabel(label, face?.descriptor);
          const descriptorsArr = labeledDescriptor.map((item) => item.toJSON());
          descriptors[label] = JSON.stringify(descriptorsArr);
          console.log(
            "Final labeledDescriptor: ",
            JSON.stringify(descriptorsArr)
          );
        });
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
