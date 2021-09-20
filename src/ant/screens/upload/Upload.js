import React from "react";
import Screen from "../../components/Screen";
import { Upload as AntUpload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import useApi from "../../hooks/useApi";

const { Dragger } = AntUpload;

const Upload = () => {
  const { getPhotosUploadUrl } = useApi();

  const onDrop = (e) => {
    console.log("Dropped files", e.dataTransfer.files);
  };

  const onChange = (info) => {
    console.log(info);
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Screen title={"Upload"}>
      <Dragger
        name={"photos"}
        multiple
        action={getPhotosUploadUrl()}
        onChange={onChange}
        onDrop={onDrop}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </Screen>
  );
};

export default Upload;
