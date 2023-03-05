import React from "react";

const ButtonSocial = ({ title, imgSrc, alt, onClick }) => {
  return (
    <button
      className="flex px-[15px] py-[15px] w-full justify-center items-center shadow-social mb-[20px]"
      onClick={onClick}
    >
      <img src={imgSrc} alt={alt} className="w-[50px] h-[50px] block" />
      <p className="text-xl text-[#6e6e6e] leading-[50px] ml-[18px]">{title}</p>
    </button>
  );
};

export default ButtonSocial;
