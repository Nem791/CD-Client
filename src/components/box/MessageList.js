import React from "react";

import MessageListBox from "./MessageListBox";
import useToggleValue from "../../hooks/useToggleValue";
import { SmallButton } from "../button";
const MessageList = () => {
  const { value: show, handleToggleValue: handleClick } = useToggleValue();
  return (
    <div className="box-wrapper relative">
      <SmallButton
        className="text-white bg-black hover:bg-gray-700 relative"
        onClick={handleClick}
      >
        <span>Games</span>
      </SmallButton>
      <MessageListBox isOpen={show} onClick={handleClick}></MessageListBox>
    </div>
  );
};

export default MessageList;
