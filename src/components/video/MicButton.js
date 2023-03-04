import React, { useState } from "react";
import { IconButton } from "@mui/material";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";

const MicButton = ({ localStream }) => {
  const [micEnabled, setMicEnabled] = useState(true);
  const handleToggleMic = () => {
    localStream.getAudioTracks()[0].enabled = !micEnabled;

    setMicEnabled(!micEnabled);
  };
  return (
    <IconButton onClick={handleToggleMic} style={{ color: "white" }}>
      {micEnabled ? <MicRoundedIcon /> : <MicOffRoundedIcon />}
    </IconButton>
  );
};

export default MicButton;
