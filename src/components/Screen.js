import React from "react";
import Header from "./Header";
import { Layout } from "antd";
import { createUseStyles } from "react-jss";
const { Content } = Layout;

const Screen = ({ title, subtitle, children }) => {
  const styles = useStyles();
  return (
    <Layout>
      <Header title={title} subTitle={subtitle} />
      <Layout>
        <Content className={styles.content}>
          <div className={styles.contentWrapper}>{children}</div>
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

export default Screen;
