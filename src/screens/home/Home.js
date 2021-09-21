import React, { useState } from "react";
import { Box } from "@mui/material";
import Drawer from "./Drawer";
import MainHeader from "./MainHeader";

const Home = ({ window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onDeletePress = () => {};

  const onUploadClick = () => {
    alert("Upload Clicked");
  };

  const onSearch = () => {};

  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <MainHeader
        handleDrawerToggle={handleDrawerToggle}
        onDeletePress={onDeletePress}
        onUploadClick={onUploadClick}
        onSearch={onSearch}
      />
      <Drawer
        container={container}
        open={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </Box>
  );
};

export default Home;
