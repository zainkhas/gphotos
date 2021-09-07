import { Layout, Menu, Empty, Modal, message } from "antd";
import {
  PictureOutlined,
  SearchOutlined,
  StarOutlined,
  ProjectOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import MainHeader from "../../components/MainHeader";
import Photos from "../photos/Photos";
import { useHistory } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { log } from "../../common/Common";

const { Content, Sider } = Layout;

const HomeContent = ({ tabIndex }) => {
  const styles = useStyles();
  if (tabIndex === 0) {
    return <Photos />;
  }

  return (
    <div className={styles.empty}>
      <Empty />
    </div>
  );
};

const Home = () => {
  const styles = useStyles();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const history = useHistory();
  const { deleteAll } = useApi();

  const onMenuClick = (index) => {
    setSelectedTabIndex(index);
  };

  const onDeletePress = () => setDeleteModalVisible(true);
  const onUploadClick = () => {
    history.push("/upload");
  };

  const onSearch = () => {};

  const onDeletModalClose = () => setDeleteModalVisible(false);

  const onDeleteConfirm = async () => {
    setDeleting(true);
    try {
      let res = await deleteAll();
      log("deleteAll response: ", res);
      setDeleting(false);
      setDeleteModalVisible(false);
      message.success("All data deleted!");
    } catch (error) {
      log("Error deleteAll: ", error);
      setDeleting(false);
      setDeleteModalVisible(false);
      message.error("Oops! Could not delete the data!");
    }
  };

  return (
    <Layout>
      <MainHeader
        onDeletePress={onDeletePress}
        onUploadClick={onUploadClick}
        onSearch={onSearch}
      />
      <Layout>
        <Sider
          breakpoint="sm"
          collapsedWidth="0"
          theme={"light"}
          trigger={null}
        >
          <div className="logo" />
          <Menu mode="inline" defaultSelectedKeys={["0"]}>
            <Menu.Item
              key="0"
              onClick={() => onMenuClick(0)}
              icon={<PictureOutlined />}
            >
              Photos
            </Menu.Item>
            <Menu.Item
              key="1"
              onClick={() => onMenuClick(1)}
              icon={<SearchOutlined />}
            >
              Explore
            </Menu.Item>
            <Menu.ItemGroup title={"Library"}>
              <Menu.Item
                key="2"
                onClick={() => onMenuClick(2)}
                icon={<StarOutlined />}
              >
                Favorite
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => onMenuClick(3)}
                icon={<ProjectOutlined />}
              >
                Albums
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Sider>

        <Content className={styles.content}>
          <HomeContent tabIndex={selectedTabIndex} />
        </Content>
      </Layout>
      <Modal
        title={
          <span className={styles.modalTitleContainer}>
            <ExclamationCircleOutlined className={styles.confirmIcon} /> Are you
            sure delete all Photos and Videos?
          </span>
        }
        visible={deleteModalVisible}
        onOk={onDeleteConfirm}
        confirmLoading={deleting}
        onCancel={onDeletModalClose}
        okText={"Yes, Delete"}
        cancelText={"No"}
        okType={"danger"}
        destroyOnClose
      >
        <p>
          All the Photos & Videos along with their thumbnails and metadata will
          deleted permanently
        </p>
      </Modal>
    </Layout>
  );
};

const useStyles = createUseStyles({
  content: {
    marginLeft: 24,
    marginTop: 16,
    marginRight: 0,
    background: "#fff",
    padding: 24,
  },
  empty: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmIcon: {
    color: "#f56a00",
    fontSize: 20,
    marginRight: 10,
  },
  modalTitleContainer: {
    alignItems: "center",
    display: "flex",
  },
});

export default Home;
