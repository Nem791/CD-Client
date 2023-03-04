import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStateChanged from "../../hooks/useAuthStateChanged";
import { domain } from "../../utils/common";

const UserBox = ({ isOpen = false }) => {
  const { user } = useAuthStateChanged();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${domain}/api/v1/users/logout`);
      // refresh lại trang
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className={`box absolute bg-white top-10 right-0 shadow-card rounded-[8px] w-[200px] overflow-hidden ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div className="flex items-center w-full border-b-[1px] border-[#EDEFF4] px-[20px] py-[15px]">
        <img
          src={user.avatarUrl}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
        />
        <div className="ml-[10px] max-w-[120px] overflow-hidden text-[12px]">
          <p className="font-semibold">{user.name}</p>
          <p className="font-normal">{user.email}</p>
        </div>
      </div>
      <div className="text-[14px] font-semibold">
        <Link to={`/profile/${user._id}/dashboard`}>
          <div className="px-5 py-[12px] hover:text-[#ffcd1f] transition ease-in duration-100ms cursor-pointer">
            Profile
          </div>
        </Link>
        <div className="px-5 py-[12px] hover:text-[#ffcd1f] transition ease-in duration-100ms cursor-pointer">
          <Link to="/settings">Settings</Link>
        </div>
        <div
          className="px-5 py-[12px] hover:text-[#ffcd1f] transition ease-in duration-100ms cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default UserBox;
