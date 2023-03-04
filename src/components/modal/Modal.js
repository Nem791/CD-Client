import React from "react";
import ReactDOM from "react-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Modal = ({
  title = "Create a new class",
  showModal = false,
  handleClose = () => {},
  children,
}) => {
  return ReactDOM.createPortal(
    <>
      <div
        className={`fixed w-full h-full z-40 flex justify-center items-center visible opacity-100 transition ease-in duration-200 ${
          showModal ? "" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute w-full h-full bg-[rgba(0,0,0,0.25)] z-40"
          onClick={handleClose}
        ></div>
        <div className="max-w-[600px] w-full absolute bg-white z-50 rounded-lg">
          <div className="bg-[#4b8063] p-8 w-full flex justify-between items-center rounded-t-lg">
            <h1 className="text-[30px] font-bold text-white">{title}</h1>
            <div>
              <CloseRoundedIcon
                className="cursor-pointer hover:text-[white] transition linear duration-200 h-9 w-9"
                onClick={handleClose}
                sx={{ fontSize: 38 }}
              ></CloseRoundedIcon>
            </div>
          </div>
          <div className="p-8 overflow-y-scroll">{children}</div>
        </div>
      </div>
    </>,
    document.querySelector("#root")
  );
};

export default Modal;
