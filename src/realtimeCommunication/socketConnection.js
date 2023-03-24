import { socket } from "../App";

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
  socket?.emit("update-card", data);
};

// Chat
export const sendDirectMessage = (data) => {
  console.log("timer", data);
  socket?.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  console.log("data", data);
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

// Invite to Word Chain Game
export const inviteToPlay = (data) => {
  socket?.emit("invite-to-play", data);
};

export const cancelInviteToPlay = (data) => {
  socket?.emit("cancel-invite", data);
};

export const responseInvitation = (data) => {
  socket?.emit("response-invitation", data);
};
