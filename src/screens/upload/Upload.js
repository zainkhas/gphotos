import React, { useState } from "react";
import Screen from "../../components/Screen";
import { DropzoneArea } from "material-ui-dropzone";

import { Stack, Card, CardMedia, CardContent } from "@mui/material";
import useApi from "../../hooks/useApi";
import { log } from "../../common/Common";
import { createUseStyles } from "react-jss";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const styles = useStyles();
  const { uploadPhotos } = useApi();

  console.log("files: ", files);

  const onChange = (filesArr) => setFiles(filesArr);

  const onDrop = async (droppedFiles) => {
    console.log("Dropped: ", droppedFiles);

    try {
      let res = await uploadPhotos(droppedFiles, (progress) => {
        log("Progress: ", progress);
      });
      log("File upload response: ", res);
    } catch (error) {
      log("Error uploading photos: ".error);
    }
  };

  return (
    <Screen title={"Upload"}>
      <DropzoneArea
        onChange={onChange}
        filesLimit={100}
        acceptedFiles={["image/*", "video/*"]}
        showPreviews={false}
        showPreviewsInDropzone={false}
        onDrop={onDrop}
      />
      <Stack direction="row" spacing={2} className={styles.stack}>
        {files.map((file) => (
          <Card className={styles.card}>
            <CardMedia
              component="img"
              className={styles.image}
              image={URL.createObjectURL(file)}
              alt="preview"
            />
            <CardContent></CardContent>
          </Card>
        ))}
      </Stack>
    </Screen>
  );
};

const useStyles = createUseStyles({
  image: {
    width: 200,
    height: 100,
    borderRadius: 5,
    objectFit: "cover",
  },
  card: {
    maxWidth: 200,
    display: "flex",
    flexDirection: "column",
  },
  stack: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default Upload;
