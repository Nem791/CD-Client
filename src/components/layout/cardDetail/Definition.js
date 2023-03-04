import React from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import LocalSeeOutlinedIcon from "@mui/icons-material/LocalSeeOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const Definition = ({ cardDetail }) => {
  const handleEditCardDetail = () => {};
  return (
    <div className="bg-white p-[40px] w-full rounded-xl flex">
      <div className="w-[30%]">
        <h1 className="text-[30px] font-bold text-red-400">
          {cardDetail.word}
        </h1>
        <p className="text-[#bebebe] text-[18px] mt-[10px]">
          {cardDetail.pronounce}
        </p>
        <div className="mt-[10px] hover:bg-[#ffe1e7] rounded-full p-2 inline-block cursor-pointer">
          <SpeakerWaveIcon className="w-6 h-6 text-[#dd5e71]"></SpeakerWaveIcon>
        </div>
      </div>
      <div className="w-[65%] pr-[18px] border-r-[1px] ">
        <p className="text-[#2c4a78] font-semibold text-[18px]">
          Frequently Used As
        </p>
        <div className="mt-[20px] font-normal text-[#939bb4]">
          EN DEFINITION
        </div>
        <div className="text-[14px] text-[#303545]">{cardDetail.word}</div>
        <div className="mt-[10px] font-normal text-[#939bb4]">
          VN DEFINITION
        </div>
        <div className="text-[14px] text-[#303545]">
          {cardDetail.meaningUsers}
        </div>
      </div>
      <div className="w-[5%] flex flex-col justify-center items-center pl-[28px]">
        <div className="p-2 bg-[#ffeed8] text-[#fdcb84] rounded-full transition-all linear duration-75 cursor-pointer">
          <StarBorderRoundedIcon></StarBorderRoundedIcon>
        </div>
        <div className="mt-[10px] p-2 bg-[#efdcfe] text-[#8e61b2] rounded-full transition-all linear duration-75 cursor-pointer">
          <LocalSeeOutlinedIcon></LocalSeeOutlinedIcon>
        </div>
        <div
          className="mt-[10px] p-2 bg-[#e2fff1] text-[#499670] rounded-full transition-all linear duration-75 cursor-pointer"
          onClick={handleEditCardDetail}
        >
          <ModeEditOutlineOutlinedIcon></ModeEditOutlineOutlinedIcon>
        </div>
      </div>
    </div>
  );
};

export default Definition;
