import React from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { useDispatch, useSelector } from "react-redux";
import { setShowCardBox } from "../../store/show/showSlice";
import { Button } from "@mui/material";

import {
  setMessage,
  setShowAlert,
  setType,
} from "../../store/alert/alertSlice";
import {
  cancelInviteToPlay,
  inviteToPlay,
} from "../../realtimeCommunication/socketConnection";
import { setIsInvite } from "../../store/chat/slice";
import useAuthStateChanged from "../../hooks/useAuthStateChanged";
import { socket } from "../../App";

const BoxChatHeader = ({ time }) => {
  const dispatch = useDispatch();
  const { friends, onlineUsers } = useSelector((state) => state.friend);
  const { chosenChatDetails, roomId, isInvite, isStartGame } = useSelector(
    (state) => state.chat
  );

  const { user } = useAuthStateChanged();

  const checkOnlineUsers = (friends = [], onlineUsers = []) => {
    return friends?.map((f) => {
      const isUserOnline = onlineUsers?.find((user) => user?.userId === f?._id);
      f = { ...f, isOnline: isUserOnline ? true : false };
      return f;
    });
  };

  const handleInviteToPlay = () => {
    const receiverUser = chosenChatDetails?.participants?.filter(
      (person) => person._id !== user?._id
    );

    const isYourPartnerOnline = checkOnlineUsers(receiverUser, onlineUsers)?.[0]
      ?.isOnline;

    if (isYourPartnerOnline) {
      // inviteToPlay({ roomId: chosenChatDetails?.id, userId: user._id });
      // inviteToPlay({ roomId });
      socket.emit("invite-to-play", {
        roomId: chosenChatDetails?.id,
        userId: user?._id,
      });
      dispatch(setIsInvite(true));
      dispatch(setShowAlert(true));
      dispatch(setMessage("Waiting for your partner accept invitation!"));
      dispatch(setType("notice"));
      return;
    }
    dispatch(setShowAlert(true));
    dispatch(setMessage("Your partner is not online!"));
    dispatch(setType("notice"));
    // dispatch(setMessage("You have an invitation by Quang Vu"));
    // dispatch(setType("invite"));
  };

  const handleCancelInviteToPlay = () => {
    const senderId = user?._id;
    const receiverId = chosenChatDetails?.participants?.filter(
      (person) => person._id !== user?._id
    )?.[0]._id;

    cancelInviteToPlay({ senderId, receiverId });
    dispatch(setIsInvite(false));
  };

  return (
    <div className="p-[20px] bg-primary max-h-[130px] h-full rounded-tl-lg flex justify-between flex-none ">
      <div className="">
        <p className="text-white font-semibold text-[16px]">
          {chosenChatDetails?.name}
        </p>
        <p className="text-white font-sm">
          {chosenChatDetails?.participants?.length} Member
        </p>

        <div className="mt-[8px] flex gap-[10px] items-center justify-between">
          {/* <div className="relative">
            <img
              src={user?.avatarUrl}
              alt="chao"
              className="w-[35px] h-[35px] rounded-full object-cover"
            />
            <div className="w-[10px] h-[10px] bg-green-400 rounded-full absolute top-0 left-[25px]"></div>
          </div> */}

          {checkOnlineUsers(chosenChatDetails?.participants, onlineUsers).map(
            (fr) => {
              return (
                <div key={fr?.id} className="relative">
                  <img
                    src={fr?.avatarUrl}
                    alt="chao"
                    className="w-[35px] h-[35px] rounded-full object-cover"
                  />
                  {fr.isOnline && (
                    <div className="w-[10px] h-[10px] bg-green-400 rounded-full absolute top-0 left-[25px]"></div>
                  )}
                </div>
              );
            }
          )}

          {!isStartGame ? (
            isInvite ? (
              <Button
                variant="contained"
                style={{
                  color: "#303545",
                  textTransform: "none",
                  marginLeft: "auto",
                  backgroundColor: "#ffcd1f",
                  fontWeight: "bold",
                  marginLeft: "20px",
                }}
                onClick={handleCancelInviteToPlay}
              >
                Cancel Invite
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{
                  color: "#303545",
                  textTransform: "none",
                  marginLeft: "auto",
                  backgroundColor: "#ffcd1f",
                  fontWeight: "bold",
                  marginLeft: "20px",
                }}
                onClick={handleInviteToPlay}
              >
                Invite
              </Button>
            )
          ) : null}
        </div>
      </div>
      <div className="text-right font-semibold text-white">Time: {time}</div>
      <div
        className="cursor-pointer hover:text-[white] transition linear duration-200"
        onClick={() => {
          dispatch(setShowCardBox(false));
        }}
      >
        <ClearRoundedIcon></ClearRoundedIcon>
      </div>
    </div>
  );
};

export default BoxChatHeader;
