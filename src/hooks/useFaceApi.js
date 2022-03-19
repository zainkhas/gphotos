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

  const recognizeFace = async (face, faces) => {
    const labeledFaceDescriptors = faces.map((item) =>
      faceapi.LabeledFaceDescriptors.fromJSON(item)
    );
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    return faceMatcher.findBestMatch(face.descriptor).label;
  };

  return { loadModels, detectFaces, assignLabel, recognizeFace };
};

export default useFaceApi;
