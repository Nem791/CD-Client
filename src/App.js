import React from "react";

import axios from "axios";
import Router from "./Router";
import Alert from "./components/common/Alert";
import { useSelector } from "react-redux";
import useAuthStateChanged from "./hooks/useAuthStateChanged";
import IconChat from "./components/chat/IconChat";

axios.defaults.withCredentials = true;

function App() {
  const { showAlert, message, type } = useSelector((state) => state.alert);
  const { isLogin } = useAuthStateChanged();

  return (
    <>
      <Router></Router>
      <Alert show={showAlert} message={message} type={type}></Alert>
      {isLogin && <IconChat></IconChat>}
    </>
  );
}

export default App;
