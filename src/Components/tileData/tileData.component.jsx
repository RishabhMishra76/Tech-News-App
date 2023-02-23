import React, { useState } from "react";
import classes from "./tileData.module.css";
import moment from "moment/moment";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow placement="top" classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    maxWidth: "25rem",
    maxHeight: "25rem",
    overflowY: "auto",
    fontSize: theme.typography.pxToRem(14),
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

const BootstrapTooltipNarrow = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow placement="top" classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    maxWidth: "15rem",
    maxHeight: "15rem",
    overflowY: "auto",
    fontSize: theme.typography.pxToRem(14),
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

function TileData({ itm }) {
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  const convertDate = (date) => {
    const res = moment(date, "YYYY-MM-DD[T]HH:mm:ss").format(
      "DD-MM-YYYY hh:mm A"
    );
    return res;
  };

  return (
    <>
      <a target="_blank" href={itm?.link} rel="noreferrer">
        <div
          className={classes.spotlightContainer}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        >
          <div className={classes.left}>
            <BootstrapTooltip
              className={classes.priorityTooltip}
              title={
                <span
                  dangerouslySetInnerHTML={{ __html: itm?.title?.rendered }}
                ></span>
              }
            >
              <span
                className={hovered ? classes.titleHovered : classes.title}
                dangerouslySetInnerHTML={{ __html: itm?.title?.rendered }}
              ></span>
            </BootstrapTooltip>
            <div
              className={`${
                itm?.excerpt?.rendered.length + itm?.title?.rendered.length >
                  100 && classes.ellipsis
              } ${classes.middle} ${hovered ? classes.middleHover : ""}`}
            >
              <span
                dangerouslySetInnerHTML={{ __html: itm?.excerpt?.rendered }}
              ></span>
            </div>
          </div>
          <div className={classes.right}>
            <div
              className={hovered ? classes.imageTileHovered : classes.imageTile}
            >
              {!imageLoaded && (
                <div
                  className={
                    hovered ? classes.thumbnailHovered : classes.thumbnail
                  }
                  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <CircularProgress style={{ color: "inherit" }} size={20} />
                </div>
              )}
              <div>
                <img
                  src={itm?.jetpack_featured_media_url}
                  alt="new"
                  onLoad={() => setImageLoaded(true)}
                  style={{ display: imageLoaded ? "block" : "none" }}
                  className={
                    hovered ? classes.thumbnailHovered : classes.thumbnail
                  }
                />
              </div>
            </div>

            <div className={`${hovered ? classes.dateHover : classes.date}`}>
              {convertDate(itm?.date)}
            </div>
            <BootstrapTooltipNarrow
              className={classes.priorityTooltip}
              title={
                itm?._embedded?.authors?.[0]?.cbDescription ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: itm?._embedded?.authors?.[0]?.cbDescription,
                    }}
                  ></span>
                ) : (
                  <span>No info availabe for Author</span>
                )
              }
            >
              <div
                className={`${hovered ? classes.dateHover : classes.date} ${
                  classes.authorName
                }`}
              >
                {itm?._embedded?.authors?.[0]?.name}
              </div>
            </BootstrapTooltipNarrow>
          </div>
        </div>
      </a>
    </>
  );
}

export default TileData;
