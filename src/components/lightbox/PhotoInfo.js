import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import moment from "moment";
import {
  CloseOutlined,
  CalendarOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Typography, Input } from "antd";
const { Title, Text } = Typography;

const InfoItem = ({ title, text, Icon }) => {
  const styles = useStyles();
  return (
    <div className={styles.infoItem}>
      <Icon className={styles.infoRowIcon} />
      <div className={styles.infoRowData}>
        <Text className={styles.infoRowTitle}>{title}</Text>
        <div className={styles.infoRowDetails}>
          {text?.map((detail) => (
            <Text className={styles.detailItem}>{detail}</Text>
          ))}
        </div>
      </div>
    </div>
  );
};

const PhotoInfo = ({ image, onClose }) => {
  console.log("image: ", image);
  const styles = useStyles();
  const [data, setData] = useState();

  useEffect(() => {
    const { dateCreated, name, metaData } = image;
    let detailNameSize = [];
    if (metaData) {
      const meta = JSON.parse(metaData);
      detailNameSize = [
        meta.megaPixels,
        meta.width + "X" + meta.height,
        meta.size,
      ];
    }

    let mdate = moment(dateCreated);
    let createdDate = mdate.format("MMM D");
    let createdTime = mdate.format("ddd, h:mm A");
    let createdTimeZone = mdate.format("Z");

    setData({
      titleDateTime: createdDate,
      detailDateTime: [createdTime, "GMT" + createdTimeZone],
      titleNameSize: name,
      detailNameSize,
    });
  }, [image]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={4}>
          <CloseOutlined className={styles.closeIcon} onClick={onClose} /> Info
        </Title>
      </div>

      <Input placeholder="Add a description" />

      <div className={styles.details}>
        <Text type="secondary" className={styles.detailsTitle}>
          DETAILS
        </Text>
        <InfoItem
          Icon={CalendarOutlined}
          title={data?.titleDateTime}
          text={data?.detailDateTime}
        />
        <InfoItem
          Icon={PictureOutlined}
          title={data?.titleNameSize}
          text={data?.detailNameSize}
        />
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
  },
  header: {},
  closeIcon: {
    color: "#34495e",
    fontSize: 20,
    marginRight: 10,
  },
  details: {
    paddingTop: 20,
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
  infoRowData: {
    display: "flex",
    flexDirection: "column",
  },
  infoRowIcon: {
    fontSize: 20,
    marginRight: 20,
  },
  infoRowTitle: {
    fontSize: 16,
  },
  detailsTitle: {
    marginBottom: 20,
  },
  detailItem: {
    marginRight: 15,
  },
  infoRowDetails: {
    display: "flex",
  },
});

export default PhotoInfo;
