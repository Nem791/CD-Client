import React from "react";

import axios from "axios";
import Router from "./Router";
import Alert from "./components/common/Alert";
import { useSelector } from "react-redux";

axios.defaults.withCredentials = true;

function App() {
  const { showAlert, message, type } = useSelector((state) => state.alert);

  return (
    <>
      <Router></Router>
      <Alert show={showAlert} message={message} type={type}></Alert>
    </>
  );
}

export default App;
