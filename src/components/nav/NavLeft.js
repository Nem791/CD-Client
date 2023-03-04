import React from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/img/home/logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import useAuthStateChanged from "../../hooks/useAuthStateChanged";
const NavLeft = () => {
  const { userId } = useParams();

  return (
    <div className="p-[40px] max-w-[20%] w-full h-full">
      <Link to="/" className="items-center">
        <img src={logo} alt="logo" className="h-[48px]" />
      </Link>
      {/* Content */}
      <div className="mt-[20px]">
        <Link to={`/profile/${userId}/dashboard`}>
          <div className="p-[20px] flex items-center font-semibold text-[16px] hover:bg-[#eff5f2] rounded-xl cursor-pointer">
            <DashboardIcon></DashboardIcon>
            <span className="ml-[20px]">Dashboard</span>
          </div>
        </Link>
        <Link to={`/profile/${userId}/mySet`}>
          <div className="p-[20px] flex items-center font-semibold text-[16px] hover:bg-[#eff5f2] rounded-xl cursor-pointer">
            <LocalLibraryIcon></LocalLibraryIcon>
            <span className="ml-[20px]">Study Sets</span>
          </div>
        </Link>
        <Link to={`/profile/${userId}/schedule`}>
          <div className="p-[20px] flex items-center font-semibold text-[16px] hover:bg-[#eff5f2] rounded-xl cursor-pointer">
            <CalendarMonthIcon></CalendarMonthIcon>
            <span className="ml-[20px]">Your Schedule</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavLeft;
