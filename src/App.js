import React from "react";

import axios from "axios";
import Router from "./Router";
import Alert from "./components/common/Alert";
import { useSelector } from "react-redux";
import IconChat from "./components/chat/IconChat";

axios.defaults.withCredentials = true;

function App() {
  const { showAlert, message, type } = useSelector((state) => state.alert);
  const { showIconChat } = useSelector((state) => state.show);

  return (
    <div className="relative">
      <Router></Router>
      <Alert show={showAlert} message={message} type={type}></Alert>
      {showIconChat && <IconChat></IconChat>}
    </div>
  );
}

export default App;
