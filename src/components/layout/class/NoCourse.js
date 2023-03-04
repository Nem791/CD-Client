import React from "react";

const NoCourse = ({ word, onClick }) =>
  // { title, subtitle, txtBut, url }
  {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-20">
        <h1 className="text-[30px] font-bold">
          {`This class doesn't have any ${word} yet`}
        </h1>
        <p className="mt-[8px] text-[16px]">
          {`Add an existing ${word} or create a new one to share`}
        </p>
        <button
          type="submit"
          className="mt-[18px] text-[16px] text-white font-medium ml-[18px] px-[18px] py-[12px] bg-[#9ecbab] rounded-[0.25rem] hover:bg-[#67a778] transition duration-100ms ease-in"
          onClick={onClick}
        >
          {`Add a ${word}`}
        </button>
      </div>
    );
  };

export default NoCourse;
