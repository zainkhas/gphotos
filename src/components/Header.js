import React from "react";
import { PageHeader, Layout } from "antd";
import { createUseStyles } from "react-jss";
import { useHistory } from "react-router-dom";
const { Header: AntHeader } = Layout;

const Header = ({ title, subTitle }) => {
  const styles = useStyles();
  const history = useHistory();

  const onBack = () => {
    history.goBack();
  };

  return (
    <AntHeader className={styles.header} style={{ padding: 0 }}>
      <PageHeader
        className={styles.pageHeader}
        onBack={onBack}
        title={title}
        subTitle={subTitle}
      />
    </AntHeader>
  );
};

const useStyles = createUseStyles({
  pageHeader: {
    border: "1px solid rgb(235, 237, 240);",
  },
  header: {
    background: "#fff",
  },
});

export default Header;
