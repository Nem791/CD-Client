import React from "react";
import ReactDOM from "react-dom";
import {
  InformationCircleIcon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import SafetyDividerTwoToneIcon from "@mui/icons-material/SafetyDividerTwoTone";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useDispatch } from "react-redux";
import { setShowAlert } from "../../store/alert/alertSlice";
import { motion } from "framer-motion";

const Alert = ({ show, message = "", type = "notice" }) => {
  const dispatch = useDispatch();
  const handleAlertClose = () => {
    dispatch(setShowAlert(false));
  };
  return ReactDOM.createPortal(
    <div
      className={`alert z-[60] flex items-center overflow-hidden ${type} ty py-[20px] px-[40px] min-w-[420px] fixed right-0 top-[74px] rounded-[4px] border-l-[8px] shadow-flashcard ${
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
      ) : type === "invite" ? (
        <SafetyDividerTwoToneIcon
          className={`absolute translate-y-[-50%] left-[20px] top-[50%] w-[30px] h-[30px]`}
          style={{
            fontSize: "32px",
          }}
        ></SafetyDividerTwoToneIcon>
      ) : (
        <XCircleIcon
          className={`absolute translate-y-[-50%] left-[20px] top-[50%] w-[30px] h-[30px]`}
        ></XCircleIcon>
      )}
      {type !== "invite" ? (
        <>
          <span className={`msg py-[0px] px-[20px] text-[18px]`}>
            {message}
          </span>
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
        </>
      ) : (
        <>
          <span className={`msg py-[0px] px-[20px] text-[18px]`}>
            {message}
          </span>
          <div className="flex gap-[2px]">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <CheckCircleRoundedIcon
                style={{
                  fontSize: "32px",
                  color: "#9eb8ac",
                }}
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAlertClose}
            >
              <CancelRoundedIcon
                style={{
                  fontSize: "32px",
                  color: "#de8d7e",
                }}
              />
            </motion.div>
          </div>
        </>
      )}
    </div>,
    document.querySelector("body")
  );
};

export default Alert;
