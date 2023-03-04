import io from "socket.io-client";
import {
  setCardList,
  setCardListReal,
  setCardStudied,
  setNoCardStudied,
} from "../store/card/slice";
import { setChatRooms, setMessages } from "../store/chat/slice";
import {
  setFriends,
  setOnlineUsers,
  setPendingFriendInvitation,
} from "../store/friend/friendSlice";

import { setPendingMemberInvitations } from "../store/member/memberSlice";
import { setSavedEvent } from "../store/schedule/scheduleSlice";
import { updateDirectChatHistoryIfActive } from "../utils/chat";
import { domain } from "../utils/common";
import * as videoHander from "./videoHander";
import * as webRTCHandler from "./webRTCHandler";

let socket = null;

export const connectWithSocketServer = (user, dispatch) => {
  // Kết nối socket.io bên server
  socket = io(`http://localhost:3000`, {
    // Truyền dữ liệu ng dùng sang backend
    auth: { user },
  });

  // Lắng nghe sự kiện connect => nếu connect thành công vs server sẽ in ra
  socket.on("connect", () => {
    console.log("successfully connected with socket.io server");
    // console.log(socket);
  });

  // Lắng nghe sự kiện member-invitations
  socket.on("member-invitations", (data) => {
    const { pendingInvitations } = data;

    dispatch(setPendingMemberInvitations(pendingInvitations));
  });

  // Lắng nghe sự kiện friend-invitations
  socket.on("friend-invitations", (data) => {
    const { pendingInvitations } = data;
    // console.log(pendingInvitations);

    dispatch(setPendingFriendInvitation(pendingInvitations));
  });

  // Lắng nghe sự kiện lấy friends-list
  socket.on("friends-lists", (data) => {
    const { friends } = data;
    // console.log(friends);
    dispatch(setFriends(friends));
  });

  // Lắng nghe sự kiện ng dùng online

  socket.on("online-users", (data) => {
    // console.log("user-online");
    const { onlineUsers } = data;
    dispatch(setOnlineUsers(onlineUsers));
  });

  socket.on("rooms-lists", (data) => {
    const { rooms } = data;

    dispatch(setChatRooms(rooms));
  });

  socket.on("direct-chat-history", (data) => {
    updateDirectChatHistoryIfActive(data);
    dispatch(setMessages(data.messages));
  });

  socket.on("sendCardToClient", (data) => {
    console.log(data);
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

  // video
  socket.on("room-create", (data) => {
    videoHander.newRoomCreated(data);
  });

  socket.on("active-rooms", (data) => {
    videoHander.updateActiveRooms(data);
  });

  socket.on("conn-prepare", (data) => {
    // 1. Chuẩn bị kết nối peer-to-peer
    const { connUserSocketId } = data;

    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

    socket.emit("conn-init", { connUserSocketId: connUserSocketId });
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("conn-signal", (data) => {
    webRTCHandler.handleSignalingData(data);
  });

  socket.on("room-participant-left", (data) => {
    console.log("user left room", data);
    webRTCHandler.handleParticipantLeftRoom(data);
  });

  // Schedule

  socket.on("sendScheduleToClient", (data) => {
    dispatch(setSavedEvent(data));
  });
};

export const createCard = (data) => {
  socket?.emit("create-card", data);
};

export const deleteCard = (data) => {
  socket?.emit("delete-card", data);
};

export const joinSet = (id) => {
  socket?.emit("join-set", id);
};

export const joinChatRoom = () => {};

export const getCard = (id) => {
  socket?.emit("get-card", id);
};

export const getStudied = (setId) => {
  socket?.emit("get-studied", setId);
};

export const getNotStudied = (setId) => {
  socket?.emit("get-not-studied", setId);
};

export const updateCard = (data) => {
  console.log(data);
  socket?.emit("update-card", data);
};

// Chat
export const sendDirectMessage = (data) => {
  socket?.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  socket?.emit("direct-chat-history", data);
};

export const createNewRoom = () => {
  socket?.emit("room-create");
};

export const joinVideoCall = (data) => {
  socket?.emit("room-join", data);
};

export const leaveRoom = (data) => {
  socket?.emit("room-leave", data);
};

export const signalPeerData = (data) => {
  socket?.emit("conn-signal", data);
};

// Schedule
export const joinSchedule = (data) => {
  socket?.emit("join-schedule", data);
};

export const createSchedule = (data) => {
  socket?.emit("create-schedule", data);
};

export const updateSchedule = (data) => {
  socket?.emit("update-schedule", data);
};

export const deleteSchedule = (data) => {
  socket?.emit("delete-schedule", data);
};
