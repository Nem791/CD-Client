import { Divider } from "@mui/material";
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
    <div className="w-full grow p-5 overflow-y-auto max-h-[385px]">
      {messages?.map((msg, index) => {
        const turn = index + 1;
        return msg?.map((item, index2) => {
          const sameAuthor =
            index2 > 0 &&
            msg[index2]?.author?._id === msg[index2 - 1]?.author?._id;
          const sameDay =
            index2 > 0 &&
            convertDateToHumanReadable(new Date(item.date), "dd/mm/yy") ===
              convertDateToHumanReadable(
                new Date(msg[index2 - 1]?.date),
                "dd/mm/yy"
              );

          return (
            <React.Fragment key={item?._id}>
              {index2 === 0 && (
                <Divider
                  textAlign="left"
                  style={{
                    marginBottom: "10px",
                    marginTop: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {`Turn ${turn}`}
                </Divider>
              )}
              <MessageItem
                msg={item}
                sameAuthor={sameAuthor}
                sameDay={sameDay}
                date={convertDateToHumanReadable(
                  new Date(item?.date),
                  "dd/mm/yy"
                )}
              />
            </React.Fragment>
          );
        });
      })}
    </div>
  );
};

export default BoxChatContent;
