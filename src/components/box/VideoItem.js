import { Button, styled, Tooltip } from "@mui/material";
import React from "react";
import * as videoHander from "../../realtimeCommunication/videoHander";

const VideoItem = ({
  video,
  videoId,
  creatorUsername,
  amountOfParticipants,
  isUserInRoom,
}) => {
  const handleJoinActiveRoom = () => {
    if (amountOfParticipants < 2) {
      // joinroom
      videoHander.joinVideoCall(videoId);
    }
  };

  const activeRoomButtonDisabled = amountOfParticipants > 2;
  const roomTitle = `Cretor: ${creatorUsername}. Connected: ${amountOfParticipants}`;
  const AvatarPreview = styled("div")({
    height: "42px",
    width: "42px",
    backgroundColor: "#5865f2",
    borderRadius: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "700",
    color: "white",
  });
  return (
    <Tooltip title={roomTitle}>
      <div>
        <Button
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "16px",
            margin: 0,
            padding: 0,
            minWidth: 0,
            marginTop: "10px",
            color: "white",
            backgroundColor: "#5865F2",
          }}
          disabled={activeRoomButtonDisabled || isUserInRoom}
          onClick={handleJoinActiveRoom}
        >
          <AvatarPreview> {creatorUsername.substring(0, 2)}</AvatarPreview>
        </Button>
      </div>
    </Tooltip>
  );
};

export default VideoItem;
