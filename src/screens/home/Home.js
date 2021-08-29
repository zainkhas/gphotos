import { Layout, Menu, Empty } from "antd";
import {
  PictureOutlined,
  SearchOutlined,
  StarOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import MainHeader from "../../components/MainHeader";
import Photos from "../photos/Photos";

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

  const onMenuClick = (index) => {
    setSelectedTabIndex(index);
  };

  return (
    <Layout>
      <MainHeader />
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
});

export default Home;
