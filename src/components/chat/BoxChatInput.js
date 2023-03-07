import React from "react";

import SendIcon from "@mui/icons-material/Send";

const BoxChatInput = ({
  onChange = () => {},
  onKeyDown = () => {},
  value = "",
}) => {
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

      <SendIcon className="ml-[10px]"></SendIcon>
    </div>
  );
};

export default BoxChatInput;
