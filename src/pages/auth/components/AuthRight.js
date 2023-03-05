import React from "react";
import PropTypes from "prop-types";

const AuthRight = ({ title, subtitle, children }) => {
  return (
    <div className="w-full lg:h-screen lg:overflow-y-auto">
      <div className="f-calistoga lg:text-[2.8rem] text-[2rem] ml-[88px] mr-[70px] mt-[88px] mb-[28px] text-[#3a3a3a] ">
        {title}
      </div>
      <div className="max-w-[80%] lg:text-xl text-lg text-[#6e6e6e] ml-[88px] mr-[70px] mb-[28px]">
        {subtitle}
      </div>
      {children}
    </div>
  );
};

AuthRight.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default AuthRight;
