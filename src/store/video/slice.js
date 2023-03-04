import { createSlice } from "@reduxjs/toolkit";
const videoSlice = createSlice({
  name: "video",
  initialState: {
    // 1. Ktra xem người dùng đã ở 1 phòng video nào k
    isUserInRoom: false,

    // 2. Ktra xem ng dùng có phải người tạo phòng k
    isUserRoomCreator: false,
    roomDetails: [],
    // 3. Thông tin về các phòng đang hoạt động mà ta có thể tham gia vào
    activeRooms: [],

    // 4. Luồng cục bộ
    localStream: null,
    // 5. Luồng từ xa
    remoteStreams: [],

    audioOnly: false,

    screenSharingStream: null,
    isScreenSharingActive: false,
    isUserJoinedWithOnlyAudio: false,
  },

  reducers: {
    setOpenRoom: (state, action) => {
      return {
        ...state,
        isUserInRoom: action.payload.isUserInRoom,
        isUserRoomCreator: action.payload.isUserRoomCreator,
      };
    },
    setRoomDetails: (state, action) => ({
      ...state,
      roomDetails: action.payload,
    }),
    setActiveRooms: (state, action) => ({
      ...state,
      activeRooms: action.payload,
    }),
    setLocalStream: (state, action) => ({
      ...state,
      localStream: action.payload,
    }),
    setAudioOnly: (state, action) => ({
      ...state,
      audioOnly: action.payload,
    }),
    setRemoteStream: (state, action) => ({
      ...state,
      remoteStreams: action.payload,
    }),
    setScreenSharingStream: (state, action) => {
      console.log("action", action);
      return {
        ...state,
        isScreenSharingActive: action.payload ? true : false,
        screenSharingStream: action.payload || null,
      };
    },

    setIsUserJoinedWithOnlyAudio: (state, action) => ({
      ...state,
      isUserJoinedWithOnlyAudio: action.payload,
    }),
  },
});

export const {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setAudioOnly,
  setRemoteStream,
  setScreenSharingStream,
  setIsUserJoinedWithOnlyAudio,
} = videoSlice.actions;

export default videoSlice.reducer;
