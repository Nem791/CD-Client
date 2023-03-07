import React from "react";
import DuoRoundedIcon from "@mui/icons-material/DuoRounded";
import useToggleValue from "../../hooks/useToggleValue";
import VideoListBox from "./VideoListBox";

const VideoList = () => {
  const { value: show, handleToggleValue: handleClick } = useToggleValue();

  return (
    <div className="box-wrapper relative">
      <DuoRoundedIcon
        className="w-5 h-5 text-[#586380] hover:opacity-[0.5] cursor-pointer"
        onClick={handleClick}
      ></DuoRoundedIcon>
      <VideoListBox isOpen={show} onClick={handleClick}></VideoListBox>
    </div>
  );
};

export default VideoList;
