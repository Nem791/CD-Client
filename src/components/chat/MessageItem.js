import React from "react";

const MessageItem = ({ msg, sameAuthor, sameDay, date }) => {
  // console.log(msg?.author);
  if (sameAuthor && sameDay) {
    return (
      <div className="flex items-center mt-[5px]">
        <div className="ml-[50px]">
          <div className="bg-[#3d4042] rounded-xl text-white p-[6px] max-w-[240px] w-max">
            {msg.content}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <img
        src={msg?.author.avatarUrl}
        alt="chao"
        className="w-[35px] h-[35px] rounded-full object-cover"
      />
      <div className="ml-[14px]">
        <div className="flex">
          <div className="font-bold">{msg?.author.name}</div>
          <span className="text-[12px] ml-[8px] text-[#72767d]">{date}</span>
        </div>
        <div className="bg-[#3d4042] rounded-xl text-white p-[6px] max-w-[240px] w-max">
          {msg.content}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
