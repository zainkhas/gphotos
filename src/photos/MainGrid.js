import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `http://localhost:3000/${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const MainGrid = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <ImageList rowHeight={160} className={classes.imageList} cols={3}>
        {data.map((item) => (
          <ImageListItem key={item.img} cols={item.cols || 1}>
            <img src={"http://localhost:3000/" + item.img} alt={item.title} />
          </ImageListItem>
        ))}
      </ImageList> */}

      <ImageList
        sx={{ width: 500, height: 450 }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {data.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
}));
export default MainGrid;
