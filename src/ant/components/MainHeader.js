import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { Button, Layout, Input, Avatar, Dropdown, Menu, Modal } from "antd";
import { useHistory } from "react-router-dom";
import { SettingOutlined, DeleteOutlined } from "@ant-design/icons";
const { Header } = Layout;
const { Search } = Input;
const { confirm } = Modal;

const MainHeader = ({ onDeletePress, onUploadClick, onSearch }) => {
  const styles = useStyles();

  const menu = (
    <Menu>
      <Menu.Item icon={<SettingOutlined />}>
        <a onClick={() => {}}>Settings</a>
      </Menu.Item>
      <Menu.Item icon={<DeleteOutlined className={styles.deleteIcon} />}>
        <a onClick={onDeletePress}>Delete Data</a>
      </Menu.Item>
    </Menu>
  );

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
        <div className={styles.headerRightContent}>
          <Button type="link" onClick={onUploadClick}>
            Upload
          </Button>
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <Avatar className={styles.avatar}>ZK</Avatar>
            </a>
          </Dropdown>
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
  headerRightContent: {
    paddingRight: 10,
  },
  deleteIcon: {
    color: "red",
  },
  avatar: {
    color: "#f56a00",
    backgroundColor: "#fde3cf",
  },
});

export default MainHeader;
