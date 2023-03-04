import { store } from "../store/configureStore";
import {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setRemoteStream,
  setScreenSharingStream,
  setIsUserJoinedWithOnlyAudio,
} from "../store/video/slice";
import * as socketConnection from "./socketConnection";
import * as webRtcHandler from "./webRTCHandler";

export const createNewRoom = () => {
  const successCallbackFun = () => {
    store.dispatch(
      setOpenRoom({ isUserInRoom: true, isUserRoomCreator: true })
    );

    const onlyAudio = store.getState().video.audioOnly;
    store.dispatch(setIsUserJoinedWithOnlyAudio(onlyAudio));
    socketConnection.createNewRoom();
  };

  const onlyAudio = store.getState().video.audioOnly;
  // Lấy đc quyền truy cập vào Local Stream thì mới tạo phòng
  webRtcHandler.getLocalStreamPreview(onlyAudio, successCallbackFun);
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
  const { activeRooms } = data;

  const friends = store.getState().friend.friends;

  const rooms = [];
  const userId = store.getState().auth.user._id;

  activeRooms.forEach((room) => {
    const isRoomCreatedByMe = room.roomCreator.userId === userId;

    if (isRoomCreatedByMe) {
      rooms.push({ ...room, creatorUserName: "Me" });
    }
    friends.forEach((f) => {
      if (f.id === room.roomCreator.userId) {
        rooms.push({ ...room, creatorUserName: f.username });
      }
    });
  });

  store.dispatch(setActiveRooms(rooms));
};

export const joinVideoCall = (roomId) => {
  const successCallbackFun = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(
      setOpenRoom({ isUserInRoom: true, isUserRoomCreator: false })
    );

    const onlyAudio = store.getState().video.audioOnly;
    store.dispatch(setIsUserJoinedWithOnlyAudio(onlyAudio));
    socketConnection.joinVideoCall({ roomId });
  };

  const onlyAudio = store.getState().video.audioOnly;

  webRtcHandler.getLocalStreamPreview(onlyAudio, successCallbackFun);
};

export const leaveRoom = () => {
  const roomId = store.getState().video.roomDetails.roomId;

  // Khi thoát phòng tắt tất cả Local stream
  const localStream = store.getState().video.localStream;

  if (localStream) {
    localStream.getTracks()?.forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }

  const screenSharingStream = store.getState().video.screenSharingStream;
  if (screenSharingStream) {
    screenSharingStream.getTracks()?.forEach((track) => track.stop());
    store.dispatch(setScreenSharingStream(null));
  }

  store.dispatch(setRemoteStream([]));

  webRtcHandler.closeAllConnections();

  socketConnection.leaveRoom({ roomId });
  store.dispatch(setRoomDetails([]));
  store.dispatch(
    setOpenRoom({ isUserInRoom: false, isUserRoomCreator: false })
  );
};
