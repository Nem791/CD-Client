import React from "react";
import { Link } from "react-router-dom";

import errorImg from "../assets/img/error/error_404.png";
import errorBot from "../assets/img/error/error_bottom.png";
import errorRight from "../assets/img/error/error_right.png";

const ErrorPage = () => {
  return (
    <>
      <div className="mt-[40px] w-full h-full flex justify-center items-center flex-col relative z-30">
        <div>
          <img src={errorImg} alt="errorImg" className="max-w-full w-full" />
        </div>
        <h1 className="mt-5 text-[#ff6262] tracking-[2px] font-semibold text-center text-[40px]">
          PAGE NOT FOUND!
        </h1>
        <p className="mt-5 text-[18px] tracking-wider">
          We can't seem to find the page you are looking for
        </p>
        <button className="mt-10 border border-[#4a4a4a] px-8 py-4 font-medium text-[20px] rounded-[80px] hover:scale-110 transition-all ease-linear">
          <Link to={"/"}>Back to home</Link>
        </button>
      </div>
      <div className="absolute left-0 bottom-0 z-10">
        <img src={errorBot} alt="cloud_bot" className="max-w-full w-full" />
      </div>
      <div className="absolute right-[1%] bottom-[18%] z-20">
        <img src={errorRight} alt="cloud_right" className="max-w-full w-full" />
      </div>
    </>
  );
};

export default ErrorPage;
