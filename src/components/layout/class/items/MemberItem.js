import React from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const MemberItem = ({ memberInfo, role = "Member" }) => {
  return (
    <div className="px-[20px] py-[12px] bg-[#fff] flex items-center justify-between cursor-pointer shadow-profile">
      <div className="flex items-center">
        <img
          src={memberInfo.avatarUrl}
          alt="avatar"
          className="w-[60px] h-[60px] rounded-full object-cover cursor-pointer mr-[20px]"
        />
        <div className="ml-[10px] max-w-[120px]">
          <p className="text-[14px] font-semibold text-[#929bb4]">{role}</p>
          <p className="font-semibold text-[18px] font-bold">
            {memberInfo.name}
          </p>
        </div>
      </div>
      <MoreHorizIcon className="" />
    </div>
  );
};

export default MemberItem;
