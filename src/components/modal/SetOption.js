import React from "react";

const SetOption = () => {
  return (
    <div className="w-full my-[10px]">
      <div className="p-[20px] flex items-center justify-between shadow-card">
        <h2 className="text-[18px] font-bold">Describe a persion</h2>
        <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SetOption;
