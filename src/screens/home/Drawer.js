import React from "react";
import MUIDrawer from "@mui/material/Drawer";
import {
  Box,
  Divider,
  List,
  ListItem,
  Toolbar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import {
  StarBorder,
  Photo,
  Search,
  PhotoAlbum,
  Delete,
} from "@mui/icons-material";
import { DRAWER_TABS } from "./DRAWER_TABS";
import { useLocation } from "react-router-dom";

export const DRAWER_WIDTH = 240;
const MENU_ITEM_TYPES = {
  MENU: 0,
  SUB_HEADER: 1,
};

const menu = [
  {
    id: DRAWER_TABS.PHOTOS,
    type: MENU_ITEM_TYPES.MENU,
    text: "Photos",
    Icon: Photo,
    path: "/",
  },
  {
    id: DRAWER_TABS.EXPLORER,
    type: MENU_ITEM_TYPES.MENU,
    text: "Explore",
    Icon: Search,
    path: "/explorer",
  },
  {
    type: MENU_ITEM_TYPES.SUB_HEADER,
    text: "Library",
  },
  {
    id: DRAWER_TABS.FAVORITES,
    type: MENU_ITEM_TYPES.MENU,
    text: "Favorite",
    Icon: StarBorder,
    path: "/favorite",
  },
  {
    id: DRAWER_TABS.ALBUM,
    type: MENU_ITEM_TYPES.MENU,
    text: "Album",
    Icon: PhotoAlbum,
    path: "/album",
  },
  {
    id: DRAWER_TABS.TRASH,
    type: MENU_ITEM_TYPES.MENU,
    text: "Trash",
    Icon: Delete,
    path: "/trash",
  },
];

const DrawerMenuItems = ({ onMenuChange }) => {
  const location = useLocation();
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menu.map((item) =>
          item.type === MENU_ITEM_TYPES.MENU ? (
            <ListItem
              button
              key={item.text}
              sx={{
                backgroundColor: (theme) =>
                  location?.pathname == item.path
                    ? theme?.palette?.action?.selected
                    : "#FFF",
              }}
              onClick={() => onMenuChange(item.id)}
            >
              <ListItemIcon>
                <item.Icon />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ) : (
            <ListSubheader key={item.text}>{item.text}</ListSubheader>
          )
        )}
      </List>
    </div>
  );
};

const Drawer = ({ container, open, handleDrawerToggle, onMenuChange }) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="menu"
    >
      <MUIDrawer
        container={container}
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
      >
        <DrawerMenuItems onMenuChange={onMenuChange} />
      </MUIDrawer>
      <MUIDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            borderRightWidth: 0,
          },
        }}
        open
      >
        <DrawerMenuItems onMenuChange={onMenuChange} />
      </MUIDrawer>
    </Box>
  );
};

export default Drawer;
