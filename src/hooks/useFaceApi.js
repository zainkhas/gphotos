import * as faceapi from "face-api.js";

const useFaceApi = () => {
  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  };

  const detectFaces = async (imgRef) => {
    return faceapi
      .detectAllFaces(imgRef)
      .withFaceLandmarks()
      .withFaceDescriptors();

    // let res = detections.map((d) => Object.values(d.box));
  };

  const assignLabel = (label, descriptor) => {
    const labeledDescriptors = [
      new faceapi.LabeledFaceDescriptors(label, [descriptor]),
    ];
    return labeledDescriptors;
  };

  const recognize = async (facesToRecognize, faces) => {
    console.log("facesToRecognize: ", facesToRecognize);
    // const labeledFaceDescriptors = faces
    //   .flat()
    //   .map((item) => faceapi.LabeledFaceDescriptors.fromJSON(item));

    const labeledFaceDescriptors = faces.map((item) =>
      faceapi.LabeledFaceDescriptors.fromJSON(item)
    );

    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

    facesToRecognize.forEach((fd) => {
      const bestMatch = faceMatcher.findBestMatch(fd.descriptor);
      console.log("Recongnize Results: ", bestMatch.toString());
    });
  };

  return { loadModels, detectFaces, assignLabel, recognize };
};

export default useFaceApi;
