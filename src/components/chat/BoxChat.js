import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDirectChatHistory,
  sendDirectMessage,
} from "../../realtimeCommunication/socketConnection";
import BoxChatContent from "./BoxChatContent";
import BoxChatHeader from "./BoxChatHeader";
import BoxChatInput from "./BoxChatInput";
import lodash from "lodash";
import ReactDOM from "react-dom";
import { setShowCardBox } from "../../store/show/showSlice";
import WordBox from "./WordBox";
import axios from "axios";
import {
  setMessage,
  setShowAlert,
  setType,
} from "../../store/alert/alertSlice";

const BoxChat = () => {
  const [message, setMessageChat] = useState("");
  const { showCardBox } = useSelector((state) => state.show);
  const { chosenChatDetails, messages } = useSelector((state) => state.chat);
  const [time, setTime] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [turn, setTurn] = useState(1);

  const dispatch = useDispatch();

  const handleMessageValueChange = (e) => {
    e.preventDefault();
    setMessageChat(e.target.value);
  };

  const handleKeyPressed = lodash.debounce((e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  }, 200);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        clearInterval(timer);
        setGameOver(true);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  console.log(time);

  const handleSendMessage = async () => {
    try {
      if (message.length > 0) {
        const lastItem = messages[messages.length - 1]; // Lấy phần tử cuối cùng
        const lastChar = lastItem?.content?.charAt(lastItem.content.length - 1);

        const firstCharMessage = message.charAt(0);

        const getDefinitionCard = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en_US/${message}`,
          {
            withCredentials: false,
            // Để false thì ta ms gọi dc API tránh khỏi thằng CORS
          }
        );

        if (getDefinitionCard?.data) {
          if (lastChar !== firstCharMessage && messages?.length > 0) {
            dispatch(setShowAlert(true));
            dispatch(
              setMessage(
                "Ký tự đầu tiên của từ phải trùng với ký tự cuối cùng của từ trước đó"
              )
            );
            dispatch(setType("notice"));
            setMessageChat("");
            return;
          }
          sendDirectMessage({
            roomChatId: chosenChatDetails.id,
            content: message,
          });
          setMessageChat("");
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(setShowAlert(true));
      dispatch(setMessage("Từ của bạn không chính xác"));
      dispatch(setType("notice"));

      setMessageChat("");
    }
  };

  const handleClose = () => {
    dispatch(setShowCardBox(false));
  };

  useEffect(() => {
    getDirectChatHistory({
      roomId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);
  return ReactDOM.createPortal(
    <>
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[rgba(0,0,0,0.25)] z-40 ${
          showCardBox ? "visible opacity-1" : "invisible opacity-0"
        }`}
        onClick={handleClose}
      ></div>
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[1000px] h-[580px] z-[52] shadow-card transition-all linear rounded-lg grid grid-cols-2 ${
          showCardBox ? "visible opacity-1" : "invisible opacity-0"
        }`}
        style={{ gridTemplateColumns: "70% 30%" }}
      >
        <div className="flex flex-col h-full">
          <BoxChatHeader></BoxChatHeader>
          <BoxChatContent></BoxChatContent>
          <BoxChatInput
            value={message}
            onChange={handleMessageValueChange}
            onKeyDown={handleKeyPressed}
          ></BoxChatInput>
        </div>

        <div className="border-l-[1px]">
          <WordBox></WordBox>
        </div>
      </div>
    </>,
    document.querySelector("body")
  );
};

export default BoxChat;
