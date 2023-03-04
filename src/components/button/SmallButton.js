import React from "react";
import PropTypes from "prop-types";

const SmallButton = ({ children, className, onClick }) => {
  return (
    <button
      className={`text-[16px] font-medium ml-[18px] px-[12px] py-[6px]  rounded-[0.25rem]  transition duration-100ms ease-in ${className}`}
      onClick={onClick}
      type="submit"
    >
      {children}
    </button>
  );
};

SmallButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default SmallButton;
