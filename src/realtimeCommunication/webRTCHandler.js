import Peer from "simple-peer";

import { store } from "../store/configureStore";
import { setLocalStream, setRemoteStream } from "../store/video/slice";
import * as socketConnection from "./socketConnection";

// Hàm lấy ICE Candidate từ TURN SERVER
const getConfiguration = () => {
  const turnIceServers = null;

  // 1. Ktra xem nếu kết nối giữa 2 ng dùng ko thực hiện dc
  // thì ta sẽ sử dụng tới TURN SERVER
  if (turnIceServers) {
  } else {
    console.warn("Using only STUN server");
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};

// 1. Nhận local stream (luồng cục bộ từ thiết bị)
// để lấy quyền truy cập vào camera và micro

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  audio: true,
  video: true,
};
export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
  // callbackFucntion: Nếu có quyền truy cập vào luồng cục bộ
  // ta sẽ làm j đo
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log(stream);
      store.dispatch(setLocalStream(stream));
      callbackFunc();
    })
    .catch((err) => {
      console.log(err);
      console.log("Cannot get an access to local stream");
    });
};

// peers để lưu trữ những kết nối của ng dùng
let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const localStream = store.getState().video.localStream;

  if (isInitiator) {
    console.log("preparing new peer connection as initiator");
  } else {
    console.log("preparing new peer connection as not initiator");
  }

  // B1: Tạo 1 peer mới (peer ng phát sự kiện)

  peers[connUserSocketId] = new Peer({
    // 1. ktra đây có phải kết nối từ ng khởi tạo k
    initiator: isInitiator,

    // 2. Lấy các thông tin để tạo kết nối WebRTC connection
    // (ICE candidates) từ STUN SERVER
    config: getConfiguration(),

    // 3. Đính kèm luồng cục bộ vào kết nối ngang hàng
    stream: localStream,
  });

  // B2: Peer sẽ lắng nghe sự kiện signal
  // => Để lấy 1 số thông tin như ICE Candidate hay SDP
  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    // B3: Share Signaling data (ICE Candidates, ...) cho những ng dùng khác

    socketConnection.signalPeerData(signalData);
  });

  // B3: Nếu 2 ng dùng kết nối thành công sự kiện stream sẽ dc phát
  peers[connUserSocketId].on("stream", (remoteStream) => {
    console.log("remote stream came from orther user");

    // Lấy remote stream (luồng từ xa) từ máy của các ng dùng khác
    remoteStream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(remoteStream);
  });
};

export const handleSignalingData = (data) => {
  const { connUserSocketId, signal } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};

const addNewRemoteStream = (remoteStream) => {
  const remoteStreams = store.getState().video.remoteStreams;
  const newRemoteStreams = [...remoteStreams, remoteStream];

  store.dispatch(setRemoteStream(newRemoteStreams));
};

export const closeAllConnections = () => {
  Object.entries(peers).forEach((mappedObject) => {
    const connUserSocketId = mappedObject[0];
    if (peers[connUserSocketId]) {
      peers[connUserSocketId].destroy();
      delete peers[connUserSocketId];
    }
  });
};

export const handleParticipantLeftRoom = (data) => {
  const { connUserSocketId } = data;
  console.log("data", data);

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }

  const remoteStreams = store.getState().video.remoteStreams;
  console.log("remoteStreams", remoteStreams);
  // Xóa luồng từ xa của ng dùng
  const newRemoteStreams = remoteStreams.filter(
    (remoteStream) => remoteStream.connUserSocketId !== connUserSocketId
  );

  console.log("newRemoteStreams", newRemoteStreams);

  store.dispatch(setRemoteStream(newRemoteStreams));
};

// Xử lý share màn hình
export const switchOutgoingTracks = (stream) => {
  console.log(peers);
  for (let socket_id in peers) {
    // Ta nhận các track và sẽ gửi các track này tới ng dùng khác
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};
