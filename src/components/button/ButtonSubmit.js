import React from "react";

const ButtonSubmit = ({
  type,
  children,
  className,
  isSubmitting = false,
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      className={`px-[15px] py-[10px] bg-[#90b498] color-white flex items-center justify-center w-full text-white text-lg mt-[40px] rounded-md mb-[30px] ${className}`}
      disabled={isSubmitting}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonSubmit;
