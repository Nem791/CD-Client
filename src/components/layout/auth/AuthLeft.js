import React from "react";

import logo from "../../../assets/img/home/logo.png";
import authGirl from "../../../assets/img/auth/auth-girl.png";
const AuthLeft = () => {
  return (
    <div className="w-full bg-[#4b8063] p-[48px] lg:h-screen text-center">
      <div className="bg-white rounded-full inline-flex p-3 mb-4 justify-center items-center">
        <img src={logo} alt="logo" className="lg:h-[48px] h-[40px]" />
      </div>
      <div className="lg:max-w-[80%] text-white lg:ml-[72px] lg:text-[40px] text-[35px] mb-[20px] f-calistoga leading-10 text-center">
        Let's Learning Something New Today
      </div>
      <div>
        <img src={authGirl} alt="auth-girl" />
      </div>
    </div>
  );
};

export default AuthLeft;
