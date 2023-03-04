import React from "react";
import Header from "../components/common/Header";
import { ClassItem } from "../components/layout/class";
import useAuthStateChanged from "../hooks/useAuthStateChanged";

const UserProfile = () => {
  const { user } = useAuthStateChanged();

  return (
    <div className="bg-[#f6f7fb]">
      <Header></Header>
      <div className="p-[100px]">
        {/* Header */}
        <div className="h-[190px] bg-[#fff] shadow-profile flex relative">
          <div>
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="h-[200px] w-[200px] rounded-full border-[5px] solid border-[#fff] shadow-avatar absolute left-[50px] top-8 object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-[60px] pt-[60px] ml-[240px]">
            <h3 className="text-[2rem] font-bold">{user.name}</h3>
            <p className="text-[1rem] mt-[18px]">{user.email}</p>
          </div>
        </div>
        {/* Aside */}
        <div className="w-full flex pl-[15px]">
          {/* Left */}
          <div className="w-[300px] h-screen bg-[#fff] shadow-profile"></div>
          {/* Right */}
          <div className="w-full">
            <ul className="flex p-[20px] text-[14px] font-[600] text-[#b3b3b3] justify-center">
              <li className="border-[2px] solid border-[#efefef] py-2 px-4 rounded-tl-[25px] rounded-bl-[25px] hover:opacity-[0.5] cursor-pointer">
                Class
              </li>
              <li className="border-[2px] border-l-0 solid border-[#efefef] py-2 px-4 hover:opacity-[0.5] cursor-pointer">
                Set
              </li>
              <li className="border-[2px] border-l-0 solid border-[#efefef] py-2 px-4 rounded-tr-[25px] rounded-br-[25px] hover:opacity-[0.5] cursor-pointer">
                Folder
              </li>
            </ul>
            <div>
              <div className="flex relative ml-auto justify-end">
                <input
                  type="text"
                  className="px-4 py-2 outline-none input-line relative text-[#586380] font-semibold w-full max-w-[400px] rounded-lg"
                  placeholder="Course Search"
                />
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 absolute right-[1rem] -translate-y-2/4 top-[50%] text-[#646f90]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5 mx-[20px] mt-[40px]">
              <ClassItem></ClassItem>
              <ClassItem></ClassItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
