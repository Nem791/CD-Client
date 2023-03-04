import React from "react";

const ChatList = ({ room = {}, onClick = () => {} }) => {
  const nameRoom = room.participants[1].name;
  const avatarFriend = room.participants[1].avatarUrl;

  return (
    <div
      className="flex items-center justify-between w-full px-[10px] py-[15px] cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        <img
          src={avatarFriend}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
        />
        <div className="ml-[10px] max-w-[220px] text-[12px]">
          <p className="font-semibold text-[15px] text-short">{nameRoom}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
