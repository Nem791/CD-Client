import React from "react";

const StaticInfoItem = ({
  subLabel,
  labels,
  children,
  bgIcons,
  colorIcons,
}) => {
  return (
    <div className="flex items-center inline-block p-[10px] border-[1px] solid border-[#f8f8f8] rounded-xl shadow-thin">
      <div
        className={`p-[12px] inline-block rounded-full ${colorIcons} ${bgIcons}`}
      >
        {children}
      </div>
      <div className="flex flex-col ml-[14px]">
        <span className={`text-[13px] text-[#bdbdbd]`}>{labels}</span>
        <span className="font-semibold text-[16px]">50 {subLabel}</span>
      </div>
    </div>
  );
};

export default StaticInfoItem;
