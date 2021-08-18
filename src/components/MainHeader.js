import React from "react";
import { createUseStyles } from "react-jss";
import { Button, Layout, Input } from "antd";
import { useHistory } from "react-router-dom";
const { Header } = Layout;
const { Search } = Input;

const MainHeader = () => {
  const history = useHistory();
  const styles = useStyles();

  const onSearch = () => {};
  const onUploadClick = () => {
    history.push("/upload");
  };

  return (
    <Header className={styles.header} style={{ padding: 0 }}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer} />
        <div className={styles.headerCenter}>
          <Search
            placeholder="Search Photos..."
            onSearch={onSearch}
            enterButton
          />
        </div>
        <div>
          <Button type="link" onClick={onUploadClick}>
            Upload
          </Button>
        </div>
      </div>
    </Header>
  );
};

const useStyles = createUseStyles({
  header: {
    background: "#fff",
  },
  headerContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerCenter: {
    display: "flex",
    flex: 1,
  },
  logoContainer: {
    width: 200,
    height: 64,
  },
});

export default MainHeader;
