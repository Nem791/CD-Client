import React from "react";
import { styled } from "@mui/material";

import ScreenShareButton from "./ScreenShareButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import CameraButton from "./CameraButton";
import { useSelector } from "react-redux";

const MainContainer = styled("div")({
  height: "15%",
  width: "100%",
  backgroundColor: "#4a8063",
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
});

const RoomButtons = () => {
  const { localStream, isUserJoinedWithOnlyAudio } = useSelector(
    (state) => state.video
  );
  return (
    <MainContainer>
      {!isUserJoinedWithOnlyAudio && <ScreenShareButton></ScreenShareButton>}
      <MicButton localStream={localStream}></MicButton>
      <CloseRoomButton></CloseRoomButton>

      {!isUserJoinedWithOnlyAudio && (
        <CameraButton localStream={localStream}></CameraButton>
      )}
    </MainContainer>
  );
};

export default RoomButtons;
