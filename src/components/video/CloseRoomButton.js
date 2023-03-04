import React from "react";
import { IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import * as videoHander from "../../realtimeCommunication/videoHander";

const CloseRoomButton = () => {
  const handleLeaveRoom = () => {
    videoHander.leaveRoom();
  };
  return (
    <IconButton onClick={handleLeaveRoom} style={{ color: "white" }}>
      <CloseRoundedIcon />
    </IconButton>
  );
};

export default CloseRoomButton;
