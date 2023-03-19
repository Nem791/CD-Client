import React from "react";

import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";

const BoxChatInput = ({
  onChange = () => {},
  onKeyDown = () => {},
  value = "",
}) => {
  const { isInvite } = useSelector((state) => state.chat);

  return (
    <div className="p-[20px] border-t-[1px] flex items-center">
      <input
        type="text"
        placeholder={`${
          isInvite
            ? "Enter your message"
            : "Please invite your partner to play this game"
        }`}
        className="w-full pr-[10px]"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={!isInvite}
      />
      <SendIcon className="ml-[10px] cursor-pointer"></SendIcon>
    </div>
  );
};

export default BoxChatInput;
