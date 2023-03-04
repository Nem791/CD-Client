import React from "react";
import { IconButton, styled } from "@mui/material";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";

const MainContainer = styled("div")({
  position: "absolute",
  bottom: "5px",
  right: "5px",
});

const ResizeRoomButton = ({
  isRoomMinimized,
  roomResizeHandler = () => {},
}) => {
  return (
    <MainContainer>
      <IconButton style={{ color: "white" }} onClick={roomResizeHandler}>
        {isRoomMinimized ? (
          <OpenInFullRoundedIcon />
        ) : (
          <CloseFullscreenRoundedIcon />
        )}
      </IconButton>
    </MainContainer>
  );
};

export default ResizeRoomButton;
