import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDirectChatHistory,
  sendDirectMessage,
} from "../../realtimeCommunication/socketConnection";
import BoxChatContent from "./BoxChatContent";
import BoxChatHeader from "./BoxChatHeader";
import BoxChatInput from "./BoxChatInput";
import lodash from "lodash";

const BoxChat = () => {
  const [message, setMessage] = useState("");
  const { showCardBox } = useSelector((state) => state.show);
  const { chosenChatDetails } = useSelector((state) => state.chat);

  const handleMessageValueChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleKeyPressed = lodash.debounce((e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  }, 200);

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        roomChatId: chosenChatDetails.id,
        content: message,
      });

      setMessage("");
    }
  };

  useEffect(() => {
    getDirectChatHistory({
      roomId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);
  return (
    <div
      className={`absolute bg-white w-[400px] h-[580px] bottom-0 right-0 z-[51] shadow-card transition-all linear rounded-lg flex flex-col ${
        showCardBox ? "visible opacity-1" : "invisible opacity-0"
      }`}
    >
      <BoxChatHeader></BoxChatHeader>
      <BoxChatContent></BoxChatContent>
      <BoxChatInput
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
      ></BoxChatInput>
    </div>
  );
};

export default BoxChat;
