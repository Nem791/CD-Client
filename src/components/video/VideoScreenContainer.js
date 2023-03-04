import React, { useState } from "react";
import { styled } from "@mui/material";
import ResizeRoomButton from "./ResizeRoomButton";
import VideoContainer from "./VideoContainer";
import RoomButtons from "./RoomButtons";

const MainContainer = styled("div")({
  position: "fixed",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#202225",
  zIndex: "55",
});

const fullScreenRoomStyle = {
  width: "100%",
  height: "100vh",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
};

const minimizedRoomStyle = {
  bottom: "8px",
  right: "8px",
  width: "30%",
  height: "40vh",
};

const VideoScreenContainer = () => {
  const [isRoomMinimized, setIsRoomMinimized] = useState(true);
  const roomResizeHandler = () => {
    setIsRoomMinimized(!isRoomMinimized);
  };
  return (
    <MainContainer
      style={isRoomMinimized ? minimizedRoomStyle : fullScreenRoomStyle}
    >
      <VideoContainer />
      <RoomButtons></RoomButtons>
      <ResizeRoomButton
        isRoomMinimized={isRoomMinimized}
        roomResizeHandler={roomResizeHandler}
      ></ResizeRoomButton>
    </MainContainer>
  );
};

export default VideoScreenContainer;
