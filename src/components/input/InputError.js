import React from "react";

const InputError = ({ children }) => {
  return (
    <div className="relative w-full z-0 translate-y-[-100%]">
      <div class="pt-[16px] pr-[8px] pb-[4px] pl-[16px] text-[14px] text-white rounded-bl-xl rounded-br-xl bg-[#ff805d] mt-[-1rem] absolute w-full pointer-events-none">
        {children}
      </div>
    </div>
  );
};

export default InputError;
