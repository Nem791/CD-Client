import React, { useState } from "react";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker from "emoji-picker-react";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";

import * as videoHandler from "../../realtimeCommunication/videoHander";
import { useSelector } from "react-redux";

const BoxChatInput = ({
  onChange = () => {},
  onKeyDown = () => {},
  value = "",
}) => {
  const { isUserInRoom } = useSelector((state) => state.video);

  const createVideoRoomHandler = () => {
    videoHandler.createNewRoom();
  };
  return (
    <div className="p-[20px] border-t-[1px] border-b-[1px] flex items-center">
      <input
        type="text"
        placeholder="Enter your message"
        className="w-full pr-[10px]"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {/* <EmojiPicker></EmojiPicker> */}

      <VideocamRoundedIcon
        className="ml-[10px]"
        onClick={isUserInRoom ? () => {} : createVideoRoomHandler}
      ></VideocamRoundedIcon>

      <SentimentSatisfiedAltIcon className="ml-[10px]"></SentimentSatisfiedAltIcon>
      <SendIcon className="ml-[10px]"></SendIcon>
    </div>
  );
};

export default BoxChatInput;
