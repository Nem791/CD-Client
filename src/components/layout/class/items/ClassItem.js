import React from "react";

const ClassItem = () => {
  return (
    <div className="px-[20px] py-[12px] bg-[#fff] cursor-pointer shadow-profile">
      <div className="flex items-center">
        <img
          src="https://images.unsplash.com/photo-1648371477306-42e7c73b3aca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
        />
        <div className="ml-[10px] max-w-[120px] text-[12px]">
          <p className="font-semibold">quangvu9501</p>
          <p className="font-normal">superquang08@gmail.com</p>
        </div>
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
        <span className="inline-block h-[1rem] mx-[10px] border-r-[0.125rem] solid border-r-[#c8c8c8]"></span>
        <p>5 People</p>
      </div>
    </div>
  );
};

export default ClassItem;
