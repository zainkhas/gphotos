import { useState } from "react";

const removeItems = (arr, item) => {
  for (var i = 0; i < item; i++) {
    arr.pop();
  }
};

const useFiles = ({ initialState = [], maxFiles }) => {
  const [state, setstate] = useState(initialState);
  const withBlobs = (files) => {
    const destructured = [...files];
    if (destructured.length > maxFiles) {
      const difference = destructured.length - maxFiles;
      removeItems(destructured, difference);
    }
    const blobs = destructured
      .map((file) => {
        if (file.type.includes("image")) {
          console.log("image");
          file.preview = URL.createObjectURL(file);
          return file;
        }
        console.log("not image");
        return null;
      })
      .filter((elem) => elem !== null);

    setstate((prev) => [...prev, ...blobs]);
  };
  return [state, withBlobs];
};

export default useFiles;
