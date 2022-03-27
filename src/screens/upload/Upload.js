import React, { useEffect, useRef, useState } from "react";
import Screen from "../../components/Screen";
import useApi from "../../hooks/useApi";
import { log } from "../../common/Common";
import Uploader from "../../components/uploader/Uploader";
import useFaceApi from "../../hooks/useFaceApi";
import useDynamicRefs from "use-dynamic-refs";
import moment from "moment";
import { LABELLED_DESCRIPTORS } from "../../dummydata/DummyData";
import useFaces from "../../hooks/useFaces";
import { useSelector } from "react-redux";

let newFaceDescriptors = {};

let facesArr = [];

const Upload = () => {
  const { uploadPhotos } = useApi();
  const [progress, setProgress] = useState({});
  const { loadModels, detectFaces, assignLabel, recognizeFace } = useFaceApi();
  const [getRef, setRef] = useDynamicRefs();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const { addFaces } = useFaces();
  const faces = useSelector((state) => state.faces.faces);

  const initialize = async () => {
    newFaceDescriptors = {};
    facesArr = [];

    await loadModels();
    setModelsLoaded(true);
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    let faceData = Object.values(faces);
    faceData?.map((fd) => {
      facesArr.push(JSON.parse(fd));
    });
  }, [faces]);

  const drawRect = (ctx, info, style = {}) => {
    const { x, y, w, h } = info;
    const { borderColor = "black", borderWidth = 1 } = style;

    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  };

  const uploadPhoto = async (file, descriptors) => {
    let res = await uploadPhotos([file], descriptors, (progress) => {
      let objProgress = { ...progress };
      objProgress[file.name] = progress;
      setProgress(objProgress);
    });
    log("File upload response: ", res);
  };

  const onDrop = async (droppedFiles) => {
    let unrecognizedFaces = [];
    for (let i = 0; i < droppedFiles.length; i++) {
      try {
        const file = droppedFiles[i];
        log("======== FILE: ", file.name);

        //STEP 1: Detect faces
        let detectedFaces = await detectFaces(getRef(file.name).current);
        console.log("detectedFaces: ", detectedFaces);

        // //Recognize all the detected faces

        for (let i = 0; i < detectedFaces.length; i++) {
          const face = detectedFaces[i];
          let res = await recognizeFace(face, facesArr);
          log("Label: ", res);
          log("Condition: ", res === "unknown");
          if (res === "unknown") {
            unrecognizedFaces.push(face);
          }
        }

        log("unrecognizedFaces: ", unrecognizedFaces);
        log("======= END");
        // STEP 2: Label the Faces
        unrecognizedFaces?.map((face) => {
          // descriptors.push(face?.descriptor);
          const label = moment().format("DDMMYYYYHHmmss");
          let labeledDescriptor = assignLabel(label, face?.descriptor);
          const descriptorsArr = labeledDescriptor.map((item) => item.toJSON());
          newFaceDescriptors[label] = JSON.stringify(descriptorsArr);
        });

        //Save descriptors in Redux
        // addFaces(newFaceDescriptors);

        // console.log("Uploading photos now...");

        // await uploadPhoto(file, { faces: JSON.stringify(newFaceDescriptors) });
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
