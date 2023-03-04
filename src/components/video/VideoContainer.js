import React from "react";
import { styled } from "@mui/material";
import Video from "./Video";
import { useSelector } from "react-redux";

const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const VideoContainer = () => {
  const { localStream, remoteStreams, screenSharingStream } = useSelector(
    (state) => state.video
  );

  console.log("remoteStreams", remoteStreams);
  return (
    <MainContainer>
      <Video
        stream={screenSharingStream ? screenSharingStream : localStream}
        isLocalStream
      ></Video>
      {remoteStreams?.map((stream) => (
        <Video stream={stream} key={stream.id} />
      ))}
    </MainContainer>
  );
};

export default VideoContainer;
