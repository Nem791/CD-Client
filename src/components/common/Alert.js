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
import { useDispatch, useSelector } from "react-redux";
import { setShowAlert } from "../../store/alert/alertSlice";
import { motion } from "framer-motion";
import { responseInvitation } from "../../realtimeCommunication/socketConnection";
import { Button } from "@mui/material";
import { setShowCardBox } from "../../store/show/showSlice";
import { useNavigate } from "react-router-dom";

const Alert = ({ show, message = "", type = "notice" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { invitationComing } = useSelector((state) => state.chat);
  const handleAlertClose = () => {
    dispatch(setShowAlert(false));
  };

  const handleAcceptInvite = () => {
    const senderId = invitationComing[0]?.senderId[0]?._id ?? "";
    const receiverId = invitationComing[0]?.receiverId ?? "";
    responseInvitation({ accept: true, senderId, receiverId });
  };
  const handleRejectInvite = () => {
    const senderId = invitationComing[0]?.senderId[0]?._id ?? "";
    const receiverId = invitationComing[0]?.receiverId ?? "";
    responseInvitation({ accept: false, senderId, receiverId });
  };

  const gameOverHandel = () => {
    dispatch(setShowCardBox(true));
    // window.requestAnimationFrame(function () {
    //   window.location.reload();
    // });
    navigate(0);
  };

  return ReactDOM.createPortal(
    <div
      className={`alert z-[60] flex items-center overflow-hidden ${type} ty py-[20px] px-[40px] min-w-[420px] fixed right-0 top-[35px] rounded-[4px] border-l-[8px] shadow-flashcard ${
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
      {type === "invite" ? (
        <>
          <span className={`msg py-[0px] px-[20px] text-[18px]`}>
            {message}
          </span>
          <div className="flex gap-[2px]">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAcceptInvite}
            >
              <CheckCircleRoundedIcon
                style={{
                  fontSize: "32px",
                  color: "#9eb8ac",
                  cursor: "pointer",
                }}
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                handleRejectInvite();
                handleAlertClose();
              }}
            >
              <CancelRoundedIcon
                style={{
                  fontSize: "32px",
                  color: "#de8d7e",
                  cursor: "pointer",
                }}
              />
            </motion.div>
          </div>
        </>
      ) : type === "winner" ? (
        <>
          <span className={`msg py-[0px] px-[20px] text-[18px]`}>
            {message}
          </span>
          <Button
            variant="contained"
            style={{ color: "white", backgroundColor: "#8eb397" }}
            onClick={gameOverHandel}
          >
            Ok
          </Button>
        </>
      ) : (
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
      )}
    </div>,
    document.querySelector("body")
  );
};

export default Alert;
