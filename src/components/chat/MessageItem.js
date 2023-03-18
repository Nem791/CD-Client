import { Divider } from "@mui/material";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { setVocabularyChat } from "../../store/chat/slice";

const MessageItem = ({ msg, sameAuthor, sameDay, date }) => {
  console.log(msg);
  const dispatch = useDispatch();
  const getWord = async () => {
    try {
      const getDefinitionCard = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en_US/${msg?.content.trim()}`,
        {
          withCredentials: false,
          // Để false thì ta ms gọi dc API tránh khỏi thằng CORS
        }
      );

      if (getDefinitionCard?.data) {
        dispatch(
          setVocabularyChat({ word: getDefinitionCard?.data, isHaveWord: true })
        );
      }
    } catch (err) {
      console.log(err);
      dispatch(setVocabularyChat({ word: [], isHaveWord: false }));
    }
  };

  if (msg?.content === "Game over 🏳️") {
    return (
      <>
        <div
          className="flex items-center mt-[5px] cursor-pointer"
          onClick={getWord}
        >
          <div className="ml-[50px] mb-[20px]">
            <div className="bg-[#3d4042] rounded-xl text-white p-[6px] max-w-[240px] w-max">
              {msg.content}
            </div>
          </div>
        </div>
        <Divider
          textAlign="left"
          style={{ marginBottom: "20px", fontWeight: "bold" }}
        >{`Turn ${msg.turn}`}</Divider>
      </>
    );
  }
  if (sameAuthor && sameDay) {
    return (
      <div
        className="flex items-center mt-[5px] cursor-pointer"
        onClick={getWord}
      >
        <div className="ml-[50px]">
          <div className="bg-[#3d4042] rounded-xl text-white p-[6px] max-w-[240px] w-max">
            {msg.content}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center cursor-pointer" onClick={getWord}>
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
