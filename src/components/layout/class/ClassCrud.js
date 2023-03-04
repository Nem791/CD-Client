import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

const ClassCrud = () => {
  return (
    <div className="flex">
      <div className="w-[38px] h-[38px] text-[20px] flex items-center justify-center rounded-full border-[2px] solid border-[#d9dde8] text-[#646f90] font-bold transition duration-100ms ease-in ml-[10px] cursor-pointer">
        <AddRoundedIcon className="24px" />
      </div>
      <div className="w-[38px] h-[38px] text-[20px] flex items-center justify-center rounded-full border-[2px] solid border-[#d9dde8] text-[#646f90] font-bold transition duration-100ms ease-in ml-[10px] cursor-pointer">
        <PersonAddAltOutlinedIcon className="24px" />
      </div>
      <div className="w-[38px] h-[38px] text-[20px] flex items-center justify-center rounded-full border-[2px] solid border-[#d9dde8] text-[#646f90] font-bold transition duration-100ms ease-in ml-[10px] cursor-pointer">
        <FolderCopyOutlinedIcon className="24px" />
      </div>
      <div className="w-[38px] h-[38px] text-[20px] flex items-center justify-center rounded-full border-[2px] solid border-[#d9dde8] text-[#646f90] font-bold transition duration-100ms ease-in ml-[10px] cursor-pointer">
        <MoreHorizOutlinedIcon className="24px" />
      </div>
    </div>
  );
};

export default ClassCrud;
