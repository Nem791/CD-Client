import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import BoxChat from "./BoxChat";
import { useDispatch } from "react-redux";
import { setShowCardBox } from "../../store/show/showSlice";

const IconChat = () => {
  const dispatch = useDispatch();
  return ReactDOM.createPortal(
    <div className="fixed bottom-10 right-10 cursor-pointer z-30">
      <motion.div
        className="bg-white w-max p-[10px] border-[1px] rounded-full shadow-card"
        drag
        dragConstraints={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          dispatch(setShowCardBox(true));
        }}
      >
        <img
          src={`https://img.icons8.com/plasticine/100/null/chat--v1.png`}
          alt="icon-chat"
          className="w-[40px] h-[40px] pointer-events-none"
        />
      </motion.div>
      <BoxChat></BoxChat>
    </div>,
    document.querySelector("body")
  );
};

export default IconChat;
