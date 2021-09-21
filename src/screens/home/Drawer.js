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

import { StarBorder, Photo, Search, PhotoAlbum } from "@mui/icons-material";

const drawerWidth = 240;
const MENU_ITEM_TYPES = {
  MENU: 0,
  SUB_HEADER: 1,
};

const menu = [
  {
    type: MENU_ITEM_TYPES.MENU,
    text: "Photos",
    Icon: Photo,
  },
  {
    type: MENU_ITEM_TYPES.MENU,
    text: "Explore",
    Icon: Search,
  },
  {
    type: MENU_ITEM_TYPES.SUB_HEADER,
    text: "Library",
  },
  {
    type: MENU_ITEM_TYPES.MENU,
    text: "Favorite",
    Icon: StarBorder,
  },
  {
    type: MENU_ITEM_TYPES.MENU,
    text: "Album",
    Icon: PhotoAlbum,
  },
];

const drawer = (
  <div>
    <Toolbar />
    <Divider />
    <List>
      {menu.map((item) =>
        item.type === MENU_ITEM_TYPES.MENU ? (
          <ListItem button key={item.text}>
            <ListItemIcon>
              <item.Icon />
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ) : (
          <ListSubheader>{item.text}</ListSubheader>
        )
      )}
    </List>
  </div>
);

const Drawer = ({ container, open, handleDrawerToggle }) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </MUIDrawer>
      <MUIDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </MUIDrawer>
    </Box>
  );
};

export default Drawer;
