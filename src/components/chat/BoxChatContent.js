import React from "react";
import { useSelector } from "react-redux";
import MessageItem from "./MessageItem";

const BoxChatContent = () => {
  const { messages } = useSelector((state) => state.chat);

  // Hàm chuyển định dạng ngày tháng năm
  const convertDateToHumanReadable = (date, format) => {
    const map = {
      mm: date.getMonth() + 1,
      dd: date.getDate(),
      yy: date.getFullYear().toString().slice(-2),
      yyyy: date.getFullYear(),
    };

    return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
  };
  return (
    <div className="w-full grow p-5 overflow-x-auto">
      {messages?.map((msg, index) => {
        const sameAuthor =
          index > 0 &&
          messages[index]?.author._id === messages[index - 1]?.author._id;
        const sameDay =
          index > 0 &&
          convertDateToHumanReadable(new Date(msg.date), "dd/mm/yy") ===
            convertDateToHumanReadable(
              new Date(messages[index - 1]?.date),
              "dd/mm/yy"
            );

        return (
          <MessageItem
            key={msg?._id}
            msg={msg}
            sameAuthor={sameAuthor}
            sameDay={sameDay}
            date={convertDateToHumanReadable(new Date(msg?.date), "dd/mm/yy")}
          ></MessageItem>
        );
      })}
    </div>
  );
};

export default BoxChatContent;
