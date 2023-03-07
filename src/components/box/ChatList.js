import React from "react";
import useAuthStateChanged from "../../hooks/useAuthStateChanged";

const ChatList = ({ room = {}, onClick = () => {} }) => {
  const { user } = useAuthStateChanged();

  const friend = room.participants.filter((el) => el._id !== user._id);

  return (
    <div
      className="flex items-center justify-between w-full px-[10px] py-[15px] cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        <img
          src={friend[0]?.avatarUrl}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
        />
        <div className="ml-[10px] max-w-[220px] text-[12px]">
          <p className="font-semibold text-[15px] text-short">
            {friend[0]?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
