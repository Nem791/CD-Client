import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ChatList from "./ChatList";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { setChosenChatDetails } from "../../store/chat/slice";
import { setShowCardBox } from "../../store/show/showSlice";

const MessageListBox = ({ isOpen, onClick = () => {} }) => {
  const dispatch = useDispatch();

  const { chatRooms } = useSelector((state) => state.chat);

  const handleChooseActiveConversation = (id, name, participants) => {
    dispatch(setChosenChatDetails({ id, name, participants }));
  };

  return (
    <div
      className={`box absolute bg-white top-10 right-0 shadow-card rounded-[8px] w-[300px] ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <p className="px-[10px] py-[15px] flex items-center justify-center border-b-[2px]">
        <span className=" flex items-center justify-center font-semibold">
          Your Message
        </span>
      </p>
      <div className="px-[10px] max-h-[300px] overflow-x-auto">
        {chatRooms.length === 0 && (
          <div className="text-center w-full px-[10px] py-[15px]">
            <SentimentVeryDissatisfiedIcon
              style={{
                fontSize: "40px",
              }}
            ></SentimentVeryDissatisfiedIcon>

            <div className="mt-[10px]">You don't have any message</div>
          </div>
        )}
        {chatRooms?.map((room) => {
          return (
            <ChatList
              key={room?._id}
              room={room}
              onClick={() => {
                dispatch(setShowCardBox(true));
                onClick(false);
                handleChooseActiveConversation(
                  room?._id,
                  room?.participants[1].name,
                  room.participants
                );
              }}
            ></ChatList>
          );
        })}
      </div>
    </div>
  );
};

export default MessageListBox;
