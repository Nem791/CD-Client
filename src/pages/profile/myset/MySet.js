import React from "react";
import setIcon from "../../../assets/img/profile/set.png";
import SetItem from "./SetItem";

const MySet = () => {
  return (
    <div>
      <div>
        <div className="flex items-center">
          <p className="font-semibold text-[24px]">Explore Your Set</p>
          <img
            src={setIcon}
            alt="hand-icon"
            className="ml-[14px] w-[32px] h-[32px]"
          />
        </div>
        <div className="text-[#b6b9c1] text-[16px] mt-[5px]">
          Let's learn something new today!
        </div>
      </div>
      <div className="mt-[20px]">
        <p className="mb-[20px] font-bold text-[18px]">Average Score</p>
      </div>
      <div className="mt-[40px] grid grid-cols-3 gap-x-[18px] gap-y-[32px]">
        <SetItem></SetItem>
        <SetItem></SetItem>
        <SetItem></SetItem>
        <SetItem></SetItem>
        <SetItem></SetItem>
        <SetItem></SetItem>
        <SetItem></SetItem>
      </div>
    </div>
  );
};

export default MySet;
