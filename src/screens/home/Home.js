import { Layout, Menu } from "antd";
import {
  PictureOutlined,
  SearchOutlined,
  StarOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import React from "react";
import { createUseStyles } from "react-jss";
import MainHeader from "../../components/MainHeader";

const { Content, Sider } = Layout;

const Home = () => {
  const styles = useStyles();

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
            <Menu.Item key="1" icon={<PictureOutlined />}>
              Photos
            </Menu.Item>
            <Menu.Item key="2" icon={<SearchOutlined />}>
              Explore
            </Menu.Item>
            <Menu.ItemGroup title={"Library"}>
              <Menu.Item key="3" icon={<StarOutlined />}>
                Favorite
              </Menu.Item>
              <Menu.Item key="4" icon={<ProjectOutlined />}>
                Albums
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Sider>

        <Content className={styles.content}>
          <div className={styles.contentWrapper}>content</div>
        </Content>
      </Layout>
    </Layout>
  );
};

const useStyles = createUseStyles({
  contentWrapper: {
    background: "#fff",
    padding: 24,
    minHeight: 360,
  },
  content: {
    marginLeft: 24,
    marginTop: 16,
    marginRight: 0,
  },
});

export default Home;
