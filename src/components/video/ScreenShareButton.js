import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ScreenShareRoundedIcon from "@mui/icons-material/ScreenShareRounded";
import StopScreenShareRoundedIcon from "@mui/icons-material/StopScreenShareRounded";
import { useDispatch, useSelector } from "react-redux";
import { setScreenSharingStream } from "../../store/video/slice";
import * as webRtcHandler from "../../realtimeCommunication/webRTCHandler";

const constraints = {
  audio: false,
  video: true,
};

const ScreenShareButton = () => {
  const dispatch = useDispatch();
  const { localStream, screenSharingStream, isScreenSharingActive } =
    useSelector((state) => state.video);

  console.log({ localStream, screenSharingStream, isScreenSharingActive });
  const handleToggleCamera = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.log(
          "error occured when trying to get an access to screen share stream"
        );
        console.log(err);
      }
      if (stream) {
        dispatch(setScreenSharingStream(stream));
        webRtcHandler.switchOutgoingTracks(stream);
      }
    } else {
      // Nếu lỗi thì trở về luồng hiện tại (tức là màn hình hiện tại)
      webRtcHandler.switchOutgoingTracks(localStream);

      screenSharingStream.getTracks().forEach((t) => t.stop());
      dispatch(setScreenSharingStream(null));
    }
  };
  return (
    <IconButton onClick={handleToggleCamera} style={{ color: "white" }}>
      {isScreenSharingActive ? (
        <ScreenShareRoundedIcon />
      ) : (
        <StopScreenShareRoundedIcon />
      )}
    </IconButton>
  );
};

export default ScreenShareButton;
