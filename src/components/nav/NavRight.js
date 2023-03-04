import { Avatar } from "@mui/material";
import React from "react";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CalendarCustom from "../../pages/profile/CalendarCustom";
import useAuthStateChanged from "../../hooks/useAuthStateChanged";

const NavRight = () => {
  const { user } = useAuthStateChanged();
  console.log(user);
  return (
    <div className="p-[40px] max-w-[20%] w-full flex items-center flex-col">
      <div>
        <Avatar
          alt={user?.name}
          src={user?.avatarUrl}
          sx={{ width: 120, height: 120 }}
        />
      </div>
      <div className="flex items-center mt-[10px]">
        <p className="text-[18px] font-semibold">{user.name}</p>
        <VerifiedUserIcon
          className="ml-[5px] text-[#8eb397]"
          fontSize="small"
        ></VerifiedUserIcon>
      </div>
      <p className="text-[#b6b9c1] text-[14px]">College Student</p>
      <div className="mt-[10px]">
        <CalendarCustom></CalendarCustom>
      </div>
    </div>
  );
};

export default NavRight;
