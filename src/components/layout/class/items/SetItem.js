import React, { useState } from "react";

const SetItem = () => {
  const [showDropBox, setShowDropBox] = useState(false);
  return (
    <div className="px-[20px] py-[12px] bg-[#fff] cursor-pointer shadow-profile relative">
      <div className="flex items-center">
        <img
          src="https://images.unsplash.com/photo-1648371477306-42e7c73b3aca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
        />
        <div className="ml-[10px] max-w-[120px]">
          <p className="font-semibold text-[12px]">quangvu9501</p>
        </div>
      </div>
      <div
        className="absolute top-4 right-2"
        onClick={() => setShowDropBox(!showDropBox)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 hover:text-[#9ecbaa] transition all linear"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </div>
      <div
        className={`dropbox absolute z-10 isolate top-3 right-3 translate-y-full flex bg-white items-center text-[#ff715b] px-[14px] py-[8px] drop-shadow hover:bg-[#ffcd1f] hover:text-[#282e3e] transition all ease-in ${
          showDropBox ? "visible opacity-1" : "invisible opacity-0"
        }`}
      >
        <div className="mr-[8px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
        <p className="text-[13px]">Remove from class</p>
      </div>

      <div className="mt-[10px]">
        <img
          src="https://images.unsplash.com/file-1662566218586-ab32d69fcc39image"
          alt="class-img"
          className="max-h-[140px] h-full w-full object-cover"
        />
      </div>
      <h2 className="mt-[10px] text-[#303545] font-bold text-[18px] max-w-[230px] w-full overflow-hidden">
        Mobile Twitter
      </h2>
      <div className="flex items-center text-[#c8c8c8] font-semibold">
        <p>19 Terms</p>
      </div>
    </div>
  );
};

export default SetItem;
