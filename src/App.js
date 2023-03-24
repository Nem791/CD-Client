import React, { useEffect, useState } from "react";

import axios from "axios";
import Router from "./Router";
import Alert from "./components/common/Alert";
import { useDispatch, useSelector } from "react-redux";
import IconChat from "./components/chat/IconChat";
import { io } from "socket.io-client";
import useAuthStateChanged from "./hooks/useAuthStateChanged";
import { setPendingMemberInvitations } from "./store/member/memberSlice";
import {
  setFriends,
  setOnlineUsers,
  setPendingFriendInvitation,
} from "./store/friend/friendSlice";
import { setChatRooms, setMessages, setRoomId } from "./store/chat/slice";
import {
  setCardList,
  setCardListReal,
  setCardStudied,
  setNoCardStudied,
} from "./store/card/slice";
import { setSavedEvent } from "./store/schedule/scheduleSlice";

axios.defaults.withCredentials = true;
export const socket = io(`http://localhost:3000`, {
  autoConnect: true,
});

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const dispatch = useDispatch();

  const { showAlert, message, type } = useSelector((state) => state.alert);
  const { showIconChat } = useSelector((state) => state.show);
  const { user, isLogin } = useAuthStateChanged();
  console.log(socket);
  function onConnect() {
    console.log("successfully connected with socket.io server");
    setIsConnected(true);
  }
  const auth = () => {
    console.log({ user });
    socket.emit("authenticate", user);
  };

  useEffect(() => {
    if (!isLogin) return;
    socket.on("connect", onConnect);
    auth();
    // Lắng nghe sự kiện member-invitations
    socket.on("member-invitations", (data) => {
      const { pendingInvitations } = data;

      dispatch(setPendingMemberInvitations(pendingInvitations));
    });

    // Lắng nghe sự kiện friend-invitations
    socket.on("friend-invitations", (data) => {
      const { pendingInvitations } = data;

      dispatch(setPendingFriendInvitation(pendingInvitations));
    });

    // Lắng nghe sự kiện lấy friends-list
    socket.on("friends-lists", (data) => {
      const { friends } = data;

      dispatch(setFriends(friends));
    });

    // Lắng nghe sự kiện ng dùng online

    socket.on("online-users", (data) => {
      const { onlineUsers } = data;
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("rooms-lists", (data) => {
      const { rooms } = data;

      dispatch(setChatRooms(rooms));
    });

    socket.on("direct-chat-history", (data) => {
      // updateDirectChatHistoryIfActive(data);
      const messageConvert = data?.conversations?.map((conversation, index) => {
        return conversation?.messages.map((msg) => {
          return { ...msg, turn: index + 1 };
        });
      });

      dispatch(setMessages(messageConvert));
      dispatch(setRoomId(data?.conversations.at(-1)._id));
    });

    socket.on("sendCardToClient", (data) => {
      dispatch(setCardList(data));
    });

    socket.on("getCardInClient", (data) => {
      dispatch(setCardListReal(data));
    });

    socket.on("sendStudiedCardToClient", (data) => {
      dispatch(setCardStudied(data));
    });

    socket.on("sendNotStudiedCardToClient", (data) => {
      dispatch(setNoCardStudied(data));
    });

    // Schedule

    socket.on("sendScheduleToClient", (data) => {
      dispatch(setSavedEvent(data));
    });
    return () => {
      socket.off("connect", onConnect);
    };
  }, [isLogin]);

  return (
    <div className="relative">
      <Router></Router>
      <Alert show={showAlert} message={message} type={type}></Alert>
      {showIconChat && <IconChat></IconChat>}
    </div>
  );
}

export default App;
