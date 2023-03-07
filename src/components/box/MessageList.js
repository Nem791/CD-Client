import React from "react";
import SmsIcon from "@mui/icons-material/Sms";
import MessageListBox from "./MessageListBox";
import useToggleValue from "../../hooks/useToggleValue";
const MessageList = () => {
  const { value: show, handleToggleValue: handleClick } = useToggleValue();
  return (
    <div className="box-wrapper relative">
      <SmsIcon
        className="w-5 h-5 text-[#586380] hover:opacity-[0.5] cursor-pointer"
        onClick={handleClick}
      ></SmsIcon>
      <MessageListBox isOpen={show} onClick={handleClick}></MessageListBox>
    </div>
  );
};

export default MessageList;
