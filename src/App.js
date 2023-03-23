import React, { useEffect } from "react";

import axios from "axios";
import Router from "./Router";
import Alert from "./components/common/Alert";
import { useDispatch, useSelector } from "react-redux";
import IconChat from "./components/chat/IconChat";
import { setMessage, setShowAlert, setType } from "./store/alert/alertSlice";

axios.defaults.withCredentials = true;

function App() {
  const { showAlert, message, type } = useSelector((state) => state.alert);
  const { showIconChat } = useSelector((state) => state.show);
  const { invitationComing } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    if (invitationComing) {
      console.log({ invitationComing });
      dispatch(setShowAlert(true));
      dispatch(setMessage("You have an invitation by Quang Vu!"));
      dispatch(setType("invite"));
    }
  }, [invitationComing, dispatch]);

  return (
    <div className="relative">
      <Router></Router>
      <Alert show={showAlert} message={message} type={type}></Alert>
      {showIconChat && <IconChat></IconChat>}
    </div>
  );
}

export default App;
