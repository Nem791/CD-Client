import React from "react";

const ButtonModal = ({ children, onClick = () => {} }) => {
  return (
    <button
      className="p-6 bg-[#8fb397] w-full text-[18px] font-bold text-white hover:bg-[#4b8063] transition linear duration-100"
      type="submit"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonModal;
