import React from "react";

import logo from "../../../assets/img/home/logo-wordup-verticle.png";
import authGirl from "../../../assets/img/auth/auth-girl-blue.png";
const AuthLeft = () => {
  return (
    <div className="w-full bg-primary p-[48px] lg:h-screen">
      <div className="flex items-center">
        <div className="bg-white inline-flex mb-4 rounded-md justify-center items-center">
          <img
            src={logo}
            alt="logo"
            className="lg:h-[100px] h-[40px] object-cover"
          />
        </div>
        <div className="lg:max-w-[80%] text-white lg:text-[40px] text-[35px] mb-[20px] f-calistoga leading-10 ml-4">
          Let's Learning Something New Today
        </div>
      </div>
      <div>
        <img src={authGirl} alt="auth-girl" />
      </div>
    </div>
  );
};

export default AuthLeft;
