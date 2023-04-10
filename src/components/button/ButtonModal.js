import React from "react";

const ButtonModal = ({ children, onClick = () => {} }) => {
  return (
    <button
      className="p-6 bg-primary w-full text-[18px] font-bold text-white hover:bg-secondary transition linear duration-100"
      type="submit"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonModal;
