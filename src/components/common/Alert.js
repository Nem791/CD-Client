import React from "react";
import ReactDOM from "react-dom";
import {
  InformationCircleIcon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { setShowAlert } from "../../store/alert/alertSlice";

const Alert = ({ show, message = "", type = "notice" }) => {
  const dispatch = useDispatch();
  const handleAlertClose = () => {
    dispatch(setShowAlert(false));
  };
  return ReactDOM.createPortal(
    <div
      className={`alert z-50 flex overflow-hidden ${type} ty py-[20px] px-[40px] min-w-[420px] fixed right-0 top-[74px] rounded-[4px] border-l-[8px] ${
        show ? "show-slide" : "hidden"
      }`}
    >
      {type === "notice" ? (
        <InformationCircleIcon
          className={`absolute translate-y-[-50%] left-[20px] top-[50%] w-[30px] h-[30px]`}
        ></InformationCircleIcon>
      ) : type === "success" ? (
        <CheckCircleIcon
          className={`absolute translate-y-[-50%] left-[20px] top-[50%] w-[30px] h-[30px]`}
        ></CheckCircleIcon>
      ) : (
        <XCircleIcon
          className={`absolute translate-y-[-50%] left-[20px] top-[50%] w-[30px] h-[30px]`}
        ></XCircleIcon>
      )}
      <span className={`msg py-[0px] px-[20px] text-[18px]`}>{message}</span>
      <div
        className={`close-btn absolute  py-[20px] px-[18px] right-0 top-[50%] translate-y-[-50%] cursor-pointer`}
        onClick={handleAlertClose}
      >
        <XMarkIcon
          className={`w-[22px] h-[22px] leading-[40px]`}
          viewBox="0 0 24 24"
          strokeWidth="2"
        ></XMarkIcon>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default Alert;
