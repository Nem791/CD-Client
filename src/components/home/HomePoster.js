import React from "react";

import poster from "../../assets/img/home/poster.jpg";

const HomePoster = () => {
  return (
    <nav className="w-full bg-[#4b8063] p-[64px]">
      <div className="mt-[64px] max-w-[1440px] w-full h-full relative bg-radient z-2">
        <img
          src={poster}
          alt="poster-img"
          className="h-[640px] w-[1300px] rounded-[1.5rem] object-cover block"
        />
        <div className="absolute bottom-0 z-[8] flex justify-between w-full items-center">
          <div className="text-white max-w-[30rem] m-[48px]">
            <h1 className="text-[44px] font-bold mb-[16px] leading-[66px]">
              Learn for your future. MindCard.
            </h1>
            <p className="text-[20px] font-normal">
              With our ever-effective flashcards, eye-catching mindmap system,
              get a suite of science-backed study tools at your fingertips.
            </p>
          </div>
          <button className="text-[16px] text-white font-semibold px-[32px] py-[20px] bg-[#8fb397] rounded-lg hover:bg-[#4b8063] m-[48px] transition duration-100 ease-in">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HomePoster;
