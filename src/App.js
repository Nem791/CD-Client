import React from "react";

import "./App.scss";

import axios from "axios";
import Router from "./Router";
import Alert from "./components/common/Alert";
import { useSelector } from "react-redux";
import IconChat from "./components/chat/IconChat";
import useAuthStateChanged from "./hooks/useAuthStateChanged";
import VideoScreenContainer from "./components/video/VideoScreenContainer";

axios.defaults.withCredentials = true;
// Nếu bạn muốn sử dụng Cookie với Axios,
// bạn cần bao gồm thuộc tính withCredentials.
// => Lệnh này để thêm vào tất cả req withCredentials: true
function App() {
  const { showAlert, message, type } = useSelector((state) => state.alert);
  const { isLogin } = useAuthStateChanged();
  const { isUserInRoom } = useSelector((state) => state.video);

  return (
    <>
      <Router></Router>
      <Alert show={showAlert} message={message} type={type}></Alert>
      {isLogin && <IconChat></IconChat>}
      {isUserInRoom && <VideoScreenContainer></VideoScreenContainer>}
    </>
  );
}

export default App;
