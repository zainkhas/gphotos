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

  return { loadModels, detectFaces };
};

export default useFaceApi;
