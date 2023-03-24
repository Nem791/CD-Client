import React from "react";

import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import useAuthStateChanged from "../../hooks/useAuthStateChanged";

const BoxChatInput = ({
  onChange = () => {},
  onKeyDown = () => {},
  value = "",
}) => {
  const { user } = useAuthStateChanged();
  const { isInvite, isYourTurn, isGameOver } = useSelector(
    (state) => state.chat
  );

  const isTurn = isYourTurn?.player === user._id ? true : false;

  return (
    <div className="p-[20px] border-t-[1px] flex items-center">
      <input
        type="text"
        placeholder={`${
          isInvite
            ? isGameOver
              ? "Ended game"
              : isTurn
              ? "Enter your message"
              : "Wait your turn"
            : "Please invite your partner to play this game"
        }`}
        className="w-full pr-[10px]"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={!isInvite || !isTurn || isGameOver}
        style={{
          cursor: `${
            !isInvite || !isTurn || isGameOver ? "not-allowed" : "text"
          } `,
        }}
      />
      <SendIcon className="ml-[10px] cursor-pointer"></SendIcon>
    </div>
  );
};

export default BoxChatInput;
